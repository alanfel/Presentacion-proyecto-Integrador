# Registro de evidencia y trazabilidad

**Proyecto:** Analítica predictiva para la compra de energía y la resiliencia energética en el Cauca  
**Institución:** UNICOMFACAUCA · Proyecto Integrador  
**Corte de evidencia:** noviembre de 2026  
**Regla:** toda cifra de la presentación debe rastrearse hasta un archivo o una ejecución. Si no existe, se declara que el dato no está disponible.

> **Alcance de este documento.** Los estados de evidencia (verificado, parcial, no disponible, reportado, mixto, conceptual) son metadatos internos de auditoría. No se muestran en las diapositivas ni en el PDF de impresión: las láminas solo conservan la línea de fuente. El guion oral se entrega aparte en `NOTAS_PRESENTADOR.pdf`.

---

## 1. Método

Se revisaron y contrastaron:

1. La propuesta del proyecto: `D:\Diplomado\Proyecto_Integrador_Overleaf.pdf` (42 páginas, texto extraído con PyMuPDF).
2. El tablero estático: `dashboard-energia-clima-github/` (`index.html`, `assets/app.js`, `assets/data.js`, `datos_filtrados.csv`).
3. El backend: `energia-clima-dashboard/backend/` (`rnn_service.py`, `schemas.py`, datos).
4. Los documentos de estado: `README.md`, `ENTREGA_FINAL.md`, `ENERGA_FINAL.md`, `FASE2_MODELO_RNN.txt`.
5. La URL publicada del tablero.
6. La ejecución local del tablero en `http://localhost:8765`, con extracción de series y curvas reales.

La propuesta es un **documento de propuesta**, no un informe de resultados: no incluye nombres de modelos, arquitecturas, hiperparámetros, métricas ni curvas de entrenamiento. Por eso los resultados presentados provienen del prototipo implementado y se etiquetan como tales.

---

## 2. Evidencia verificada

### 2.1 Datos

| Hecho | Valor | Fuente |
|---|---|---|
| Registros del tablero | 600 filas × 10 columnas | `datos_filtrados.csv`, `assets/data.js` |
| Periodo del tablero | 1975-01-31 → 2024-12-31 | `datos_filtrados.csv` |
| Nulos / fechas duplicadas | 0 / 0 | Auditoría del CSV |
| Precio de bolsa (tablero) | 68.4122 – 709.3960 COP/kWh; media 295.6978 | Cálculo local |
| Componente G CEO Cauca | 242.4092 – 772.2339 COP/kWh; media 458.9085 | Cálculo local |
| Aportes hídricos | 39.3631 – 160.0000 %; 233 meses > 100 % | Cálculo local |
| Embalses | 26.7270 – 99.0000 % | Cálculo local |
| Demanda nacional | 114.0535 – 215.7109 GWh/día | Cálculo local |
| ONI histórico | −2.0417 – 2.0177 | Cálculo local |
| Precipitación | 63.4751 – 298.1064 mm | Cálculo local |
| Temperatura | 18.0119 – 24.1470 °C | Cálculo local |
| Clases climáticas | 275 El Niño / 187 La Niña / 138 Neutro | `Estado_Climatico` |
| Precio medio por clase | 442.6 / 140.6 / 213.1 COP/kWh | Cálculo local |
| Correlación precio–ONI | **+0.9202** | Cálculo local |
| Correlación precio–embalses | **−0.9065** | Cálculo local |
| Correlación precio–aportes | **−0.8829** | Cálculo local |
| Correlación precio–demanda | +0.0042 | Cálculo local |
| Correlación aportes–embalses | +0.9201 | Cálculo local |

### 2.2 Dataset de la propuesta

| Hecho | Valor | Fuente |
|---|---|---|
| Registros | 600 × 10 | `backend/data/dataset_unificado_energia_clima.csv` |
| Periodo | 1975-01 → 2024-12 | Archivo |
| Nulos / duplicados | 0 / 0 | Auditoría |
| Precio de bolsa | 64.99 – 203.41 COP/kWh | Cálculo local |
| Columnas ONI | 2 (`Indice_ONI_Clima`, `Indice_ONI_Clima_Hist`) | Archivo |
| Aportes > 100 % | 561 meses | Cálculo local |
| Correlación precio–ONI | **−0.0086** | Cálculo local |
| Correlación con el precio del tablero | **0.0434** | Cálculo local |

