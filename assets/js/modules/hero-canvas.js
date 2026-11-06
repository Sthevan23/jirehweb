/**
 * Fundo animado do hero: rede de pontos conectados (representa conexões digitais).
 * - Reage levemente ao cursor
 * - Pausa quando o hero sai da tela ou a aba fica oculta
 * - Com "reduzir movimento" ativo, desenha um quadro estático
 */
(function () {
  window.JW = window.JW || {};

  JW.initHeroCanvas = function (canvas) {
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var width = 0, height = 0, nodes = [], rafId = null, running = false, visible = true;
    var pointer = { x: -9999, y: -9999 };
    var LINK_DIST = 150;

    function createNodes() {
      var area = width * height;
      var count = Math.max(24, Math.min(90, Math.floor(area / 15000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6,
          hue: Math.random() > 0.7 ? "violet" : "blue"
        });
      }
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
      if (!running) draw();
    }

    function step() {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Repulsão suave do cursor
        var dx = n.x - pointer.x, dy = n.y - pointer.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          var f = (1 - Math.sqrt(d2) / 120) * 0.9;
          n.x += (dx / 120) * f;
          n.y += (dy / 120) * f;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            var alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx.strokeStyle = "rgba(127,176,255," + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (var k = 0; k < nodes.length; k++) {
        var n = nodes[k];
        ctx.fillStyle = n.hue === "violet" ? "rgba(182,155,255,.85)" : "rgba(150,190,255,.85)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      step();
      draw();
      rafId = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    var host = canvas.closest(".hero") || canvas.parentElement;
    host.addEventListener("pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    });
    host.addEventListener("pointerleave", function () {
      pointer.x = pointer.y = -9999;
    });

    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : start();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        visible ? start() : stop();
      }).observe(host);
    }

    resize();
    start();
  };
})();
