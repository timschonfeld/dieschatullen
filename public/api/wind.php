<?php
// Wind-Proxy für die Drachenwetter-Anzeige: holt DWD-Daten (über Bright Sky) serverseitig und cached sie 10 Minuten.
// Es werden nur Zahlen weitergegeben (keine ungeprüften Texte aus der Fremd-API).
// So baut der Browser der Besucher keine Verbindung zu Dritten auf (kein Cookie-Banner nötig).
// Antwort im selben Format wie im Browser-Skript: { current: {...}, hourly: {...} }
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');

$orte = [
  'hooksiel' => [53.629744, 8.026146],
  'schillig' => [53.702956, 8.024996],
];
$ort = $_GET['ort'] ?? 'schillig';
if (!isset($orte[$ort])) { http_response_code(400); echo '{"error":"unbekannter Ort"}'; exit; }

// Eigener Cache-Ordner (per .htaccess gesperrt) statt des geteilten Temp-Verzeichnisses des Webhostings
$cacheOrdner = __DIR__ . '/.cache';
if (!is_dir($cacheOrdner)) {
  @mkdir($cacheOrdner, 0700, true);
  @file_put_contents("$cacheOrdner/.htaccess", "Require all denied\n");
}
$cacheDatei = "$cacheOrdner/wind-$ort.json";
if (is_file($cacheDatei) && time() - filemtime($cacheDatei) < 600) { readfile($cacheDatei); exit; }

// Abruf über cURL, sonst über file_get_contents (je nachdem, was das Webhosting erlaubt)
function holen(string $url) {
  $antwort = false;
  if (function_exists('curl_init')) {
    $c = curl_init($url);
    curl_setopt_array($c, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 6, CURLOPT_USERAGENT => 'dieschatullen.de', CURLOPT_FOLLOWLOCATION => false]);
    $antwort = curl_exec($c);
    if (curl_getinfo($c, CURLINFO_HTTP_CODE) !== 200) $antwort = false;
    curl_close($c);
  } elseif (filter_var(ini_get('allow_url_fopen'), FILTER_VALIDATE_BOOLEAN)) {
    $antwort = @file_get_contents($url, false, stream_context_create(['http' => ['timeout' => 6, 'header' => "User-Agent: dieschatullen.de\r\n"]]));
  }
  if ($antwort === false) return null;
  $daten = json_decode($antwort, true);
  return is_array($daten) && isset($daten['weather']) ? $daten : null;
}
function erster(...$werte) { foreach ($werte as $w) { if (is_numeric($w)) return (float) $w; } return 0.0; }

[$lat, $lon] = $orte[$ort];
$q = "lat=$lat&lon=$lon&tz=Europe/Berlin";
// Stündliche Werte für heute und morgen (deutsche Zeit) → Tageszeiten in der Anzeige
$berlin = new DateTimeZone('Europe/Berlin');
$von = (new DateTime('today', $berlin))->format('Y-m-d');
$bis = (new DateTime('today +2 days', $berlin))->format('Y-m-d');
$jetzt = holen("https://api.brightsky.dev/current_weather?$q");
$vorhersage = holen("https://api.brightsky.dev/weather?$q&date=$von&last_date=$bis");

if (!$jetzt || !$vorhersage) {
  if (is_file($cacheDatei)) { readfile($cacheDatei); exit; } // lieber alte Daten als keine
  http_response_code(502); echo '{"error":"Wetterdienst nicht erreichbar"}'; exit;
}

$w = $jetzt['weather'];
$daten = [
  'current' => [
    'time' => preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/', $w['timestamp'] ?? '') ? $w['timestamp'] : '',
    'wind_speed_10m' => erster($w['wind_speed_10'] ?? null, $w['wind_speed_30'] ?? null, $w['wind_speed_60'] ?? null),
    'wind_gusts_10m' => erster($w['wind_gust_speed_10'] ?? null, $w['wind_gust_speed_30'] ?? null, $w['wind_gust_speed_60'] ?? null),
    'wind_direction_10m' => erster($w['wind_direction_10'] ?? null, $w['wind_direction_30'] ?? null, $w['wind_direction_60'] ?? null),
  ],
  'hourly' => [
    'time' => array_map(fn($x) => preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/', $x['timestamp'] ?? '') ? $x['timestamp'] : '', $vorhersage['weather']),
    'wind_speed_10m' => array_map(fn($x) => (float) ($x['wind_speed'] ?? 0), $vorhersage['weather']),
    'wind_gusts_10m' => array_map(fn($x) => (float) ($x['wind_gust_speed'] ?? 0), $vorhersage['weather']),
  ],
];
$json = json_encode($daten);
file_put_contents($cacheDatei, $json, LOCK_EX);
echo $json;
