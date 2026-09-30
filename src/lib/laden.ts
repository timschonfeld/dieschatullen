import laeden from '../data/laeden.json';
import site from '../data/site.json';

export type Laden = (typeof laeden)[number];

export const routenLink = (l: Laden) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${l.name}, ${l.strasse}, ${l.plz} ${l.ort}`)}`;

export const telLink = (tel: string) => `tel:+49${tel.replace(/\s/g, '').replace(/^0/, '')}`;

const wochentage = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** schema.org Store je Laden */
export function ladenSchema(l: Laden) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: l.name,
    image: 'https://dieschatullen.de/og.jpg',
    url: 'https://dieschatullen.de/',
    telephone: telLink(l.telefon).replace('tel:', ''),
    email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: l.strasse, postalCode: l.plz, addressLocality: l.ort, addressRegion: 'Niedersachsen', addressCountry: 'DE' },
    geo: { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lon },
    sameAs: [l.instagram, l.facebook],
    openingHoursSpecification: site.saison.winterpause
      ? []
      : l.oeffnungszeiten.map((o) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: o.tage.map((t) => wochentage[t]),
          opens: o.von,
          closes: o.bis,
        })),
  };
}

export { laeden, site };
