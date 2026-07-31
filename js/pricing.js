/* MACHO! pricing — Single/Double toggle, effective per-day, savings %,
   with numbers that count up when the cards scroll into view. */
(function () {
  "use strict";

  var PRICES = { single: { 1: 21.50, 3: 55, 7: 110 }, double: { 1: 27.50, 3: 75, 7: 150 } };

  var cards = document.querySelector(".price-cards");
  var toggle = document.querySelector(".price-toggle");
  if (!cards || !toggle) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = "single";
  var revealed = false;
  var raf = null;

  function lang() { return document.documentElement.lang === "en" ? "en" : "nl"; }
  function money(v, dec) {
    var s = dec ? v.toFixed(2) : String(Math.round(v));
    if (lang() === "nl" && dec) s = s.replace(".", ",");
    return "$" + s;
  }

  function model(type) {
    var day = PRICES[type][1];
    return [].map.call(cards.querySelectorAll(".price-card"), function (card) {
      var plan = parseInt(card.getAttribute("data-plan"), 10);
      var total = PRICES[type][plan];
      var eff = total / plan;
      return {
        card: card, plan: plan, total: total, eff: eff,
        totDec: Math.abs(total - Math.round(total)) > 0.005,
        pct: plan === 1 ? 0 : Math.round((1 - eff / day) * 100)
      };
    });
  }

  function paint(rows, frac) {
    rows.forEach(function (r) {
      r.card.querySelector(".pc-amount").textContent = money(r.total * frac, r.totDec);
      r.card.querySelector(".pc-effnum").textContent = money(r.eff * frac, true);
      var save = r.card.querySelector(".pc-save");
      if (r.plan === 1) { save.textContent = ""; save.setAttribute("data-empty", ""); }
      else { save.textContent = "–" + Math.round(r.pct * frac) + "%"; save.removeAttribute("data-empty"); }
    });
  }

  function animate(type, dur) {
    var rows = model(type);
    if (reduce) { paint(rows, 1); return; }
    if (raf) cancelAnimationFrame(raf);
    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      paint(rows, e);
      if (p < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  toggle.querySelectorAll(".pt-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      current = btn.getAttribute("data-type");
      toggle.querySelectorAll(".pt-btn").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      toggle.setAttribute("data-active", current);
      animate(current, revealed ? 650 : 1000);
      revealed = true;
    });
  });

  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () { paint(model(current), 1); });
  });

  toggle.setAttribute("data-active", "single");

  if (reduce || !("IntersectionObserver" in window)) {
    paint(model("single"), 1);
    revealed = true;
  } else {
    paint(model("single"), 0);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !revealed) {
          revealed = true;
          animate(current, 1100);
          io.disconnect();
        }
      });
    }, { threshold: 0.35 });
    io.observe(cards);
  }
})();
