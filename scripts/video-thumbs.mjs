// Lädt vor dem Build fehlende YouTube-Vorschaubilder für src/data/videos.json nach src/assets/img/video-<id>.jpg.
// So muss beim Pflegen nur die Video-ID eingetragen werden, und die Seite lädt keine Bilder von YouTube.
import { readFile, writeFile, access } from 'node:fs/promises';

const videos = JSON.parse(await readFile(new URL('../src/data/videos.json', import.meta.url), 'utf8'));
for (const { id } of videos) {
  const ziel = new URL(`../src/assets/img/video-${id}.jpg`, import.meta.url);
  try { await access(ziel); continue; } catch {}
  for (const variante of ['maxresdefault', 'hqdefault']) {
    const res = await fetch(`https://i.ytimg.com/vi/${id}/${variante}.jpg`);
    if (res.ok) { await writeFile(ziel, Buffer.from(await res.arrayBuffer())); console.log(`Vorschaubild geladen: ${id} (${variante})`); break; }
  }
}
