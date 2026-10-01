import type { ImageMetadata } from 'astro';

const dateien = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,png}', { eager: true });

const finden = (name: string) => Object.entries(dateien).find(([pfad]) => pfad.split('/').pop()?.replace(/\.\w+$/, '') === name)?.[1].default;

/** Bild aus src/assets/img über den Dateinamen ohne Endung holen, z. B. bild('tee'). */
export function bild(name: string): ImageMetadata {
  const treffer = finden(name);
  if (!treffer) throw new Error(`Bild "${name}" nicht in src/assets/img gefunden`);
  return treffer;
}

/** Wie bild(), aber mit Ersatzbild, falls die Datei fehlt (z. B. Video-Vorschaubild nicht geladen). */
export const bildOder = (name: string, ersatz: string) => finden(name) ?? bild(ersatz);
