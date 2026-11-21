/* =========================================================
   CONTENIDO DE LA PRESENTACIÓN
   Separado de la interfaz: aquí solo hay datos y HTML semántico.
   Cada diapositiva declara: id, título, contenido, visual,
   fuentes, estado de evidencia, tiempo y notas del presentador.
   ========================================================= */

(function (root) {
  "use strict";

  const META = {
    title: "Analítica predictiva para la compra de energía y la resiliencia energética en el Cauca",
    short: "Analítica predictiva · Energía y clima",
    institution: "UNICOMFACAUCA · Proyecto Integrador",
    subtitle: "Qué se construyó, qué se verificó y qué todavía no puede afirmarse",
    date: "Sustentación académica · Noviembre de 2026",
    duration: "16 diapositivas · 14 min 25 s",
    version: "1.0"
  };

  const MAIN = [
    {
      id: "s01",
      bg: "assets/img/bg/bg-01.svg",
      kicker: "Sustentación · Proyecto Integrador",
      title: "La energía de decidir antes",
      layout: "cover",
      content: `
        <div class="cover-top">
          <div class="cover-brand">
            <span class="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M13.5 2 5 14h6l-1.5 8L18 10h-6l1.5-8Z" fill="currentColor"/></svg>
            </span>
            <span>UNICOMFACAUCA · Proyecto Integrador</span>
          </div>
          <span class="cover-date">Noviembre de 2026</span>
        </div>
        <div class="cover-main">
          <h1>La energía de <span class="accent">decidir antes</span></h1>
          <p class="cover-sub">Analítica predictiva para apoyar el abastecimiento eléctrico y evaluar alternativas de resiliencia energética en el Cauca.</p>
        </div>
        <div class="cover-bottom">
          <div class="cover-meta">
            <strong>Sistema de analítica predictiva para el abastecimiento eléctrico</strong>
            <span>UNICOMFACAUCA · Facultad de Ingeniería · Diplomado en Energía Circular Inteligente 5.0</span>
            <span>Popayán, Cauca · 2026 · 16 diapositivas · Anexos A–G</span>
          </div>
          <div class="cover-legend" aria-label="Ejes de la sustentación">
            <span class="small">Ejes de la sustentación</span>
            <div class="axis-row">
              <span class="axis-chip">Precio</span>
              <span class="axis-chip">Continuidad</span>
              <span class="axis-chip">Decisión</span>
            </div>
            <span class="small">Datos, modelos y límites</span>
          </div>
        </div>
      `,
      sources: [
        "Propuesta del proyecto (PDF, 42 pp.)",
        "Repositorio local: tablero estático y backend",
        "Archivos de datos revisados"
      ],
      evidence: "mixto",
      evidenceNote: "La presentación combina hallazgos verificados, resultados reportados en documentos y brechas explícitas.",
      time: "0:45",
      notes: {
        script: "Buenos días. Esta sustentación presenta un prototipo de analítica predictiva para apoyar decisiones de compra de energía y resiliencia en el Cauca. Voy a separar tres cosas: lo que el proyecto declara, lo que pude verificar ejecutando el código y lo que no está disponible. La contribución principal no es un porcentaje de precisión, sino un marco auditable para decidir con evidencia.",
        transition: "Empiezo por el problema que justifica la analítica.",
        cue: "Pausa breve después de «no puede afirmarse»; señalar los tres ejes de la portada: precio, continuidad y decisión.",
        question: "¿Cuál es el aporte original del proyecto?",
        answer: "Un prototipo funcional y una auditoría explícita de sus límites. No presento un modelo predictivo validado: presento lo que la evidencia sostiene y lo que falta para validarlo."
      }
    },

    {
      id: "s02",
      bg: "assets/img/bg/bg-02.svg",
      kicker: "01 · Contexto",
      title: "Comprar energía en un sistema hidro-dominado",
      layout: "statement",
      content: `
        <p class="lead">El precio de bolsa depende de la hidrología, el clima y la demanda. Una comercializadora regional enfrenta esa volatilidad sin certeza sobre el próximo mes.</p>
        <div class="grid-3" style="margin-top:26px">
          <div class="card">
            <h3>Volatilidad de precio</h3>
            <p>El costo de compra cambia mes a mes y presiona el margen de comercialización.</p>
          </div>
          <div class="card">
            <h3>Dependencia hídrica</h3>
            <p>Aportes y embalses condicionan la generación; el clima agrega otra capa de riesgo.</p>
          </div>
          <div class="card">
            <h3>Decisión incompleta</h3>
            <p>Contratos, cobertura y caja se deciden antes de conocer el precio del siguiente periodo.</p>
          </div>
        </div>
        <div class="callout" style="margin-top:26px">
          <span aria-hidden="true">◆</span>
          <span><strong>La pregunta no es solo predecir:</strong> es decidir con incertidumbre y poder justificar esa decisión.</span>
        </div>
      `,
      sources: [
        "Propuesta del proyecto: planteamiento del problema",
        "Revisión de repositorio: no se encontraron contratos, demanda propia ni precios de compra de la organización"
      ],
      evidence: "no-disponible",
      evidenceNote: "Faltan datos organizacionales: contratos, demanda propia, precios de compra y restricciones de caja.",
      time: "0:50",
      notes: {
        script: "En un sistema hidro-dominado, el precio de bolsa se mueve con los aportes, los embalses y la demanda. Para una comercializadora regional, eso significa comprar antes de saber el precio. El proyecto no parte de un mercado abstracto: parte de esa presión de decisión. Pero aquí aparece la primera advertencia: no encontré contratos, demanda propia ni precios de compra de la organización.",
        transition: "Con ese vacío, formulo la pregunta y los objetivos.",
        cue: "Bajar la voz en «comprar antes de saber el precio»; pausa de un segundo.",
        question: "¿Por qué el Cauca y no el sistema nacional?",
        answer: "El dataset incluye un componente G de Cauca, pero no contiene contratos ni demanda de una empresa específica. El alcance territorial está en la propuesta; la evidencia operativa no está disponible."
      }
    },

    {
      id: "s03",
      bg: "assets/img/bg/bg-03.svg",
      kicker: "02 · Pregunta y objetivos",
      title: "Una pregunta que obliga a distinguir evidencia de expectativa",
      layout: "statement",
      content: `
        <div class="card" style="border-left:3px solid var(--teal);padding:20px 22px">
          <p style="font-size:22px;line-height:1.4;color:#e9eff8">¿Cómo usar analítica predictiva para mejorar la compra de energía y la resiliencia en el Cauca <strong style="color:var(--teal)">sin sobreestimar la evidencia disponible</strong>?</p>
        </div>
        <ol class="number-list" style="margin-top:22px">
          <li>Auditar y consolidar los datos disponibles.</li>
          <li>Ejecutar y comparar los módulos analíticos del prototipo.</li>
          <li>Traducir los resultados en criterios de decisión de compra.</li>
          <li>Documentar límites, brechas y condiciones de validez.</li>
        </ol>
        <div class="callout callout--teal" style="margin-top:20px">
          <span aria-hidden="true">◆</span>
          <span><strong>Criterio de honestidad:</strong> si una cifra no se puede reproducir, se etiqueta como reportada; si no existe, se declara no disponible.</span>
        </div>
      `,
      sources: [
        "Síntesis propia a partir de la propuesta del proyecto",
        "Los objetivos no aparecen formulados con este nivel de detalle en el PDF"
      ],
      evidence: "conceptual",
      evidenceNote: "Formulación de trabajo: ordena la sustentación, no sustituye el planteamiento original.",
      time: "0:50",
      notes: {
        script: "La pregunta central no es «qué modelo acierta más». Es cómo usar analítica para mejorar una decisión de compra sin sobreestimar la evidencia. Por eso los objetivos incluyen auditar los datos y documentar los límites, no solo entrenar modelos. La regla es simple: toda cifra debe poder rastrearse hasta un archivo o una ejecución; si no, se etiqueta.",
        transition: "Antes de los modelos, necesito definir qué significa resiliencia en este contexto.",
        cue: "Contar los cuatro objetivos con la mano; detenerse en el cuarto.",
        question: "¿Documentar límites es un objetivo académico o una excusa?",
        answer: "Es un objetivo metodológico. Sin límites explícitos, un R² alto puede inducir una decisión de compra equivocada. La auditoría es parte del aporte."
      }
    },

    {
      id: "s04",
      bg: "assets/img/bg/bg-04.svg",
      kicker: "03 · Marco de trabajo",
      title: "De la predicción a la resiliencia",
      layout: "three",
      content: `
        <div class="columns-3">
          <div class="column-card">
            <span class="label">Analítica predictiva</span>
            <h3>Estimar escenarios</h3>
            <p>No un número único: una distribución de precios futuros con supuestos explícitos y error medido.</p>
          </div>
          <div class="column-card">
            <span class="label">Resiliencia energética</span>
            <h3>Anticipar y absorber</h3>
            <p>Capacidad de anticipar, absorber y recuperarse de choques de precio o de suministro.</p>
          </div>
          <div class="column-card">
            <span class="label">Decisión de compra</span>
            <h3>Cubrir con reglas</h3>
            <p>Contratos por tramos, reservas y límites de riesgo bajo restricciones de caja.</p>
          </div>
        </div>
        <div class="callout" style="margin-top:28px">
          <span aria-hidden="true">◆</span>
          <span><strong>Un modelo útil informa una decisión.</strong> Una métrica alta, por sí sola, no dice si la compra mejora.</span>
        </div>
        <p class="small" style="margin-top:14px">Definiciones de trabajo. La propuesta no desarrolla un marco teórico detallado ni cita literatura específica de resiliencia.</p>
      `,
      sources: [
        "Definiciones de trabajo elaboradas para esta sustentación",
        "Propuesta del proyecto: objetivos generales"
      ],
      evidence: "conceptual",
      evidenceNote: "Marco conceptual, sin validación empírica en esta entrega.",
      time: "0:45",
      notes: {
        script: "Aquí conviene separar tres capas. La analítica predictiva estima escenarios, no certezas. La resiliencia es la capacidad de anticipar, absorber y recuperarse. Y la decisión de compra combina contratos, reservas y límites de riesgo. La consecuencia es que un modelo solo es útil si cambia o sostiene una regla de decisión. Ese es el criterio con el que voy a evaluar el prototipo.",
        transition: "Veamos con qué datos se alimentó ese prototipo.",
        cue: "Señalar las tres columnas en orden, sin prisa.",
        question: "¿La resiliencia se puede medir con un R²?",
        answer: "No. El R² mide ajuste estadístico. La resiliencia requiere indicadores de exposición, cobertura, recuperación y costo del error, que no están en los datos revisados."
      }
    },

    {
      id: "s05",
      bg: "assets/img/bg/bg-05.svg",
      kicker: "04 · Datos",
      title: "Dos datos que no cuentan la misma historia",
      layout: "table",
      content: `
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Característica</th>
                <th>Tablero estático</th>
                <th>Dataset de la propuesta</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Registros</td><td class="num">600</td><td class="num">600</td></tr>
              <tr><td>Periodo</td><td class="num">1975-01 → 2024-12</td><td class="num">1975-01 → 2024-12</td></tr>
              <tr><td>Precio de bolsa (COP/kWh)</td><td class="num">68.41 – 709.40</td><td class="num">64.99 – 203.41</td></tr>
              <tr><td>Columnas de ONI</td><td class="num">1</td><td class="num">2</td></tr>
              <tr><td>Aportes hídricos &gt; 100 %</td><td class="num">233 meses</td><td class="num">561 meses</td></tr>
              <tr><td>Correlación entre series de precio</td><td class="num" colspan="2">0.0434</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout" style="margin-top:24px">
          <span aria-hidden="true">◆</span>
          <span><strong>Mismo periodo, misma etiqueta, series casi independientes.</strong> Elegir un dataset cambia cualquier resultado y cualquier conclusión.</span>
        </div>
        <p class="small" style="margin-top:12px">La propuesta y el tablero no documentan una reconciliación entre ambos archivos.</p>
      `,
      sources: [
        "datos_filtrados.csv y assets/data.js (tablero)",
        "energia-clima-dashboard/backend/data/dataset_unificado_energia_clima.csv (propuesta)",
        "Cálculo local de rangos y correlación de Pearson"
      ],
      evidence: "verificado",
      evidenceNote: "Rangos, conteos y correlación calculados directamente sobre los archivos.",
      time: "1:00",
      notes: {
        script: "Este es uno de los hallazgos centrales. La propuesta y el tablero usan archivos distintos, aunque ambos tengan 600 meses y la misma etiqueta de precio. Los rangos no coinciden: el tablero llega a 709 COP por kWh y la propuesta a 203. La correlación entre ambas series es 0.043, prácticamente cero. No son dos versiones del mismo dato: son dos universos. Por eso ningún resultado es comparable sin decir qué archivo se usó.",
        transition: "Con esa advertencia, revisemos qué se construyó.",
        cue: "Señalar la fila de correlación y dejar que el número hable; pausa.",
        question: "¿Cuál de los dos datasets es el correcto?",
        answer: "No puedo determinarlo con la evidencia revisada. La propuesta describe uno, el tablero usa otro y no hay documento de reconciliación. Cualquier afirmación empírica debe declarar cuál se usó."
      }
    },

    {
      id: "s06",
      bg: "assets/img/bg/bg-06.svg",
      kicker: "05 · Arquitectura",
      title: "Qué se construyó y qué se pudo ejecutar",
      layout: "split-wide-left",
      content: `
        <div class="pipeline" aria-label="Flujo del prototipo">
          <div class="pipe-step"><span class="n">01</span><strong>CSV</strong><span>600 × 10</span></div>
          <div class="pipe-arrow" aria-hidden="true">›</div>
          <div class="pipe-step"><span class="n">02</span><strong>Auditoría</strong><span>nulos, duplicados, rangos</span></div>
          <div class="pipe-arrow" aria-hidden="true">›</div>
          <div class="pipe-step"><span class="n">03</span><strong>Tablero</strong><span>HTML/CSS/JS</span></div>
          <div class="pipe-arrow" aria-hidden="true">›</div>
          <div class="pipe-step"><span class="n">04</span><strong>Módulos</strong><span>descriptivo · clustering · AR · MLP</span></div>
          <div class="pipe-arrow" aria-hidden="true">›</div>
          <div class="pipe-step"><span class="n">05</span><strong>Métricas</strong><span>R² · RMSE · MAE</span></div>
        </div>
        <ul class="plain-list" style="margin-top:22px">
          <li><span class="bullet"></span><span><strong>Ejecutado aquí:</strong> tablero estático y sus módulos, en navegador y sin dependencias externas.</span></li>
          <li><span class="bullet bullet--amber"></span><span><strong>Auditado, no ejecutado:</strong> backend FastAPI con Keras. El entorno no permitió levantar TensorFlow.</span></li>
          <li><span class="bullet bullet--red"></span><span><strong>No disponible:</strong> pesos, curvas y métricas persistidas del backend.</span></li>
        </ul>
        <div class="callout" style="margin-top:18px">
          <span aria-hidden="true">◆</span>
          <span>El tablero es funcional; el backend es código presente, no un modelo reproducible.</span>
        </div>
      `,
      visual: `
        <div class="screenshot">
          <img src="assets/img/app_hero.png" alt="Captura del tablero Energía y Clima en su sección de inicio" />
          <div class="screenshot-caption"><span>Tablero estático servido en localhost</span><span>1600 × 900</span></div>
        </div>
        <div class="grid-2" style="margin-top:12px">
          <div class="card card--tight"><h3>Sin dependencias</h3><p>HTML, CSS y JavaScript; datos embebidos. Funciona sin conexión.</p></div>
          <div class="card card--tight"><h3>Dos rutas</h3><p>Tablero estático y backend separado, con datasets distintos.</p></div>
        </div>
      `,
      sources: [
        "dashboard-energia-clima-github/assets/app.js",
        "energia-clima-dashboard/backend/app/services/rnn_service.py",
        "Captura local del tablero (1600 × 900)"
      ],
      evidence: "parcial",
      evidenceNote: "Tablero verificado en ejecución local; backend solo verificado por lectura de código.",
      time: "0:50",
      notes: {
        script: "El prototipo tiene dos piezas. El tablero estático es la que pude ejecutar: carga sin errores, entrena en el navegador y muestra métricas. El backend es una API FastAPI con un modelo Keras, pero en este entorno no pude levantarlo porque TensorFlow no respondió. Además, no hay pesos ni métricas guardadas. Por eso distingo «código presente» de «modelo reproducible»: no son lo mismo.",
        transition: "Veamos primero qué dicen los datos del tablero.",
        cue: "Señalar la captura y luego el tercer punto rojo de la lista.",
        question: "Si el backend no se ejecutó, ¿cómo sabe que existe el modelo?",
        answer: "Por lectura del código: rnn_service.py construye un SimpleRNN de Keras con unidades, dropout y epochs definidos. Lo que no existe es un artefacto entrenado ni métricas que pueda verificar."
      }
    },

    {
      id: "s07",
      bg: "assets/img/bg/bg-07.svg",
      kicker: "06 · Analítica descriptiva",
      title: "Lo que muestran los datos del prototipo",
      layout: "split",
      content: `
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Clase climática</th><th class="num">Meses</th><th class="num">Precio medio</th></tr></thead>
            <tbody>
              <tr><td>El Niño (cálido/seco)</td><td class="num">275</td><td class="num">442.6</td></tr>
              <tr><td>La Niña (frío/lluvioso)</td><td class="num">187</td><td class="num">140.6</td></tr>
              <tr><td>Neutro</td><td class="num">138</td><td class="num">213.1</td></tr>
            </tbody>
          </table>
        </div>
        <p class="small" style="margin-top:10px">Precio de bolsa en COP/kWh. Medias calculadas sobre el dataset del tablero.</p>
        <div class="callout" style="margin-top:20px">
          <span aria-hidden="true">◆</span>
          <span><strong>Asociación no es causalidad.</strong> La procedencia del dataset no está documentada y sus rangos no son plausibles para todas las variables.</span>
        </div>
      `,
      visual: `
        <div class="card" style="padding:18px 20px">
          <h3 style="margin-bottom:14px">Correlación con el precio de bolsa</h3>
          <div class="corr-list">
            <div class="corr-row"><span class="corr-label">Índice ONI</span><div class="corr-track"><span class="corr-zero"></span><span class="corr-fill corr-fill--pos" style="width:46%"></span></div><span class="corr-value">+0.92</span></div>
            <div class="corr-row"><span class="corr-label">Embalses</span><div class="corr-track"><span class="corr-zero"></span><span class="corr-fill corr-fill--neg" style="width:45.3%"></span></div><span class="corr-value">−0.91</span></div>
            <div class="corr-row"><span class="corr-label">Aportes hídricos</span><div class="corr-track"><span class="corr-zero"></span><span class="corr-fill corr-fill--neg" style="width:44.1%"></span></div><span class="corr-value">−0.88</span></div>
            <div class="corr-row"><span class="corr-label">Demanda</span><div class="corr-track"><span class="corr-zero"></span><span class="corr-fill corr-fill--pos" style="width:0.2%"></span></div><span class="corr-value">+0.00</span></div>
          </div>
          <p class="small" style="margin-top:14px">Coeficiente de Pearson. La correlación entre aportes y embalses es 0.92, lo que sugiere redundancia.</p>
        </div>
      `,
      sources: [
        "datos_filtrados.csv · 600 registros",
        "Cálculo local de medias por clase y correlaciones",
        "La propuesta no documenta el proceso de generación del dataset"
      ],
      evidence: "parcial",
      evidenceNote: "Cifras verificadas en el archivo; procedencia y plausibilidad del dataset no verificadas.",
      time: "1:00",
      notes: {
        script: "En el dataset del tablero, los meses de El Niño tienen un precio medio de 442 COP, frente a 140 en La Niña. Las correlaciones son muy altas: 0.92 con el ONI y menos 0.91 con embalses. Eso es consistente con la intuición hidrológica, pero también es una señal de alarma: correlaciones así de altas en datos de mercado son improbables. Además, hay aportes hídricos por encima del 100 %. La procedencia del dataset no está documentada.",
        transition: "Con esas reservas, pasemos al módulo de pronóstico.",
        cue: "Pausa después de «señal de alarma»; no celebrar las correlaciones.",
        question: "¿Entonces los datos son sintéticos?",
        answer: "No puedo afirmarlo. Lo que puedo afirmar es que su procedencia no está documentada y que hay valores poco plausibles. Hasta no auditar la fuente, los resultados son descriptivos del archivo, no del mercado."
      }
    },

    {
      id: "s08",
      bg: "assets/img/bg/bg-09.svg",
      kicker: "07 · Modelo autorregresivo",
      title: "El módulo llamado «RNN» es un AR(12) lineal",
      layout: "statement",
      content: `
        <p class="lead">No hay red recurrente. <span style="font-family:var(--mono);font-size:19px;color:var(--teal)">fitARModel</span> ajusta una regresión lineal con 12 rezagos y regularización ridge de 1e-3. El pronóstico es a un paso y utiliza los valores reales de los 12 meses anteriores.</p>
        <div class="metric-grid" style="margin-top:24px">
          <div class="metric metric--teal"><span class="metric-label">R² en testeo</span><span class="metric-value">0.526</span><span class="metric-sub">holdout cronológico</span></div>
          <div class="metric"><span class="metric-label">RMSE</span><span class="metric-value">88.48</span><span class="metric-sub">COP/kWh</span></div>
          <div class="metric"><span class="metric-label">MAE</span><span class="metric-value">68.58</span><span class="metric-sub">COP/kWh</span></div>
          <div class="metric"><span class="metric-label">Meses evaluados</span><span class="metric-value">118</span><span class="metric-sub">2015-03 → 2024-12</span></div>
        </div>
        <div class="grid-2" style="margin-top:18px">
          <div class="card card--tight"><h3>Qué sí es</h3><p>Un modelo autorregresivo interpretable, con 470 observaciones de entrenamiento y error medido fuera de muestra.</p></div>
          <div class="card card--tight"><h3>Qué no es</h3><p>Una RNN, un pronóstico a 12 meses ni una comparación contra un baseline.</p></div>
        </div>
        <p class="small" style="margin-top:14px">Precio medio del periodo de testeo: 387.99 COP/kWh. El R² de 0.526 se obtuvo ejecutando el módulo con sus valores por defecto.</p>
      `,
      sources: [
        "dashboard-energia-clima-github/assets/app.js · fitARModel / predictAR",
        "Ejecución local del módulo con lags = 12 y test = 20 %"
      ],
      evidence: "verificado",
      evidenceNote: "Implementación y métricas reproducidas en ejecución local.",
      time: "1:00",
      notes: {
        script: "El tablero presenta este módulo como RNN, pero el código no contiene una red recurrente. Ajusta una regresión lineal con 12 rezagos, estandarizados, más un término ridge. El resultado es un R² de 0.526, con RMSE de 88.48 COP por kWh sobre 118 meses. Es un resultado modesto y honesto, pero hay que decir qué mide: cada predicción usa los 12 valores reales anteriores. No es un pronóstico a 12 meses.",
        transition: "La gráfica permite ver exactamente qué tan lejos llega.",
        cue: "Decir «no hay red recurrente» mirando al jurado; pausa antes de las métricas.",
        question: "¿Por qué se llama RNN si no lo es?",
        answer: "Es una decisión de etiquetado del tablero. La implementación es AR lineal; el backend sí contiene un SimpleRNN de Keras, pero no tiene artefacto entrenado. La presentación usa el nombre real del módulo."
      }
    },

    {
      id: "s09",
      bg: "assets/img/bg/bg-08.svg",
      kicker: "08 · Resultado del AR(12)",
      title: "La serie se sigue, pero el horizonte es de un mes",
      layout: "chart",
      content: `
        <div class="grid-2" style="margin-bottom:14px">
          <div>
            <p class="lead" style="font-size:19px">Cada punto predicho dispone de los 12 valores reales previos. Es un ejercicio de ajuste a un paso, no un pronóstico a 12 meses.</p>
          </div>
          <div class="card card--tight">
            <h3>Lectura correcta</h3>
            <p>El modelo captura persistencia y nivel; no anticipa giros. El error de 88 COP/kWh es grande frente a un precio medio de 388.</p>
          </div>
        </div>
        <div class="chart" data-chart="ar" aria-label="Serie real y predicción AR de 12 rezagos, 2015 a 2024"></div>
        <p class="chart-caption">Serie mensual 2015-03 → 2024-12 · 118 observaciones · Precio de bolsa nacional (COP/kWh) · Fuente: ejecución local del módulo.</p>
      `,
      sources: [
        "assets/data/rnn_test_series.json · 118 puntos extraídos de la ejecución",
        "Módulo AR del tablero estático"
      ],
      evidence: "verificado",
      evidenceNote: "Serie real y predicciones tomadas de la ejecución, sin suavizado ni interpolación.",
      time: "0:55",
      notes: {
        script: "La línea clara es el precio real y la turquesa es la predicción. El modelo sigue el nivel y la tendencia, pero se queda corto en los picos y no anticipa los cambios bruscos. Eso es esperable: en cada mes le estamos entregando los 12 valores reales anteriores. La gráfica no demuestra capacidad de pronóstico futuro; demuestra que el AR captura persistencia. La distancia entre ambas líneas es el costo de usarlo como si pronosticara.",
        transition: "Ahora veamos el otro modelo, el que sí muestra un número espectacular.",
        cue: "Recorrer la gráfica de izquierda a derecha con la mirada; detenerse en 2020–2022.",
        question: "¿El modelo predice la pandemia o la crisis de 2022?",
        answer: "No. Se adapta con retraso porque usa valores reales previos; no anticipa el choque. Ese es precisamente el límite de un ejercicio one-step."
      }
    },

    {
      id: "s10",
      bg: "assets/img/bg/bg-10.svg",
      kicker: "09 · MLP",
      title: "0.985: el número que no debe celebrarse",
      layout: "split",
      content: `
        <div class="metric-grid" style="grid-template-columns:1fr 1fr">
          <div class="metric metric--amber"><span class="metric-label">R² en test</span><span class="metric-value">0.985</span><span class="metric-sub">split aleatorio</span></div>
          <div class="metric"><span class="metric-label">RMSE</span><span class="metric-value">20.08</span><span class="metric-sub">COP/kWh</span></div>
          <div class="metric"><span class="metric-label">MAE</span><span class="metric-value">15.75</span><span class="metric-sub">COP/kWh</span></div>
          <div class="metric"><span class="metric-label">Test</span><span class="metric-value">150</span><span class="metric-sub">meses aleatorios</span></div>
        </div>
        <ul class="plain-list plain-list--tight" style="margin-top:16px">
          <li><span class="bullet bullet--amber"></span><span><strong>Split aleatorio 75/25:</strong> meses de 1975 y de 2024 caen mezclados en train y test.</span></li>
          <li><span class="bullet bullet--amber"></span><span><strong>Predictores contemporáneos:</strong> aportes, embalses, demanda, ONI y precipitación del mismo mes que el precio.</span></li>
          <li><span class="bullet bullet--amber"></span><span><strong>Sin baseline:</strong> no hay naïve, estacional ni walk-forward contra el cual comparar.</span></li>
        </ul>
        <div class="callout" style="margin-top:16px">
          <span aria-hidden="true">◆</span>
          <span><strong>Alto ajuste contemporáneo no es capacidad de pronóstico.</strong> El 0.985 mide asociación dentro de la muestra, no anticipación.</span>
        </div>
      `,
      visual: `
        <div class="chart" data-chart="mlp-loss" aria-label="Curvas de pérdida de entrenamiento y validación del MLP"></div>
        <p class="chart-caption">300 épocas · 32 neuronas tanh · Adam 0.012 · MSE sobre precio estandarizado. La curva de «validación» es el conjunto de test aleatorio.</p>
        <div class="card card--tight" style="margin-top:10px">
          <h3>Qué muestran las curvas</h3>
          <p>Convergencia estable: el modelo aprendió la relación contemporánea. Eso no responde la pregunta de compra, que ocurre antes del precio.</p>
        </div>
      `,
      sources: [
        "dashboard-energia-clima-github/assets/app.js · trainMLPRegressor",
        "Ejecución local con 5 predictores, 32 neuronas, 300 épocas",
        "assets/data/mlp_curves.json · curvas y dispersión extraídas"
      ],
      evidence: "parcial",
      evidenceNote: "Métrica reproducida, pero inválida como pronóstico temporal por el diseño del split.",
      time: "1:00",
      notes: {
        script: "El MLP reporta un R² de 0.985. El número es real: lo ejecuté y lo reproduje. Pero no significa lo que parece. El split es aleatorio: meses de 1975 y de 2024 se mezclan. Y los predictores son del mismo mes que el precio. El modelo está aprendiendo una relación contemporánea, no anticipando. Si mañana tengo que comprar energía para el mes siguiente, no tendré los aportes ni el ONI del mes siguiente. Por eso este 0.985 no es un resultado de pronóstico.",
        transition: "La siguiente diapositiva desarma el mecanismo del leakage.",
        cue: "Decir «el número es real» y luego «no significa lo que parece»; pausa entre ambas.",
        question: "¿Un R² de 0.985 no es evidencia suficiente?",
        answer: "No para un pronóstico. El R² mide ajuste en un test aleatorio con predictores contemporáneos. Para compras necesito un test temporal y variables disponibles antes de la decisión."
      }
    },

    {
      id: "s11",
      bg: "assets/img/bg/bg-11.svg",
      kicker: "10 · Validez",
      title: "Por qué el 0.985 es leakage, no habilidad",
      layout: "split",
      content: `
        <ol class="number-list">
          <li><strong>El test está intercalado en el tiempo.</strong> El modelo ve meses vecinos al test durante el entrenamiento.</li>
          <li><strong>Los predictores ocurren en el mismo mes.</strong> Aportes, embalses y clima no están disponibles antes de fijar el precio.</li>
          <li><strong>No hay línea base.</strong> Sin naïve ni walk-forward, no se sabe si el MLP aporta sobre «repetir el último precio».</li>
        </ol>
        <div class="callout" style="margin-top:20px">
          <span aria-hidden="true">◆</span>
          <span><strong>Regla para la sustentación:</strong> ninguna cifra del MLP se usará para afirmar capacidad de pronóstico ni para dimensionar compras.</span>
        </div>
      `,
      visual: `
        <div class="chart" data-chart="mlp-scatter" aria-label="Dispersión entre precio real y predicho del MLP"></div>
        <p class="chart-caption">Cada punto es un mes del test aleatorio. La dispersión se apega a la identidad porque precio y predictores se observan al mismo tiempo.</p>
        <div class="grid-2" style="margin-top:10px">
          <div class="card card--tight"><h3>Loss</h3><p>Entrenamiento y test caen juntos: no hay sobreajuste clásico.</p></div>
          <div class="card card--tight"><h3>Dispersión</h3><p>El error es bajo porque el modelo ve los drivers del mismo mes.</p></div>
        </div>
      `,
      sources: [
        "assets/data/mlp_curves.json",
        "assets/app.js · shuffleIndices, split y estandarización",
        "Diseño metodológico: validación temporal ausente"
      ],
      evidence: "verificado",
      evidenceNote: "El diagnóstico de leakage se deriva del código y del diseño del experimento.",
      time: "1:00",
      notes: {
        script: "El leakage tiene tres mecanismos concretos. Primero, el test está intercalado: el modelo entrena con meses vecinos a los que luego evalúa. Segundo, los predictores son contemporáneos: para predecir el precio de marzo uso los aportes de marzo, que no conozco cuando compro. Tercero, no hay baseline. Las curvas de pérdida son sanas y la dispersión es estrecha, pero eso solo confirma que el modelo aprendió la relación dentro de la muestra. No confirma que anticipe.",
        transition: "Entonces, ¿qué haría falta para afirmar un pronóstico?",
        cue: "Contar los tres mecanismos con los dedos; no señalar las curvas como éxito.",
        question: "¿El leakage invalida todo el proyecto?",
        answer: "No. Invalida el 0.985 como pronóstico. El AR(12) conserva una evaluación cronológica a un paso y la analítica descriptiva sigue siendo útil, con las reservas sobre el dataset."
      }
    },

    {
      id: "s12",
      bg: "assets/img/bg/bg-12.svg",
      kicker: "11 · Estándar de validación",
      title: "Qué haría falta para afirmar un pronóstico",
      layout: "table",
      content: `
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Requisito</th><th>Qué falta</th><th>Evidencia revisada</th></tr></thead>
            <tbody>
              <tr><td>Baseline naïve o estacional</td><td>No existe modelo de comparación en el repositorio.</td><td>Revisión de módulos y notebooks.</td></tr>
              <tr><td>Split temporal y walk-forward</td><td>El MLP usa split aleatorio; solo el AR conserva holdout cronológico.</td><td>Lectura del diseño experimental.</td></tr>
              <tr><td>Error porcentual (MAPE u otro)</td><td>No se reporta; solo hay R², RMSE y MAE.</td><td>Salidas de la ejecución local.</td></tr>
              <tr><td>Artefactos reproducibles</td><td>Sin pesos, curvas ni métricas persistidas del backend.</td><td>Revisión del servicio Keras.</td></tr>
              <tr><td>Validación externa</td><td>Sin datos de la organización ni verificación de la fuente.</td><td>Repositorio y documentos disponibles.</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout" style="margin-top:22px">
          <span aria-hidden="true">◆</span>
          <span><strong>Sin baseline, un R² no dice si el modelo aporta valor.</strong> La comparación es la que convierte una métrica en evidencia.</span>
        </div>
      `,
      sources: [
        "Auditoría del repositorio y de los módulos ejecutados",
        "README del tablero: las métricas originales se conservan como referencia"
      ],
      evidence: "no-disponible",
      evidenceNote: "Lista de requisitos ausentes para una afirmación de pronóstico.",
      time: "0:55",
      notes: {
        script: "Esta tabla es el estándar mínimo que exigiría para afirmar un pronóstico. Baseline, split temporal, error porcentual, artefactos y validación externa. De los cinco, solo hay un holdout cronológico parcial en el AR. El MLP no tiene split temporal y el backend no tiene artefactos. La ausencia de baseline es la más grave: sin saber cuánto acierta «repetir el último precio», no puedo decir que el modelo agregue valor.",
        transition: "Estas brechas no son detalles: son el resultado de la auditoría.",
        cue: "Recorrer la columna «Qué falta» de arriba abajo; detenerse en la ausencia de baseline.",
        question: "¿Con un MAPE bastaría?",
        answer: "No por sí solo. MAPE ayuda a comunicar el error, pero sigue siendo necesario un baseline y una validación temporal. La métrica no reemplaza el diseño."
      }
    },

    {
      id: "s13",
      bg: "assets/img/bg/bg-13.svg",
      kicker: "12 · Hallazgos de auditoría",
      title: "Brechas de evidencia encontradas",
      layout: "table",
      content: `
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Hallazgo</th><th>Qué se encontró</th><th>Consecuencia</th></tr></thead>
            <tbody>
              <tr><td><strong>Datasets divergentes</strong></td><td>Correlación 0.043; rangos de precio incompatibles.</td><td>Los resultados no son comparables sin declarar la fuente.</td></tr>
              <tr><td><strong>Métricas no reproducidas</strong></td><td>R² ~0.89 / RMSE ~38.2 y Accuracy ~0.82 / F1 ~0.81 están escritas en la interfaz.</td><td>Son referencias, no resultados verificados.</td></tr>
              <tr><td><strong>Backend sin artefactos</strong></td><td>SimpleRNN de Keras en código; sin pesos, curvas ni métricas guardadas.</td><td>No se puede afirmar su desempeño.</td></tr>
              <tr><td><strong>Publicación no verificable</strong></td><td>La URL publicada redirige al login SSO de Vercel.</td><td>No se pudo confirmar que coincida con la build local.</td></tr>
            </tbody>
          </table>
        </div>
        <div class="callout" style="margin-top:20px">
          <span aria-hidden="true">◆</span>
          <span><strong>Nombrar las brechas es parte del resultado.</strong> Un prototipo sin trazabilidad no es una base de decisión.</span>
        </div>
      `,
      sources: [
        "Comparación de datasets y cálculo de correlación",
        "assets/app.js · bloque de paradigmas con métricas estáticas",
        "rnn_service.py · lectura de código",
        "Verificación de la URL publicada"
      ],
      evidence: "mixto",
      evidenceNote: "Hallazgos verificados en archivos y en la URL; el alcance de la publicación no pudo confirmarse.",
      time: "0:50",
      notes: {
        script: "La auditoría dejó cuatro brechas. Los datasets no coinciden. Las métricas de paradigmas, 0.89 y 38.2, están escritas directamente en la interfaz y no se reproducen. El backend tiene código de Keras pero no artefactos. Y la URL publicada está detrás del login de Vercel, así que no pude verificar que sea la misma build. Ninguna de estas brechas impide presentar el prototipo; impiden presentarlo como validado.",
        transition: "Con esto claro, veamos qué decisión sí se puede sostener.",
        cue: "Ir despacio en la fila de métricas escritas en la interfaz.",
        question: "¿Está diciendo que el proyecto no funciona?",
        answer: "No. Está funcional como prototipo y como objeto de auditoría. Lo que no puedo afirmar es que sus métricas constituyan evidencia de pronóstico o de impacto en compras."
      }
    },

    {
      id: "s14",
      bg: "assets/img/bg/bg-14.svg",
      kicker: "13 · Traducción a decisión",
      title: "De la métrica a la decisión de compra",
      layout: "three",
      content: `
        <div class="columns-3">
          <div class="column-card">
            <span class="label">Señal</span>
            <h3>Escenarios, no puntos</h3>
            <p>Usar intervalos y probabilidades de precio; comunicar el error del modelo en COP/kWh.</p>
          </div>
          <div class="column-card">
            <span class="label">Cobertura</span>
            <h3>Contratos por tramos</h3>
            <p>Cubrir una fracción de la demanda esperada y dejar reserva para el mercado spot.</p>
          </div>
          <div class="column-card">
            <span class="label">Control</span>
            <h3>Reglas y seguimiento</h3>
            <p>Definir umbrales de activación, límites de riesgo y revisión mensual del resultado.</p>
          </div>
        </div>
        <div class="grid-2" style="margin-top:24px">
          <div class="card card--tight"><h3>Qué cambia con el modelo</h3><p>La probabilidad de cada escenario y el costo esperado de cubrir o no cubrir.</p></div>
          <div class="card card--tight"><h3>Qué no cambia</h3><p>La restricción de caja, la regulación y la aversión al riesgo de la organización.</p></div>
        </div>
        <div class="callout" style="margin-top:18px">
          <span aria-hidden="true">◆</span>
          <span><strong>Diseño propuesto, no validado:</strong> no hay contratos ni demanda de la organización en las fuentes revisadas.</span>
        </div>
      `,
      sources: [
        "Síntesis de diseño para la sustentación",
        "No se dispone de contratos, demanda propia ni precios de compra"
      ],
      evidence: "no-disponible",
      evidenceNote: "Propuesta conceptual; requiere datos organizacionales para validarse.",
      time: "1:00",
      notes: {
        script: "Si el modelo no está validado, ¿qué se puede hacer con él? Usarlo como señal, no como oráculo. En lugar de un precio puntual, escenarios con intervalos. En lugar de una compra única, contratos por tramos con reserva. Y reglas de control: cuánto cubrir, cuándo activar y cómo revisar el resultado. Esto es un diseño, no una recomendación validada. Para validarlo necesitaría contratos, demanda y restricciones de caja que no están en las fuentes.",
        transition: "Cierro con los límites y el siguiente ciclo de trabajo.",
        cue: "Bajar el ritmo; dejar claro que «propuesto» no es «probado».",
        question: "¿Qué porcentaje de la demanda habría que cubrir?",
        answer: "No puedo determinarlo sin demanda, contratos y aversión al riesgo. Cualquier porcentaje sería una invención. La contribución es el marco de decisión, no una cifra óptima."
      }
    },

    {
      id: "s15",
      bg: "assets/img/bg/bg-15.svg",
      kicker: "14 · Límites y siguiente ciclo",
      title: "Lo que falta no es más cómputo: es mejor evidencia",
      layout: "split",
      content: `
        <div class="card">
          <h3 style="color:var(--amber)">Límites de esta entrega</h3>
          <ul class="plain-list plain-list--tight" style="margin-top:12px">
            <li><span class="bullet bullet--amber"></span><span>Procedencia del dataset no documentada.</span></li>
            <li><span class="bullet bullet--amber"></span><span>Sin validación temporal del MLP ni baseline.</span></li>
            <li><span class="bullet bullet--amber"></span><span>Sin datos de contratos, demanda o caja.</span></li>
            <li><span class="bullet bullet--amber"></span><span>Backend no ejecutado en este entorno.</span></li>
          </ul>
        </div>
        <div class="card">
          <h3 style="color:var(--teal)">Siguiente ciclo</h3>
          <ul class="plain-list plain-list--tight" style="margin-top:12px">
            <li><span class="bullet"></span><span>Auditar la fuente y reconciliar los datasets.</span></li>
            <li><span class="bullet"></span><span>Walk-forward con baseline naïve y estacional.</span></li>
            <li><span class="bullet"></span><span>Persistir modelo, curvas y métricas reproducibles.</span></li>
            <li><span class="bullet"></span><span>Piloto con reglas de compra y costo del error.</span></li>
          </ul>
        </div>
      `,
      visual: `
        <div class="card" style="height:100%">
          <h3>Secuencia propuesta</h3>
          <div class="stack" style="margin-top:16px">
            <div class="pipe-step"><span class="n">FASE 1</span><strong>Datos auditados</strong><span>Fuente, unidad y periodo verificados.</span></div>
            <div class="pipe-step"><span class="n">FASE 2</span><strong>Validación temporal</strong><span>Walk-forward + baseline.</span></div>
            <div class="pipe-step"><span class="n">FASE 3</span><strong>Reproducibilidad</strong><span>Artefactos y métricas versionadas.</span></div>
            <div class="pipe-step"><span class="n">FASE 4</span><strong>Piloto de decisión</strong><span>Contratos, reservas y seguimiento.</span></div>
          </div>
          <p class="small" style="margin-top:16px">Cada fase debe poder fallar y detener la siguiente. Esa es la diferencia entre un prototipo y una promesa.</p>
        </div>
      `,
      sources: [
        "Hallazgos de la auditoría",
        "Hoja de ruta propuesta para el siguiente ciclo"
      ],
      evidence: "parcial",
      evidenceNote: "Límites verificados; hoja de ruta es una propuesta.",
      time: "0:45",
      notes: {
        script: "Los límites son concretos: no sé de dónde salió el dataset, no hay validación temporal del MLP, no hay datos de compra y el backend no se ejecutó. El siguiente ciclo no empieza entrenando una red más grande. Empieza auditando la fuente, construyendo un walk-forward con baseline y guardando artefactos. Solo después tiene sentido un piloto de decisión. Si la fase de datos falla, las siguientes se detienen.",
        transition: "Termino con tres conclusiones que sí puedo defender.",
        cue: "Señalar la secuencia de fases; pausa en «puede fallar».",
        question: "¿No sería más rápido usar un modelo preentrenado?",
        answer: "No resolvería el problema de fondo: los datos y el diseño de validación. Un modelo más complejo sobre datos no auditados produce una confianza mayor, no una evidencia mayor."
      }
    },

    {
      id: "s16",
      bg: "assets/img/bg/bg-16.svg",
      kicker: "15 · Conclusiones",
      title: "Tres conclusiones defendibles",
      layout: "closing",
      content: `
        <ol class="number-list" style="gap:15px">
          <li><strong>El prototipo existe y es auditable.</strong> 600 meses, módulos ejecutables en el navegador y resultados trazables a archivos.</li>
          <li><strong>La evidencia sostiene un AR(12) a un paso (R² 0.526), no un pronóstico futuro.</strong> El 0.985 del MLP es ajuste contemporáneo con leakage, no habilidad predictiva.</li>
          <li><strong>El siguiente paso no es más épocas: es validación temporal, baseline y datos reales de compra.</strong></li>
        </ol>
        <div class="callout callout--teal" style="margin-top:26px;padding:18px 20px">
          <span aria-hidden="true">◆</span>
          <span style="font-size:19px;line-height:1.4"><strong>La contribución no es un número alto: es un marco para no engañarnos con él.</strong></span>
        </div>
        <div style="margin-top:auto;padding-top:24px;padding-bottom:8px;display:flex;align-items:flex-end;justify-content:space-between;gap:28px">
          <div>
            <p style="font-size:26px;font-weight:700;letter-spacing:-0.02em">Gracias.</p>
            <p class="small" style="margin-top:4px">Preguntas · Anexos A–G disponibles para detalle técnico.</p>
          </div>
          <a class="repo-link" href="https://github.com/alanfel/Proyecto_Integrador" target="_blank" rel="noopener noreferrer" aria-label="Abrir el repositorio del proyecto en GitHub (nueva pestaña)">
            <span class="repo-link__mark" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="21" height="21" fill="currentColor" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
            </span>
            <span class="repo-link__body">
              <span class="repo-link__label">Repositorio del proyecto</span>
              <span class="repo-link__url">github.com/alanfel/Proyecto_Integrador</span>
            </span>
            <svg class="repo-link__go" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M9 7h8v8"/></svg>
          </a>
        </div>
      `,
      sources: [
        "Síntesis de resultados verificados y brechas documentadas",
        "Detalle técnico en los anexos A–G"
      ],
      evidence: "mixto",
      evidenceNote: "Conclusiones limitadas al alcance de la evidencia revisada.",
      time: "1:00",
      notes: {
        script: "Cierro con tres ideas. Primero, el prototipo existe y puede auditarse: no es una diapositiva, es código que corre. Segundo, la evidencia sostiene un AR de 12 rezagos a un paso con R² 0.526; no sostiene un pronóstico futuro ni el 0.985 del MLP. Tercero, el siguiente paso es validación temporal, baseline y datos reales de compra. La contribución no es un número alto: es un marco para no engañarnos con él. Todo el proyecto, con el código y la documentación, está en el repositorio que aparece en esta lámina. Gracias; quedo atento a las preguntas.",
        transition: "Abrir espacio para preguntas; ofrecer los anexos según el interés del jurado.",
        cue: "Pausa de dos segundos tras la frase final; no llenar el silencio.",
        question: "¿Cuál sería su recomendación inmediata para la organización?",
        answer: "No tomar decisiones de cobertura con estas métricas. Primero auditar la fuente de datos y establecer un baseline temporal; mientras tanto, usar el tablero como exploración descriptiva, no como pronóstico."
      }
    }
  ];

  const ANNEX = [
    {
      id: "a01",
      bg: "assets/img/bg/bg-a.svg",
      kicker: "Anexo A · Datos",
      title: "Ficha técnica del dataset del tablero",
      layout: "table",
      content: `
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Variable</th><th>Unidad</th><th class="num">Mín.</th><th class="num">Máx.</th><th class="num">Media</th></tr></thead>
            <tbody>
              <tr><td>Precio de bolsa</td><td>COP/kWh</td><td class="num">68.41</td><td class="num">709.40</td><td class="num">295.70</td></tr>
              <tr><td>Componente G CEO Cauca</td><td>COP/kWh</td><td class="num">242.41</td><td class="num">772.23</td><td class="num">458.91</td></tr>
              <tr><td>Aportes hídricos</td><td>%</td><td class="num">39.36</td><td class="num">160.00</td><td class="num">95.19</td></tr>
              <tr><td>Volumen útil de embalses</td><td>%</td><td class="num">26.73</td><td class="num">99.00</td><td class="num">66.52</td></tr>
              <tr><td>Demanda nacional</td><td>GWh/día</td><td class="num">114.05</td><td class="num">215.71</td><td class="num">164.92</td></tr>
              <tr><td>Índice ONI</td><td>adimensional</td><td class="num">−2.04</td><td class="num">2.02</td><td class="num">0.19</td></tr>
              <tr><td>Precipitación promedio</td><td>mm</td><td class="num">63.48</td><td class="num">298.11</td><td class="num">172.96</td></tr>
              <tr><td>Temperatura promedio</td><td>°C</td><td class="num">18.01</td><td class="num">24.15</td><td class="num">21.26</td></tr>
            </tbody>
          </table>
        </div>
        <p class="small" style="margin-top:12px">600 registros mensuales · 1975-01-31 → 2024-12-31 · 0 nulos · 0 fechas duplicadas · 10 columnas.</p>
        <div class="callout" style="margin-top:16px">
          <span aria-hidden="true">◆</span>
          <span><strong>Alerta de plausibilidad:</strong> aportes hídricos por encima de 100 % y 233 meses en esa condición. La unidad o la generación del dato requiere verificación.</span>
        </div>
      `,
      sources: ["datos_filtrados.csv", "Cálculo local de mínimos, máximos y medias"],
      evidence: "parcial",
      evidenceNote: "Estadísticos verificados; plausibilidad y origen, no.",
      time: "0:40",
      notes: {
        script: "Esta ficha resume las diez variables del tablero. Hay 600 meses completos, sin nulos ni duplicados. El detalle importante es la alerta: los aportes hídricos llegan a 160 %, un valor que no es plausible como porcentaje. Eso refuerza la necesidad de auditar la fuente antes de usar cualquier modelo.",
        transition: "El anexo B compara este archivo con el de la propuesta.",
        cue: "Señalar la fila de aportes y la alerta.",
        question: "¿Los nulos y duplicados se revisaron?",
        answer: "Sí. Cero nulos y cero fechas duplicadas en ambos archivos de 600 filas; el problema no es completitud, es procedencia y plausibilidad."
      }
    },

    {
      id: "a02",
      bg: "assets/img/bg/bg-b.svg",
      kicker: "Anexo B · Trazabilidad de datos",
      title: "Tres archivos, tres series de precio distintas",
      layout: "table",
      content: `
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Archivo</th><th>Precio mín.–máx.</th><th class="num">Aportes &gt; 100 %</th><th class="num">Corr. con tablero</th></tr></thead>
            <tbody>
              <tr><td><strong>Tablero</strong><br><span class="muted">datos_filtrados.csv</span></td><td>68.41 – 709.40</td><td class="num">233</td><td class="num">1.0000</td></tr>
              <tr><td><strong>Propuesta</strong><br><span class="muted">dataset_unificado_energia_clima.csv</span></td><td>64.99 – 203.41</td><td class="num">561</td><td class="num">0.0434</td></tr>
              <tr><td><strong>Legado</strong><br><span class="muted">dataset_energia_clima.csv</span></td><td>78.89 – 1036.51</td><td class="num">600</td><td class="num">0.1397</td></tr>
            </tbody>
          </table>
        </div>
        <div class="grid-2" style="margin-top:16px">
          <div class="card card--tight"><h3>Correlación precio–ONI</h3><p>Tablero: <strong style="color:var(--amber)">+0.9202</strong><br>Propuesta: <strong style="color:var(--teal)">−0.0086</strong></p></div>
          <div class="card card--tight"><h3>Columnas de clima</h3><p>Tablero: 1 ONI + Estado_Climatico<br>Propuesta: 2 columnas ONI</p></div>
        </div>
        <div class="callout" style="margin-top:16px">
          <span aria-hidden="true">◆</span>
          <span>La relación precio–ONI pasa de 0.92 a prácticamente cero según el archivo. <strong>La conclusión cambia con la fuente.</strong></span>
        </div>
        <p class="small" style="margin-top:10px">El archivo legado llega a 1036.51 COP/kWh y registra 600 meses con aportes por encima de 100 %: otra serie, no una versión corregida.</p>
      `,
      sources: [
        "Comparación directa de los tres CSV",
        "Correlación de Pearson calculada localmente",
        "La propuesta no menciona el archivo del tablero ni el legado"
      ],
      evidence: "verificado",
      evidenceNote: "Discrepancias calculadas sobre los archivos.",
      time: "0:40",
      notes: {
        script: "Hay tres archivos de precio y no son equivalentes. El del tablero correlaciona 0.043 con el de la propuesta y 0.14 con el legado. Más grave aún: la correlación precio-ONI es 0.92 en el tablero y casi cero en la propuesta. Es el mismo fenómeno con conclusiones opuestas. Sin reconciliar estos archivos, cualquier afirmación empírica es ambigua.",
        transition: "El anexo C entra en el detalle del AR.",
        cue: "Señalar la última columna y la fila de correlación ONI.",
        question: "¿Se puede promediar o combinar los archivos?",
        answer: "No con la evidencia actual. No comparten valores ni documentación de origen. Combinarlos introduciría una serie artificial; primero hay que reconciliar la fuente."
      }
    },

    {
      id: "a03",
      bg: "assets/img/bg/bg-c.svg",
      kicker: "Anexo C · Detalle del AR(12)",
      title: "Especificación y evaluación del modelo autorregresivo",
      layout: "split",
      content: `
        <div class="card">
          <h3>Especificación</h3>
          <pre style="margin:8px 0 0;font-family:var(--mono);font-size:12px;line-height:1.6;color:#c9f7ef;white-space:pre-wrap">y_t = β0 + Σ β_j · z_{t−j} + ε_t
z_{t−j} = (y_{t−j} − μ_j) / σ_j
j = 1 … 12   ·   ridge = 1e−3</pre>
        </div>
        <ul class="plain-list plain-list--tight" style="margin-top:12px">
          <li><span class="bullet"></span><span>Serie: precio de bolsa nacional, 600 meses.</span></li>
          <li><span class="bullet"></span><span>Entrenamiento: 470 filas; test: 118 meses (2015-03 → 2024-12).</span></li>
          <li><span class="bullet"></span><span>Evaluación one-step: cada predicción usa los 12 valores reales previos.</span></li>
          <li><span class="bullet"></span><span>Sin variables exógenas, sin baseline, sin intervalo de confianza.</span></li>
        </ul>
      `,
      visual: `
        <div class="metric-grid" style="grid-template-columns:1fr 1fr">
          <div class="metric metric--teal"><span class="metric-label">R²</span><span class="metric-value">0.526</span></div>
          <div class="metric"><span class="metric-label">RMSE</span><span class="metric-value">88.48</span><span class="metric-sub">COP/kWh</span></div>
          <div class="metric"><span class="metric-label">MAE</span><span class="metric-value">68.58</span><span class="metric-sub">COP/kWh</span></div>
          <div class="metric"><span class="metric-label">Media test</span><span class="metric-value">387.99</span><span class="metric-sub">COP/kWh</span></div>
        </div>
        <div class="callout" style="margin-top:12px">
          <span aria-hidden="true">◆</span>
          <span><strong>Lectura:</strong> el R² 0.526 describe un ajuste a un paso, con los 12 valores reales previos. No es un pronóstico multi-paso ni una comparación contra un baseline.</span>
        </div>
      `,
      sources: [
        "assets/app.js · fitARModel y predictAR",
        "Ejecución con lags = 12, test = 20 %",
        "assets/data/rnn_test_series.json"
      ],
      evidence: "verificado",
      evidenceNote: "Especificación y métricas reproducidas.",
      time: "0:40",
      notes: {
        script: "El AR estandariza cada rezago con la media y desviación del conjunto de entrenamiento, ajusta por mínimos cuadrados con una penalización ridge mínima y predice el siguiente mes. La evaluación es cronológica y honesta en un sentido: entrena con el pasado y evalúa con el futuro. Pero es one-step: le entregamos los valores reales previos. No hay intervalo de confianza ni baseline, así que el R² 0.526 es un techo optimista de lo que sería un pronóstico real.",
        transition: "El anexo D hace lo mismo con el MLP.",
        cue: "Señalar la ecuación y luego la frase «siempre usa la serie real».",
        question: "¿Se puede convertir en un pronóstico multi-paso?",
        answer: "Sí, alimentando las predicciones como rezagos, pero el error se acumula. Ese experimento no está hecho ni documentado; no puedo reportar su desempeño."
      }
    },

    {
      id: "a04",
      bg: "assets/img/bg/bg-d.svg",
      kicker: "Anexo D · Detalle del MLP",
      title: "Configuración exacta del experimento con R² 0.985",
      layout: "split-narrow-left",
      content: `
        <div class="grid-2">
          <div class="card card--tight"><h3>Arquitectura</h3><p>5 entradas · 32 neuronas ocultas tanh · 1 salida lineal.</p></div>
          <div class="card card--tight"><h3>Entrenamiento</h3><p>300 épocas full-batch · Adam · lr 0.012 · MSE · seed 42.</p></div>
          <div class="card card--tight"><h3>Split</h3><p>75/25 aleatorio con seed 7 · 450 train / 150 test.</p></div>
          <div class="card card--tight"><h3>Estandarización</h3><p>Ajustada solo con train. Correcta; el problema es el split, no el escalado.</p></div>
        </div>
        <p class="small" style="margin-top:12px"><strong>Predictores:</strong> aportes, embalses, demanda, ONI histórico y precipitación. <strong>Objetivo:</strong> precio de bolsa del mismo mes.</p>
      `,
      visual: `
        <div class="metric-grid" style="grid-template-columns:1fr 1fr">
          <div class="metric metric--amber"><span class="metric-label">R²</span><span class="metric-value">0.985</span></div>
          <div class="metric"><span class="metric-label">RMSE</span><span class="metric-value">20.08</span><span class="metric-sub">COP/kWh</span></div>
          <div class="metric"><span class="metric-label">MAE</span><span class="metric-value">15.75</span><span class="metric-sub">COP/kWh</span></div>
          <div class="metric"><span class="metric-label">Pérdida final</span><span class="metric-value">0.018</span><span class="metric-sub">train · 0.0165 val</span></div>
        </div>
        <div class="chart-duo" style="margin-top:12px">
          <div class="chart" data-chart="mlp-loss" aria-label="Curvas de pérdida del MLP"></div>
          <div class="chart" data-chart="mlp-scatter" aria-label="Dispersión real y predicha"></div>
        </div>
        <p class="chart-caption">300 épocas · la curva de validación se evalúa en el mismo test que se reporta; no hay early stopping.</p>
        <p class="small" style="margin-top:8px"><strong style="color:var(--amber)">Diagnóstico:</strong> no es sobreajuste; el test aleatorio no representa el futuro de la compra.</p>
      `,
      sources: [
        "assets/app.js · trainMLPRegressor y bloque de ejecución",
        "assets/data/mlp_curves.json · 300 épocas y 150 puntos",
        "Ejecución local con los valores por defecto"
      ],
      evidence: "verificado",
      evidenceNote: "Configuración y métricas reproducidas; validez como pronóstico, no.",
      time: "0:40",
      notes: {
        script: "El MLP tiene cinco entradas, 32 neuronas tanh y una salida lineal. Se entrenó 300 épocas completas con Adam y learning rate 0.012. La estandarización se ajustó solo con entrenamiento, lo cual está bien. El problema no es el escalado ni el sobreajuste: las curvas de train y test caen juntas. El problema es que el split es aleatorio y los predictores son contemporáneos. El test no representa el futuro que enfrenta una compra.",
        transition: "El anexo E revisa el backend de Keras.",
        cue: "Señalar la tarjeta de split y la de estandarización.",
        question: "¿Cambiar la semilla altera el 0.985?",
        answer: "Puede alterarlo ligeramente, pero no cambiaría la conclusión: el diseño del split y la contemporaneidad de los predictores siguen invalidándolo como pronóstico."
      }
    },

    {
      id: "a05",
      bg: "assets/img/bg/bg-e.svg",
      kicker: "Anexo E · Backend",
      title: "El SimpleRNN de Keras: código real, artefacto ausente",
      layout: "split",
      content: `
        <ul class="plain-list plain-list--tight">
          <li><span class="bullet"></span><span><strong>Arquitectura:</strong> SimpleRNN(32) + Dropout(0.1) + Dense(1).</span></li>
          <li><span class="bullet"></span><span><strong>Entrenamiento:</strong> Adam 1e-3, MSE, 80 épocas, batch 16, EarlyStopping paciencia 15.</span></li>
          <li><span class="bullet"></span><span><strong>Split:</strong> cronológico, shuffle = false. Correcto en la intención.</span></li>
          <li><span class="bullet bullet--red"></span><span><strong>Leakage de preprocesamiento:</strong> MinMaxScaler ajustado sobre la serie completa antes del split.</span></li>
          <li><span class="bullet bullet--red"></span><span><strong>Sin persistencia:</strong> no hay .keras, .h5, pesos ni métricas guardadas.</span></li>
        </ul>
        <div class="callout" style="margin-top:16px">
          <span aria-hidden="true">◆</span>
          <span>El backend usa por defecto <span style="font-family:var(--mono)">dataset_unificado_energia_clima.csv</span>, distinto del tablero.</span>
        </div>
      `,
      visual: `
        <div class="card">
          <h3>Qué se puede y qué no se puede afirmar</h3>
          <div class="stack" style="margin-top:12px">
            <div class="card card--tight" style="border-color:rgba(45,212,191,.35)"><h3 style="color:var(--teal)">Se puede afirmar</h3><p>Existe una implementación de SimpleRNN en el backend y un fallback a MLP de scikit-learn si TensorFlow no está disponible.</p></div>
            <div class="card card--tight" style="border-color:rgba(248,113,113,.35)"><h3 style="color:var(--red)">No se puede afirmar</h3><p>Su precisión, su capacidad de generalización o que haya sido entrenado con los datos actuales. No hay artefacto que lo demuestre.</p></div>
            <div class="card card--tight"><h3>Entorno</h3><p>TensorFlow no respondió en este entorno; el backend no se ejecutó. La revisión fue por lectura de código.</p></div>
          </div>
        </div>
      `,
      sources: [
        "energia-clima-dashboard/backend/app/services/rnn_service.py",
        "energia-clima-dashboard/backend/app/schemas/schemas.py",
        "Búsqueda de artefactos .keras/.h5/pesos/métricas: sin resultados"
      ],
      evidence: "parcial",
      evidenceNote: "Código verificado; ejecución y artefactos no disponibles.",
      time: "0:40",
      notes: {
        script: "El backend sí tiene un SimpleRNN real: 32 unidades, dropout, Adam y early stopping. La intención de split es cronológica, con shuffle en falso. Pero hay dos problemas. Primero, el MinMaxScaler se ajusta sobre toda la serie antes de separar, lo que filtra información del futuro. Segundo, no hay modelo guardado ni métricas persistidas. No puedo reportar su desempeño porque no existe un artefacto que lo respalde. El fallback a MLP de scikit-learn tampoco está documentado con resultados.",
        transition: "El anexo F consolida el registro de evidencia.",
        cue: "Distinguir «código real» de «modelo reproducible» con las manos.",
        question: "¿El scaler sobre toda la serie invalida el backend?",
        answer: "Introduce leakage de preprocesamiento, aunque menor que el del MLP estático. Junto con la ausencia de artefactos, impide afirmar cualquier métrica del backend."
      }
    },

    {
      id: "a06",
      bg: "assets/img/bg/bg-f.svg",
      kicker: "Anexo F · Auditoría",
      title: "Registro de evidencia: qué sostiene cada afirmación",
      layout: "table",
      content: `
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Afirmación</th><th>Cómo se verificó</th><th>Fuente</th></tr></thead>
            <tbody>
              <tr><td>600 meses, 1975–2024, sin nulos</td><td>Revisión de ambos CSV.</td><td>datos_filtrados.csv</td></tr>
              <tr><td>Precio del tablero 68.41–709.40</td><td>Cálculo local sobre la serie.</td><td>datos_filtrados.csv</td></tr>
              <tr><td>Datasets correlacionan 0.0434</td><td>Coeficiente de Pearson calculado localmente.</td><td>Ambos datasets</td></tr>
              <tr><td>AR(12): R² 0.526, RMSE 88.48</td><td>Ejecución local del módulo.</td><td>Módulo AR del tablero</td></tr>
              <tr><td>MLP: R² 0.985</td><td>Reproducido con split aleatorio; no válido como pronóstico.</td><td>assets/app.js</td></tr>
              <tr><td>Backend Keras existe</td><td>Lectura de código; sin ejecución ni artefactos.</td><td>rnn_service.py</td></tr>
              <tr><td>Métricas 0.89 / 38.2 y 0.82 / 0.81</td><td>Escritas en la interfaz; no reproducidas.</td><td>assets/app.js</td></tr>
              <tr><td>Datos de contratos y demanda propia</td><td>Sin archivos en el repositorio.</td><td>Revisión completa</td></tr>
            </tbody>
          </table>
        </div>
      `,
      sources: ["Auditoría completa del repositorio", "Ejecuciones locales documentadas en README y REGISTRO_EVIDENCIA.md"],
      evidence: "mixto",
      evidenceNote: "Registro consolidado de afirmaciones y su respaldo.",
      time: "0:40",
      notes: {
        script: "Este es el registro que usé para decidir qué podía decir en cada diapositiva. Cada fila enlaza una afirmación con la forma en que se verificó y con su fuente. El 0.985 se reproduce, pero no vale como pronóstico; el backend existe, pero no se ejecutó; las métricas de la interfaz están escritas, pero no se reproducen; y los datos organizacionales no están. La presentación se construyó sobre esta tabla, no al revés.",
        transition: "El anexo G reúne las preguntas probables del jurado.",
        cue: "Recorrer la tabla de arriba abajo y detenerse en la fila de contratos y demanda propia.",
        question: "¿Por qué no incluir también las métricas del backend?",
        answer: "Porque no existen artefactos que las respalden. Incluirlas sería presentar un resultado no verificado, precisamente lo que la auditoría busca evitar."
      }
    },

    {
      id: "a07",
      bg: "assets/img/bg/bg-g.svg",
      kicker: "Anexo G · Defensa",
      title: "Preguntas probables y respuestas con evidencia",
      layout: "split",
      content: `
        <div class="stack--tight" style="display:flex;flex-direction:column;gap:10px">
          <div class="card card--tight"><h3>¿Por qué el módulo se llama RNN?</h3><p>Etiqueta del tablero; la implementación es AR(12). El backend sí tiene Keras, sin artefacto.</p></div>
          <div class="card card--tight"><h3>¿El 0.985 no es excelente?</h3><p>Como ajuste contemporáneo, sí. Como pronóstico, no: split aleatorio y predictores del mismo mes.</p></div>
          <div class="card card--tight"><h3>¿Los datos son reales?</h3><p>No pude verificar su procedencia. Hay señales de alerta: correlaciones de 0.92 y aportes &gt; 100 %.</p></div>
          <div class="card card--tight"><h3>¿Qué falta para producción?</h3><p>Datos auditados, walk-forward, baseline, artefactos, monitoreo y costo del error.</p></div>
        </div>
      `,
      visual: `
        <div class="stack--tight" style="display:flex;flex-direction:column;gap:10px">
          <div class="card card--tight"><h3>¿Por qué dos datasets?</h3><p>El PDF y el tablero usan archivos distintos; no hay reconciliación documentada.</p></div>
          <div class="card card--tight"><h3>¿Cómo se relaciona con el Cauca?</h3><p>Hay un componente G de Cauca en el dataset, pero no contratos ni demanda de la organización.</p></div>
          <div class="card card--tight"><h3>¿Cuál es el aporte?</h3><p>Prototipo auditable, separación explícita de evidencia y hoja de ruta de validación.</p></div>
          <div class="card card--tight" style="border-color:rgba(251,191,36,.35)"><h3 style="color:var(--amber)">Regla de respuesta</h3><p>Si la evidencia no alcanza: «No disponible en las fuentes revisadas». No improvisar cifras.</p></div>
        </div>
      `,
      sources: ["Notas del presentador y registro de evidencia", "Todas las respuestas remiten a los anexos A–F"],
      evidence: "conceptual",
      evidenceNote: "Guía de defensa; las cifras citadas están verificadas en los anexos.",
      time: "0:40",
      notes: {
        script: "Estas son las preguntas que probablemente aparezcan. La regla es no improvisar cifras. Si me preguntan por el rendimiento del backend, digo que no hay artefacto. Si me preguntan por los datos, digo que la procedencia no está documentada. Si me preguntan por el aporte, vuelvo al marco de evidencia y a la hoja de ruta. La honestidad sobre los límites es más defendible que una métrica no reproducible.",
        transition: "Volver a la presentación principal o cerrar la sesión de preguntas.",
        cue: "Mantener contacto visual; no leer la tarjeta completa.",
        question: "¿Qué respondería si insisten en un número de precisión?",
        answer: "Daría el único reproducido: R² 0.526 del AR(12) a un paso, con su RMSE y su alcance. Para el MLP explicaría por qué el 0.985 no es un pronóstico."
      }
    }
  ];

  root.PRESENTACION = { META, MAIN, ANNEX };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = root.PRESENTACION;
  }
})(typeof window !== "undefined" ? window : globalThis);
