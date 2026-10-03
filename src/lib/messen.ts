/**
 * Klick-Messung für Google Analytics. GA wird ausschließlich vom Einwilligungs-Banner (CCM19) geladen –
 * ohne Zustimmung existiert window.gtag nicht und es wird nichts gemessen.
 */
type Gtag = (befehl: 'event', name: string, daten?: Record<string, string | number>) => void;

export function messen(name: string, daten: Record<string, string | number> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === 'function') gtag('event', name, daten);
}

/** Alle Elemente mit data-messen="ereignis" (+ optional data-messen-wert) melden ihren Klick. */
export function klicksMessen(wurzel: ParentNode = document) {
  wurzel.querySelectorAll<HTMLElement>('[data-messen]').forEach((el) => {
    if (el.dataset.messenAktiv) return;
    el.dataset.messenAktiv = '1';
    el.addEventListener('click', () => messen(el.dataset.messen!, el.dataset.messenWert ? { ziel: el.dataset.messenWert } : {}));
  });
}
