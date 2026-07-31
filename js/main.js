/* MACHO! Scooters & Cars — nav behavior + calm cinematic motion.
   Progressive enhancement: without JS (or with reduced motion) the page is
   fully readable; GSAP only ever animates FROM hidden states it sets itself. */
(function () {
  "use strict";

  initLang();

  /* --- sticky header: solid once past the hero --- */
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  function updateHeader() {
    var past = window.scrollY > (hero ? hero.offsetHeight - 90 : 400);
    header.classList.toggle("is-solid", past || document.body.classList.contains("menu-open"));
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { updateHeader(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  updateHeader();

  /* --- mobile menu --- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) { menu.hidden = false; } else { menu.hidden = true; }
    updateHeader();
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(menu.hidden);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) setMenu(false);
    });
  }

  /* --- motion (skipped for reduced-motion or if GSAP failed to load) --- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    var hv = document.querySelector(".hero-video");
    if (hv) { hv.removeAttribute("autoplay"); hv.pause(); }
  }
  if (reduceMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    document.body.classList.add("no-motion");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* --- hero entrance: photo settle + masked headline reveal --- */
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".hero-media video, .hero-media img", { scale: 1.09, duration: 1.7, ease: "power2.inOut" }, 0)
    .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.7 }, 0.2)
    .from(".hero-line .hl-i", { yPercent: 115, duration: 1.0, stagger: 0.12, ease: "power4.out" }, 0.3)
    .from(".hero-rule", { scaleX: 0, transformOrigin: "left center", duration: 0.6 }, 0.9)
    .from(".hero-sub, .hero-ctas", { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 1.0)
    .from(".scroll-cue", { opacity: 0, duration: 0.6 }, 1.3);

  /* --- hero parallax: content drifts up, video eases as you scroll --- */
  gsap.to(".hero-content", {
    yPercent: -18, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to(".hero-media video, .hero-media img", {
    yPercent: 10, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  /* --- section titles: clip-wipe reveal --- */
  gsap.utils.toArray(".section-title, .stats-title, .cta-title").forEach(function (el) {
    gsap.from(el, {
      clipPath: "inset(0 0 100% 0)",
      y: 24,
      duration: 1.0,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%", once: true }
    });
  });

  /* --- generic reveals: quiet rise + fade --- */
  gsap.utils.toArray("[data-reveal]").forEach(function (el) {
    if (el.classList.contains("section-title") || el.classList.contains("stats-title") || el.classList.contains("cta-title")) return;
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });

  /* --- count-up stats --- */
  function fmtCount(v, dec, lang) {
    var s = dec ? v.toFixed(dec) : Math.round(v).toString();
    if (dec && lang === "nl") s = s.replace(".", ",");
    return s;
  }
  gsap.utils.toArray("[data-count]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var obj = { v: 0 };
    el.textContent = fmtCount(0, dec, document.documentElement.lang);
    gsap.to(obj, {
      v: target, duration: 1.6, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: function () { el.textContent = fmtCount(obj.v, dec, document.documentElement.lang); }
    });
  });
  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll("[data-count]").forEach(function (el) {
        var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
        el.textContent = fmtCount(parseFloat(el.getAttribute("data-count")), dec, document.documentElement.lang);
      });
    });
  });

  /* --- photos breathe on reveal --- */
  gsap.utils.toArray(".fleet-photo img, .route-img img, .car-photo img, .team-photo img").forEach(function (img) {
    gsap.from(img, {
      scale: 1.06,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: img, start: "top 90%", once: true }
    });
  });
})();
