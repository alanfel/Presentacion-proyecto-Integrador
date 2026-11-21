# Notas del presentador

**Analítica predictiva para la compra de energía y la resiliencia energética en el Cauca**

UNICOMFACAUCA · Proyecto Integrador · Sustentación académica · Noviembre de 2026

Duración de la presentación principal: **14:25** (16 diapositivas). Anexos: **4:40** (7 láminas de consulta).

> Documento de apoyo separado de la presentación. La aplicación ya no incluye un panel de notas: esta versión y el PDF `NOTAS_PRESENTADOR.pdf` son la referencia para el presentador. Cada bloque incluye guion, transición, pausa/gesto, pregunta probable y respuesta limitada a la evidencia.

---

## Presentación principal

### 01. La energía de decidir antes

**Tiempo:** 0:45

**Guion (0:45)**

Buenos días. Esta sustentación presenta un prototipo de analítica predictiva para apoyar decisiones de compra de energía y resiliencia en el Cauca. Voy a separar tres cosas: lo que el proyecto declara, lo que pude verificar ejecutando el código y lo que no está disponible. La contribución principal no es un porcentaje de precisión, sino un marco auditable para decidir con evidencia.

**Transición:** Empiezo por el problema que justifica la analítica.

**Pausa / gesto:** Pausa breve después de «no puede afirmarse»; señalar los tres ejes de la portada: precio, continuidad y decisión.

**Pregunta probable del jurado:** ¿Cuál es el aporte original del proyecto?

**Respuesta con evidencia:** Un prototipo funcional y una auditoría explícita de sus límites. No presento un modelo predictivo validado: presento lo que la evidencia sostiene y lo que falta para validarlo.

**Fuentes:** Propuesta del proyecto (PDF, 42 pp.) · Repositorio local: tablero estático y backend · Archivos de datos revisados

---

### 02. Comprar energía en un sistema hidro-dominado

**Tiempo:** 0:50

**Guion (0:50)**

En un sistema hidro-dominado, el precio de bolsa se mueve con los aportes, los embalses y la demanda. Para una comercializadora regional, eso significa comprar antes de saber el precio. El proyecto no parte de un mercado abstracto: parte de esa presión de decisión. Pero aquí aparece la primera advertencia: no encontré contratos, demanda propia ni precios de compra de la organización.

**Transición:** Con ese vacío, formulo la pregunta y los objetivos.

**Pausa / gesto:** Bajar la voz en «comprar antes de saber el precio»; pausa de un segundo.

**Pregunta probable del jurado:** ¿Por qué el Cauca y no el sistema nacional?

**Respuesta con evidencia:** El dataset incluye un componente G de Cauca, pero no contiene contratos ni demanda de una empresa específica. El alcance territorial está en la propuesta; la evidencia operativa no está disponible.

**Fuentes:** Propuesta del proyecto: planteamiento del problema · Revisión de repositorio: no se encontraron contratos, demanda propia ni precios de compra de la organización

---

### 03. Una pregunta que obliga a distinguir evidencia de expectativa

**Tiempo:** 0:50

**Guion (0:50)**

La pregunta central no es «qué modelo acierta más». Es cómo usar analítica para mejorar una decisión de compra sin sobreestimar la evidencia. Por eso los objetivos incluyen auditar los datos y documentar los límites, no solo entrenar modelos. La regla es simple: toda cifra debe poder rastrearse hasta un archivo o una ejecución; si no, se etiqueta.

**Transición:** Antes de los modelos, necesito definir qué significa resiliencia en este contexto.

**Pausa / gesto:** Contar los cuatro objetivos con la mano; detenerse en el cuarto.

**Pregunta probable del jurado:** ¿Documentar límites es un objetivo académico o una excusa?

**Respuesta con evidencia:** Es un objetivo metodológico. Sin límites explícitos, un R² alto puede inducir una decisión de compra equivocada. La auditoría es parte del aporte.

