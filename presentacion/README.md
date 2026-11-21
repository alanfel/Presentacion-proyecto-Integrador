# Presentación · Analítica predictiva para la compra de energía y la resiliencia energética en el Cauca

Sustentación académica autocontenida (16:9) construida **junto al tablero existente**, sin modificarlo. Vive en una carpeta independiente: `dashboard-energia-clima-github/presentacion/`.

- **16 diapositivas principales** · 14 min 25 s.
- **7 anexos técnicos A–G** en una ruta separada.
- **Fondo temático distinto por lámina**: 23 ilustraciones vectoriales originales sobre energía, hidrología, red, datos y clima.
- **Notas del presentador en PDF aparte**: guion, transición, pausa/gesto, pregunta probable y respuesta limitada a la evidencia.
- **Enlace al repositorio en la lámina de cierre**: <https://github.com/alanfel/Proyecto_Integrador>, visible y clicable en pantalla y en el PDF.
- **Sin dependencias externas**: HTML, CSS y JavaScript; datos y gráficos locales. No usa CDN ni fuentes remotas.

## Cómo abrirla

### Opción recomendada (servidor local)

Desde la carpeta que contiene `dashboard-energia-clima-github`:

```powershell
python -m http.server 8765
```

Luego abrir:

- Presentación principal: <http://localhost:8765/dashboard-energia-clima-github/presentacion/>
- Anexos: <http://localhost:8765/dashboard-energia-clima-github/presentacion/anexos.html>

> Si el servidor se inicia dentro de `dashboard-energia-clima-github`, la URL es <http://localhost:8765/presentacion/>.

### Opción sin servidor

También se puede abrir `presentacion/index.html` con doble clic. Los gráficos usan una copia embebida de los datos (`assets/data/evidencia.js`) cuando `fetch` no está disponible en `file://`.

### Notas del presentador

Las notas no están dentro de la aplicación. Se entregan en [`NOTAS_PRESENTADOR.pdf`](NOTAS_PRESENTADOR.pdf), con el guion de cada una de las 23 láminas. La versión editable es [`notas.html`](notas.html); el texto fuente vive en `assets/js/slides.js`.

## Controles

| Acción | Tecla / control |
|---|---|
| Siguiente / anterior | `→` `←`, `PageDown` `PageUp`, `Espacio` / `Shift+Espacio` |
| Primera / última | `Home` / `End` |
| Índice de diapositivas | `I` o botón **Índice** |
| Saltar a una lámina | Clic sobre la barra de progreso o sobre una miniatura del índice |
| Pantalla completa | `F` o botón **Pantalla** |
| Imprimir | `P` o botón **Imprimir** |
| Cerrar índice | `Esc` |
| Anexos | Botón **Anexos A–G** (ruta separada) |
| Gesto táctil | Deslizar a izquierda/derecha |

Enlaces profundos: `#s01`…`#s16` en la presentación y `#a01`…`#a07` en anexos.

## Impresión

El CSS de impresión usa:

```css
@page { size: 13.333in 7.5in; margin: 0; }
```

Una diapositiva por página, en horizontal, con fondos oscuros y sin controles. En el diálogo del navegador:

1. Destino: PDF o impresora.
2. Diseño: horizontal.
3. Márgenes: ninguno.
4. Activar **Gráficos de fondo**.

Los anexos se imprimen por separado desde `anexos.html`.

## Estructura

```text
presentacion/
├── index.html                    # Presentación principal (16)
├── anexos.html                   # Anexos A–G (7)
├── notas.html                    # Fuente imprimible de las notas
├── NOTAS_PRESENTADOR.pdf         # Notas del presentador (A4, 13 pp.)
├── NOTAS_PRESENTADOR.md          # Guion completo en Markdown
├── README.md
├── REGISTRO_EVIDENCIA.md         # Evidencia, discrepancias y datos faltantes
└── assets/
    ├── css/presentacion.css      # Diseño, 16:9, fondos, índice e impresión
    ├── js/slides.js              # SOLO contenido: títulos, HTML, fuentes, notas
    ├── js/charts.js              # Gráficos SVG y tooltips interactivos
    ├── js/app.js                 # Motor: navegación, índice, fondo, escalado
    ├── data/rnn_test_series.json # 118 puntos reales de la ejecución AR(12)
    ├── data/mlp_curves.json      # 300 épocas y 150 puntos del MLP
    ├── data/evidencia.js         # Copia embebida para abrir sin servidor
    ├── img/bg/                   # 23 fondos SVG, uno por lámina
    └── img/app_hero.png          # Captura real del tablero local
```

