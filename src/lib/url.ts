/** Interne Links mit Basis-Pfad versehen (nur nötig, falls die Seite einmal in einem Unterordner läuft). */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (pfad: string) => (pfad.startsWith('/') ? `${base}${pfad}` : pfad);
