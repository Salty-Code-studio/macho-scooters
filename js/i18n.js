/* Macho! Scooters & Cars — NL/EN dictionary + toggle.
   NL is the default language; choice persists in localStorage ("macho-lang"). */
(function () {
  var I18N = {
    nl: {
      "nav.scooters": "Scooters",
      "nav.prijzen": "Prijzen",
      "nav.autos": "Auto’s",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.boek": "Boek nu",

      "hero.t1": "Het eiland",
      "hero.t2": "is van jou.",
      "hero.sub": "Scooters & auto’s huren op Bonaire. Vanaf $21,50 per dag, helm en verzekering inbegrepen.",
      "hero.cta1": "Boek nu",
      "hero.cta2": "App ons",

      "usp.1": "Helm & slot inbegrepen",
      "usp.2": "WA-verzekering & BTW",
      "usp.3": "Gratis ophaalservice",
      "usp.4": "Pechhulp 8:00–20:00",

      "vloot.kicker": "De vloot",
      "vloot.title": "Kies je scooter.",
      "vloot.s1.name": "Scooter Single",
      "vloot.s1.price": "$21,50",
      "vloot.s1.unit": "/ dag",
      "vloot.s1.desc": "Wendbaar, zuinig en je parkeert overal. De soloheld van het eiland.",
      "vloot.s2.name": "Scooter Double",
      "vloot.s2.price": "$27,50",
      "vloot.s2.unit": "/ dag",
      "vloot.s2.desc": "Samen toeren op één scooter. Comfortabel duozadel, dubbel plezier.",
      "vloot.b1": "Helm + slot",
      "vloot.b2": "WA-verzekering",
      "vloot.b3": "Gratis ophaalservice",
      "vloot.b4": "Gratis plattegrond",
      "vloot.cta": "Boek deze scooter",
      "vloot.fine": "Borg $300 (creditcard of contant) · Geldig rijbewijs verplicht · 18+ · Optioneel: diefstalverzekering $6 per dag",

      "prijzen.kicker": "Prijzen",
      "prijzen.title": "Prijzen zonder gedoe.",
      "prijzen.single": "Single",
      "prijzen.double": "Double",
      "prijzen.day": "per dag",
      "prijzen.3days": "3 dagen",
      "prijzen.week": "1 week",
      "prijzen.s.day": "$21,50",
      "prijzen.s.3days": "$55",
      "prijzen.s.week": "$110",
      "prijzen.d.day": "$27,50",
      "prijzen.d.3days": "$75",
      "prijzen.d.week": "$150",
      "prijzen.best": "Beste deal",
      "prijzen.claim": "Langer huren, minder betalen.",
      "prijzen.incl": "Alle prijzen inclusief verzekering, BTW, helm en slot.",

      "autos.kicker": "Macho! Auto’s",
      "autos.title": "Ook op vier wielen.",
      "autos.sub": "Vanaf $85 per dag, all-risk verzekering inbegrepen.",
      "autos.photo.cap": "Onze pick-ups kennen het eiland.",
      "autos.c1.name": "Compact",
      "autos.c1.desc": "Klein, handig, zuinig.",
      "autos.c2.name": "Sedan",
      "autos.c2.desc": "Comfort voor het hele gezin.",
      "autos.c3.name": "SUV",
      "autos.c3.desc": "Ruimte voor elk avontuur.",
      "autos.c4.name": "Premium",
      "autos.c4.desc": "Rijden in stijl.",
      "autos.note": "Ook te vinden tegenover het vliegveld, Kaya International 130.",

      "routes.kicker": "Ontdek Bonaire",
      "routes.title": "Eén tank. Het hele eiland.",
      "routes.r1.name": "Zuid",
      "routes.r1.desc": "Zoutpannen, slavenhutten en roze water.",
      "routes.r2.name": "Noord",
      "routes.r2.desc": "Rincon, Gotomeer en flamingo’s.",
      "routes.r3.name": "Hoogtepunten",
      "routes.r3.desc": "1000 Steps, Seru Largu en Sorobon.",

      "boeken.kicker": "Boeken",
      "boeken.title": "In een paar tikken geregeld.",
      "boeken.bl1": "Kies je scooter of auto en je datums",
      "boeken.bl2": "Live beschikbaarheid, nooit dubbel geboekt",
      "boeken.bl3": "Rijbewijs uploaden en digitaal tekenen",
      "boeken.bl4": "Direct je bevestiging in de mail",
      "boeken.cta": "Start je boeking",
      "phone.brand": "MACHO!",
      "phone.title": "Boek je rit",
      "phone.avail": "3 van 12 beschikbaar",
      "phone.item1.name": "Scooter Single",
      "phone.item1.price": "$21,50 / dag",
      "phone.item2.name": "Scooter Double",
      "phone.item2.price": "$27,50 / dag",
      "phone.dates": "24 aug → 31 aug",
      "phone.step1": "Datums",
      "phone.step2": "Gegevens",
      "phone.step3": "Rijbewijs + handtekening",
      "phone.step4": "Bevestigd",
      "phone.cta": "Reserveer",

      "erv.kicker": "Ervaringen",
      "erv.title": "Echte riders, echte reviews.",
      "erv.badge": "4.4 op Google · 69 reviews",
      "erv.q1.text": "“Devin en Michel hielpen me goed en supersnel! Je kunt met ze appen en ze reageren snel. De scooter reed perfect, zeker een aanrader.”",
      "erv.q1.name": "Chloé · Google",
      "erv.q2.text": "“Goed onderhouden scooters, ze rijden erg stabiel en comfortabel… Echt een dikke aanrader!”",
      "erv.q2.name": "Anouk · TripAdvisor",
      "erv.team.cap": "Het team staat klaar, altijd met een lach.",
      "erv.link": "Lees alle reviews",

      "faq.kicker": "Veelgestelde vragen",
      "faq.title": "Goed om te weten.",
      "faq.q1": "Wat heb ik nodig om te huren?",
      "faq.a1": "Een geldig rijbewijs en minimumleeftijd 18 jaar. Bij het ophalen vragen we een borg van $300, te betalen met creditcard of contant.",
      "faq.q2": "Wat is er inbegrepen?",
      "faq.a2": "WA-verzekering, BTW, helm(en), een slot, gratis ophaalservice en een plattegrond van Bonaire. Optioneel sluit je diefstalverzekering af voor $6 per dag.",
      "faq.q3": "Waar mag ik rijden?",
      "faq.a3": "Op alle verharde wegen van Bonaire. Onverharde wegen vallen buiten de verzekering, dus die laat je liever links liggen.",
      "faq.q4": "Hoe zit het met brandstof?",
      "faq.a4": "Je krijgt de scooter met een volle tank en levert ’m zo weer in. Tank onderweg met super benzine.",
      "faq.q5": "Brengen jullie de scooter langs?",
      "faq.a5": "Zeker. Gratis ophaal- en brengservice bij je hotel of het vliegveld, tijdens openingstijden.",
      "faq.q6": "Wat als er onderweg iets is?",
      "faq.a6": "Pechhulp elke dag van 8:00 tot 20:00. Eén appje en we komen eraan.",

      "contact.kicker": "Contact",
      "contact.title": "Waar je ons vindt.",
      "contact.loc1name": "Plaza Beach & Dive Resort",
      "contact.loc1addr": "J.A. Abraham Bulevar 80, Kralendijk",
      "contact.loc2name": "Tegenover het vliegveld",
      "contact.loc2addr": "Kaya International 130, Kralendijk",
      "contact.hoursLabel": "Openingstijden",
      "contact.hours": "Ma–Vr 8:30–16:00 · Za–Zo 8:30–13:00",
      "contact.emergency": "Pechhulp dagelijks 8:00–20:00",
      "contact.ctaWa": "App +5997011233",
      "contact.ctaCall": "Bel +5997011233",
      "contact.ctaMail": "info@machoscooters.com",
      "contact.mapcap": "Plaza Beach & Dive Resort, Kralendijk",

      "cta.title": "Klaar om te rijden?",
      "cta.sub": "Stuur een appje en je scooter staat klaar.",
      "cta.wa": "WhatsApp +5997011233",

      "footer.blurb": "Jouw scooter en auto op Bonaire. Enjoy the ride.",
      "footer.navHead": "Menu",
      "footer.contactHead": "Contact",
      "footer.hoursHead": "Openingstijden",
      "footer.followHead": "Volg ons",
      "footer.rights": "© 2026 Macho! Scooters & Cars · Enjoy the ride"
    },
    en: {
      "nav.scooters": "Scooters",
      "nav.prijzen": "Rates",
      "nav.autos": "Cars",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.boek": "Book now",

      "hero.t1": "The island",
      "hero.t2": "is all yours.",
      "hero.sub": "Scooter & car rental on Bonaire. From $21.50 a day, helmet and insurance included.",
      "hero.cta1": "Book now",
      "hero.cta2": "WhatsApp us",

      "usp.1": "Helmet & lock included",
      "usp.2": "Liability insurance & VAT",
      "usp.3": "Free pick-up service",
      "usp.4": "Roadside help 8:00–20:00",

      "vloot.kicker": "The fleet",
      "vloot.title": "Pick your scooter.",
      "vloot.s1.name": "Scooter Single",
      "vloot.s1.price": "$21.50",
      "vloot.s1.unit": "/ day",
      "vloot.s1.desc": "Nimble, thrifty, parks anywhere. The island’s solo hero.",
      "vloot.s2.name": "Scooter Double",
      "vloot.s2.price": "$27.50",
      "vloot.s2.unit": "/ day",
      "vloot.s2.desc": "Cruise together on one scooter. Comfy two-up seat, double the fun.",
      "vloot.b1": "Helmet + lock",
      "vloot.b2": "Liability insurance",
      "vloot.b3": "Free pick-up service",
      "vloot.b4": "Free Bonaire map",
      "vloot.cta": "Book this scooter",
      "vloot.fine": "Deposit $300 (credit card or cash) · Valid driver’s license required · 18+ · Optional theft cover $6 a day",

      "prijzen.kicker": "Rates",
      "prijzen.title": "Rates without the hassle.",
      "prijzen.single": "Single",
      "prijzen.double": "Double",
      "prijzen.day": "per day",
      "prijzen.3days": "3 days",
      "prijzen.week": "1 week",
      "prijzen.s.day": "$21.50",
      "prijzen.s.3days": "$55",
      "prijzen.s.week": "$110",
      "prijzen.d.day": "$27.50",
      "prijzen.d.3days": "$75",
      "prijzen.d.week": "$150",
      "prijzen.best": "Best deal",
      "prijzen.claim": "Rent longer, pay less.",
      "prijzen.incl": "All rates include insurance, VAT, helmet and lock.",

      "autos.kicker": "Macho! Cars",
      "autos.title": "Four wheels, same Macho.",
      "autos.sub": "From $85 a day, all-risk insurance included.",
      "autos.photo.cap": "Our pick-ups know the island.",
      "autos.c1.name": "Compact",
      "autos.c1.desc": "Small, handy, thrifty.",
      "autos.c2.name": "Sedan",
      "autos.c2.desc": "Comfort for the whole family.",
      "autos.c3.name": "SUV",
      "autos.c3.desc": "Room for every adventure.",
      "autos.c4.name": "Premium",
      "autos.c4.desc": "Ride in style.",
      "autos.note": "Also found opposite the airport, Kaya International 130.",

      "routes.kicker": "Explore Bonaire",
      "routes.title": "One tank. The whole island.",
      "routes.r1.name": "South",
      "routes.r1.desc": "Salt flats, slave huts and pink water.",
      "routes.r2.name": "North",
      "routes.r2.desc": "Rincon, Gotomeer and flamingos.",
      "routes.r3.name": "Highlights",
      "routes.r3.desc": "1000 Steps, Seru Largu and Sorobon.",

      "boeken.kicker": "Booking",
      "boeken.title": "Sorted in a few taps.",
      "boeken.bl1": "Pick your scooter or car and your dates",
      "boeken.bl2": "Live availability, never double-booked",
      "boeken.bl3": "Upload your license and sign digitally",
      "boeken.bl4": "Instant confirmation by email",
      "boeken.cta": "Start your booking",
      "phone.brand": "MACHO!",
      "phone.title": "Book your ride",
      "phone.avail": "3 of 12 available",
      "phone.item1.name": "Scooter Single",
      "phone.item1.price": "$21.50 / day",
      "phone.item2.name": "Scooter Double",
      "phone.item2.price": "$27.50 / day",
      "phone.dates": "Aug 24 → Aug 31",
      "phone.step1": "Dates",
      "phone.step2": "Details",
      "phone.step3": "License + signature",
      "phone.step4": "Confirmed",
      "phone.cta": "Reserve",

      "erv.kicker": "Reviews",
      "erv.title": "Real riders, real reviews.",
      "erv.badge": "4.4 on Google · 69 reviews",
      "erv.q1.text": "“Amazing service and super friendly staff! When I had to return my scooter one day earlier due to sickness the company even proactively offered me to refund the rental cost.”",
      "erv.q1.name": "Sita · TripAdvisor",
      "erv.q2.text": "“They were punctual when picking us up and spent time with you on how to operate the scooters. They were fair in price and very professional!”",
      "erv.q2.name": "Pam · TripAdvisor",
      "erv.team.cap": "The team is ready, always with a smile.",
      "erv.link": "Read all reviews",

      "faq.kicker": "FAQ",
      "faq.title": "Good to know.",
      "faq.q1": "What do I need to rent?",
      "faq.a1": "A valid driver’s license and a minimum age of 18. At pick-up we ask for a $300 deposit, payable by credit card or cash.",
      "faq.q2": "What’s included?",
      "faq.a2": "Liability insurance, VAT, helmet(s), a lock, free pick-up service and a Bonaire map. You can optionally add theft cover for $6 a day.",
      "faq.q3": "Where can I ride?",
      "faq.a3": "On all paved roads of Bonaire. Unpaved roads fall outside the insurance, so it’s best to skip those.",
      "faq.q4": "What about fuel?",
      "faq.a4": "You get the scooter with a full tank and return it the same way. Fill up with super gasoline along the way.",
      "faq.q5": "Do you deliver the scooter?",
      "faq.a5": "Absolutely. Free pick-up and drop-off at your hotel or the airport, during opening hours.",
      "faq.q6": "What if something happens on the road?",
      "faq.a6": "Roadside help every day from 8:00 to 20:00. One message and we’re on our way.",

      "contact.kicker": "Contact",
      "contact.title": "Where to find us.",
      "contact.loc1name": "Plaza Beach & Dive Resort",
      "contact.loc1addr": "J.A. Abraham Bulevar 80, Kralendijk",
      "contact.loc2name": "Opposite the airport",
      "contact.loc2addr": "Kaya International 130, Kralendijk",
      "contact.hoursLabel": "Opening hours",
      "contact.hours": "Mon–Fri 8:30–16:00 · Sat–Sun 8:30–13:00",
      "contact.emergency": "Roadside help daily 8:00–20:00",
      "contact.ctaWa": "WhatsApp +5997011233",
      "contact.ctaCall": "Call +5997011233",
      "contact.ctaMail": "info@machoscooters.com",
      "contact.mapcap": "Plaza Beach & Dive Resort, Kralendijk",

      "cta.title": "Ready to ride?",
      "cta.sub": "Send a message and your scooter is ready.",
      "cta.wa": "WhatsApp +5997011233",

      "footer.blurb": "Your scooter and car on Bonaire. Enjoy the ride.",
      "footer.navHead": "Menu",
      "footer.contactHead": "Contact",
      "footer.hoursHead": "Opening hours",
      "footer.followHead": "Follow us",
      "footer.rights": "© 2026 Macho! Scooters & Cars · Enjoy the ride"
    }
  };

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.nl;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    try { localStorage.setItem("macho-lang", lang); } catch (e) {}
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem("macho-lang"); } catch (e) {}
    var lang = saved === "en" ? "en" : "nl";
    applyLang(lang);
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });
  }

  window.I18N = I18N;
  window.applyLang = applyLang;
  window.initLang = initLang;
})();