**Fuentes:** Síntesis propia a partir de la propuesta del proyecto · Los objetivos no aparecen formulados con este nivel de detalle en el PDF

---

### 04. De la predicción a la resiliencia

**Tiempo:** 0:45

**Guion (0:45)**

Aquí conviene separar tres capas. La analítica predictiva estima escenarios, no certezas. La resiliencia es la capacidad de anticipar, absorber y recuperarse. Y la decisión de compra combina contratos, reservas y límites de riesgo. La consecuencia es que un modelo solo es útil si cambia o sostiene una regla de decisión. Ese es el criterio con el que voy a evaluar el prototipo.

**Transición:** Veamos con qué datos se alimentó ese prototipo.

**Pausa / gesto:** Señalar las tres columnas en orden, sin prisa.

**Pregunta probable del jurado:** ¿La resiliencia se puede medir con un R²?

**Respuesta con evidencia:** No. El R² mide ajuste estadístico. La resiliencia requiere indicadores de exposición, cobertura, recuperación y costo del error, que no están en los datos revisados.

**Fuentes:** Definiciones de trabajo elaboradas para esta sustentación · Propuesta del proyecto: objetivos generales

---

### 05. Dos datos que no cuentan la misma historia

**Tiempo:** 1:00

**Guion (1:00)**

Este es uno de los hallazgos centrales. La propuesta y el tablero usan archivos distintos, aunque ambos tengan 600 meses y la misma etiqueta de precio. Los rangos no coinciden: el tablero llega a 709 COP por kWh y la propuesta a 203. La correlación entre ambas series es 0.043, prácticamente cero. No son dos versiones del mismo dato: son dos universos. Por eso ningún resultado es comparable sin decir qué archivo se usó.

**Transición:** Con esa advertencia, revisemos qué se construyó.

**Pausa / gesto:** Señalar la fila de correlación y dejar que el número hable; pausa.

**Pregunta probable del jurado:** ¿Cuál de los dos datasets es el correcto?

**Respuesta con evidencia:** No puedo determinarlo con la evidencia revisada. La propuesta describe uno, el tablero usa otro y no hay documento de reconciliación. Cualquier afirmación empírica debe declarar cuál se usó.

**Fuentes:** datos_filtrados.csv y assets/data.js (tablero) · energia-clima-dashboard/backend/data/dataset_unificado_energia_clima.csv (propuesta) · Cálculo local de rangos y correlación de Pearson

---

### 06. Qué se construyó y qué se pudo ejecutar

**Tiempo:** 0:50

**Guion (0:50)**

El prototipo tiene dos piezas. El tablero estático es la que pude ejecutar: carga sin errores, entrena en el navegador y muestra métricas. El backend es una API FastAPI con un modelo Keras, pero en este entorno no pude levantarlo porque TensorFlow no respondió. Además, no hay pesos ni métricas guardadas. Por eso distingo «código presente» de «modelo reproducible»: no son lo mismo.

**Transición:** Veamos primero qué dicen los datos del tablero.

**Pausa / gesto:** Señalar la captura y luego el tercer punto rojo de la lista.

**Pregunta probable del jurado:** Si el backend no se ejecutó, ¿cómo sabe que existe el modelo?

**Respuesta con evidencia:** Por lectura del código: rnn_service.py construye un SimpleRNN de Keras con unidades, dropout y epochs definidos. Lo que no existe es un artefacto entrenado ni métricas que pueda verificar.

**Fuentes:** dashboard-energia-clima-github/assets/app.js · energia-clima-dashboard/backend/app/services/rnn_service.py · Captura local del tablero (1600 × 900)

---

### 07. Lo que muestran los datos del prototipo

**Tiempo:** 1:00

**Guion (1:00)**

En el dataset del tablero, los meses de El Niño tienen un precio medio de 442 COP, frente a 140 en La Niña. Las correlaciones son muy altas: 0.92 con el ONI y menos 0.91 con embalses. Eso es consistente con la intuición hidrológica, pero también es una señal de alarma: correlaciones así de altas en datos de mercado son improbables. Además, hay aportes hídricos por encima del 100 %. La procedencia del dataset no está documentada.

