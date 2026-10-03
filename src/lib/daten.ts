/**
 * Alle Inhalte aus src/data/*.json, typisiert und mit Standardwerten.
 * Pages CMS lässt leere Felder (z. B. "" oder []) beim Speichern weg – deshalb greift der Code
 * nie direkt auf die JSON-Dateien zu, sondern immer über dieses Modul.
 */
import siteRoh from '../data/site.json';
import laedenRoh from '../data/laeden.json';
import newsRoh from '../data/news.json';
import jobsRoh from '../data/jobs.json';
import bewertungenRoh from '../data/bewertungen.json';
import sortimentRoh from '../data/sortiment.json';
import videosRoh from '../data/videos.json';
import faqRoh from '../data/faq.json';
import sliderRoh from '../data/slider.json';

export interface Oeffnungszeit { label: string; tage: number[]; von: string; bis: string }
export interface Laden {
  id: string; name: string; kurz: string; strasse: string; plz: string; ort: string; telefon: string;
  lat: number; lon: number; seit: number; text: string; besonderheiten: string[]; gutZuWissen: string[];
  instagram: string; facebook: string; rundgang: string; googleCid: string; oeffnungszeiten: Oeffnungszeit[];
}
export interface News { titel: string; datum: string; ende?: string; text: string; link?: string }
export interface Video { id: string; titel: string; thema: string; text: string }

type Roh<T> = Partial<T> & Record<string, unknown>;
const liste = <T>(x: unknown): T[] => (Array.isArray(x) ? (x as T[]) : []);
const text = (x: unknown) => (typeof x === 'string' ? x : '');

/** Externe Links ohne Protokoll (z. B. „www.wangerland.de“) bekommen https:// */
export const externerLink = (link?: string) =>
  !link ? undefined : /^(https?:|mailto:|tel:|\/|#)/.test(link) ? link : `https://${link}`;

const s = siteRoh as Roh<{ saison: Record<string, unknown>; ausnahmen: unknown[]; consent: Record<string, unknown> }> & Record<string, unknown>;
export const site = {
  name: text(s.name) || 'Die Schatullen',
  claim: text(s.claim),
  beschreibung: text(s.beschreibung),
  email: text(s.email) || 'info@dieschatullen.de',
  youtube: text(s.youtube),
};
export const saison = {
  winterpause: s.saison?.winterpause === true,
  winterpauseVon: text(s.saison?.winterpauseVon),
  winterpauseBis: text(s.saison?.winterpauseBis),
  hinweis: text(s.saison?.hinweis),
};
export const ausnahmen = liste<{ datum: string }>(s.ausnahmen).filter((a) => typeof a?.datum === 'string');

/** Einwilligungs-Banner CCM19 (selbst gehostet). Leer = kein Banner (lokal, GitHub-Pages-Vorschau). */
const skriptUrl = text(s.consent?.skriptUrl);
export const consent = { skriptUrl: /^https:\/\/[\w.-]+\//.test(skriptUrl) ? skriptUrl : '' };

export const laeden: Laden[] = liste<Roh<Laden>>(laedenRoh).map((l) => ({
  ...(l as Laden),
  besonderheiten: liste<string>(l.besonderheiten),
  gutZuWissen: liste<string>(l.gutZuWissen),
  oeffnungszeiten: liste<Oeffnungszeit>(l.oeffnungszeiten).map((o) => ({ ...o, label: text(o.label), tage: liste<number>(o.tage) })),
}));

export const news: News[] = liste<Roh<News>>(newsRoh)
  .filter((n) => n.titel && n.datum)
  .map((n) => ({ titel: text(n.titel), datum: text(n.datum), ende: text(n.ende) || undefined, text: text(n.text), link: externerLink(text(n.link)) }));

const j = jobsRoh as Roh<{ aktiv: boolean; titel: string; text: string; gesucht: string[]; email: string }>;
export const jobs = { aktiv: j.aktiv === true, titel: text(j.titel), text: text(j.text), gesucht: liste<string>(j.gesucht), email: text(j.email) || site.email };

const b = bewertungenRoh as Roh<{ stand: string; google: unknown[]; zitate: unknown[] }>;
export const bewertungen = {
  stand: text(b.stand),
  google: liste<{ laden: string; sterne: number; anzahl: number; themen?: string[] }>(b.google).map((g) => ({ ...g, themen: liste<string>(g.themen) })),
  zitate: liste<{ text: string; name: string }>(b.zitate),
};

export const sortiment = liste<{ titel: string; bild: string; text: string; hinweis?: string; link?: string }>(sortimentRoh);
export const videos = liste<Video>(videosRoh);
export const faq = liste<{ frage: string; antwort: string }>(faqRoh);

export interface Slide { bild: string; alt: string; titel: string; titel_en: string; titel_nl: string }
export const slider: Slide[] = liste<Roh<Slide>>(sliderRoh)
  .filter((x) => x.bild)
  .map((x) => ({ bild: text(x.bild), alt: text(x.alt), titel: text(x.titel), titel_en: text(x.titel_en) || text(x.titel), titel_nl: text(x.titel_nl) || text(x.titel) }));
