/**
 * Navegação: navbar que muda ao rolar, esconde ao descer / reaparece ao subir,
 * menu mobile animado e destaque do link da seção ativa.
 */
(function () {
  window.JW = window.JW || {};

  JW.initNav = function () {
    var header = document.getElementById("site-header");
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    var progress = document.querySelector(".scroll-progress");
    var waFloat = document.querySelector(".wa-float");
    var lastY = window.scrollY;
    var ticking = false;

    /* ---------- Estado da navbar na rolagem ---------- */
    function onScroll() {
      var y = window.scrollY;
      var menuOpen = document.body.classList.contains("menu-open");

      header.classList.toggle("is-scrolled", y > 30);
      // Esconde ao rolar para baixo (após o hero) e mostra ao subir
      header.classList.toggle("is-hidden", !menuOpen && y > 600 && y > lastY + 4);
      if (y < lastY - 4 || y < 600) header.classList.remove("is-hidden");

      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
      }
      if (waFloat) waFloat.classList.toggle("is-visible", y > window.innerHeight * 0.5);

      lastY = y;
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
    onScroll();

    /* ---------- Menu mobile ---------- */
    function setMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("menu-open", open);
      header.classList.remove("is-hidden");
      if (open) {
        var first = menu.querySelector("a");
        if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 300);
      }
    }

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980 && menu.classList.contains("is-open")) setMenu(false);
    });

    /* ---------- Link ativo conforme a seção visível ---------- */
    var links = document.querySelectorAll(".nav-links a");
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) { a.classList.remove("is-active"); });
          var link = map[entry.target.id];
          if (link) link.classList.add("is-active");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });

      document.querySelectorAll("main section[id]").forEach(function (s) { observer.observe(s); });
    }
  };
})();