**Transición:** Con esas reservas, pasemos al módulo de pronóstico.

**Pausa / gesto:** Pausa después de «señal de alarma»; no celebrar las correlaciones.

**Pregunta probable del jurado:** ¿Entonces los datos son sintéticos?

**Respuesta con evidencia:** No puedo afirmarlo. Lo que puedo afirmar es que su procedencia no está documentada y que hay valores poco plausibles. Hasta no auditar la fuente, los resultados son descriptivos del archivo, no del mercado.

**Fuentes:** datos_filtrados.csv · 600 registros · Cálculo local de medias por clase y correlaciones · La propuesta no documenta el proceso de generación del dataset

---

### 08. El módulo llamado «RNN» es un AR(12) lineal

**Tiempo:** 1:00

**Guion (1:00)**

El tablero presenta este módulo como RNN, pero el código no contiene una red recurrente. Ajusta una regresión lineal con 12 rezagos, estandarizados, más un término ridge. El resultado es un R² de 0.526, con RMSE de 88.48 COP por kWh sobre 118 meses. Es un resultado modesto y honesto, pero hay que decir qué mide: cada predicción usa los 12 valores reales anteriores. No es un pronóstico a 12 meses.

**Transición:** La gráfica permite ver exactamente qué tan lejos llega.

**Pausa / gesto:** Decir «no hay red recurrente» mirando al jurado; pausa antes de las métricas.

**Pregunta probable del jurado:** ¿Por qué se llama RNN si no lo es?

**Respuesta con evidencia:** Es una decisión de etiquetado del tablero. La implementación es AR lineal; el backend sí contiene un SimpleRNN de Keras, pero no tiene artefacto entrenado. La presentación usa el nombre real del módulo.

**Fuentes:** dashboard-energia-clima-github/assets/app.js · fitARModel / predictAR · Ejecución local del módulo con lags = 12 y test = 20 %

---

### 09. La serie se sigue, pero el horizonte es de un mes

**Tiempo:** 0:55

**Guion (0:55)**

La línea clara es el precio real y la turquesa es la predicción. El modelo sigue el nivel y la tendencia, pero se queda corto en los picos y no anticipa los cambios bruscos. Eso es esperable: en cada mes le estamos entregando los 12 valores reales anteriores. La gráfica no demuestra capacidad de pronóstico futuro; demuestra que el AR captura persistencia. La distancia entre ambas líneas es el costo de usarlo como si pronosticara.

**Transición:** Ahora veamos el otro modelo, el que sí muestra un número espectacular.

**Pausa / gesto:** Recorrer la gráfica de izquierda a derecha con la mirada; detenerse en 2020–2022.

**Pregunta probable del jurado:** ¿El modelo predice la pandemia o la crisis de 2022?

**Respuesta con evidencia:** No. Se adapta con retraso porque usa valores reales previos; no anticipa el choque. Ese es precisamente el límite de un ejercicio one-step.

**Fuentes:** assets/data/rnn_test_series.json · 118 puntos extraídos de la ejecución · Módulo AR del tablero estático

---

### 10. 0.985: el número que no debe celebrarse

**Tiempo:** 1:00

**Guion (1:00)**

El MLP reporta un R² de 0.985. El número es real: lo ejecuté y lo reproduje. Pero no significa lo que parece. El split es aleatorio: meses de 1975 y de 2024 se mezclan. Y los predictores son del mismo mes que el precio. El modelo está aprendiendo una relación contemporánea, no anticipando. Si mañana tengo que comprar energía para el mes siguiente, no tendré los aportes ni el ONI del mes siguiente. Por eso este 0.985 no es un resultado de pronóstico.

**Transición:** La siguiente diapositiva desarma el mecanismo del leakage.