### 2.3 Modelo AR(12) del tablero

| Hecho | Valor |
|---|---|
| Implementación | `fitARModel` / `predictAR` en `assets/app.js` |
| Tipo real | Regresión lineal autorregresiva, 12 rezagos, ridge `1e-3` |
| Estandarización | Media y desviación de los rezagos, calculadas en entrenamiento |
| Entrenamiento / test | 470 filas / 118 meses |
| Periodo de test | 2015-03 → 2024-12 |
| R² | **0.526** |
| RMSE | **88.48 COP/kWh** |
| MAE | **68.58 COP/kWh** |
| Media del test | 387.99 COP/kWh |
| Tipo de evaluación | One-step-ahead con los 12 valores reales previos |
| Baseline | No disponible |

Serie extraída: `assets/data/rnn_test_series.json` (118 puntos reales y predichos, sin suavizado).

### 2.4 MLP del tablero

| Hecho | Valor |
|---|---|
| Implementación | `trainMLPRegressor` en `assets/app.js` |
| Arquitectura | 5 entradas · 32 neuronas ocultas `tanh` · 1 salida lineal |
| Predictores | Aportes, embalses, demanda, ONI histórico, precipitación |
| Objetivo | Precio de bolsa del **mismo mes** |
| Entrenamiento | 300 épocas full-batch · Adam · lr 0.012 · MSE · seed 42 |
| Split | 75/25 **aleatorio** · seed 7 · 450 train / 150 test |
| Estandarización | Ajustada solo con train (correcta) |
| R² | **0.985** |
| RMSE | **20.08 COP/kWh** |
| MAE | **15.75 COP/kWh** |
| Pérdida final | 0.0180 train / 0.0165 test |
| Validez como pronóstico | **No válida**: split aleatorio + predictores contemporáneos |

Curvas y dispersión extraídas: `assets/data/mlp_curves.json` (300 épocas, 150 puntos).

### 2.5 Backend

| Hecho | Valor | Fuente |
|---|---|---|
| Framework | FastAPI + Keras/TensorFlow | `rnn_service.py` |
| Arquitectura declarada | SimpleRNN(32) + Dropout(0.1) + Dense(1) | Código |
| Entrenamiento | Adam 1e-3, MSE, 80 épocas, batch 16 | Código y `schemas.py` |
| EarlyStopping | Paciencia 15, restaura mejores pesos | Código |
| Split | Cronológico, `shuffle=False` | Código |
| Preprocesamiento | `MinMaxScaler` ajustado sobre la serie completa antes del split | Código |
| Artefactos | **No hay** `.keras`, `.h5`, pesos, curvas ni métricas guardadas | Búsqueda en repositorio |
| Fallback | MLP de scikit-learn si TensorFlow no está disponible | Código |
| Dataset por defecto | `dataset_unificado_energia_clima.csv` | Código |

El backend **no se pudo ejecutar** en este entorno: TensorFlow no respondió. La revisión fue por lectura de código.

### 2.6 Publicación

| Hecho | Resultado |
|---|---|
| URL publicada | `https://proyecto-integrador-2-2iz21xow9-notinhan.vercel.app/` |
| Acceso | Redirige al login SSO de Vercel |
| Comparación con la build local | **No verificable** |

---

## 3. Discrepancias encontradas

### D1. Dos datasets con la misma etiqueta y distinto contenido

- Tablero: precio 68.41–709.40 COP/kWh, 1 columna ONI + `Estado_Climatico`, 233 meses con aportes > 100 %.
- Propuesta: precio 64.99–203.41 COP/kWh, 2 columnas ONI, 561 meses con aportes > 100 %.
- Correlación entre ambas series de precio: **0.0434** (prácticamente independientes).
- No existe documento de reconciliación ni de linaje de datos.

**Consecuencia:** ningún resultado es comparable sin declarar el archivo usado. La presentación declara siempre la fuente.

### D2. La relación precio–ONI cambia de signo y magnitud

- Tablero: **+0.9202**.
- Propuesta: **−0.0086**.

**Consecuencia:** la conclusión descriptiva depende por completo del dataset. No se puede afirmar una relación climática del mercado colombiano con esta evidencia.

