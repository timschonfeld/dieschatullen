// Lädt vor dem Build fehlende YouTube-Vorschaubilder für src/data/videos.json nach src/assets/img/video-<id>.jpg.
// So muss beim Pflegen nur die Video-ID eingetragen werden, und die Seite lädt keine Bilder von YouTube.
// Fehler (ungültige ID, YouTube nicht erreichbar) brechen den Build nicht ab: die Videoseite nimmt dann ein Ersatzbild.
import { readFile, writeFile, access } from 'node:fs/promises';

const ID = /^[\w-]{11}$/;
const videos = JSON.parse(await readFile(new URL('../src/data/videos.json', import.meta.url), 'utf8'));

for (const { id } of videos) {
  if (!ID.test(id)) { console.warn(`Ungültige YouTube-ID übersprungen: ${JSON.stringify(id)}`); continue; }
  const ziel = new URL(`../src/assets/img/video-${id}.jpg`, import.meta.url);
  try { await access(ziel); continue; } catch {}
  try {
    for (const variante of ['maxresdefault', 'hqdefault']) {
      const res = await fetch(`https://i.ytimg.com/vi/${id}/${variante}.jpg`, { signal: AbortSignal.timeout(10_000) });
      if (res.ok) { await writeFile(ziel, Buffer.from(await res.arrayBuffer())); console.log(`Vorschaubild geladen: ${id} (${variante})`); break; }
    }
  } catch (fehler) {
    console.warn(`Vorschaubild für ${id} nicht geladen (${fehler.message}), Ersatzbild wird verwendet.`);
  }
}
