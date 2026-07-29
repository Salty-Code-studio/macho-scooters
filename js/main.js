/* MACHO! Showroom Light — calm cinematic motion.
   Progressive enhancement: without JS (or with reduced motion) the page is
   fully readable; GSAP only ever animates FROM hidden states it sets itself. */
(function () {
  "use strict";

  initLang();

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    document.body.classList.add("no-motion");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* --- hero entrance: slow photo settle + headline rise --- */
  var intro = gsap.timeline({ defaults: { ease: "power2.out" } });
  intro
    .from(".hero-media img", { scale: 1.07, duration: 1.6, ease: "power2.inOut" }, 0)
    .from(".hero-line", { opacity: 0, y: 34, duration: 0.9, stagger: 0.1 }, 0.25)
    .from(".hero-rule", { scaleX: 0, transformOrigin: "left center", duration: 0.6 }, 0.75)
    .from(".hero-sub, .hero-ctas", { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.85)
    .from(".site-header", { opacity: 0, y: -14, duration: 0.7 }, 0.4);

  /* --- generic reveals: quiet rise + fade --- */
  gsap.utils.toArray("[data-reveal]").forEach(function (el) {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true
      }
    });
  });

  /* --- photos breathe on reveal --- */
  gsap.utils.toArray(".fleet-photo img, .route-card figure img, .autos-photo img, .team-photo img").forEach(function (img) {
    gsap.from(img, {
      scale: 1.06,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: img,
        start: "top 90%",
        once: true
      }
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