**Pausa / gesto:** Decir «el número es real» y luego «no significa lo que parece»; pausa entre ambas.

**Pregunta probable del jurado:** ¿Un R² de 0.985 no es evidencia suficiente?

**Respuesta con evidencia:** No para un pronóstico. El R² mide ajuste en un test aleatorio con predictores contemporáneos. Para compras necesito un test temporal y variables disponibles antes de la decisión.

**Fuentes:** dashboard-energia-clima-github/assets/app.js · trainMLPRegressor · Ejecución local con 5 predictores, 32 neuronas, 300 épocas · assets/data/mlp_curves.json · curvas y dispersión extraídas

---

### 11. Por qué el 0.985 es leakage, no habilidad

**Tiempo:** 1:00

**Guion (1:00)**

El leakage tiene tres mecanismos concretos. Primero, el test está intercalado: el modelo entrena con meses vecinos a los que luego evalúa. Segundo, los predictores son contemporáneos: para predecir el precio de marzo uso los aportes de marzo, que no conozco cuando compro. Tercero, no hay baseline. Las curvas de pérdida son sanas y la dispersión es estrecha, pero eso solo confirma que el modelo aprendió la relación dentro de la muestra. No confirma que anticipe.

**Transición:** Entonces, ¿qué haría falta para afirmar un pronóstico?

**Pausa / gesto:** Contar los tres mecanismos con los dedos; no señalar las curvas como éxito.

**Pregunta probable del jurado:** ¿El leakage invalida todo el proyecto?

**Respuesta con evidencia:** No. Invalida el 0.985 como pronóstico. El AR(12) conserva una evaluación cronológica a un paso y la analítica descriptiva sigue siendo útil, con las reservas sobre el dataset.

**Fuentes:** assets/data/mlp_curves.json · assets/app.js · shuffleIndices, split y estandarización · Diseño metodológico: validación temporal ausente

---

### 12. Qué haría falta para afirmar un pronóstico

**Tiempo:** 0:55

**Guion (0:55)**

Esta tabla es el estándar mínimo que exigiría para afirmar un pronóstico. Baseline, split temporal, error porcentual, artefactos y validación externa. De los cinco, solo hay un holdout cronológico parcial en el AR. El MLP no tiene split temporal y el backend no tiene artefactos. La ausencia de baseline es la más grave: sin saber cuánto acierta «repetir el último precio», no puedo decir que el modelo agregue valor.

**Transición:** Estas brechas no son detalles: son el resultado de la auditoría.

**Pausa / gesto:** Recorrer la columna «Qué falta» de arriba abajo; detenerse en la ausencia de baseline.

**Pregunta probable del jurado:** ¿Con un MAPE bastaría?

**Respuesta con evidencia:** No por sí solo. MAPE ayuda a comunicar el error, pero sigue siendo necesario un baseline y una validación temporal. La métrica no reemplaza el diseño.

**Fuentes:** Auditoría del repositorio y de los módulos ejecutados · README del tablero: las métricas originales se conservan como referencia

---

### 13. Brechas de evidencia encontradas

**Tiempo:** 0:50

**Guion (0:50)**

La auditoría dejó cuatro brechas. Los datasets no coinciden. Las métricas de paradigmas, 0.89 y 38.2, están escritas directamente en la interfaz y no se reproducen. El backend tiene código de Keras pero no artefactos. Y la URL publicada está detrás del login de Vercel, así que no pude verificar que sea la misma build. Ninguna de estas brechas impide presentar el prototipo; impiden presentarlo como validado.

**Transición:** Con esto claro, veamos qué decisión sí se puede sostener.

**Pausa / gesto:** Ir despacio en la fila de métricas escritas en la interfaz.

**Pregunta probable del jurado:** ¿Está diciendo que el proyecto no funciona?

**Respuesta con evidencia:** No. Está funcional como prototipo y como objeto de auditoría. Lo que no puedo afirmar es que sus métricas constituyan evidencia de pronóstico o de impacto en compras.