### D3. Un tercer archivo legado

- `backend/data/dataset_energia_clima.csv`: 600 filas.
- Precio: 78.89 – 1036.51 COP/kWh.
- Aportes > 100 %: **600 de 600**.
- Correlación de su precio con el del tablero: **0.1397**.

**Consecuencia:** no es una versión corregida; es otra serie. Combinarlos introduciría una serie artificial.

### D4. El módulo «RNN» no es una red recurrente

- La interfaz lo llama RNN.
- `fitARModel` implementa una regresión lineal con 12 rezagos y ridge `1e-3`.
- El backend sí contiene un `SimpleRNN` de Keras, pero sin artefacto entrenado.

**Consecuencia:** se presenta como **AR(12) lineal**, con su nombre técnico real.

### D5. El R² 0.985 del MLP no es evidencia de pronóstico

Tres mecanismos:

1. Split **aleatorio**: meses de 1975 y 2024 se mezclan entre train y test.
2. Predictores **contemporáneos**: aportes, embalses, demanda, ONI y precipitación del mismo mes que el precio.
3. **Sin baseline**: no hay naïve, estacional ni walk-forward.

**Consecuencia:** se reporta como ajuste contemporáneo, nunca como capacidad de anticipación.

### D6. Backend sin artefactos

- Hay código de entrenamiento, pero no pesos, modelo guardado, curvas ni métricas.
- El `MinMaxScaler` se ajusta sobre la serie completa antes del split (leakage de preprocesamiento).
- No se puede afirmar su desempeño.

### D7. Métricas escritas en la interfaz, no reproducidas

- `R² ~ 0.89 / RMSE ~ 38.2 COP/kWh`.
- `Accuracy ~ 0.82 / F1 ~ 0.81`.
- Están hardcodeadas en el bloque de «paradigmas» de `assets/app.js`.
- El README del tablero indica que las métricas originales se conservan como referencia.

**Consecuencia:** se etiquetan como **reportadas**, no verificadas.

### D8. Publicación no verificable

La URL pública está detrás del login SSO de Vercel. No se pudo confirmar que la build publicada coincida con el repositorio local.

### D9. Valores poco plausibles en el dataset del tablero

- Aportes hídricos hasta **160 %**.
- 233 meses por encima de 100 %.
- Correlaciones de 0.92 entre precio y ONI/embalses, inusualmente altas para datos de mercado.

**Consecuencia:** se declara la procedencia como no verificada y se evita interpretar los resultados como evidencia del mercado real.

### D10. La propuesta no contiene resultados ejecutados

El PDF de 42 páginas es una propuesta: no incluye nombres de modelos, arquitecturas, hiperparámetros, métricas ni curvas. Cualquier resultado presentado debe provenir del prototipo y etiquetarse como implementación.

---

## 4. Datos y artefactos no disponibles

| Elemento faltante | Estado | Impacto |
|---|---|---|
| Diccionario de datos y URL de origen | No disponible | No se puede auditar la procedencia ni la unidad de los aportes. |
| Script de generación / extracción del dataset | No disponible | No se puede reproducir la serie desde la fuente primaria. |
| Contratos de energía | No disponible | No se puede evaluar cobertura, precio de compra ni costo del error. |
| Demanda propia de la organización | No disponible | No se puede dimensionar la compra ni el porcentaje óptimo de cobertura. |
| Precios de compra / restricciones de caja | No disponible | No se puede construir una función de costo realista. |
| Límites de riesgo y gobernanza | No disponible | No se puede validar la regla de decisión propuesta. |
| Baseline naïve / estacional | No disponible | No se sabe si los modelos aportan valor sobre una regla simple. |
| Validación walk-forward | No disponible | No hay evidencia de desempeño fuera de muestra temporal. |
| MAPE u error porcentual | No disponible | El error solo se comunica en COP/kWh y R². |
| Pesos / modelo del backend | No disponible | No se puede reproducir ni auditar el SimpleRNN. |
| Curvas y métricas del backend | No disponible | No se puede afirmar su precisión. |
| Build publicada verificable | No disponible | No se puede comparar la URL con el repositorio local. |
| Identificación de municipios / unidad de negocio | No disponible | El alcance territorial es general (Cauca), sin operación concreta. |

