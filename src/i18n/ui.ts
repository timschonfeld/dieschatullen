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
    tage: tage.de, bis: 'bis', und: 'und', uhr: ' Uhr',
    offen: 'Jetzt geöffnet · bis {zeit}', zuHeute: 'Geschlossen · öffnet heute um {zeit}',
    zuMorgen: 'Geschlossen · öffnet morgen um {zeit}', zuTag: 'Geschlossen · öffnet {tag} um {zeit}', winterpause: 'Winterpause',
    route: 'Route planen', anrufen: 'Anrufen', oeffnungszeiten: 'Öffnungszeiten', adresse: 'Adresse', seit: 'seit',
    impressum: 'Impressum', datenschutz: 'Datenschutz', sprache: 'Sprache',
    wind: {
      titel: 'Drachenwetter', jetzt: 'Jetzt', aus: 'aus', boeen: 'Böen', kmh: 'km/h', naechste: 'Die nächsten 12 Stunden',
      laedt: 'Winddaten werden geladen …', fehler: 'Winddaten sind gerade nicht verfügbar. Schaut kurz auf den Himmel oder fragt uns im Laden.',
      zuWenig: 'Zu wenig Wind', zuWenigText: 'Für die meisten Drachen reicht das noch nicht. Leichtwind-Drachen fliegen vielleicht schon.',
      gut: 'Top Drachenwetter', gutText: 'Perfekt zum Drachensteigen. Viel Spaß am Strand!',
      zuViel: 'Zu viel Wind', zuVielText: 'Bitte heute keine Drachen steigen lassen. Drachen und Leinen sind für so viel Wind nicht ausgelegt.',
      boeWarnung: 'Achtung: Böen bis {bft} Bft. Haltet eure Leinen gut fest und packt den Drachen im Zweifel ein.',
      regelTitel: 'Die wichtigste Regel',
      regel: 'Drachen steigen lassen nur bis Windstärke 4 Bft. Für mehr Wind sind unsere Drachen und Leinen nicht ausgelegt.',
      zone: ['zu wenig', 'ideal', 'zu viel'], ort: 'Ort', quelle: 'Wetterdaten', messung: 'Aktueller Wert: Messung der DWD-Station Wangerland-Hooksiel, Vorhersage: DWD MOSMIX',
      richtungen: ['Nord', 'Nordost', 'Ost', 'Südost', 'Süd', 'Südwest', 'West', 'Nordwest'],
      beaufort: ['Windstille', 'leiser Zug', 'leichte Brise', 'schwache Brise', 'mäßige Brise', 'frische Brise', 'starker Wind', 'steifer Wind', 'stürmischer Wind', 'Sturm', 'schwerer Sturm', 'orkanartiger Sturm', 'Orkan'],
    },
  },
  en: {
    tage: tage.en, bis: 'to', und: '&', uhr: '',
    offen: 'Open now · until {zeit}', zuHeute: 'Closed · opens today at {zeit}',
    zuMorgen: 'Closed · opens tomorrow at {zeit}', zuTag: 'Closed · opens {tag} at {zeit}', winterpause: 'Winter break',
    route: 'Directions', anrufen: 'Call', oeffnungszeiten: 'Opening hours', adresse: 'Address', seit: 'since',
    impressum: 'Legal notice (German)', datenschutz: 'Privacy (German)', sprache: 'Language',
    wind: {
      titel: 'Kite weather', jetzt: 'Now', aus: 'from', boeen: 'gusts', kmh: 'km/h', naechste: 'Next 12 hours',
      laedt: 'Loading wind data …', fehler: 'Wind data is not available right now. Have a look at the sky or ask us in the shop.',
      zuWenig: 'Not enough wind', zuWenigText: 'Most kites won’t fly yet. Light-wind kites might.',
      gut: 'Perfect kite weather', gutText: 'Great conditions for flying kites. Enjoy the beach!',
      zuViel: 'Too much wind', zuVielText: 'Please don’t fly kites today. Our kites and lines are not made for this much wind.',
      boeWarnung: 'Careful: gusts up to {bft} Bft. Hold on to your lines and pack up the kite if in doubt.',
      regelTitel: 'The most important rule',
      regel: 'Only fly kites up to wind force 4 Bft. Our kites and lines are not made for stronger wind.',
      zone: ['too little', 'ideal', 'too much'], ort: 'Location', quelle: 'Weather data', messung: 'Current value measured at the DWD station Wangerland-Hooksiel, forecast: DWD MOSMIX',
      richtungen: ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'],
      beaufort: ['calm', 'light air', 'light breeze', 'gentle breeze', 'moderate breeze', 'fresh breeze', 'strong breeze', 'near gale', 'gale', 'strong gale', 'storm', 'violent storm', 'hurricane'],
    },
  },
  nl: {
    tage: tage.nl, bis: 't/m', und: 'en', uhr: ' uur',
    offen: 'Nu geopend · tot {zeit}', zuHeute: 'Gesloten · opent vandaag om {zeit}',
    zuMorgen: 'Gesloten · opent morgen om {zeit}', zuTag: 'Gesloten · opent {tag} om {zeit}', winterpause: 'Winterstop',
    route: 'Route plannen', anrufen: 'Bellen', oeffnungszeiten: 'Openingstijden', adresse: 'Adres', seit: 'sinds',
    impressum: 'Colofon (Duits)', datenschutz: 'Privacy (Duits)', sprache: 'Taal',
    wind: {
      titel: 'Vliegerweer', jetzt: 'Nu', aus: 'uit het', boeen: 'windstoten', kmh: 'km/u', naechste: 'De komende 12 uur',
      laedt: 'Windgegevens worden geladen …', fehler: 'Windgegevens zijn op dit moment niet beschikbaar. Kijk even naar de lucht of vraag het ons in de winkel.',
      zuWenig: 'Te weinig wind', zuWenigText: 'Voor de meeste vliegers is het nog te rustig. Lichtwindvliegers vliegen misschien al.',
      gut: 'Top vliegerweer', gutText: 'Perfect om te vliegeren. Veel plezier op het strand!',
      zuViel: 'Te veel wind', zuVielText: 'Laat vandaag alsjeblieft geen vliegers op. Onze vliegers en lijnen zijn niet gemaakt voor zoveel wind.',
      boeWarnung: 'Let op: windstoten tot {bft} Bft. Houd de lijnen goed vast en pak de vlieger bij twijfel in.',
      regelTitel: 'De belangrijkste regel',
      regel: 'Vliegers alleen oplaten tot windkracht 4 Bft. Onze vliegers en lijnen zijn niet gemaakt voor meer wind.',
      zone: ['te weinig', 'ideaal', 'te veel'], ort: 'Locatie', quelle: 'Weergegevens', messung: 'Actuele waarde gemeten door DWD-station Wangerland-Hooksiel, verwachting: DWD MOSMIX',
      richtungen: ['noorden', 'noordoosten', 'oosten', 'zuidoosten', 'zuiden', 'zuidwesten', 'westen', 'noordwesten'],
      beaufort: ['windstil', 'zwakke wind', 'zwakke wind', 'matige wind', 'matige wind', 'vrij krachtige wind', 'krachtige wind', 'harde wind', 'stormachtige wind', 'storm', 'zware storm', 'zeer zware storm', 'orkaan'],
    },
  },
} as const;

/** "Montag bis Freitag" / "Saturday & Sunday" aus den Wochentag-Nummern (0 = Sonntag) */
export function tageLabel(tageNr: number[], lang: Lang): string {
  const t = ui[lang];
  const name = (n: number) => (lang === 'nl' ? t.tage[n] : t.tage[n]);
  if (tageNr.length === 1) return name(tageNr[0]);
  const fortlaufend = tageNr.every((n, i) => i === 0 || n === (tageNr[i - 1] + 1) % 7);
  const erster = name(tageNr[0]);
  const letzter = name(tageNr[tageNr.length - 1]);
  const text = fortlaufend && tageNr.length > 2 ? `${erster} ${t.bis} ${letzter}` : tageNr.map(name).join(` ${t.und} `);
  return lang === 'nl' ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}
