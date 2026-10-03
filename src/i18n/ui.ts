import { istFortlaufend } from '../lib/zeit';

/** Feste Oberflächen-Texte in drei Sprachen. Inhalte (Texte der EN/NL-Seite) stehen in src/data/uebersetzungen.json. */
export type Lang = 'de' | 'en' | 'nl';
export const sprachen: { code: Lang; name: string; pfad: string }[] = [
  { code: 'de', name: 'Deutsch', pfad: '/' },
  { code: 'en', name: 'English', pfad: '/en/' },
  { code: 'nl', name: 'Nederlands', pfad: '/nl/' },
];

const tage = {
  de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  nl: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
};

export const ui = {
  de: {
    tage: tage.de, bis: 'bis', und: 'und',
    offen: 'Jetzt geöffnet bis {bis} Uhr', zuHeute: 'Heute geöffnet von {von} bis {bis} Uhr',
    zuMorgen: 'Morgen wieder geöffnet von {von} bis {bis} Uhr', zuTag: 'Am {tag} wieder geöffnet von {von} bis {bis} Uhr', winterpause: 'Winterpause',
    route: 'Route planen', anrufen: 'Anrufen', oeffnungszeiten: 'Öffnungszeiten', adresse: 'Adresse', seit: 'seit',
    impressum: 'Impressum', datenschutz: 'Datenschutz', cookies: 'Cookie-Einstellungen', sprache: 'Sprache',
    wind: {
      titel: 'Drachenwetter',
      jetzt: 'Jetzt',
      aus: 'aus',
      boeen: 'Böen bis',
      kmh: 'km/h',
      heute: 'Heute',
      morgen: 'Morgen',
      vorbei: 'vorbei',
      tageszeiten: ["Morgens", "Mittags", "Nachmittags", "Abends"],
      laedt: 'Winddaten werden geladen …',
      fehler: 'Winddaten sind gerade nicht verfügbar. Schaut kurz auf den Himmel oder fragt uns im Laden.',
      zuWenig: 'Zu wenig Wind',
      zuWenigText: 'Unter 6 km/h heben die meisten Drachen noch nicht ab.',
      gut: 'Gutes Drachenwetter',
      gutText: 'Perfekt zum Drachensteigen. Viel Spaß auf der Drachenwiese!',
      zuViel: 'Zu viel Wind',
      zuVielText: 'Bitte heute keine Drachen steigen lassen. Für über 28 km/h sind unsere Drachen und Leinen nicht ausgelegt.',
      boeWarnung: 'Achtung: Böen bis {kmh} km/h. Haltet die Leinen gut fest und packt den Drachen im Zweifel ein.',
      regelTitel: 'Die wichtigste Regel',
      regel: 'Drachen steigen lassen nur bis 28 km/h Wind (Windstärke 4). Für mehr Wind sind unsere Drachen und Leinen nicht ausgelegt.',
      zone: ["zu wenig", "gut bis 28 km/h", "zu viel"],
      ort: 'Ort wählen',
      quelle: 'Wetterdaten',
      messung: 'Jetzt: Messung der DWD-Station Wangerland-Hooksiel · Tageszeiten: DWD-Vorhersage (Mittelwert)',
      richtungen: ["Nord", "Nordost", "Ost", "Südost", "Süd", "Südwest", "West", "Nordwest"],
      beaufort: ["Windstille", "leiser Zug", "leichte Brise", "schwache Brise", "mäßige Brise", "frische Brise", "starker Wind", "steifer Wind", "stürmischer Wind", "Sturm", "schwerer Sturm", "orkanartiger Sturm", "Orkan"],
      pause: 'Animation anhalten',
      abspielen: 'Animation fortsetzen',
    },
  },
  en: {
    tage: tage.en, bis: 'to', und: '&',
    offen: 'Open now until {bis}', zuHeute: 'Open today from {von} to {bis}',
    zuMorgen: 'Open again tomorrow from {von} to {bis}', zuTag: 'Open again on {tag} from {von} to {bis}', winterpause: 'Winter break',
    route: 'Directions', anrufen: 'Call', oeffnungszeiten: 'Opening hours', adresse: 'Address', seit: 'since',
    impressum: 'Legal notice (German)', datenschutz: 'Privacy (German)', cookies: 'Cookie settings', sprache: 'Language',
    wind: {
      titel: 'Kite weather',
      jetzt: 'Now',
      aus: 'from the',
      boeen: 'gusts up to',
      kmh: 'km/h',
      heute: 'Today',
      morgen: 'Tomorrow',
      vorbei: 'past',
      tageszeiten: ["Morning", "Midday", "Afternoon", "Evening"],
      laedt: 'Loading wind data …',
      fehler: 'Wind data is not available right now. Have a look at the sky or ask us in the shop.',
      zuWenig: 'Not enough wind',
      zuWenigText: 'Below 6 km/h most kites won’t take off yet.',
      gut: 'Good kite weather',
      gutText: 'Perfect for flying kites. Have fun on the kite meadow!',
      zuViel: 'Too much wind',
      zuVielText: 'Please don’t fly kites today. Our kites and lines are not made for more than 28 km/h.',
      boeWarnung: 'Careful: gusts up to {kmh} km/h. Hold on to your lines and pack up the kite if in doubt.',
      regelTitel: 'The most important rule',
      regel: 'Only fly kites in wind up to 28 km/h (force 4). Our kites and lines are not made for stronger wind.',
      zone: ["too little", "good up to 28 km/h", "too much"],
      ort: 'Choose location',
      quelle: 'Weather data',
      messung: 'Now: measured at the DWD station Wangerland-Hooksiel · Times of day: DWD forecast (average)',
      richtungen: ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"],
      beaufort: ["calm", "light air", "light breeze", "gentle breeze", "moderate breeze", "fresh breeze", "strong breeze", "near gale", "gale", "strong gale", "storm", "violent storm", "hurricane"],
      pause: 'Pause animation',
      abspielen: 'Play animation',
    },
  },
  nl: {
    tage: tage.nl, bis: 't/m', und: 'en',
    offen: 'Nu geopend tot {bis} uur', zuHeute: 'Vandaag geopend van {von} tot {bis} uur',
    zuMorgen: 'Morgen weer geopend van {von} tot {bis} uur', zuTag: 'Op {tag} weer geopend van {von} tot {bis} uur', winterpause: 'Winterstop',
    route: 'Route plannen', anrufen: 'Bellen', oeffnungszeiten: 'Openingstijden', adresse: 'Adres', seit: 'sinds',
    impressum: 'Colofon (Duits)', datenschutz: 'Privacy (Duits)', cookies: 'Cookie-instellingen', sprache: 'Taal',
    wind: {
      titel: 'Vliegerweer',
      jetzt: 'Nu',
      aus: 'uit het',
      boeen: 'windstoten tot',
      kmh: 'km/u',
      heute: 'Vandaag',
      morgen: 'Morgen',
      vorbei: 'voorbij',
      tageszeiten: ["Ochtend", "Middag", "Namiddag", "Avond"],
      laedt: 'Windgegevens worden geladen …',
      fehler: 'Windgegevens zijn op dit moment niet beschikbaar. Kijk even naar de lucht of vraag het ons in de winkel.',
      zuWenig: 'Te weinig wind',
      zuWenigText: 'Onder 6 km/u gaan de meeste vliegers nog niet de lucht in.',
      gut: 'Goed vliegerweer',
      gutText: 'Perfect om te vliegeren. Veel plezier op de vliegerweide!',
      zuViel: 'Te veel wind',
      zuVielText: 'Laat vandaag alsjeblieft geen vliegers op. Onze vliegers en lijnen zijn niet gemaakt voor meer dan 28 km/u.',
      boeWarnung: 'Let op: windstoten tot {kmh} km/u. Houd de lijnen goed vast en pak de vlieger bij twijfel in.',
      regelTitel: 'De belangrijkste regel',
      regel: 'Vliegers alleen oplaten bij wind tot 28 km/u (windkracht 4). Onze vliegers en lijnen zijn niet gemaakt voor meer wind.',
      zone: ["te weinig", "goed tot 28 km/u", "te veel"],
      ort: 'Kies locatie',
      quelle: 'Weergegevens',
      messung: 'Nu: gemeten door DWD-station Wangerland-Hooksiel · Dagdelen: DWD-verwachting (gemiddelde)',
      richtungen: ["noorden", "noordoosten", "oosten", "zuidoosten", "zuiden", "zuidwesten", "westen", "noordwesten"],
      beaufort: ["windstil", "zwakke wind", "zwakke wind", "matige wind", "matige wind", "vrij krachtige wind", "krachtige wind", "harde wind", "stormachtige wind", "storm", "zware storm", "zeer zware storm", "orkaan"],
      pause: 'Animatie pauzeren',
      abspielen: 'Animatie afspelen',
    },
  },
} as const;

/** "Montag bis Freitag" / "Saturday & Sunday" aus den Wochentag-Nummern (0 = Sonntag) */
export function tageLabel(tageNr: number[], lang: Lang): string {
  const t = ui[lang];
  const name = (n: number) => t.tage[n];
  if (tageNr.length === 1) return name(tageNr[0]);
    const erster = name(tageNr[0]);
  const letzter = name(tageNr[tageNr.length - 1]);
  const text = istFortlaufend(tageNr) ? `${erster} ${t.bis} ${letzter}` : tageNr.map(name).join(` ${t.und} `);
  return lang === 'nl' ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}
