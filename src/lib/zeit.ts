/** Kleine, gemeinsame Helfer für Datum und Öffnungszeiten (Server-Build und Browser). */

/** Heutiges Datum in deutscher Zeit als YYYY-MM-DD (nicht UTC, sonst ist es nachts der Vortag). */
export const heuteBerlin = (jetzt = new Date()) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(jetzt);

/** „10:00“ → „10“, „17:30“ → „17:30“; Englisch behält „10:00“. */
export const uhrzeit = (hm: string, lang: string = 'de') => (lang === 'en' ? hm : hm.replace(/^0/, '').replace(':00', ''));

/** Sind die Wochentage (0 = Sonntag) eine fortlaufende Reihe mit mehr als zwei Tagen, z. B. Mo–Fr? */
export const istFortlaufend = (tage: number[]) => tage.length > 2 && tage.every((n, i) => i === 0 || n === (tage[i - 1] + 1) % 7);

const KURZ = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

/** „Mo–Fr 10–18 · Sa & So 10–17 Uhr“ */
export const zeitenKurz = (zeiten: { tage: number[]; von: string; bis: string }[]) =>
  zeiten
    .map(({ tage, von, bis }) => {
      const t = istFortlaufend(tage) ? `${KURZ[tage[0]]}–${KURZ[tage[tage.length - 1]]}` : tage.map((n) => KURZ[n]).join(' & ');
      return `${t} ${uhrzeit(von)}–${uhrzeit(bis)}`;
    })
    .join(' · ') + ' Uhr';
