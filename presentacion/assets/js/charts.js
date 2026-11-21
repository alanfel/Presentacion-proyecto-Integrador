/* =========================================================
   Gráficos SVG construidos a partir de datos reales extraídos
   de la ejecución del tablero. Sin librerías externas.
   ========================================================= */

(function (root) {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const COLORS = {
    real: "#cbd5e1",
    pred: "#2dd4bf",
    train: "#fbbf24",
    val: "#2dd4bf",
    grid: "rgba(148, 163, 184, 0.16)",
    axis: "rgba(148, 163, 184, 0.45)",
    text: "#8ea3bc",
    point: "rgba(251, 191, 36, 0.62)"
  };

  function el(name, attrs, text) {
    const node = document.createElementNS(NS, name);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        node.setAttribute(k, attrs[k]);
      });
    }
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function svgRoot(w, h, label) {
    return el("svg", {
      viewBox: "0 0 " + w + " " + h,
      role: "img",
      "aria-label": label,
      preserveAspectRatio: "xMidYMid meet"
    });
  }

  function linePath(pts) {
    return pts
      .map(function (p, i) {
        return (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1);
      })
      .join(" ");
  }

  function legend(items) {
    const box = document.createElement("div");
    box.className = "chart-legend";
    items.forEach(function (item) {
      const span = document.createElement("span");
      span.className = "legend-item";
      const sw = document.createElement("span");
      sw.className = "legend-swatch" + (item.dot ? " legend-swatch--dot" : "");
      sw.style.background = item.color;
      span.appendChild(sw);
      span.appendChild(document.createTextNode(item.label));
      box.appendChild(span);
    });
    return box;
  }

  function empty(container, message) {
    container.innerHTML = "";
    const p = document.createElement("div");
    p.className = "chart-empty";
    p.textContent = message;
    container.appendChild(p);
  }

  /* ---------------- Interacción: tooltip sobre el gráfico ---------------- */
  function attachTip(container, svg, points, mode, buildTip, dotSpec) {
    if (!points || !points.length) return;
    const tip = document.createElement("div");
    tip.className = "chart-tip";
    container.appendChild(tip);

    const layer = el("g", { "class": "chart-hover-dot", opacity: 0 });
    const vline = el("line", {
      x1: 0, y1: 0, x2: 0, y2: 0,
      stroke: "rgba(203, 213, 225, 0.35)", "stroke-width": 1, "stroke-dasharray": "3 3"
    });
    layer.appendChild(vline);
    const dots = [];
    const specs = dotSpec || [{ fill: COLORS.pred, r: 3.4 }];
    specs.forEach(function (spec) {
      const dot = el("circle", { cx: 0, cy: 0, r: spec.r || 3.4, fill: spec.fill, stroke: "#07101c", "stroke-width": 1.4 });
      layer.appendChild(dot);
      dots.push(dot);
    });
    svg.appendChild(layer);

    function toLocal(event) {
      const matrix = svg.getScreenCTM();
      if (!matrix) return null;
      const pt = svg.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      return pt.matrixTransform(matrix.inverse());
    }

    function nearest(local) {
      let best = points[0], bestD = Infinity;
      if (mode === "x") {
        points.forEach(function (p) {
          const d = Math.abs(p.x - local.x);
          if (d < bestD) { bestD = d; best = p; }
        });
      } else {
        points.forEach(function (p) {
          const d = Math.hypot(p.x - local.x, p.y - local.y);
          if (d < bestD) { bestD = d; best = p; }
        });
        if (bestD > 22) return null;
      }
      return best;
    }

    svg.addEventListener("pointermove", function (event) {
      const local = toLocal(event);
      if (!local) return;
      const p = nearest(local);
      if (!p) { hide(); return; }

      layer.setAttribute("opacity", 1);
      if (mode === "x") {
        vline.setAttribute("x1", p.x); vline.setAttribute("x2", p.x);
        vline.setAttribute("y1", p.top != null ? p.top : 0);
        vline.setAttribute("y2", p.bottom != null ? p.bottom : 0);
      } else {
        vline.setAttribute("opacity", 0);
      }
      dots.forEach(function (dot, i) {
        const yy = i === 0 ? p.y : (p.y2 != null ? p.y2 : p.y);
        dot.setAttribute("cx", p.x);
        dot.setAttribute("cy", yy);
      });

      tip.innerHTML = buildTip(p);
      const cRect = container.getBoundingClientRect();
      const sPt = svg.createSVGPoint();
      sPt.x = p.x; sPt.y = p.y;
      const screen = sPt.matrixTransform(svg.getScreenCTM());
      tip.style.left = (screen.x - cRect.left) + "px";
      tip.style.top = (screen.y - cRect.top) + "px";
      tip.classList.add("is-visible");
    });

    function hide() {
      layer.setAttribute("opacity", 0);
      tip.classList.remove("is-visible");
    }
    svg.addEventListener("pointerleave", hide);
    svg.addEventListener("pointercancel", hide);
  }

  function tipRow(label, value) {
    return '<span class="row"><span>' + label + '</span><b>' + value + "</b></span>";
  }

  /* ---------------- AR(12): serie real vs predicción ---------------- */
  function renderAR(container, data) {
    if (!data || !Array.isArray(data.real) || !Array.isArray(data.pred) || !data.real.length) {
      empty(container, "Serie no disponible. Ejecute el servidor local para cargar los datos de evidencia.");
      return;
    }

    container.innerHTML = "";

    const W = 900, H = 260;
    const m = { l: 60, r: 20, t: 20, b: 32 };
    const iw = W - m.l - m.r;
    const ih = H - m.t - m.b;
    const maxY = 750;
    const n = data.real.length;
    const x = function (i) { return m.l + (i / (n - 1)) * iw; };
    const y = function (v) { return m.t + ih - (v / maxY) * ih; };

    const svg = svgRoot(W, H, "Precio real y predicción AR de 12 rezagos entre 2015 y 2024");

    [0, 150, 300, 450, 600, 750].forEach(function (tick) {
      const yy = y(tick);
      svg.appendChild(el("line", { x1: m.l, y1: yy, x2: W - m.r, y2: yy, stroke: COLORS.grid, "stroke-width": 1 }));
      svg.appendChild(el("text", {
        x: m.l - 9, y: yy + 4, "text-anchor": "end",
        fill: COLORS.text, "font-size": 11, "font-family": "Segoe UI, Arial, sans-serif"
      }, String(tick)));
    });

    const years = [];
    (data.x || []).forEach(function (date, i) {
      const yr = String(date).slice(0, 4);
      if (years.indexOf(yr) !== -1) return;
      years.push(yr);
      const xx = x(i);
      svg.appendChild(el("line", { x1: xx, y1: m.t, x2: xx, y2: m.t + ih, stroke: COLORS.grid, "stroke-width": 1 }));
      svg.appendChild(el("text", {
        x: xx, y: H - 16, "text-anchor": "middle",
        fill: COLORS.text, "font-size": 11, "font-family": "Segoe UI, Arial, sans-serif"
      }, yr));
    });

    svg.appendChild(el("line", { x1: m.l, y1: m.t + ih, x2: W - m.r, y2: m.t + ih, stroke: COLORS.axis, "stroke-width": 1 }));
    svg.appendChild(el("line", { x1: m.l, y1: m.t, x2: m.l, y2: m.t + ih, stroke: COLORS.axis, "stroke-width": 1 }));

    svg.appendChild(el("text", {
      x: m.l, y: 12, fill: COLORS.text, "font-size": 10.5,
      "font-family": "Segoe UI, Arial, sans-serif", "letter-spacing": ".06em"
    }, "COP/kWh"));
    svg.appendChild(el("text", {
      x: W - m.r, y: H - 2, "text-anchor": "end", fill: COLORS.text, "font-size": 10.5,
      "font-family": "Segoe UI, Arial, sans-serif"
    }, "Año"));

    const realPts = data.real.map(function (v, i) { return [x(i), y(v)]; });
    const predPts = data.pred.map(function (v, i) { return [x(i), y(v)]; });

    svg.appendChild(el("path", {
      d: linePath(realPts), fill: "none", stroke: COLORS.real,
      "stroke-width": 1.5, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0.9
    }));
    svg.appendChild(el("path", {
      d: linePath(predPts), fill: "none", stroke: COLORS.pred,
      "stroke-width": 2.2, "stroke-linejoin": "round", "stroke-linecap": "round"
    }));

    container.appendChild(svg);
    container.appendChild(legend([
      { label: "Precio real", color: COLORS.real },
      { label: "Predicción AR(12)", color: COLORS.pred }
    ]));

    const hoverPoints = data.real.map(function (v, i) {
      return {
        x: x(i), y: y(v), y2: y(data.pred[i]),
        top: m.t, bottom: m.t + ih,
        date: (data.x || [])[i] || ("Observación " + (i + 1)),
        real: v, pred: data.pred[i]
      };
    });
    attachTip(container, svg, hoverPoints, "x", function (p) {
      const err = p.pred - p.real;
      return "<strong>" + p.date + "</strong>" +
        tipRow("Precio real", p.real.toFixed(1)) +
        tipRow("Predicción", p.pred.toFixed(1)) +
        tipRow("Error", (err >= 0 ? "+" : "") + err.toFixed(1)) +
        '<span class="row" style="color:#7e91aa">COP/kWh</span>';
    }, [{ fill: COLORS.real }, { fill: COLORS.pred }]);
  }

  /* ---------------- MLP: curvas de pérdida ---------------- */
  function renderLoss(container, data) {
    if (!data || !Array.isArray(data.lossTrain) || !data.lossTrain.length) {
      empty(container, "Curvas no disponibles. Ejecute el servidor local.");
      return;
    }

    container.innerHTML = "";

    const W = 480, H = 250;
    const m = { l: 48, r: 12, t: 20, b: 30 };
    const iw = W - m.l - m.r;
    const ih = H - m.t - m.b;
    const n = data.lossTrain.length;
    const lo = Math.log10(0.01);
    const hi = Math.log10(1);
    const x = function (i) { return m.l + (i / (n - 1)) * iw; };
    const y = function (v) {
      const lv = Math.log10(Math.max(v, 0.01));
      return m.t + ih - ((lv - lo) / (hi - lo)) * ih;
    };

    const svg = svgRoot(W, H, "Curvas de pérdida MSE de entrenamiento y validación durante 300 épocas");

    [1, 0.3, 0.1, 0.03, 0.01].forEach(function (tick) {
      const yy = y(tick);
      svg.appendChild(el("line", { x1: m.l, y1: yy, x2: W - m.r, y2: yy, stroke: COLORS.grid, "stroke-width": 1 }));
      svg.appendChild(el("text", {
        x: m.l - 7, y: yy + 4, "text-anchor": "end",
        fill: COLORS.text, "font-size": 12.5, "font-family": "Segoe UI, Arial, sans-serif"
      }, String(tick)));
    });

    [1, 50, 100, 150, 200, 250, 300].forEach(function (tick) {
      const xx = x(tick - 1);
      svg.appendChild(el("text", {
        x: xx, y: H - 14, "text-anchor": "middle",
        fill: COLORS.text, "font-size": 12.5, "font-family": "Segoe UI, Arial, sans-serif"
      }, String(tick)));
    });

    svg.appendChild(el("line", { x1: m.l, y1: m.t + ih, x2: W - m.r, y2: m.t + ih, stroke: COLORS.axis, "stroke-width": 1 }));
    svg.appendChild(el("line", { x1: m.l, y1: m.t, x2: m.l, y2: m.t + ih, stroke: COLORS.axis, "stroke-width": 1 }));

    svg.appendChild(el("text", {
      x: m.l, y: 11, fill: COLORS.text, "font-size": 12,
      "font-family": "Segoe UI, Arial, sans-serif"
    }, "MSE (precio estandarizado) · escala log"));
    svg.appendChild(el("text", {
      x: W - m.r, y: H - 1, "text-anchor": "end", fill: COLORS.text, "font-size": 12,
      "font-family": "Segoe UI, Arial, sans-serif"
    }, "Época"));

    const trainPts = data.lossTrain.map(function (v, i) { return [x(i), y(v)]; });
    const valPts = data.lossVal.map(function (v, i) { return [x(i), y(v)]; });

    svg.appendChild(el("path", {
      d: linePath(trainPts), fill: "none", stroke: COLORS.train,
      "stroke-width": 1.7, "stroke-linejoin": "round", "stroke-linecap": "round"
    }));
    svg.appendChild(el("path", {
      d: linePath(valPts), fill: "none", stroke: COLORS.val,
      "stroke-width": 1.5, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0.95
    }));

    container.appendChild(svg);
    container.appendChild(legend([
      { label: "Entrenamiento", color: COLORS.train },
      { label: "Test (validación)", color: COLORS.val }
    ]));

    const hoverPoints = data.lossTrain.map(function (v, i) {
      return {
        x: x(i), y: y(v), y2: y(data.lossVal[i]),
        top: m.t, bottom: m.t + ih,
        epoch: i + 1, train: v, val: data.lossVal[i]
      };
    });
    attachTip(container, svg, hoverPoints, "x", function (p) {
      return "<strong>Época " + p.epoch + "</strong>" +
        tipRow("Entrenamiento", p.train.toFixed(4)) +
        tipRow("Validación", p.val.toFixed(4)) +
        '<span class="row" style="color:#7e91aa">MSE · escala log</span>';
    }, [{ fill: COLORS.train }, { fill: COLORS.val }]);
  }

  /* ---------------- MLP: dispersión real vs predicho ---------------- */
  function renderScatter(container, data) {
    if (!data || !Array.isArray(data.actual) || !data.actual.length) {
      empty(container, "Dispersión no disponible.");
      return;
    }

    container.innerHTML = "";

    const W = 480, H = 250;
    const m = { l: 48, r: 12, t: 20, b: 30 };
    const iw = W - m.l - m.r;
    const ih = H - m.t - m.b;
    const maxV = 750;
    const x = function (v) { return m.l + (v / maxV) * iw; };
    const y = function (v) { return m.t + ih - (v / maxV) * ih; };

    const svg = svgRoot(W, H, "Dispersión entre precio real y precio predicho por el MLP");

    [0, 150, 300, 450, 600, 750].forEach(function (tick) {
      const yy = y(tick);
      const xx = x(tick);
      svg.appendChild(el("line", { x1: m.l, y1: yy, x2: W - m.r, y2: yy, stroke: COLORS.grid, "stroke-width": 1 }));
      svg.appendChild(el("line", { x1: xx, y1: m.t, x2: xx, y2: m.t + ih, stroke: COLORS.grid, "stroke-width": 1 }));
      svg.appendChild(el("text", {
        x: m.l - 7, y: yy + 4, "text-anchor": "end",
        fill: COLORS.text, "font-size": 12.5, "font-family": "Segoe UI, Arial, sans-serif"
      }, String(tick)));
      svg.appendChild(el("text", {
        x: xx, y: H - 14, "text-anchor": "middle",
        fill: COLORS.text, "font-size": 12.5, "font-family": "Segoe UI, Arial, sans-serif"
      }, String(tick)));
    });

    svg.appendChild(el("line", { x1: m.l, y1: m.t + ih, x2: W - m.r, y2: m.t + ih, stroke: COLORS.axis, "stroke-width": 1 }));
    svg.appendChild(el("line", { x1: m.l, y1: m.t, x2: m.l, y2: m.t + ih, stroke: COLORS.axis, "stroke-width": 1 }));

    svg.appendChild(el("line", {
      x1: x(0), y1: y(0), x2: x(maxV), y2: y(maxV),
      stroke: "rgba(203, 213, 225, 0.5)", "stroke-width": 1, "stroke-dasharray": "4 4"
    }));

    data.actual.forEach(function (v, i) {
      const p = data.pred[i];
      if (typeof p !== "number") return;
      svg.appendChild(el("circle", {
        cx: x(v), cy: y(p), r: 2, fill: COLORS.point
      }));
    });

    svg.appendChild(el("text", {
      x: m.l, y: 11, fill: COLORS.text, "font-size": 11,
      "font-family": "Segoe UI, Arial, sans-serif"
    }, "Predicho (COP/kWh)"));
    svg.appendChild(el("text", {
      x: W - m.r, y: H - 1, "text-anchor": "end", fill: COLORS.text, "font-size": 11,
      "font-family": "Segoe UI, Arial, sans-serif"
    }, "Real (COP/kWh)"));

    svg.appendChild(el("text", {
      x: W - m.r - 4, y: m.t + 15, "text-anchor": "end",
      fill: COLORS.train, "font-size": 13, "font-weight": 700,
      "font-family": "Segoe UI, Arial, sans-serif"
    }, "R² = 0.985 · n = 150"));

    container.appendChild(svg);
    container.appendChild(legend([
      { label: "Test aleatorio", color: COLORS.train, dot: true },
      { label: "Identidad", color: "rgba(203, 213, 225, 0.7)" }
    ]));

    const hoverPoints = [];
    data.actual.forEach(function (v, i) {
      const p = data.pred[i];
      if (typeof p !== "number") return;
      hoverPoints.push({ x: x(v), y: y(p), actual: v, pred: p });
    });
    attachTip(container, svg, hoverPoints, "nearest", function (p) {
      return "<strong>Observación</strong>" +
        tipRow("Real", p.actual.toFixed(1)) +
        tipRow("Predicho", p.pred.toFixed(1)) +
        tipRow("Error", (p.pred - p.actual).toFixed(1)) +
        '<span class="row" style="color:#7e91aa">COP/kWh</span>';
    }, [{ fill: COLORS.train, r: 4.5 }]);
  }

  function renderAll(scope, data) {
    const map = {
      ar: renderAR,
      "mlp-loss": renderLoss,
      "mlp-scatter": renderScatter
    };

    (scope || document).querySelectorAll("[data-chart]").forEach(function (node) {
      const kind = node.getAttribute("data-chart");
      const fn = map[kind];
      if (!fn) return;
      try {
        fn(node, data);
      } catch (err) {
        empty(node, "No fue posible dibujar el gráfico.");
        if (window.console) console.error("Chart error:", kind, err);
      }
    });
  }

  root.PresentacionCharts = { renderAll: renderAll };
})(typeof window !== "undefined" ? window : globalThis);
