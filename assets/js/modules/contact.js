/**
 * Contato: aplica os dados de window.JW_CONFIG nos links do site,
 * monta a lista de canais e envia o formulário pelo WhatsApp
 * (ou e-mail, se o WhatsApp não estiver configurado).
 */
(function () {
  window.JW = window.JW || {};

  var ICONS = {
    whatsapp: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23z'/></svg>",
    email: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 7l9 6 9-6'/></svg>",
    instagram: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><rect x='3' y='3' width='18' height='18' rx='5'/><circle cx='12' cy='12' r='4'/><circle cx='17.5' cy='6.5' r='.8' fill='currentColor'/></svg>"
  };

  function digits(v) { return String(v || "").replace(/\D/g, ""); }

  function formatPhone(d) {
    // Formato brasileiro: +55 (11) 90000-0000
    var m = d.match(/^(55)(\d{2})(\d{4,5})(\d{4})$/);
    return m ? "+" + m[1] + " (" + m[2] + ") " + m[3] + "-" + m[4] : "+" + d;
  }

  JW.whatsappUrl = function (message) {
    var cfg = window.JW_CONFIG || {};
    var number = digits(cfg.whatsapp);
    if (!number) return "";
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message || cfg.whatsappMessage || "");
  };

  function channels() {
    var cfg = window.JW_CONFIG || {};
    var list = [];
    var wa = digits(cfg.whatsapp);
    var ig = String(cfg.instagram || "").replace(/^@/, "").trim();
    var mail = String(cfg.email || "").trim();

    if (wa) list.push({ key: "whatsapp", label: "WhatsApp", value: formatPhone(wa), href: JW.whatsappUrl(), external: true });
    if (mail) list.push({ key: "email", label: "E-mail", value: mail, href: "mailto:" + mail, external: false });
    if (ig) list.push({ key: "instagram", label: "Instagram", value: "@" + ig, href: "https://www.instagram.com/" + encodeURIComponent(ig) + "/", external: true });
    return list;
  }

  function linkAttrs(c) {
    return "href='" + c.href + "'" + (c.external ? " target='_blank' rel='noopener noreferrer'" : "");
  }

  function applyConfig() {
    var list = channels();
    var waUrl = JW.whatsappUrl();

    // Botões de WhatsApp (CTA e flutuante). Sem número configurado, levam ao formulário.
    document.querySelectorAll("[data-wa-link]").forEach(function (a) {
      if (waUrl) {
        a.href = waUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      } else {
        a.href = "#contato";
        a.removeAttribute("target");
      }
    });

    // Lista de canais na seção de contato
    var info = document.getElementById("contact-info");
    if (info) {
      info.innerHTML = list.length
        ? list.map(function (c) {
            return "<li><a class='info-item' " + linkAttrs(c) + ">" +
              "<span class='icon-box'>" + ICONS[c.key] + "</span>" +
              "<span><span class='info-label'>" + c.label + "</span><span class='info-value'>" + c.value + "</span></span></a></li>";
          }).join("")
        : "<li class='info-empty'>Envie sua mensagem pelo formulário — retornaremos o contato o quanto antes.</li>";
    }

    // Rodapé: contatos e redes sociais
    var footer = document.getElementById("footer-contact");
    if (footer) {
      footer.innerHTML = list.map(function (c) {
        return "<li><a " + linkAttrs(c) + ">" + c.value + "</a></li>";
      }).join("") + "<li><a href='#contato'>Formulário de orçamento</a></li>";
    }

    var socials = document.getElementById("socials");
    if (socials) {
      socials.innerHTML = list.map(function (c) {
        return "<a class='social-link' " + linkAttrs(c) + " aria-label='" + c.label + " da JirehWeb'>" + ICONS[c.key] + "</a>";
      }).join("");
    }
  }

  function setStatus(el, text, type) {
    el.textContent = text;
    el.className = "form-status" + (type ? " is-" + type : "");
  }

  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var get = function (k) { return String(data.get(k) || "").trim(); };
      var nome = get("nome"), mensagem = get("mensagem");

      // Validação
      var missing = [];
      [["nome", nome], ["mensagem", mensagem]].forEach(function (pair) {
        var field = form.querySelector("[name='" + pair[0] + "']");
        var empty = !pair[1];
        field.closest(".field").classList.toggle("has-error", empty);
        field.setAttribute("aria-invalid", String(empty));
        if (empty) missing.push(field);
      });
      if (missing.length) {
        setStatus(status, "Preencha seu nome e conte um pouco sobre o projeto.", "error");
        missing[0].focus();
        return;
      }

      var lines = ["Olá, JirehWeb! Meu nome é " + nome + "."];
      if (get("empresa")) lines.push("Empresa: " + get("empresa"));
      if (get("tipo")) lines.push("Tipo de projeto: " + get("tipo"));
      if (get("contato")) lines.push("Contato: " + get("contato"));
      lines.push("", "Sobre o projeto:", mensagem);
      var text = lines.join("\n");

      var cfg = window.JW_CONFIG || {};
      var waUrl = JW.whatsappUrl(text);

      if (waUrl) {
        window.open(waUrl, "_blank", "noopener");
        setStatus(status, "Tudo certo! Abrimos o WhatsApp com a sua mensagem pronta — é só enviar.", "success");
      } else if (cfg.email) {
        window.location.href = "mailto:" + cfg.email +
          "?subject=" + encodeURIComponent("Orçamento — " + nome) +
          "&body=" + encodeURIComponent(text);
        setStatus(status, "Abrimos seu aplicativo de e-mail com a mensagem pronta para envio.", "success");
      } else {
        setStatus(status, "Os canais de atendimento estão sendo configurados. Tente novamente em breve.", "error");
        if (window.console) console.warn("[JirehWeb] Configure whatsapp ou email em assets/js/config.js");
      }
    });

    form.addEventListener("input", function (e) {
      var field = e.target.closest(".field");
      if (field && field.classList.contains("has-error") && e.target.value.trim()) {
        field.classList.remove("has-error");
        e.target.setAttribute("aria-invalid", "false");
      }
    });

    // Botões "Solicitar este serviço" / "Quero um projeto assim" pré-selecionam o tipo
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-interest]");
      if (!trigger) return;
      var select = form.querySelector("[name='tipo']");
      var value = trigger.getAttribute("data-interest");
      if (select && Array.prototype.some.call(select.options, function (o) { return o.value === value; })) {
        select.value = value;
      }
    });
  }

  JW.initContact = function () {
    applyConfig();
    initForm();
  };
})();