**Fuentes:** Comparación de datasets y cálculo de correlación · assets/app.js · bloque de paradigmas con métricas estáticas · rnn_service.py · lectura de código · Verificación de la URL publicada

---

### 14. De la métrica a la decisión de compra

**Tiempo:** 1:00

**Guion (1:00)**

Si el modelo no está validado, ¿qué se puede hacer con él? Usarlo como señal, no como oráculo. En lugar de un precio puntual, escenarios con intervalos. En lugar de una compra única, contratos por tramos con reserva. Y reglas de control: cuánto cubrir, cuándo activar y cómo revisar el resultado. Esto es un diseño, no una recomendación validada. Para validarlo necesitaría contratos, demanda y restricciones de caja que no están en las fuentes.

**Transición:** Cierro con los límites y el siguiente ciclo de trabajo.

**Pausa / gesto:** Bajar el ritmo; dejar claro que «propuesto» no es «probado».

**Pregunta probable del jurado:** ¿Qué porcentaje de la demanda habría que cubrir?

**Respuesta con evidencia:** No puedo determinarlo sin demanda, contratos y aversión al riesgo. Cualquier porcentaje sería una invención. La contribución es el marco de decisión, no una cifra óptima.

**Fuentes:** Síntesis de diseño para la sustentación · No se dispone de contratos, demanda propia ni precios de compra

---

### 15. Lo que falta no es más cómputo: es mejor evidencia

**Tiempo:** 0:45

**Guion (0:45)**

Los límites son concretos: no sé de dónde salió el dataset, no hay validación temporal del MLP, no hay datos de compra y el backend no se ejecutó. El siguiente ciclo no empieza entrenando una red más grande. Empieza auditando la fuente, construyendo un walk-forward con baseline y guardando artefactos. Solo después tiene sentido un piloto de decisión. Si la fase de datos falla, las siguientes se detienen.

**Transición:** Termino con tres conclusiones que sí puedo defender.

**Pausa / gesto:** Señalar la secuencia de fases; pausa en «puede fallar».

**Pregunta probable del jurado:** ¿No sería más rápido usar un modelo preentrenado?

**Respuesta con evidencia:** No resolvería el problema de fondo: los datos y el diseño de validación. Un modelo más complejo sobre datos no auditados produce una confianza mayor, no una evidencia mayor.

**Fuentes:** Hallazgos de la auditoría · Hoja de ruta propuesta para el siguiente ciclo

---

### 16. Tres conclusiones defendibles

**Tiempo:** 1:00

**Guion (1:00)**

Cierro con tres ideas. Primero, el prototipo existe y puede auditarse: no es una diapositiva, es código que corre. Segundo, la evidencia sostiene un AR de 12 rezagos a un paso con R² 0.526; no sostiene un pronóstico futuro ni el 0.985 del MLP. Tercero, el siguiente paso es validación temporal, baseline y datos reales de compra. La contribución no es un número alto: es un marco para no engañarnos con él. Todo el proyecto, con el código y la documentación, está en el repositorio que aparece en esta lámina. Gracias; quedo atento a las preguntas.

**Transición:** Abrir espacio para preguntas; ofrecer los anexos según el interés del jurado.

**Pausa / gesto:** Pausa de dos segundos tras la frase final; no llenar el silencio.

**Pregunta probable del jurado:** ¿Cuál sería su recomendación inmediata para la organización?

**Respuesta con evidencia:** No tomar decisiones de cobertura con estas métricas. Primero auditar la fuente de datos y establecer un baseline temporal; mientras tanto, usar el tablero como exploración descriptiva, no como pronóstico.

**Fuentes:** Síntesis de resultados verificados y brechas documentadas · Detalle técnico en los anexos A–G

---

## Anexos A–G

### Anexo A. Ficha técnica del dataset del tablero

**Tiempo:** 0:40

**Guion (0:40)**

