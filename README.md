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

Alles Wichtige steht in `src/data/`, dafür muss man kein Code anfassen:

| Datei | Inhalt |
|---|---|
| `site.json` | E-Mail, YouTube, **Winterpause** (`"winterpause": true`), **Hinweis-Banner** (`"hinweis": "…"`), Schließtage (`"ausnahmen": [{ "datum": "2026-12-24" }]`) |
| `laeden.json` | Adresse, Telefon, **Öffnungszeiten** je Laden, Texte, „Gut zu wissen“ |
| `sortiment.json` | Sortiment-Kategorien mit Bild und Text |
| `faq.json` | Fragen & Antworten |
| `jobs.json` | Stellen (`"aktiv": false` blendet den Jobs-Hinweis auf der Startseite aus) |
| `news.json` | Aktuelles, z. B. `[{ "titel": "…", "datum": "2027-03-01", "text": "…" }]`; leer = Bereich ausgeblendet |
| `bewertungen.json` | Google-Sterne, Anzahl, Kundenzitate |

Bilder liegen in `src/assets/img/` und werden über den Dateinamen ohne Endung angesprochen (z. B. `"bild": "tee"`).

## Veröffentlichen

- **Vorschau:** Push auf den Branch `dev` → GitHub Action baut nach GitHub Pages (`https://<user>.github.io/dieschatullen/`, nicht in Google).
- **Live (Hetzner):** `dist/` ins Webhosting laden; `.htaccess` enthält Weiterleitungen und Caching.
