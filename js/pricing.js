/* MACHO! pricing section — Single/Double toggle + effective per-day + savings.
   Numbers computed here; labels come from i18n. */
(function () {
  "use strict";

  var PRICES = {
    single: { 1: 21.50, 3: 55, 7: 110 },
    double: { 1: 27.50, 3: 75, 7: 150 }
  };

  var cards = document.querySelector(".price-cards");
  var toggle = document.querySelector(".price-toggle");
  if (!cards || !toggle) return;

  function lang() { return document.documentElement.lang === "en" ? "en" : "nl"; }

  function money(v) {
    var isInt = Math.abs(v - Math.round(v)) < 0.005;
    var s = isInt ? String(Math.round(v)) : v.toFixed(2);
    if (lang() === "nl") s = s.replace(".", ",");
    return "$" + s;
  }

  function render(type) {
    var day = PRICES[type][1];
    cards.querySelectorAll(".price-card").forEach(function (card) {
      var plan = parseInt(card.getAttribute("data-plan"), 10);
      var total = PRICES[type][plan];
      var eff = total / plan;
      card.querySelector(".pc-amount").textContent = money(total);
      card.querySelector(".pc-effnum").textContent = money(eff);
      var saveEl = card.querySelector(".pc-save");
      if (plan === 1) {
        saveEl.textContent = "";
        saveEl.setAttribute("data-empty", "");
      } else {
        var pct = Math.round((1 - eff / day) * 100);
        saveEl.textContent = "–" + pct + "%";
        saveEl.removeAttribute("data-empty");
      }
    });
  }

  var current = "single";
  toggle.querySelectorAll(".pt-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      current = btn.getAttribute("data-type");
      toggle.querySelectorAll(".pt-btn").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      toggle.setAttribute("data-active", current);
      render(current);
    });
  });

  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () { render(current); });
  });

  toggle.setAttribute("data-active", "single");
  render("single");
})();
