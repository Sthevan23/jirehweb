/**
 * JirehWeb — ponto de entrada.
 * A ordem importa: o portfólio é renderizado antes das animações
 * para que os cards recebam os efeitos de entrada.
 */
(function () {
  function init() {
    var JW = window.JW || {};

    JW.renderProjects && JW.renderProjects(document.getElementById("projects-grid"));
    JW.initContact && JW.initContact();
    JW.initNav && JW.initNav();
    JW.initHeroCanvas && JW.initHeroCanvas(document.getElementById("hero-canvas"));
    JW.initSpotlight && JW.initSpotlight();
    JW.initAnimations && JW.initAnimations();

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
