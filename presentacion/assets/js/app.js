/* =========================================================
   Motor de la presentación
   - Navegación, índice, notas, pantalla completa y progreso
   - Escalado exacto 16:9 sobre un escenario de 1280 × 720
   - Impresión: una diapositiva por página
   ========================================================= */

(function () {
  "use strict";

  const DECK = document.body.getAttribute("data-deck") === "anexos" ? "anexos" : "main";
  const DATA = window.PRESENTACION;
  if (!DATA) {
    document.body.innerHTML = "<p style='padding:2rem;color:#fff'>No se cargó el contenido de la presentación.</p>";
    return;
  }

  const SLIDES = DECK === "anexos" ? DATA.ANNEX : DATA.MAIN;
  const META = DATA.META;

  const stage = document.getElementById("stage");
  const shell = document.getElementById("stageShell");
  const indexOverlay = document.getElementById("indexOverlay");
  const indexGrid = document.getElementById("indexGrid");
  const indexMeta = document.getElementById("indexMeta");
  const counter = document.getElementById("counter");
  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const btnIndex = document.getElementById("btnIndex");
  const btnFull = document.getElementById("btnFull");
  const btnPrint = document.getElementById("btnPrint");
  const btnCloseIndex = document.getElementById("btnCloseIndex");
  const progressTrack = document.getElementById("progressTrack");
  const deckLink = document.getElementById("deckLink");
  const deckName = document.getElementById("deckName");
  const indexAnnexLink = document.getElementById("indexAnnexLink");
  const liveRegion = document.getElementById("liveRegion");

  let current = 0;
  let evidenceData = null;

  /* ---------------- Render de diapositivas ---------------- */
  function slideMarkup(slide, index, total) {
    const num = String(index + 1).padStart(2, "0");
    const isCover = slide.layout === "cover";
    const layoutClass = slide.layout ? " slide--" + slide.layout : "";
    const bg = slide.bg ? escapeAttr(slide.bg) : "";

    let head = "";
    if (!isCover) {
      head = '<header class="slide-head">' +
        '<p class="kicker">' + slide.kicker + "</p>" +
        "<h1>" + slide.title + "</h1>" +
        "</header>";
    }

    let bodyInner = slide.content || "";
    if (slide.visual) {
      const splitClass = slide.layout === "split-wide-left"
        ? "split split--wide-left"
        : slide.layout === "split-narrow-left"
          ? "split split--narrow-left"
          : "split";
      bodyInner = '<div class="' + splitClass + '">' +
        '<div class="stack">' + bodyInner + "</div>" +
        '<div class="stack">' + slide.visual + "</div>" +
        "</div>";
    }

    let foot = "";
    if (!isCover) {
      const sources = (slide.sources || []).join(" · ");
      foot = '<footer class="slide-foot">' +
        '<div class="foot-left">' +
          '<span class="source-line"><b>Fuente:</b> ' + sources + "</span>" +
        "</div>" +
        '<div class="foot-right">' +
          '<span class="slide-num">' + num + " / " + total + "</span>" +
        "</div>" +
        "</footer>";
    } else {
      foot = '<span class="slide-num" style="position:absolute;right:60px;bottom:22px">' + num + " / " + total + "</span>";
    }

    return '<section class="slide' + layoutClass + (index === 0 ? " is-active" : "") + '" ' +
      'id="' + slide.id + '" data-index="' + index + '" ' +
      'aria-label="Diapositiva ' + (index + 1) + ' de ' + total + ': ' + escapeAttr(slide.title) + '"' +
      (index === 0 ? "" : ' aria-hidden="true"') + ">" +
      '<div class="slide-bg" aria-hidden="true">' +
        (bg ? '<img src="' + bg + '" alt="" decoding="async" />' : "") +
      "</div>" +
      head +
      '<div class="slide-body">' + bodyInner + "</div>" +
      foot +
      "</section>";
  }

  function escapeAttr(text) {
    return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  function renderDeck() {
    stage.innerHTML = SLIDES.map(function (slide, i) {
      return slideMarkup(slide, i, SLIDES.length);
    }).join("");
    deckName.textContent = DECK === "anexos" ? "Anexos A–G" : "Presentación principal";
    document.title = (DECK === "anexos" ? "Anexos · " : "") + META.title;
    indexMeta.textContent = DECK === "anexos"
      ? "7 anexos técnicos · acceso directo por diapositiva"
      : "16 diapositivas · 14 min 25 s · selecciona una para saltar";
    if (deckLink) {
      deckLink.href = DECK === "anexos" ? "index.html" : "anexos.html";
      deckLink.textContent = DECK === "anexos" ? "Presentación" : "Anexos A–G";
    }
    if (indexAnnexLink) {
      indexAnnexLink.href = DECK === "anexos" ? "index.html" : "anexos.html";
      indexAnnexLink.textContent = DECK === "anexos" ? "← Volver a la presentación" : "Abrir anexos A–G →";
    }
    buildIndex();
  }

  /* ---------------- Índice ---------------- */
  function buildIndex() {
    indexGrid.innerHTML = SLIDES.map(function (slide, i) {
      const thumb = slide.bg ? "background-image:url('" + escapeAttr(slide.bg) + "')" : "";
      return '<button type="button" class="index-item" data-goto="' + i + '">' +
        '<span class="idx-thumb" style="' + thumb + '" aria-hidden="true"></span>' +
        '<span class="idx">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="idx-title">' + slide.title + "</span>" +
        '<span class="idx-time">' + slide.time + "</span>" +
        "</button>";
    }).join("");

    indexGrid.querySelectorAll("[data-goto]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        go(Number(btn.getAttribute("data-goto")));
        closeIndex();
      });
    });
  }

  /* ---------------- Navegación ---------------- */
  function go(index, opts) {
    const options = opts || {};
    if (index < 0) index = 0;
    if (index > SLIDES.length - 1) index = SLIDES.length - 1;
    if (index === current && options.force !== true) {
      return;
    }

    const previous = stage.querySelector(".slide.is-active");
    if (previous) {
      previous.classList.remove("is-active");
      previous.setAttribute("aria-hidden", "true");
    }

    current = index;
    const next = stage.querySelectorAll(".slide")[current];
    if (next) {
      next.classList.add("is-active");
      next.removeAttribute("aria-hidden");
    }

    updateChrome();

    if (options.updateHash !== false && next) {
      try {
        history.replaceState(null, "", "#" + next.id);
      } catch (err) { /* file:// puede restringir replaceState */ }
    }

    if (options.focus === true) {
      stage.focus({ preventScroll: true });
    }

    if (liveRegion) {
      liveRegion.textContent = "Diapositiva " + (current + 1) + " de " + SLIDES.length + ": " + SLIDES[current].title;
    }
  }

  function next() {
    if (current < SLIDES.length - 1) go(current + 1);
  }

  function prev() {
    if (current > 0) go(current - 1);
  }

  function updateChrome() {
    const total = SLIDES.length;
    const human = String(current + 1).padStart(2, "0");
    const totalStr = String(total).padStart(2, "0");
    counter.innerHTML = "<strong>" + human + "</strong> / " + totalStr;
    const pct = total > 1 ? (current / (total - 1)) * 100 : 100;
    const share = Math.round(((current + 1) / total) * 100);
    progressBar.style.width = pct + "%";
    progressLabel.textContent = share + " %";
    if (progressTrack) {
      progressTrack.setAttribute("aria-valuenow", String(share));
      progressTrack.setAttribute("aria-valuetext", "Diapositiva " + (current + 1) + " de " + total);
    }
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;
  }

  /* ---------------- Índice superpuesto ---------------- */
  function openIndex() {
    indexOverlay.hidden = false;
    const active = indexGrid.querySelector('[data-goto="' + current + '"]');
    if (active) {
      active.focus();
      active.scrollIntoView({ block: "nearest" });
    }
  }

  function closeIndex() {
    indexOverlay.hidden = true;
    btnIndex.focus({ preventScroll: true });
  }

  function toggleIndex() {
    if (indexOverlay.hidden) openIndex();
    else closeIndex();
  }

  /* ---------------- Escalado 16:9 ---------------- */
  function fit() {
    if (!stage || !shell) return;
    if (window.matchMedia && window.matchMedia("print").matches) return;
    const wrap = shell.parentElement;
    const availW = Math.max(320, wrap.clientWidth - 20);
    const availH = Math.max(180, wrap.clientHeight - 20);
    const scale = Math.min(availW / 1280, availH / 720);
    stage.style.transform = "scale(" + scale + ")";
    shell.style.width = Math.round(1280 * scale) + "px";
    shell.style.height = Math.round(720 * scale) + "px";
  }

  function scheduleFit() {
    requestAnimationFrame(fit);
    requestAnimationFrame(function () { requestAnimationFrame(fit); });
    setTimeout(fit, 120);
    setTimeout(fit, 350);
  }

  /* ---------------- Pantalla completa ---------------- */
  function toggleFullscreen() {
    const doc = document;
    const root = doc.documentElement;
    if (!doc.fullscreenElement) {
      if (root.requestFullscreen) {
        root.requestFullscreen().catch(function () {
          flash("La pantalla completa no está disponible en este navegador.");
        });
      } else {
        flash("La pantalla completa no está disponible en este navegador.");
      }
    } else if (doc.exitFullscreen) {
      doc.exitFullscreen();
    }
  }

  function updateFullscreenButton() {
    const active = Boolean(document.fullscreenElement);
    btnFull.setAttribute("aria-pressed", String(active));
    btnFull.setAttribute("aria-label", active ? "Salir de pantalla completa" : "Entrar en pantalla completa");
  }

  function flash(message) {
    if (!liveRegion) return;
    liveRegion.textContent = message;
  }

  /* ---------------- Datos de evidencia ---------------- */
  function loadEvidence() {
    // En file:// el navegador bloquea fetch por CORS: usar la copia embebida
    // (assets/data/evidencia.js) sin generar errores en consola.
    if (location.protocol === "file:" && window.EVIDENCIA_DATA) {
      evidenceData = window.EVIDENCIA_DATA;
      PresentacionCharts.renderAll(document, evidenceData);
      return;
    }

    const targets = ["assets/data/rnn_test_series.json", "assets/data/mlp_curves.json"];
    const fetchJson = function (url) {
      return fetch(url, { cache: "no-store" }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      });
    };

    Promise.all(targets.map(fetchJson))
      .then(function (parts) {
        evidenceData = Object.assign({}, parts[0], parts[1]);
        PresentacionCharts.renderAll(document, evidenceData);
      })
      .catch(function () {
        if (window.EVIDENCIA_DATA) {
          evidenceData = window.EVIDENCIA_DATA;
          PresentacionCharts.renderAll(document, evidenceData);
        } else {
          PresentacionCharts.renderAll(document, null);
        }
      });
  }

  /* ---------------- Eventos ---------------- */
  function bind() {
    btnPrev.addEventListener("click", prev);
    btnNext.addEventListener("click", next);
    btnIndex.addEventListener("click", toggleIndex);
    btnCloseIndex.addEventListener("click", closeIndex);
    btnFull.addEventListener("click", toggleFullscreen);
    btnPrint.addEventListener("click", function () { window.print(); });

    if (progressTrack) {
      progressTrack.style.cursor = "pointer";
      progressTrack.title = "Clic para saltar a una diapositiva";
      progressTrack.addEventListener("click", function (event) {
        const rect = progressTrack.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        go(Math.round(ratio * (SLIDES.length - 1)));
      });
    }

    // Paralaje suave del fondo y luz que sigue al cursor.
    let pointerRaf = 0;
    stage.addEventListener("pointermove", function (event) {
      if (pointerRaf) return;
      pointerRaf = requestAnimationFrame(function () {
        pointerRaf = 0;
        const rect = stage.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        stage.style.setProperty("--px", px.toFixed(3));
        stage.style.setProperty("--py", py.toFixed(3));

        const card = event.target.closest && event.target.closest(".card");
        if (card) {
          const cr = card.getBoundingClientRect();
          card.style.setProperty("--mx", ((event.clientX - cr.left) / cr.width * 100).toFixed(1) + "%");
          card.style.setProperty("--my", ((event.clientY - cr.top) / cr.height * 100).toFixed(1) + "%");
        }
      });
    });

    // Gestos táctiles: deslizar para navegar.
    let touchX = 0, touchY = 0, touching = false;
    stage.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse") return;
      touching = true; touchX = event.clientX; touchY = event.clientY;
    });
    stage.addEventListener("pointerup", function (event) {
      if (!touching) return;
      touching = false;
      const dx = event.clientX - touchX, dy = event.clientY - touchY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) next(); else prev();
      }
    });

    indexOverlay.addEventListener("click", function (event) {
      if (event.target === indexOverlay) closeIndex();
    });

    document.addEventListener("fullscreenchange", updateFullscreenButton);

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const key = event.key;
      const onTextInput = event.target && event.target.closest &&
        event.target.closest("input, textarea, select, [contenteditable='true']");
      const onInteractive = event.target && event.target.closest &&
        event.target.closest("button, a, input, textarea, select, [contenteditable='true']");

      if (key === "Escape") {
        if (!indexOverlay.hidden) {
          event.preventDefault();
          closeIndex();
          return;
        }
      }

      if (key === "ArrowRight" || key === "PageDown") {
        if (onTextInput) return;
        event.preventDefault();
        next();
        return;
      }
      if (key === "ArrowLeft" || key === "PageUp") {
        if (onTextInput) return;
        event.preventDefault();
        prev();
        return;
      }
      if (key === "Home") {
        event.preventDefault();
        go(0);
        return;
      }
      if (key === "End") {
        event.preventDefault();
        go(SLIDES.length - 1);
        return;
      }
      if (key === " " || key === "Spacebar") {
        if (onInteractive) return;
        event.preventDefault();
        if (event.shiftKey) prev();
        else next();
        return;
      }
      if (key === "i" || key === "I") {
        event.preventDefault();
        toggleIndex();
        return;
      }
      if (key === "f" || key === "F") {
        event.preventDefault();
        toggleFullscreen();
        return;
      }
      if (key === "p" || key === "P") {
        event.preventDefault();
        window.print();
      }
    });

    window.addEventListener("resize", fit);
    window.addEventListener("hashchange", function () {
      const id = location.hash.replace("#", "");
      const idx = SLIDES.findIndex(function (s) { return s.id === id; });
      if (idx >= 0) go(idx, { updateHash: false });
    });

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(function () { requestAnimationFrame(fit); });
      ro.observe(shell.parentElement);
    }
  }

  /* ---------------- Arranque ---------------- */
  function init() {
    renderDeck();
    bind();
    updateChrome();
    updateFullscreenButton();

    const initial = location.hash.replace("#", "");
    const idx = SLIDES.findIndex(function (s) { return s.id === initial; });
    go(idx >= 0 ? idx : 0, { updateHash: false });
    scheduleFit();
    window.addEventListener("load", scheduleFit);

    loadEvidence();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