### Contenido separado de la interfaz

Cada objeto de `slides.js` contiene:

```js
{
  id, kicker, title, layout, bg,
  content,          // HTML semántico de la lámina
  visual,           // HTML del gráfico, tabla o captura
  sources: [],      // archivos o ejecuciones que respaldan
  evidence,         // metadato interno de auditoría (no se muestra en pantalla)
  evidenceNote,     // límite concreto de la afirmación (no se muestra)
  time,             // duración objetivo
  notes: { script, transition, cue, question, answer }
}
```

`app.js` no contiene texto académico; solo renderiza y controla. Los gráficos se construyen desde los JSON extraídos de la ejecución, sin series simuladas.

## Interacción y fondos

- **Un fondo distinto por lámina**: 23 SVG originales (16 principales + 7 anexos) con paleta azul marino, grafito, turquesa y ámbar.
- **Paralaje suave**: el fondo se desplaza unos píxeles con el puntero; se desactiva con `prefers-reduced-motion`.
- **Gráficos interactivos**: tooltips con fecha, valor real, predicción y error en la serie AR(12); pérdida por época y dispersión en el MLP.
- **Índice con miniaturas** de cada fondo y salto directo.
- **Barra de progreso clicable** para saltar a cualquier lámina.
- **Tarjetas con realce** que sigue al cursor.
- **Gestos táctiles**: deslizar para avanzar o retroceder.

## Trazabilidad interna

La aplicación ya no muestra estados de evidencia. Cada lámina conserva su línea de **fuente** al pie y las cifras se mantienen rastreables a archivos o ejecuciones. El campo `evidence` y las notas de alcance siguen en `slides.js` y en `REGISTRO_EVIDENCIA.md` como metadatos de auditoría, pero no se renderizan en pantalla ni en impresión.

## Decisiones de honestidad académica

- El módulo llamado **«RNN»** del tablero es un **AR(12) lineal** con ridge `1e-3`; se presenta con ese nombre real.
- El **MLP con R² 0.985** se muestra como ajuste contemporáneo con **leakage**, no como pronóstico.
- El **backend Keras** se describe como código existente **sin artefacto reproducible**.
- Los **dos datasets** de la propuesta y del tablero se presentan como series divergentes (correlación 0.0434), no como versiones del mismo dato.
- Ninguna cifra se inventa: cuando falta evidencia se declara en el texto, sin estimar ni completar valores.

## Verificación realizada

Pruebas ejecutadas con Google Chrome 158 en modo headless, vía Chrome DevTools Protocol, sobre el servidor local:

- 16 diapositivas principales y 7 anexos renderizados, cada una con fondo propio.
- Navegación con botones y teclado (`←`, `→`, `I`, `Esc`) verificada; `N` ya no existe.
- Índice con 16/7 miniaturas y salto directo; barra de progreso clicable.
- Tooltips de los tres gráficos (AR, pérdida MLP y dispersión MLP).
- Enlaces profundos (`#s07`, `#a06`) verificados.
- **Sin recorte** en las 23 láminas: `scrollWidth/Height` y desbordamiento del cuerpo en 0 px.
- **Sin errores de consola** y **sin solicitudes externas**.
- Apertura directa con `file://`: 16 diapositivas y 3 gráficos desde la copia embebida, sin errores de consola.
- Escenario 16:9: 1280 × 720 escalado a la ventana; en impresión, 1280 × 720 exactos.
- PDF principal: **16 páginas**; anexos: **7 páginas**; tamaño de página **960 × 540 pt = 13.333 × 7.5 in**.
- Enlace de cierre: URL, `target="_blank"` y `rel="noopener noreferrer"` verificados; el PDF principal incluye la anotación `/URI` del repositorio.
- Notas del presentador: **13 páginas A4** (595 × 842 pt), 23 láminas.
- `prefers-reduced-motion` aplica transiciones de 1e-06 s.
- CSS de impresión oculta controles, muestra todas las láminas y anula la transformación de pantalla.

## Documentos de apoyo

- [`NOTAS_PRESENTADOR.pdf`](NOTAS_PRESENTADOR.pdf): guion completo de las 23 láminas, listo para imprimir.
- [`notas.html`](notas.html): fuente editable del PDF de notas.
- [`REGISTRO_EVIDENCIA.md`](REGISTRO_EVIDENCIA.md): trazabilidad, discrepancias y datos faltantes.
