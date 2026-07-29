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
  if (reduceMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    document.body.classList.add("no-motion");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* --- hero entrance: slow photo settle + headline rise --- */
  gsap.timeline({ defaults: { ease: "power2.out" } })
    .from(".hero-media img", { scale: 1.07, duration: 1.6, ease: "power2.inOut" }, 0)
    .from(".hero-line", { opacity: 0, y: 34, duration: 0.9, stagger: 0.1 }, 0.25)
    .from(".hero-rule", { scaleX: 0, transformOrigin: "left center", duration: 0.6 }, 0.75)
    .from(".hero-sub, .hero-ctas", { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.85);

  /* --- generic reveals: quiet rise + fade --- */
  gsap.utils.toArray("[data-reveal]").forEach(function (el) {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });

  /* --- photos breathe on reveal --- */
  gsap.utils.toArray(".fleet-photo img, .route-card figure img, .autos-photo img, .team-photo img").forEach(function (img) {
    gsap.from(img, {
      scale: 1.06,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: img, start: "top 90%", once: true }
    });
  });

  /* --- phone mock: step progression loop --- */
  var steps = document.querySelectorAll(".app-steps li");
  if (steps.length === 4) {
    var stage = 2;
    setInterval(function () {
      stage = (stage + 1) % 5;
      steps.forEach(function (li, i) {
        li.classList.toggle("is-done", i < stage);
        li.classList.toggle("is-now", i === stage);
      });
    }, 1800);
  }
})();