Esta ficha resume las diez variables del tablero. Hay 600 meses completos, sin nulos ni duplicados. El detalle importante es la alerta: los aportes hídricos llegan a 160 %, un valor que no es plausible como porcentaje. Eso refuerza la necesidad de auditar la fuente antes de usar cualquier modelo.

**Transición:** El anexo B compara este archivo con el de la propuesta.

**Pausa / gesto:** Señalar la fila de aportes y la alerta.

**Pregunta probable del jurado:** ¿Los nulos y duplicados se revisaron?

**Respuesta con evidencia:** Sí. Cero nulos y cero fechas duplicadas en ambos archivos de 600 filas; el problema no es completitud, es procedencia y plausibilidad.

**Fuentes:** datos_filtrados.csv · Cálculo local de mínimos, máximos y medias

---

### Anexo B. Tres archivos, tres series de precio distintas

**Tiempo:** 0:40

**Guion (0:40)**

Hay tres archivos de precio y no son equivalentes. El del tablero correlaciona 0.043 con el de la propuesta y 0.14 con el legado. Más grave aún: la correlación precio-ONI es 0.92 en el tablero y casi cero en la propuesta. Es el mismo fenómeno con conclusiones opuestas. Sin reconciliar estos archivos, cualquier afirmación empírica es ambigua.

**Transición:** El anexo C entra en el detalle del AR.

**Pausa / gesto:** Señalar la última columna y la fila de correlación ONI.

**Pregunta probable del jurado:** ¿Se puede promediar o combinar los archivos?

**Respuesta con evidencia:** No con la evidencia actual. No comparten valores ni documentación de origen. Combinarlos introduciría una serie artificial; primero hay que reconciliar la fuente.

**Fuentes:** Comparación directa de los tres CSV · Correlación de Pearson calculada localmente · La propuesta no menciona el archivo del tablero ni el legado

---

### Anexo C. Especificación y evaluación del modelo autorregresivo

**Tiempo:** 0:40

**Guion (0:40)**

El AR estandariza cada rezago con la media y desviación del conjunto de entrenamiento, ajusta por mínimos cuadrados con una penalización ridge mínima y predice el siguiente mes. La evaluación es cronológica y honesta en un sentido: entrena con el pasado y evalúa con el futuro. Pero es one-step: le entregamos los valores reales previos. No hay intervalo de confianza ni baseline, así que el R² 0.526 es un techo optimista de lo que sería un pronóstico real.

**Transición:** El anexo D hace lo mismo con el MLP.

**Pausa / gesto:** Señalar la ecuación y luego la frase «siempre usa la serie real».

**Pregunta probable del jurado:** ¿Se puede convertir en un pronóstico multi-paso?

**Respuesta con evidencia:** Sí, alimentando las predicciones como rezagos, pero el error se acumula. Ese experimento no está hecho ni documentado; no puedo reportar su desempeño.

**Fuentes:** assets/app.js · fitARModel y predictAR · Ejecución con lags = 12, test = 20 % · assets/data/rnn_test_series.json

---

### Anexo D. Configuración exacta del experimento con R² 0.985

**Tiempo:** 0:40

**Guion (0:40)**

El MLP tiene cinco entradas, 32 neuronas tanh y una salida lineal. Se entrenó 300 épocas completas con Adam y learning rate 0.012. La estandarización se ajustó solo con entrenamiento, lo cual está bien. El problema no es el escalado ni el sobreajuste: las curvas de train y test caen juntas. El problema es que el split es aleatorio y los predictores son contemporáneos. El test no representa el futuro que enfrenta una compra.

**Transición:** El anexo E revisa el backend de Keras.

**Pausa / gesto:** Señalar la tarjeta de split y la de estandarización.

**Pregunta probable del jurado:** ¿Cambiar la semilla altera el 0.985?

**Respuesta con evidencia:** Puede alterarlo ligeramente, pero no cambiaría la conclusión: el diseño del split y la contemporaneidad de los predictores siguen invalidándolo como pronóstico.

