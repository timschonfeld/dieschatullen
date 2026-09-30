<?php
// Wind-Proxy für die Drachenwetter-Anzeige: holt DWD-Daten (über Bright Sky) serverseitig und cached sie 10 Minuten.
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

$cacheDatei = sys_get_temp_dir() . "/schatullen-wind-$ort.json";
if (is_file($cacheDatei) && time() - filemtime($cacheDatei) < 600) { readfile($cacheDatei); exit; }

function holen(string $url) {
  $antwort = @file_get_contents($url, false, stream_context_create(['http' => ['timeout' => 6, 'header' => "User-Agent: dieschatullen.de\r\n"]]));
  return $antwort === false ? null : json_decode($antwort, true);
}
function erster(...$werte) { foreach ($werte as $w) { if (is_numeric($w)) return (float) $w; } return 0.0; }

[$lat, $lon] = $orte[$ort];
$q = "lat=$lat&lon=$lon&tz=Europe/Berlin";
$von = gmdate('Y-m-d\TH:00:00\Z');
$bis = gmdate('Y-m-d\TH:00:00\Z', time() + 13 * 3600);
$jetzt = holen("https://api.brightsky.dev/current_weather?$q");
$vorhersage = holen("https://api.brightsky.dev/weather?$q&date=$von&last_date=$bis");

if (!$jetzt || !$vorhersage) {
  if (is_file($cacheDatei)) { readfile($cacheDatei); exit; } // lieber alte Daten als keine
  http_response_code(502); echo '{"error":"Wetterdienst nicht erreichbar"}'; exit;
}

$w = $jetzt['weather'];
$daten = [
  'current' => [
    'time' => $w['timestamp'],
    'wind_speed_10m' => erster($w['wind_speed_10'] ?? null, $w['wind_speed_30'] ?? null, $w['wind_speed_60'] ?? null),
    'wind_gusts_10m' => erster($w['wind_gust_speed_10'] ?? null, $w['wind_gust_speed_30'] ?? null, $w['wind_gust_speed_60'] ?? null),
    'wind_direction_10m' => erster($w['wind_direction_10'] ?? null, $w['wind_direction_30'] ?? null, $w['wind_direction_60'] ?? null),
  ],
  'hourly' => [
    'time' => array_column($vorhersage['weather'], 'timestamp'),
    'wind_speed_10m' => array_map(fn($x) => (float) ($x['wind_speed'] ?? 0), $vorhersage['weather']),
    'wind_gusts_10m' => array_map(fn($x) => (float) ($x['wind_gust_speed'] ?? 0), $vorhersage['weather']),
  ],
];
$json = json_encode($daten);
file_put_contents($cacheDatei, $json, LOCK_EX);
echo $json;
