import type { ImageMetadata } from 'astro';

const dateien = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,png}', { eager: true });

/** Bild aus src/assets/img über den Dateinamen ohne Endung holen, z. B. bild('tee'). */
export function bild(name: string): ImageMetadata {
  const treffer = Object.entries(dateien).find(([pfad]) => pfad.split('/').pop()?.replace(/\.\w+$/, '') === name);
  if (!treffer) throw new Error(`Bild "${name}" nicht in src/assets/img gefunden`);
  return treffer[1].default;
}
