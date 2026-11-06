/**
 * Renderiza os cards do portfólio a partir de window.JW_PROJECTS,
 * com mockups de notebook e celular.
 */
(function () {
  window.JW = window.JW || {};

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function safeUrl(url) {
    return /^(https?:)?\/\//i.test(url) || /^[\w./-]+$/.test(url) ? url : "";
  }

  /** Interface ilustrativa exibida dentro do mockup quando não há imagem */
  function illustration(layout, isPhone) {
    var cards = "<div class='ui-cards'>" + repeat("<span></span>", layout === "catalogo" && !isPhone ? 8 : 3) + "</div>";
    var hero = "<div class='ui-hero'><b></b><u></u><em></em><s></s></div>";
    var top = "<div class='ui-top'><i></i><i></i><i></i><i></i></div>";

    if (layout === "sistema" && !isPhone) {
      return "<div class='ui ui-sistema'>" +
        "<div class='ui-side'>" + repeat("<i></i>", 6) + "</div>" +
        "<div class='ui-main'><div class='ui-kpis'>" + repeat("<span></span>", 3) + "</div>" +
        "<div class='ui-chart'>" + [40, 65, 50, 80, 60, 92, 74].map(function (h) {
          return "<span style='height:" + h + "%'></span>";
        }).join("") + "</div></div></div>";
    }
    if (isPhone) {
      return "<div class='ui ui-phone ui-" + layout + "'>" + hero + cards + "</div>";
    }
    return "<div class='ui ui-" + layout + "'>" + top + hero + cards + "</div>";
  }

  function repeat(str, n) {
    var out = "";
    for (var i = 0; i < n; i++) out += str;
    return out;
  }

  function screen(project, isPhone) {
    var img = safeUrl(project.image || "");
    if (img) {
      return "<img src='" + esc(img) + "' alt='' loading='lazy' decoding='async' style='width:100%;height:100%;object-fit:cover;object-position:top'>";
    }
    return illustration(project.layout || "institucional", isPhone);
  }

  function card(p) {
    var c1 = (p.colors && p.colors[0]) || "#2f7bff";
    var c2 = (p.colors && p.colors[1]) || "#8b5cf6";
    var url = safeUrl(p.url || "");

    var action = url
      ? "<a class='btn btn-ghost btn-sm' href='" + esc(url) + "' target='_blank' rel='noopener noreferrer'>Visualizar projeto <span class='arrow' aria-hidden='true'>↗</span><span class='sr-only'> (abre em nova aba)</span></a>"
      : "<a class='btn btn-ghost btn-sm' href='#contato' data-interest='" + esc(p.category) + "'>Quero um projeto assim <span class='arrow' aria-hidden='true'>→</span></a>";

    return (
      "<article class='project' style='--c1:" + esc(c1) + ";--c2:" + esc(c2) + "'>" +
        "<div class='project-stage' aria-hidden='true'>" +
          "<div class='mock-laptop'><div class='screen'>" + screen(p, false) + "</div><div class='base'></div></div>" +
          "<div class='mock-phone'>" + screen(p, true) + "</div>" +
        "</div>" +
        "<div class='project-body'>" +
          "<div class='project-meta'>" +
            "<span class='tag'>" + esc(p.category) + "</span>" +
            (p.demo ? "<span class='badge-demo' title='Projeto ilustrativo, não é um cliente real'>Exemplo</span>" : "") +
          "</div>" +
          "<h3>" + esc(p.name) + "</h3>" +
          "<p>" + esc(p.description) + "</p>" +
          action +
        "</div>" +
      "</article>"
    );
  }

  JW.renderProjects = function (container) {
    if (!container) return;
    var list = Array.isArray(window.JW_PROJECTS) ? window.JW_PROJECTS : [];
    container.innerHTML = list.map(card).join("");
  };
})();
