/**
 * Animações com GSAP + ScrollTrigger.
 * Tudo é progressivo: sem GSAP ou com "reduzir movimento",
 * o conteúdo aparece normalmente, sem animação.
 */
(function () {
  window.JW = window.JW || {};

  var EASE = "power3.out";

  function revealHero() {
    document.documentElement.classList.remove("intro-pending");
  }

  /** Entrada do hero */
  function heroIntro() {
    var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.8 })
      .from(".hero-title .line > span", { yPercent: 115, duration: 1.2, stagger: 0.12 }, "-=0.5")
      .from(".hero-sub", { y: 24, opacity: 0, duration: 1 }, "-=0.8")
      .from(".hero-actions .btn", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, clearProps: "transform,opacity" }, "-=0.7")
      .from(".hero-meta li", { y: 12, opacity: 0, duration: 0.6, stagger: 0.07 }, "-=0.5")
      .from(".code-window", { y: 60, rotateX: 18, rotateY: -14, opacity: 0, duration: 1.4, ease: "expo.out" }, 0.5)
      .from(".code-line", { x: -14, opacity: 0, duration: 0.5, stagger: 0.09 }, 1.0)
      .from(".preview-strip span", { scaleX: 0, transformOrigin: "left", duration: 0.8, stagger: 0.1 }, "-=0.3")
      .from(".float-card", { scale: 0.6, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)", clearProps: "transform" }, "-=0.9")
      .from(".scroll-cue", { opacity: 0, y: -10, duration: 0.6 }, "-=0.3");

    // Estados iniciais já aplicados pelo GSAP: pode revelar o topo sem "piscada"
    revealHero();

    // Leve parallax do conteúdo do hero ao rolar
    gsap.to(".hero-copy", {
      yPercent: -12,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
    gsap.to(".hero-visual", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  /** Inclinação 3D da janela de código acompanhando o cursor */
  function codeTilt() {
    var win = document.getElementById("code-window");
    var hero = document.querySelector(".hero");
    if (!win || !hero || !window.matchMedia("(pointer: fine)").matches) return;

    var rx = gsap.quickTo(win, "rotationX", { duration: 0.8, ease: EASE });
    var ry = gsap.quickTo(win, "rotationY", { duration: 0.8, ease: EASE });

    hero.addEventListener("pointermove", function (e) {
      var px = e.clientX / window.innerWidth - 0.5;
      var py = e.clientY / window.innerHeight - 0.5;
      ry(px * 12);
      rx(-py * 10);
    });
    hero.addEventListener("pointerleave", function () { rx(0); ry(0); });
  }

  /** Elementos que surgem ao rolar */
  function reveals() {
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.from(el, {
        y: 48,
        opacity: 0,
        duration: 1.1,
        ease: EASE,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });

    gsap.utils.toArray("[data-stagger]").forEach(function (group) {
      gsap.from(group.children, {
        y: 56,
        opacity: 0,
        duration: 1,
        ease: EASE,
        stagger: 0.1,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: group, start: "top 85%", once: true }
      });
    });

    // Títulos de seção: palavra destacada com brilho em movimento
    gsap.utils.toArray(".section-title .text-grad").forEach(function (el) {
      gsap.fromTo(el, { backgroundPosition: "100% center" }, {
        backgroundPosition: "-100% center",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }

  /** Linha do tempo do processo */
  function timeline() {
    var progress = document.querySelector(".timeline-progress");
    var steps = gsap.utils.toArray(".step");
    if (!progress) return;

    var mm = gsap.matchMedia();
    var trigger = { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: 0.6 };

    mm.add("(min-width: 861px)", function () {
      gsap.fromTo(progress, { scaleX: 0, scaleY: 1 }, { scaleX: 1, ease: "none", scrollTrigger: trigger });
    });
    mm.add("(max-width: 860px)", function () {
      gsap.fromTo(progress, { scaleY: 0, scaleX: 1 }, { scaleY: 1, ease: "none", scrollTrigger: trigger });
    });

    steps.forEach(function (step, i) {
      ScrollTrigger.create({
        trigger: ".timeline",
        start: function () {
          // Ativa cada etapa proporcionalmente ao avanço da linha
          var t = document.querySelector(".timeline");
          var offset = (t.offsetHeight * i) / Math.max(steps.length, 1);
          return "top+=" + offset * 0.6 + " 70%";
        },
        onEnter: function () { step.classList.add("is-active"); },
        onLeaveBack: function () { step.classList.remove("is-active"); }
      });
    });
  }

  /** Efeito magnético sutil nos botões principais */
  function magnetic() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.querySelectorAll(".btn-lg").forEach(function (btn) {
      var x = gsap.quickTo(btn, "x", { duration: 0.5, ease: EASE });
      var y = gsap.quickTo(btn, "y", { duration: 0.5, ease: EASE });
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.18);
        y((e.clientY - r.top - r.height / 2) * 0.28);
      });
      btn.addEventListener("pointerleave", function () { x(0); y(0); });
    });
  }

  /** Luz que acompanha o cursor nos cards (CSS vars, sem GSAP) */
  JW.initSpotlight = function () {
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest && e.target.closest(".card, .feature");
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    }, { passive: true });
  };

  /** Estado final estático (sem GSAP ou com movimento reduzido) */
  JW.showStatic = function () {
    var progress = document.querySelector(".timeline-progress");
    if (progress) progress.style.transform = "none";
    document.querySelectorAll(".step").forEach(function (s) { s.classList.add("is-active"); });
  };

  JW.initAnimations = function () {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
      revealHero();
      JW.showStatic();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    heroIntro();
    codeTilt();
    reveals();
    timeline();
    magnetic();

    // Recalcula posições quando fontes e imagens terminam de carregar
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  };
})();