---

## 5. Afirmaciones que NO se hacen

- Que el AR(12) pronostique 12 meses hacia adelante.
- Que el MLP tenga capacidad predictiva por su R² 0.985.
- Que el backend Keras haya sido entrenado o tenga métricas.
- Que las métricas 0.89 / 38.2 o 0.82 / 0.81 sean resultados reproducidos.
- Que los datos representen el mercado eléctrico colombiano real.
- Que exista una reducción de costos, un ahorro o un impacto medido en compras.
- Que la organización haya adoptado el prototipo.
- Que la URL publicada coincida con la build local.

---

## 6. Trazabilidad por lámina

| Lámina | Afirmación principal | Estado | Fuente |
|---|---|---|---|
| 01 | Portada y alcance | Mixto | Documentos y repositorio |
| 02 | Contexto y ausencia de datos organizacionales | No disponible | Revisión de repositorio |
| 03 | Pregunta y objetivos | Conceptual | Síntesis de la propuesta |
| 04 | Marco de predicción / resiliencia / decisión | Conceptual | Definiciones de trabajo |
| 05 | Dos datasets divergentes (corr. 0.0434) | Verificado | CSV y cálculo local |
| 06 | Tablero ejecutado; backend solo auditado | Parcial | Ejecución y código |
| 07 | Descriptivos y correlaciones del tablero | Parcial | CSV; procedencia no verificada |
| 08 | AR(12): R² 0.526, RMSE 88.48 | Verificado | Ejecución local |
| 09 | Serie real vs predicción one-step | Verificado | `rnn_test_series.json` |
| 10 | MLP: R² 0.985 como ajuste contemporáneo | Parcial | Ejecución local |
| 11 | Diagnóstico de leakage | Verificado | Código y diseño |
| 12 | Requisitos de validación ausentes | No disponible | Auditoría |
| 13 | Brechas de evidencia | Mixto | Archivos + URL |
| 14 | Diseño de decisión de compra | No disponible | Propuesta conceptual |
| 15 | Límites y siguiente ciclo | Parcial | Auditoría |
| 16 | Conclusiones | Mixto | Síntesis |
| A | Ficha técnica del dataset | Parcial | CSV |
| B | Tres archivos, tres series | Verificado | CSV y cálculo local |
| C | Especificación AR(12) | Verificado | Código y ejecución |
| D | Configuración del MLP | Verificado | Código y ejecución |
| E | SimpleRNN de Keras | Parcial | Código; sin ejecución |
| F | Registro consolidado | Mixto | Auditoría |
| G | Preguntas de defensa | Conceptual | Guía |

---

## 7. Reproducción

### 7.1 Ejecutar el tablero

```powershell
cd dashboard-energia-clima-github
python -m http.server 8765
```

Abrir `http://localhost:8765/`, ir al módulo de pronóstico y ejecutar:

- **RNN / AR:** lags = 12, test = 20 %.
- **MLP:** objetivo = precio; predictores = aportes, embalses, demanda, ONI histórico, precipitación; 32 neuronas; 300 épocas.

### 7.2 Verificar los datos

Los cálculos de rangos, medias, clases y correlaciones se hicieron directamente sobre los CSV. Cualquier hoja de cálculo o script de estadística descriptiva debe reproducir los valores de las secciones 2.1 y 2.2.

### 7.3 Archivos de resultados

- `assets/data/rnn_test_series.json`: 118 puntos `real`, `pred` y fechas.
- `assets/data/mlp_curves.json`: `lossTrain`, `lossVal` (300), `actual`, `pred` (150).
- `assets/data/evidencia.js`: copia embebida de ambos para abrir sin servidor.

---

## 8. Conclusión de la auditoría

El prototipo **existe y es auditable**: el tablero se ejecuta, los módulos producen resultados y las series pueden extraerse. La evidencia sostiene un **AR(12) de un paso con R² 0.526** y una analítica descriptiva limitada por la procedencia de los datos. No sostiene un pronóstico futuro, ni el 0.985 del MLP, ni el desempeño del backend.

La contribución defendible es el **marco de evidencia**: separar lo verificado de lo reportado, nombrar las brechas y definir el siguiente ciclo de validación antes de tomar decisiones de compra.
