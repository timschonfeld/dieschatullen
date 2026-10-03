import type { ImageMetadata } from 'astro';
import bilderRoh from '../data/bilder.json';

const dateien = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });

/** „src/assets/img/tee.jpg“ (so speichert Pages CMS) und „tee“ meinen dasselbe Bild */
const kern = (name: string) => name.split('/').pop()!.replace(/\.\w+$/, '');
const finden = (name: string) => Object.entries(dateien).find(([pfad]) => kern(pfad) === kern(name))?.[1].default;

/** Bild aus src/assets/img holen, z. B. bild('tee') oder bild('src/assets/img/tee.jpg'). */
export function bild(name: string): ImageMetadata {
  const treffer = finden(name);
  if (!treffer) throw new Error(`Bild "${name}" nicht in src/assets/img gefunden`);
  return treffer;
}

/** Wie bild(), aber mit Ersatzbild, falls die Datei fehlt (z. B. Video-Vorschaubild nicht geladen). */
export const bildOder = (name: string, ersatz: string) => finden(name) ?? bild(ersatz);

const ERSATZ = 'laden-hooksiel';
type Seiten = typeof bilderRoh;
type Eintrag = { bild?: string; alt?: string };

/**
 * Bild für einen festen Platz auf einer Seite, gepflegt in Pages CMS unter „Bilder auf den Seiten“
 * (src/data/bilder.json). Fehlt das Feld (Pages CMS lässt leere Felder weg), kommt ein Ersatzbild.
 */
export function seitenbild<S extends keyof Seiten>(seite: S, platz: Exclude<keyof Seiten[S], 'fotostreifen'>) {
  const e = ((bilderRoh as Record<string, Record<string, Eintrag>>)[seite]?.[platz as string] ?? {}) as Eintrag;
  return { src: e.bild ? bild(e.bild) : bild(ERSATZ), alt: e.alt ?? '' };
}

/** Bilder des laufenden Fotostreifens auf der Startseite */
export const fotostreifen = (): ImageMetadata[] => {
  const liste = (bilderRoh.startseite as { fotostreifen?: unknown }).fotostreifen;
  return (Array.isArray(liste) ? liste : []).filter((x): x is string => typeof x === 'string').map(bild);
};
