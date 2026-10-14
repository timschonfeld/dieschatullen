#!/usr/bin/env bash
# Prüft nach dem Umschalten bei Hetzner alle Domains, Zertifikate, Weiterleitungen und Kernfunktionen.
# Aufruf: bash scripts/domain-check.sh            (Live)
#         bash scripts/domain-check.sh neu        (nur Staging neu.dieschatullen.de)
set -u
ZIEL="https://dieschatullen.de"
HOSTS=(dieschatullen.de www.dieschatullen.de die-schatullen.de www.die-schatullen.de hooksieler-schatulle.de www.hooksieler-schatulle.de)
[ "${1:-}" = "neu" ] && { ZIEL="https://neu.dieschatullen.de"; HOSTS=(neu.dieschatullen.de); }
fehler=0
ok()   { printf '  \033[32mOK\033[0m    %s\n' "$1"; }
nein() { printf '  \033[31mFEHLER\033[0m %s\n' "$1"; fehler=$((fehler + 1)); }

echo "1. DNS (IPv4 und IPv6)"
for h in "${HOSTS[@]}"; do
  a=$(dig +short A "$h" | tail -1); aaaa=$(dig +short AAAA "$h" | tail -1)
  [ -n "$a" ] && [ -n "$aaaa" ] && ok "$h  $a  $aaaa" || nein "$h  A='$a' AAAA='$aaaa'"
done

echo "2. Zertifikate (gültig für jeden Namen, Restlaufzeit)"
for h in "${HOSTS[@]}"; do
  if curl -sS -o /dev/null -m 15 "https://$h/" 2>/dev/null; then
    ende=$(echo | openssl s_client -servername "$h" -connect "$h:443" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
    ok "$h  gültig bis $ende"
  else
    nein "$h  kein gültiges Zertifikat (in konsoleH Let's Encrypt für diesen Namen aktivieren)"
  fi
done

echo "3. Weiterleitungen: jede Variante landet in einem Schritt auf $ZIEL/"
for h in "${HOSTS[@]}"; do
  for p in http https; do
    url="$p://$h/faqs/"
    erg=$(curl -s -o /dev/null -m 15 -w '%{http_code} %{redirect_url}' "$url")
    if [ "$url" = "$ZIEL/faqs/" ]; then
      [ "${erg%% *}" = 200 ] && ok "$url  200" || nein "$url  $erg"
    else
      [ "$erg" = "301 $ZIEL/faqs/" ] && ok "$url  → 301" || nein "$url  $erg"
    fi
  done
done

echo "4. Seiten, alte Adressen, Funktionen"
pruef() { erg=$(curl -s -o /dev/null -m 15 -w '%{http_code} %{redirect_url}' "$ZIEL$1"); [[ "$erg" == $2* ]] && ok "$1  $erg" || nein "$1  erwartet $2, ist $erg"; }
for s in / /sortiment/ /drachen-und-drachenreparatur/ /videos/ /ueber-uns/ /jobs/ /faqs/ /kontakt/ /impressum/ /datenschutz/ /en/ /nl/ /sitemap-index.xml /robots.txt; do pruef "$s" 200; done
pruef /home/ "301 $ZIEL/"
pruef /faq/ "301 $ZIEL/faqs/"
pruef /drachen/ "301 $ZIEL/drachen-und-drachenreparatur/"
pruef /wp-admin/ 410
pruef /xmlrpc.php 410
pruef /gibt-es-nicht/ 404
wind=$(curl -s -m 20 "$ZIEL/api/wind.php?ort=schillig")
[[ "$wind" == \{* ]] && ok "Drachenwetter liefert Daten" || nein "Drachenwetter: ${wind:0:80}"
cache=$(curl -s -o /dev/null -w '%{http_code}' "$ZIEL/api/.cache/")
[ "$cache" = 403 ] || [ "$cache" = 404 ] && ok "Wetter-Zwischenspeicher gesperrt ($cache)" || nein "/api/.cache/ ist erreichbar ($cache)"

echo "5. Sicherheits-Header"
kopf=$(curl -sI -m 15 "$ZIEL/")
for hd in strict-transport-security content-security-policy x-frame-options x-content-type-options referrer-policy permissions-policy; do
  grep -qi "^$hd:" <<<"$kopf" && ok "$hd" || nein "$hd fehlt"
done
if [ "$ZIEL" = "https://neu.dieschatullen.de" ]; then
  curl -s "$ZIEL/" | grep -q 'noindex' && ok "Staging ist noindex" || nein "Staging ohne noindex"
else
  curl -s "$ZIEL/" | grep -q 'noindex' && nein "Live-Seite ist noindex!" || ok "Live-Seite ist indexierbar"
fi

echo "6. E-Mail (darf sich nicht ändern)"
for d in dieschatullen.de die-schatullen.de hooksieler-schatulle.de; do
  mx=$(dig +short MX "$d"); [ -n "$mx" ] && ok "$d  MX $mx" || nein "$d  kein MX"
done

echo
[ $fehler -eq 0 ] && echo "Alles in Ordnung." || echo "$fehler Fehler gefunden."
exit $fehler
