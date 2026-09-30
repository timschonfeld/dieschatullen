/** Interne Links mit Basis-Pfad versehen (nötig für die Vorschau unter <user>.github.io/<repo>/). */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (pfad: string) => (pfad.startsWith('/') ? `${base}${pfad}` : pfad);