**Fuentes:** assets/app.js · trainMLPRegressor y bloque de ejecución · assets/data/mlp_curves.json · 300 épocas y 150 puntos · Ejecución local con los valores por defecto

---

### Anexo E. El SimpleRNN de Keras: código real, artefacto ausente

**Tiempo:** 0:40

**Guion (0:40)**

El backend sí tiene un SimpleRNN real: 32 unidades, dropout, Adam y early stopping. La intención de split es cronológica, con shuffle en falso. Pero hay dos problemas. Primero, el MinMaxScaler se ajusta sobre toda la serie antes de separar, lo que filtra información del futuro. Segundo, no hay modelo guardado ni métricas persistidas. No puedo reportar su desempeño porque no existe un artefacto que lo respalde. El fallback a MLP de scikit-learn tampoco está documentado con resultados.

**Transición:** El anexo F consolida el registro de evidencia.

**Pausa / gesto:** Distinguir «código real» de «modelo reproducible» con las manos.

**Pregunta probable del jurado:** ¿El scaler sobre toda la serie invalida el backend?

**Respuesta con evidencia:** Introduce leakage de preprocesamiento, aunque menor que el del MLP estático. Junto con la ausencia de artefactos, impide afirmar cualquier métrica del backend.

**Fuentes:** energia-clima-dashboard/backend/app/services/rnn_service.py · energia-clima-dashboard/backend/app/schemas/schemas.py · Búsqueda de artefactos .keras/.h5/pesos/métricas: sin resultados

---

### Anexo F. Registro de evidencia: qué sostiene cada afirmación

**Tiempo:** 0:40

**Guion (0:40)**

Este es el registro que usé para decidir qué podía decir en cada diapositiva. Cada fila enlaza una afirmación con la forma en que se verificó y con su fuente. El 0.985 se reproduce, pero no vale como pronóstico; el backend existe, pero no se ejecutó; las métricas de la interfaz están escritas, pero no se reproducen; y los datos organizacionales no están. La presentación se construyó sobre esta tabla, no al revés.

**Transición:** El anexo G reúne las preguntas probables del jurado.

**Pausa / gesto:** Recorrer la tabla de arriba abajo y detenerse en la fila de contratos y demanda propia.

**Pregunta probable del jurado:** ¿Por qué no incluir también las métricas del backend?

**Respuesta con evidencia:** Porque no existen artefactos que las respalden. Incluirlas sería presentar un resultado no verificado, precisamente lo que la auditoría busca evitar.

**Fuentes:** Auditoría completa del repositorio · Ejecuciones locales documentadas en README y REGISTRO_EVIDENCIA.md

---

### Anexo G. Preguntas probables y respuestas con evidencia

**Tiempo:** 0:40

**Guion (0:40)**

Estas son las preguntas que probablemente aparezcan. La regla es no improvisar cifras. Si me preguntan por el rendimiento del backend, digo que no hay artefacto. Si me preguntan por los datos, digo que la procedencia no está documentada. Si me preguntan por el aporte, vuelvo al marco de evidencia y a la hoja de ruta. La honestidad sobre los límites es más defendible que una métrica no reproducible.

**Transición:** Volver a la presentación principal o cerrar la sesión de preguntas.

**Pausa / gesto:** Mantener contacto visual; no leer la tarjeta completa.

**Pregunta probable del jurado:** ¿Qué respondería si insisten en un número de precisión?

**Respuesta con evidencia:** Daría el único reproducido: R² 0.526 del AR(12) a un paso, con su RMSE y su alcance. Para el MLP explicaría por qué el 0.985 no es un pronóstico.

**Fuentes:** Notas del presentador y registro de evidencia · Todas las respuestas remiten a los anexos A–F

---

## Regla de oro para la defensa

Si una cifra no se puede rastrear hasta un archivo o una ejecución, se declara que el dato no está disponible. No se improvisan resultados.
