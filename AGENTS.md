# Regeln für KI-Assistenten (ChatGPT/Codex, Claude und andere)

Website der Hooksieler Schatulle & Drachennest und der Schilligen Schatulle (Inhaberin Nicole „Nicky“ Schwarting, Wangerland).
Statische Seite mit Astro + Tailwind, Inhalte in `src/data/*.json`, gepflegt über Pages CMS. Technische Betreuung: Tim.

## 1. Immer zuerst fragen

Bevor du irgendeine Datei änderst:

1. Beschreibe in einfachem Deutsch, **was** du ändern willst, **welche Dateien** betroffen sind und **wie es danach aussieht**.
2. Nenne Risiken oder Nebenwirkungen (z. B. „betrifft alle Seiten“, „ändert den Datenschutz“).
3. **Frage ausdrücklich, ob es so umgesetzt werden soll, und warte auf ein klares Ja.**
   Ohne Ja nichts ändern, auch nicht „nur kurz“. Wenn die Aufgabe unklar ist, stelle Rückfragen statt zu raten.
4. Läufst du ohne Rückfragemöglichkeit (z. B. als Hintergrund-Aufgabe): ändere nichts, sondern liefere nur den Plan als Antwort.

## 2. Wohin Änderungen gehen

- Arbeite **nur auf dem Zweig `dev`** (oder einem Zweig davon) und schlage Änderungen als **Pull Request nach `dev`** vor.
- **Nie** direkt auf `main` schreiben, nie `main` mergen, nie force-push. `main` ist die Live-Seite; Tim gibt frei.
- `dev` erscheint automatisch auf der Testseite https://neu.dieschatullen.de. Sag am Ende, was man dort prüfen soll.

## 3. Nur mit Tim (vorher auf diese Regel hinweisen)

Diese Dateien betreffen Sicherheit, Recht oder Veröffentlichung. Änderungen nur vorschlagen, mit dem Hinweis „bitte mit Tim abstimmen“:

- `public/.htaccess` (Weiterleitungen, Sicherheitsregeln/CSP), `.github/` (Veröffentlichung), `public/api/` (Server-Skripte)
- `src/pages/datenschutz.astro`, `src/pages/impressum.astro`
- `package.json`, `package-lock.json`, `astro.config.mjs`, `.pages.yml`
- alles, was einen **neuen externen Dienst** einbindet (Skripte, Schriften, Karten, Videos, Widgets, Tracking). Jeder externe Dienst braucht vorher Datenschutzerklärung, Cookie-Banner und CSP.

## 4. Inhalte

- **Nichts erfinden.** Keine ausgedachten Texte, Zahlen, Bewertungen, Angebote, Termine oder Personen. Fehlt eine Information, frag nach.
- Firmen, Veranstaltungen und Regeln nur aus aktuellen, erreichbaren Quellen nennen.
- Ton: norddeutsch-herzlich, „ihr/euch“, kurze Sätze, keine Emojis, keine Werbefloskeln.
- Team: Nicky und Nadja. Bewerbungen an `jobs@dieschatullen.de`, sonst `info@dieschatullen.de`.
- Drachen: nur in der Erholungszone bzw. auf den Drachenwiesen (Nationalpark Wattenmeer), nie „am Strand“ allgemein.
- Inhalte stehen in `src/data/*.json` und werden über `src/lib/daten.ts` gelesen, nie direkt importieren. Bilder liegen in `src/assets/img/`, ihre Plätze auf den Seiten stehen in `src/data/bilder.json`. Jedes Bild braucht eine Bildbeschreibung (`alt`).
- Englische und niederländische Seite (`/en/`, `/nl/`) bei inhaltlichen Änderungen mitdenken (`src/data/uebersetzungen.json`).

## 5. Gestaltung

- Farben und Schriften nur aus `src/styles/global.css` (Navy, Sand, Petrol; Bricolage Grotesque, Figtree).
- Buttons: 8 px Radius, solide Fläche oder klare Kontur. Keine Pillenform, keine Glas-Optik, keine Pfeile im Button-Text.
- Große, echte Fotos aus den Läden, keine Stockfotos.
- Öffnungszeiten und Kontakt auf der Startseite nur einmal. Bewertungen bleiben ganz unten.
- Barrierefreiheit (WCAG 2.2 AA): Kontrast ≥ 4,5 : 1, alles per Tastatur bedienbar, Bewegung pausierbar.

## 6. Prüfen, bevor du fertig meldest

```bash
npm install
npm run check   # 0 Fehler
npm run build   # muss durchlaufen
```

Melde Fehler ehrlich. Wenn ein Check fehlschlägt, nicht „fertig“ sagen.

## 7. Niemals

- Passwörter, Zugangsdaten oder Schlüssel in Dateien schreiben oder ausgeben.
- Dateien löschen, die du nicht selbst angelegt hast, ohne ausdrückliches Ja.
- Abhängigkeiten hinzufügen oder aktualisieren ohne Tim.
