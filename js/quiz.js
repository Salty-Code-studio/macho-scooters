/* MACHO! booking quiz — a few taps, ends in a pre-filled WhatsApp message.
   Self-contained, bilingual (reads document.documentElement.lang). */
(function () {
  "use strict";

  var root = document.getElementById("quiz");
  if (!root) return;

  var WA = "https://wa.me/5997011233";
  var PRICES = { single: { 1: 21.50, 3: 55, 7: 110 }, double: { 1: 27.50, 3: 75, 7: 150 } };
  var CAR_RATE = { compact: 85, suv: 110, pickup: 85 };

  var S = {
    nl: {
      brand: "Boek je rit", stepOf: function (a, b) { return "Stap " + a + " / " + b; },
      back: "Terug", restart: "Opnieuw", waBtn: "Verstuur via WhatsApp",
      q1: "Wat wil je huren?",
      v_single: "Scooter · 1 persoon", v_double: "Scooter · 2 personen", v_car: "Auto",
      q2: "Welke auto?",
      c_compact: "Compact", c_suv: "SUV", c_pickup: "Pickup",
      q3: "Hoe lang?",
      d1: "1 dag", d3: "3 dagen", d7: "1 week", dl: "Langer",
      q4s: "Hoeveel scooters?", q4c: "Met hoeveel personen?",
      q5: "Ophalen of langskomen?",
      p_hotel: "Bij mijn hotel", p_shop: "Ik kom langs", p_airport: "Bij het vliegveld",
      rTitle: "Klaar! 🎉", rLead: "Dit sturen we naar Macho!:",
      lVehicle: "Voertuig", lDur: "Duur", lQty: "Aantal", lPickup: "Ophalen", lPrice: "Richtprijs",
      dateLabel: "Vanaf welke datum? (optioneel)",
      from: "vanaf", onRequest: "op aanvraag", dateShort: "Datum",
      perDay: "/ dag", people: "personen", person: "persoon", scooters: "scooters", scooter: "scooter",
      msgIntro: "Hoi Macho! 👋\n\nIk wil graag reserveren:",
      msgOutro: "Kunnen jullie de beschikbaarheid bevestigen? Bedankt!"
    },
    en: {
      brand: "Book your ride", stepOf: function (a, b) { return "Step " + a + " / " + b; },
      back: "Back", restart: "Restart", waBtn: "Send via WhatsApp",
      q1: "What would you like to rent?",
      v_single: "Scooter · 1 person", v_double: "Scooter · 2 people", v_car: "Car",
      q2: "Which car?",
      c_compact: "Compact", c_suv: "SUV", c_pickup: "Pickup",
      q3: "How long?",
      d1: "1 day", d3: "3 days", d7: "1 week", dl: "Longer",
      q4s: "How many scooters?", q4c: "How many people?",
      q5: "Delivery or pick-up?",
      p_hotel: "At my hotel", p_shop: "I'll come by", p_airport: "At the airport",
      rTitle: "Done! 🎉", rLead: "We'll send this to Macho!:",
      lVehicle: "Vehicle", lDur: "Duration", lQty: "Number", lPickup: "Delivery", lPrice: "Est. price",
      dateLabel: "From which date? (optional)",
      from: "from", onRequest: "on request", dateShort: "Date",
      perDay: "/ day", people: "people", person: "person", scooters: "scooters", scooter: "scooter",
      msgIntro: "Hi Macho! 👋\n\nI'd like to book:",
      msgOutro: "Could you confirm availability? Thanks!"
    }
  };

  function t() { return S[document.documentElement.lang === "en" ? "en" : "nl"]; }
  function money(v) {
    var isInt = Math.abs(v - Math.round(v)) < 0.005;
    var s = isInt ? String(Math.round(v)) : v.toFixed(2);
    if (document.documentElement.lang !== "en") s = s.replace(".", ",");
    return "$" + s;
  }

  var state = { vehicle: null, carClass: null, duration: null, qty: 1, pickup: null, date: "" };
  var idx = 0;

  function steps() {
    var arr = ["vehicle"];
    if (state.vehicle === "car") arr.push("carClass");
    arr.push("duration", "qty", "pickup", "result");
    return arr;
  }

  function vehicleLabel() {
    var d = t();
    if (state.vehicle === "single") return d.v_single;
    if (state.vehicle === "double") return d.v_double;
    if (state.vehicle === "car") return d.v_car + " · " + d["c_" + state.carClass] + " (" + money(CAR_RATE[state.carClass]) + " " + d.perDay + ")";
    return "";
  }
  function durationLabel() {
    var d = t();
    return { 1: d.d1, 3: d.d3, 7: d.d7, longer: d.dl }[state.duration];
  }
  function pickupLabel() { return t()["p_" + state.pickup]; }
  function qtyLabel() {
    var d = t();
    var one = state.qty === 1;
    var unit = state.vehicle === "car" ? (one ? d.person : d.people) : (one ? d.scooter : d.scooters);
    return state.qty + (state.qty >= 4 ? "+" : "") + " " + unit;
  }
  function estimate() {
    if (state.duration === "longer") return null;
    if (state.vehicle === "car") return CAR_RATE[state.carClass] * state.duration;
    return PRICES[state.vehicle][state.duration] * state.qty;
  }

  function optionRow(value, label, hint, selected) {
    return '<button class="quiz-opt' + (selected ? " is-sel" : "") + '" data-val="' + value + '" type="button">' +
      '<span>' + label + '</span>' + (hint ? '<em>' + hint + '</em>' : "") +
      '<span class="quiz-tick" aria-hidden="true"></span></button>';
  }

  function render() {
    var d = t();
    var list = steps();
    var step = list[idx];
    var html = '<div class="quiz-head"><span class="quiz-brand">MACHO!</span><span class="quiz-step">' +
      d.stepOf(Math.min(idx + 1, list.length), list.length) + '</span></div>';
    html += '<div class="quiz-dots">';
    for (var i = 0; i < list.length; i++) html += '<span class="' + (i <= idx ? "on" : "") + '"></span>';
    html += '</div>';

    if (step === "vehicle") {
      html += '<p class="quiz-q">' + d.q1 + '</p><div class="quiz-opts">' +
        optionRow("single", d.v_single, money(21.50) + d.perDay, state.vehicle === "single") +
        optionRow("double", d.v_double, money(27.50) + d.perDay, state.vehicle === "double") +
        optionRow("car", d.v_car, d.from + " " + money(85) + d.perDay, state.vehicle === "car") +
        '</div>';
    } else if (step === "carClass") {
      html += '<p class="quiz-q">' + d.q2 + '</p><div class="quiz-opts">' +
        optionRow("compact", d.c_compact, money(85) + d.perDay, state.carClass === "compact") +
        optionRow("suv", d.c_suv, money(110) + d.perDay, state.carClass === "suv") +
        optionRow("pickup", d.c_pickup, money(85) + d.perDay, state.carClass === "pickup") +
        '</div>';
    } else if (step === "duration") {
      html += '<p class="quiz-q">' + d.q3 + '</p><div class="quiz-opts">' +
        optionRow("1", d.d1, "", state.duration === 1) +
        optionRow("3", d.d3, "", state.duration === 3) +
        optionRow("7", d.d7, "", state.duration === 7) +
        optionRow("longer", d.dl, "", state.duration === "longer") +
        '</div>';
    } else if (step === "qty") {
      html += '<p class="quiz-q">' + (state.vehicle === "car" ? d.q4c : d.q4s) + '</p><div class="quiz-chips">';
      [1, 2, 3, 4].forEach(function (n) {
        html += '<button class="quiz-chip' + (state.qty === n ? " is-sel" : "") + '" data-val="' + n + '" type="button">' + n + (n === 4 ? "+" : "") + '</button>';
      });
      html += '</div>';
    } else if (step === "pickup") {
      html += '<p class="quiz-q">' + d.q5 + '</p><div class="quiz-opts">' +
        optionRow("hotel", d.p_hotel, "", state.pickup === "hotel") +
        optionRow("shop", d.p_shop, "", state.pickup === "shop") +
        optionRow("airport", d.p_airport, "", state.pickup === "airport") +
        '</div>';
    } else if (step === "result") {
      var est = estimate();
      var priceStr = est == null ? d.onRequest : d.from + " " + money(est);
      html += '<p class="quiz-q quiz-done">' + d.rTitle + '</p>';
      html += '<div class="quiz-summary">' +
        '<div><span>' + d.lVehicle + '</span><b>' + vehicleLabel() + '</b></div>' +
        '<div><span>' + d.lDur + '</span><b>' + durationLabel() + '</b></div>' +
        '<div><span>' + d.lQty + '</span><b>' + qtyLabel() + '</b></div>' +
        '<div><span>' + d.lPickup + '</span><b>' + pickupLabel() + '</b></div>' +
        '<div class="quiz-price"><span>' + d.lPrice + '</span><b>' + priceStr + '</b></div>' +
        '</div>';
      var today = new Date().toISOString().slice(0, 10);
      html += '<label class="quiz-datewrap">' + d.dateLabel +
        '<input class="quiz-date" type="date" min="' + today + '" value="' + state.date + '"></label>';
      html += '<a class="quiz-wa" href="#" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.1 4c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.6-.7c.2-.2.2-.4.1-.6l-.8-2c-.2-.4-.4-.4-.6-.4h-.5Z"/></svg>' +
        '<span>' + d.waBtn + '</span></a>';
    }

    var showBack = idx > 0;
    html += '<div class="quiz-foot">';
    if (showBack) html += '<button class="quiz-back" type="button">' + d.back + '</button>';
    if (step === "result") html += '<button class="quiz-restart" type="button">' + d.restart + '</button>';
    html += '</div>';

    root.innerHTML = html;
    root.classList.remove("quiz-in");
    void root.offsetWidth;
    root.classList.add("quiz-in");
    bind(step);
  }

  function advance() { idx = Math.min(idx + 1, steps().length - 1); render(); }

  function bind(step) {
    root.querySelectorAll(".quiz-opt").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-val");
        if (step === "vehicle") { state.vehicle = v; if (v !== "car") state.carClass = null; }
        else if (step === "carClass") state.carClass = v;
        else if (step === "duration") state.duration = (v === "longer" ? "longer" : parseInt(v, 10));
        else if (step === "pickup") state.pickup = v;
        advance();
      });
    });
    root.querySelectorAll(".quiz-chip").forEach(function (b) {
      b.addEventListener("click", function () { state.qty = parseInt(b.getAttribute("data-val"), 10); advance(); });
    });
    var back = root.querySelector(".quiz-back");
    if (back) back.addEventListener("click", function () { idx = Math.max(0, idx - 1); render(); });
    var restart = root.querySelector(".quiz-restart");
    if (restart) restart.addEventListener("click", function () {
      state = { vehicle: null, carClass: null, duration: null, qty: 1, pickup: null, date: "" };
      idx = 0; render();
    });
    var dateInput = root.querySelector(".quiz-date");
    if (dateInput) dateInput.addEventListener("change", function () { state.date = dateInput.value; updateWA(); });
    var wa = root.querySelector(".quiz-wa");
    if (wa) { updateWA(); }
  }

  function updateWA() {
    var wa = root.querySelector(".quiz-wa");
    if (!wa) return;
    var d = t();
    var est = estimate();
    var lines = [d.msgIntro, "",
      "🛵 " + d.lVehicle + ": " + vehicleLabel(),
      "📅 " + d.lDur + ": " + durationLabel()];
    if (state.date) lines.push("🗓️ " + d.dateShort + ": " + state.date);
    lines.push("👥 " + d.lQty + ": " + qtyLabel());
    lines.push("📍 " + d.lPickup + ": " + pickupLabel());
    lines.push("💰 " + d.lPrice + ": " + (est == null ? d.onRequest : d.from + " " + money(est)));
    lines.push("", d.msgOutro);
    wa.setAttribute("href", WA + "?text=" + encodeURIComponent(lines.join("\n")));
  }

  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () { render(); });
  });

  render();
})();
