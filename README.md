# dieschatullen.de

Website der **Hooksieler Schatulle & Drachennest** und der **Schilligen Schatulle** (Wangerland).
Statische Seite mit [Astro](https://astro.build) + Tailwind CSS, ohne Cookies, ohne Tracking.

## Lokal starten

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # fertige Seite in dist/
```

## Inhalte pflegen

**Am einfachsten:** [app.pagescms.org](https://app.pagescms.org) → mit GitHub anmelden → Repo wählen → Formulare ausfüllen → Speichern. Die Konfiguration steht in `.pages.yml`.

Alles Wichtige steht in `src/data/`, dafür muss man kein Code anfassen:

| Datei | Inhalt |
|---|---|
| `site.json` | E-Mail, YouTube, **Winterpause** (`"winterpause": true`), **Hinweis-Banner** (`"hinweis": "…"`), Schließtage (`"ausnahmen": [{ "datum": "2026-12-24" }]`) |
| `laeden.json` | Adresse, Telefon, **Öffnungszeiten** je Laden, Texte, „Gut zu wissen“ |
| `sortiment.json` | Sortiment-Kategorien mit Bild und Text |
| `faq.json` | Fragen & Antworten |
| `jobs.json` | Stellen (`"aktiv": false` blendet den Jobs-Hinweis auf der Startseite aus) |
| `news.json` | Aktuelles, z. B. `[{ "titel": "…", "datum": "2027-03-01", "text": "…" }]`; leer = Bereich ausgeblendet |
| `bewertungen.json` | Google-Sterne, Anzahl, häufig erwähnte Themen, Kundenzitate |
| `videos.json` | YouTube-Videos (nur ID eintragen, Vorschaubild lädt der Build automatisch) |
| `uebersetzungen.json` | Texte der englischen und niederländischen Seite (`/en/`, `/nl/`) |

Bilder liegen in `src/assets/img/` und werden über den Dateinamen ohne Endung angesprochen (z. B. `"bild": "tee"`).

## Veröffentlichen

Workflow `.github/workflows/deploy.yml`, beides auf Nickys Hetzner-Webhosting:

| Zweig | Ziel | Hinweis |
|---|---|---|
| `dev` | Staging https://neu.dieschatullen.de | `noindex`, zum Prüfen und Zeigen |
| `main` | Live https://dieschatullen.de | nur nach Freigabe (dev → main) |

Läuft bei jedem Push, täglich um 05:15 Uhr (Winterpause, News-Ablauf) und von Hand. Jedes Ziel baut immer seinen eigenen Zweig.
Benötigte Secrets: `HETZNER_HOST`, `HETZNER_USER`, `HETZNER_PASSWORD`, `HETZNER_KNOWN_HOSTS` (Server-Schlüssel, `ssh-keyscan -t ed25519 <host>`), `HETZNER_PATH_STAGING`, `HETZNER_PATH_LIVE` (eigene Ordner, nie der WordPress-Ordner). Fehlt etwas, wird übersprungen.

`npm run build` erzeugt immer die Live-Variante: Das Drachenwetter holt die Daten über `public/api/wind.php` (PHP mit cURL), passend zur CSP in `.htaccess`. Nur `npm run dev` (oder `PUBLIC_WIND_DIREKT=1`) fragt Bright Sky direkt aus dem Browser.

## Rechte

Alle Rechte vorbehalten. Texte, Fotos und Logo © Die Schatullen (Nicole Schwarting), Code © timschonfeld (GitHub).
Fremdinhalte: Schriften unter SIL Open Font License, Kartenausschnitte © OpenStreetMap-Mitwirkende (ODbL), Wetterdaten © Deutscher Wetterdienst (über Bright Sky), Marken-Logos mit Erlaubnis der Hersteller.
