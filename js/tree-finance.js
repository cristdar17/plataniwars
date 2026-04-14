/* ============================================================
   TREE-FINANCE - Arbol de decisiones del CFO (Dir. Financiero)
   PlataniWars: Simulador Gerencial Estadistico
   ============================================================ */
window.TREE_FINANCE = {
  name: "Finanzas",
  icon: "💰",
  startNode: "fin-01",
  nodes: {

    /* --------------------------------------------------------
       FIN-01 | Dia 1 | Propiedades de estimadores (sesgo vs eficiencia)
       -------------------------------------------------------- */
    "fin-01": {
      id: "fin-01",
      day: 1,
      title: "Dos metodos de proyeccion de ventas",
      context: "Necesitas proyectar las ventas del proximo trimestre para presentarle a la junta de Don Pacho (o PlataniMax). Dos analistas proponen metodos diferentes.\n\n📊 METODO A (Analista Senior):\nPromedia las ventas de los ultimos 12 meses. Simple pero consistente.\n• Estimacion: $145M/mes\n• Cuando lo probamos con datos historicos, en promedio acierta al valor real (sin sesgo)\n• Pero sus predicciones varian mucho: desviacion estandar de $22M\n\n📊 METODO B (Analista Junior):\nUsa modelo con estacionalidad, tendencia y variables macro.\n• Estimacion: $152M/mes\n• Cuando lo probamos, tiende a sobreestimar en $5M (tiene sesgo positivo)\n• Pero sus predicciones son mas estables: desviacion estandar de $8M\n\n¿Cual metodo presentas a la junta?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Metodo A - el que no tiene sesgo",
          description: "Mejor un estimador insesgado. El senior tiene experiencia y su metodo acierta en promedio.",
          cost: 0,
          revenue: 4000000,
          bsc: { bsc_internal: 2, bsc_customer: 0, bsc_financial: -3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["traditional"],
          feedback: "⚠️ DECISION PARCIALMENTE CORRECTA\n\nEl Metodo A es insesgado (E[X̄] = μ), pero tiene varianza alta (σ = $22M).\n\nError Cuadratico Medio (ECM) del Metodo A:\nECM_A = Varianza + Sesgo² = 22² + 0² = 484\n\nECM del Metodo B:\nECM_B = Varianza + Sesgo² = 8² + 5² = 64 + 25 = 89\n\nECM_B (89) << ECM_A (484)\n\nEl Metodo B, AUNQUE tiene sesgo, es 5.4 veces mas preciso en terminos de ECM. En finanzas, preferes un estimador que se equivoca poquito siempre (sesgo de $5M) a uno que a veces acierta pero a veces se equivoca por $40M.\n\n📚 Concepto: Sesgo vs Eficiencia. Un estimador insesgado no siempre es el mejor. El ECM = Var + Sesgo² mide la calidad total. A veces un poco de sesgo con mucha precision es preferible.",
          next: "fin-02"
        },
        {
          id: "B",
          label: "Metodo B - el mas preciso aunque tenga sesgo",
          description: "El modelo sofisticado tiene sesgo de $5M pero mucha menos variabilidad. Ajustamos mentalmente.",
          cost: 1000000,
          revenue: 4000000,
          bsc: { bsc_internal: 5, bsc_customer: 0, bsc_financial: 5, bsc_learning: 6 },
          crossEffects: [],
          tags: ["data-driven", "sophisticated"],
          feedback: "✅ DECISION ACERTADA\n\nECM_A = 22² + 0² = 484\nECM_B = 8² + 5² = 89\n\nEl Metodo B es superior en ECM. Ademas, si conoces el sesgo ($5M), puedes CORREGIRLO:\nEstimacion corregida = $152M - $5M = $147M\nECM corregido = 8² + 0² = 64 (aun mejor!)\n\nEn la practica financiera, la consistencia es mas valiosa que la ausencia de sesgo. Un presupuesto basado en estimaciones estables permite mejor planificacion.\n\n📚 Concepto: ECM = Varianza + Sesgo². La eficiencia (baja varianza) suele ser mas valiosa que la insesgadez, especialmente si el sesgo es conocido y corregible.",
          next: "fin-02"
        },
        {
          id: "C",
          label: "Promediar ambos metodos",
          description: "Tomar la media de las dos estimaciones: ($145M + $152M) / 2 = $148.5M. Lo mejor de ambos mundos.",
          cost: 0,
          revenue: 4000000,
          bsc: { bsc_internal: 3, bsc_customer: 0, bsc_financial: 2, bsc_learning: 4 },
          crossEffects: [],
          tags: ["moderate"],
          feedback: "💡 DECISION INTERESANTE\n\nPromediar estimadores puede funcionar. Veamos:\nEstimacion combinada = ($145M + $152M) / 2 = $148.5M\nSesgo combinado = (0 + 5) / 2 = $2.5M\nVarianza combinada = (22² + 8²) / 4 = (484 + 64) / 4 = 137 → σ = $11.7M\nECM combinado = 137 + 2.5² = 137 + 6.25 = 143.25\n\nMejor que A (ECM=484) pero peor que B (ECM=89). Promediar mezclo lo bueno de B con lo malo de A.\n\nUn promedio ponderado seria mas inteligente: darle mas peso al metodo mas preciso.\n\n📚 Concepto: Combinacion de estimadores. Promediar simple no siempre es optimo. El promedio ponderado optimo da mas peso al estimador con menor varianza.",
          next: "fin-02"
        },
        {
          id: "D",
          label: "Ninguno - contratar consultora externa",
          description: "Si hay discrepancia interna, mejor traer una firma como Deloitte o EY que haga la proyeccion.",
          cost: 8000000,
          revenue: 4000000,
          bsc: { bsc_internal: -3, bsc_customer: 0, bsc_financial: -4, bsc_learning: -2 },
          crossEffects: [],
          tags: ["expensive", "avoidant"],
          feedback: "❌ DECISION COSTOSA E INNECESARIA\n\nGastar $25M en una consultora cuando ya tienes dos estimaciones internas es como comprar un GPS cuando ya sabes la direccion.\n\nLa consultora tambien usara algun metodo con sesgo y varianza. La pregunta no es 'quien estima' sino 'como evaluar la calidad del estimador'.\n\nCon el ECM ya tenias la herramienta para decidir:\nECM_A = 484, ECM_B = 89 → B gana\n\n📚 Concepto: Las propiedades de los estimadores (sesgo, varianza, ECM) son herramientas universales. No necesitas mas opiniones — necesitas evaluar las que tienes con los criterios correctos.",
          next: "fin-02"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-02 | Dia 4 | Tamano de muestra para proporcion
       -------------------------------------------------------- */
    "fin-02": {
      id: "fin-02",
      day: 4,
      title: "Auditoria de facturas del trimestre",
      context: "La DIAN anuncio auditorias aleatorias a empresas de alimentos del Eje Cafetero. Necesitas revisar tus facturas antes de que ellos lo hagan.\n\nTu departamento emitio 8,500 facturas el trimestre pasado. Quieres estimar que proporcion tiene errores (IVA mal calculado, datos del cliente incompletos, etc.) con un margen de error de maximo 3 puntos porcentuales y 95% de confianza.\n\n📊 DATOS:\n• Total facturas: 8,500\n• Auditoria piloto previa: 30 facturas revisadas, 4 con errores (p̂ = 0.133)\n• Presupuesto para auditoria: limitado\n• Costo por factura revisada: $15,000\n\n¿Cuantas facturas mandas a revisar?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Revisar 500 facturas - muestra grande para estar seguro",
          description: "500 de 8,500 es casi el 6%. Mas que suficiente segun el contador.",
          cost: 2000000,
          revenue: 4000000,
          bsc: { bsc_internal: 4, bsc_customer: 0, bsc_financial: -3, bsc_learning: 2 },
          crossEffects: [],
          tags: ["conservative", "expensive"],
          feedback: "⚠️ DECISION SOBREDIMENSIONADA\n\nTamano de muestra necesario con la piloto (p̂ = 0.133):\nn = Z² × p̂(1-p̂) / E² = 1.96² × 0.133 × 0.867 / 0.03²\nn = 3.8416 × 0.11533 / 0.0009\nn = 0.44302 / 0.0009 = 492.2 ≈ 493\n\nCon correccion por poblacion finita (N=8,500):\nn_corr = 493 / (1 + 492/8500) = 493 / 1.0579 = 466\n\n500 esta bien, pero pudiste ahorrar con 466. A $15,000/factura:\nCosto de 500: $7,500,000\nCosto de 466: $6,990,000\nDiferencia: $510,000 desperdiciados\n\n📚 Concepto: Tamano de muestra para proporcion. n = Z²p̂(1-p̂)/E². Usar la piloto (p̂=0.133) en vez de p=0.5 reduce dramaticamente el n necesario. La correccion por poblacion finita ahorra aun mas.",
          next: "fin-03"
        },
        {
          id: "B",
          label: "Usar la formula estadistica: calcular n exacto",
          description: "Calcular el tamano de muestra con la formula de proporcion, usando los datos de la piloto.",
          cost: 2000000,
          revenue: 4000000,
          bsc: { bsc_internal: 8, bsc_customer: 0, bsc_financial: 2, bsc_learning: 10 },
          crossEffects: [
            { area: "analyst", bsc: { bsc_learning: 3 }, narrative: "El area de datos aplaude: Finanzas uso metodos estadisticos para optimizar la auditoria." }
          ],
          tags: ["data-driven", "efficient"],
          feedback: "✅ DECISION OPTIMA\n\nn = Z² × p̂(1-p̂) / E²\nn = 1.96² × 0.133 × 0.867 / 0.03²\nn = 3.8416 × 0.11533 / 0.0009\nn = 493\n\nCorreccion por poblacion finita:\nn_corr = n / (1 + (n-1)/N) = 493 / (1 + 492/8500) = 466\n\nCosto: 466 × $15,000 = $6,990,000\nMargen de error garantizado: ±3% con 95% de confianza\n\nSin la piloto (usando p=0.5 conservador):\nn_conservador = 1.96² × 0.5 × 0.5 / 0.03² = 1,068\nCosto conservador: $16,020,000\n\nLa piloto te ahorro $9,030,000!\n\n📚 Concepto: Tamano de muestra para proporcion. La formula depende de p: si la tienes de un piloto, usala. Si no, p=0.5 da el maximo n (conservador pero caro).",
          next: "fin-03"
        },
        {
          id: "C",
          label: "Revisar solo 100 facturas - con la piloto basta",
          description: "Ya revisamos 30 y encontramos 4. Con 100 mas tenemos buena idea.",
          cost: 1000000,
          revenue: 4000000,
          bsc: { bsc_internal: -5, bsc_customer: 0, bsc_financial: 3, bsc_learning: -4 },
          crossEffects: [],
          tags: ["insufficient", "cheap"],
          feedback: "❌ DECISION INSUFICIENTE\n\nCon n = 100:\nMargen de error = Z × √(p̂(1-p̂)/n) = 1.96 × √(0.133 × 0.867/100)\n= 1.96 × √(0.001153) = 1.96 × 0.03396 = 0.0666 = ±6.66%\n\nTu estimacion tendria un margen de ±6.66%, mas del doble de lo que necesitas (±3%). Si la DIAN te pide el reporte, decir 'entre 6.7% y 19.9% de errores' no es muy convincente.\n\n📚 Concepto: Tamano de muestra y margen de error. n = 100 da margen de ±6.66% para esta proporcion. Para lograr ±3%, necesitas n ≈ 466. No hay atajos: la precision cuesta muestra.",
          next: "fin-03"
        },
        {
          id: "D",
          label: "Revisar TODAS las 8,500 facturas",
          description: "Si la DIAN va a auditar, mejor tener todo revisado al 100%. Cero sorpresas.",
          cost: 38000000,
          revenue: 4000000,
          bsc: { bsc_internal: 10, bsc_customer: 0, bsc_financial: -12, bsc_learning: -2 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: -3 }, narrative: "El equipo contable, saturado con la auditoria total, descuida los registros de produccion." }
          ],
          tags: ["perfectionist", "wasteful"],
          feedback: "💡 DECISION PERFECTA PERO RUINOSA\n\nRevisar 8,500 facturas × $15,000 = $127,500,000\nRevisar 466 facturas × $15,000 = $6,990,000\n\nDiferencia: $120,510,000 para pasar de 'confianza del 95% con ±3%' a 'certeza del 100%'.\n\nEse 5% adicional de confianza cuesta $120.5M. ¿Vale la pena?\n\nLa inferencia estadistica existe precisamente para evitar esto. Con 466 facturas tienes la informacion que necesitas para tomar decisiones, a una fraccion del costo.\n\n📚 Concepto: La muestra existe para inferir sobre la poblacion sin revisarla toda. El costo marginal de la certeza absoluta es enorme. La estadistica te permite tomar decisiones con incertidumbre CUANTIFICADA.",
          next: "fin-03"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-03 | Dia 7 | Interpretacion de intervalos de confianza
       -------------------------------------------------------- */
    "fin-03": {
      id: "fin-03",
      day: 7,
      title: "Negociacion con Bancolombia",
      context: "Necesitas un credito de $200M para expandir la planta. Bancolombia te pide demostrar que tu margen de ganancia es de al menos 12% para aprobarlo.\n\nTu equipo calculo el margen de ganancia mensual basado en los ultimos 36 meses:\n\n📊 DATOS:\n• Muestra: 36 meses\n• Margen promedio: 14.2%\n• Desviacion estandar: 3.8%\n• IC al 95%: [12.96%, 15.44%]\n\nEl gerente del banco dice: 'Hay 95% de probabilidad de que su margen real este entre 12.96% y 15.44%, asi que aprobamos el credito.'\n\n¿Estas de acuerdo con la interpretacion del banquero?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Si, el banquero tiene razon - aceptar el credito",
          description: "El IC esta por encima de 12%. El banco lo aprueba. Firmar y listo.",
          cost: 2000000,
          revenue: 15000000,
          bsc: { bsc_internal: 2, bsc_customer: 0, bsc_financial: 5, bsc_learning: -5 },
          crossEffects: [],
          tags: ["practical", "wrong-concept"],
          feedback: "⚠️ RESULTADO CORRECTO, INTERPRETACION INCORRECTA\n\nEl banquero dijo: 'Hay 95% de probabilidad de que el margen real este en [12.96%, 15.44%]'. Esto es tecnicamente INCORRECTO.\n\nInterpretacion correcta del IC al 95%:\n'Si tomaramos muchas muestras de 36 meses y construyeramos un IC con cada una, el 95% de esos intervalos contendrian al margen real.'\n\nEl margen real es un VALOR FIJO (no aleatorio). O esta en el intervalo o no esta. No tiene 'probabilidad de estar'.\n\nPero la CONCLUSION practica es la misma: el IC esta completamente por encima de 12%, lo que es evidencia fuerte de que el margen real supera el requisito.\n\n📚 Concepto: Interpretacion correcta del IC. El intervalo es aleatorio, el parametro es fijo. El 95% se refiere a la CONFIABILIDAD DEL METODO, no a la probabilidad del parametro.",
          next: "fin-04"
        },
        {
          id: "B",
          label: "Corregir al banquero sobre la interpretacion pero aceptar",
          description: "Explicarle que la interpretacion del IC es otra, pero que la conclusion de aprobar el credito sigue siendo valida.",
          cost: 2000000,
          revenue: 15000000,
          bsc: { bsc_internal: 5, bsc_customer: 3, bsc_financial: 5, bsc_learning: 10 },
          crossEffects: [
            { area: "analyst", bsc: { bsc_learning: 2 }, narrative: "El rigor estadistico del CFO impresiona al banco y mejora la reputacion analitica de la empresa." }
          ],
          tags: ["data-driven", "precise"],
          feedback: "✅ DECISION PERFECTA\n\nCorregiste la interpretacion:\n❌ 'Hay 95% de probabilidad de que μ este en [12.96%, 15.44%]'\n✅ 'Estamos 95% confiados de que nuestro metodo captura el verdadero margen. Este IC particular es [12.96%, 15.44%], que esta completamente por encima de 12%.'\n\nIC = X̄ ± Z₀.₀₂₅ × (s/√n) = 14.2% ± 1.96 × (3.8%/√36) = 14.2% ± 1.24%\n\nComo el LIMITE INFERIOR (12.96%) > 12%, tenemos evidencia estadistica fuerte de que el margen supera el requisito del banco.\n\n📚 Concepto: El IC tiene interpretacion frecuentista. El parametro μ es fijo; el intervalo es aleatorio. Decir 'probabilidad de que μ este en el IC' es incorrecto. El 95% se refiere al procedimiento, no al parametro.",
          next: "fin-04"
        },
        {
          id: "C",
          label: "Pedir un IC al 99% para mayor seguridad",
          description: "Si 95% es bueno, 99% es mejor. Mas confianza para el banco y para nosotros.",
          cost: 1000000,
          revenue: 4000000,
          bsc: { bsc_internal: 3, bsc_customer: 0, bsc_financial: -1, bsc_learning: 4 },
          crossEffects: [],
          tags: ["cautious"],
          feedback: "💡 DECISION RAZONABLE PERO CON SORPRESA\n\nIC al 99%:\nIC = 14.2% ± 2.576 × (3.8/√36) = 14.2% ± 1.632%\nIC 99% = [12.57%, 15.83%]\n\nEl limite inferior (12.57%) sigue por encima de 12%. Buenas noticias.\n\nPero ojo: al subir la confianza de 95% a 99%, el intervalo se ENSANCHO (de ±1.24% a ±1.63%). El limite inferior BAJO de 12.96% a 12.57%. Mas confianza = intervalo mas ancho.\n\nSi el limite inferior hubiera caido por debajo de 12%, el banco podria haber rechazado. Mayor confianza no siempre te beneficia.\n\n📚 Concepto: Relacion confianza-amplitud. Mas confianza → IC mas ancho → limite inferior mas bajo. A veces, pedir '99% de confianza' puede perjudicarte si el intervalo se ensancha lo suficiente.",
          next: "fin-04"
        },
        {
          id: "D",
          label: "Rechazar el credito - el IC es muy amplio",
          description: "Un rango de 12.96% a 15.44% es mucha incertidumbre. No me siento seguro para endeudarme con esos numeros.",
          cost: 0,
          revenue: 4000000,
          bsc: { bsc_internal: -2, bsc_customer: -3, bsc_financial: -5, bsc_learning: -3 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: -3 }, narrative: "Sin el credito, la expansion de planta se posterga y operaciones sigue con capacidad limitada." }
          ],
          tags: ["risk-averse", "missed-opportunity"],
          feedback: "❌ DECISION POR MIEDO A LA INCERTIDUMBRE\n\nEl IC de [12.96%, 15.44%] tiene amplitud de 2.48 puntos porcentuales. Eso es bastante preciso para una muestra de 36 meses.\n\nEl punto clave: TODO el intervalo esta por encima de 12%. Incluso en el PEOR escenario del IC, tu margen es 12.96% > 12%.\n\nRechazar el credito por 'incertidumbre' cuando la evidencia es clara es dejar que la aversion al riesgo te paralice.\n\n📚 Concepto: La incertidumbre cuantificada es INFORMACION, no un problema. Un IC que no incluye el valor critico (12%) te da evidencia fuerte. La estadistica no elimina la incertidumbre — la MIDE para que tomes mejores decisiones.",
          next: "fin-04"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-04 | Dia 11 | Error estandar como medida de precision
       -------------------------------------------------------- */
    "fin-04": {
      id: "fin-04",
      day: 11,
      title: "Fijacion de precio para nuevo producto",
      context: "Vas a lanzar platanitos de maduro (innovacion total en el Eje Cafetero). Necesitas fijar el precio. Tu equipo hizo dos estudios de disposicion a pagar (DAP) con consumidores:\n\n📊 ESTUDIO 1 (encuesta en tiendas de barrio, Pereira):\n• n = 25 personas\n• DAP promedio: $3,800\n• Desviacion estandar: $1,200\n• Error estandar: SE = 1200/√25 = $240\n\n📊 ESTUDIO 2 (encuesta online, todo el Eje Cafetero):\n• n = 150 personas\n• DAP promedio: $3,200\n• Desviacion estandar: $900\n• Error estandar: SE = 900/√150 = $73.5\n\nLos promedios difieren en $600. ¿A cual le haces mas caso para fijar el precio?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Fijar precio basado en Estudio 2 ($3,200)",
          description: "Muestra mas grande, error estandar mas bajo, mayor precision. Los datos hablan.",
          cost: 0,
          revenue: 24000000,
          bsc: { bsc_internal: 8, bsc_customer: 9, bsc_financial: 7, bsc_learning: 10 },
          crossEffects: [
            { area: "marketing", bsc: { bsc_customer: 6 }, narrative: "El precio accesible basado en datos del mercado amplio facilita la estrategia de penetracion." }
          ],
          tags: ["data-driven"],
          feedback: "✅ DECISION ACERTADA\n\nComparacion de precision:\nEstudio 1: SE = $240 → IC 95%: $3,800 ± $470 = [$3,330, $4,270]\nEstudio 2: SE = $73.5 → IC 95%: $3,200 ± $144 = [$3,056, $3,344]\n\nEl Estudio 2 tiene un IC de amplitud $288 vs $940 del Estudio 1. Es 3.3 veces mas PRECISO.\n\n¿Por que? Dos razones:\n1. n mas grande (150 vs 25): SE ∝ 1/√n\n2. σ mas baja ($900 vs $1,200): SE ∝ σ\n\nAdemas, el Estudio 2 cubre todo el Eje Cafetero, no solo Pereira. Mas representativo.\n\n📚 Concepto: Error estandar como medida de precision. SE = σ/√n. El SE determina que tan 'confiable' es tu estimacion. Menor SE = mayor precision = mejor base para decisiones.",
          next: "fin-05"
        },
        {
          id: "B",
          label: "Fijar precio basado en Estudio 1 ($3,800)",
          description: "Las tiendas de barrio son nuestro canal principal. Esos datos son mas relevantes para nuestro negocio.",
          cost: 0,
          revenue: 11000000,
          bsc: { bsc_internal: 5, bsc_customer: -3, bsc_financial: 5, bsc_learning: -2 },
          crossEffects: [],
          tags: ["biased", "practical"],
          feedback: "⚠️ DECISION CON BUEN ARGUMENTO PERO MALA PRECISION\n\nEl argumento de 'relevancia del canal' es valido, PERO la precision del estudio es baja:\nSE = $240, IC 95% = [$3,330, $4,270]\n\nUn rango de $940 es ENORME para fijar un precio. Podrias estar cobrando $3,330 (competitivo) o $4,270 (caro). Son estrategias de precio totalmente diferentes.\n\nSi el canal tienda de barrio es importante, la solucion es hacer un estudio MAS GRANDE en tiendas de barrio (n = 150), no confiar en un n = 25.\n\n📚 Concepto: El error estandar mide precision, no representatividad. Una muestra relevante pero imprecisa (n=25, SE=$240) puede llevar a decisiones erradas. Necesitas AMBAS cosas: representatividad Y precision.",
          next: "fin-05"
        },
        {
          id: "C",
          label: "Promediar ambos: ($3,800 + $3,200) / 2 = $3,500",
          description: "Combinamos la informacion de ambos estudios. Promedio simple como punto medio.",
          cost: 0,
          revenue: 21000000,
          bsc: { bsc_internal: 6, bsc_customer: 5, bsc_financial: 6, bsc_learning: 6 },
          crossEffects: [],
          tags: ["moderate"],
          feedback: "💡 BUENA IDEA, MALA EJECUCION\n\nPromediar simple ignora la diferencia de precision. El Estudio 2 (SE=$73.5) es 3.3x mas preciso que el Estudio 1 (SE=$240). Darles el mismo peso es un desperdicio.\n\nPromedio ponderado por precision (inverso de varianza):\nw₁ = 1/240² = 0.0000174\nw₂ = 1/73.5² = 0.0001851\n\nPrecio ponderado = (0.0000174 × 3800 + 0.0001851 × 3200) / (0.0000174 + 0.0001851)\n= (0.0661 + 0.5923) / 0.0002025\n= $3,252\n\nEl precio ponderado ($3,252) esta mucho mas cerca del Estudio 2, porque merece mas peso.\n\n📚 Concepto: Promedio ponderado por inverso de varianza. Cuando combinas estimaciones, dale mas peso a la mas precisa (menor SE). No promedies como si todas tuvieran la misma calidad.",
          next: "fin-05"
        },
        {
          id: "D",
          label: "Hacer un tercer estudio mas grande antes de decidir",
          description: "Los dos estudios se contradicen. Mejor hacer uno nuevo con n = 400 para estar seguros.",
          cost: 4000000,
          revenue: 7000000,
          bsc: { bsc_internal: 5, bsc_customer: 0, bsc_financial: -4, bsc_learning: 8 },
          crossEffects: [],
          tags: ["cautious", "expensive"],
          feedback: "⚠️ DECISION VALIDA PERO COSTOSA Y LENTA\n\nYa tienes 175 observaciones en total. Gastar $12M mas para n=400 reduciria el SE pero ¿cuanto?\n\nSE con n=400 (asumiendo σ=$900): 900/√400 = $45\nIC 95%: ±$88.2, amplitud = $176.4\n\nVs el Estudio 2 actual:\nSE con n=150: $73.5\nIC 95%: ±$144, amplitud = $288\n\nMejora de amplitud: de $288 a $176. ¿Vale $12M esa mejora en precision?\n\nAdemas, el mercado no espera. Mientras tu investigas, la competencia puede lanzar su producto.\n\n📚 Concepto: Rendimientos decrecientes del tamano de muestra. SE = σ/√n. Para reducir el SE a la mitad, necesitas 4x mas muestra. En algun punto, el costo de mas datos supera el beneficio de mas precision.",
          next: "fin-05"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-05 | Dia 16 | Diferencia de medias, significancia practica
       -------------------------------------------------------- */
    "fin-05": {
      id: "fin-05",
      day: 12,
      title: "Rentabilidad por canal de venta",
      context: "Vendes platanitos en dos canales principales: tiendas de barrio (canal tradicional) y supermercados (Exito, D1, Ara). El director comercial dice que las tiendas de barrio son mas rentables, pero el equipo de cuentas clave dice que los supermercados mueven mas volumen.\n\nTu equipo financiero analizo la rentabilidad neta por punto de venta:\n\n📊 CANAL TRADICIONAL (tiendas de barrio):\n• n₁ = 45 tiendas analizadas\n• Rentabilidad promedio: $2,150,000/mes por tienda\n• Desviacion estandar: $680,000\n\n📊 CANAL MODERNO (supermercados):\n• n₂ = 20 supermercados\n• Rentabilidad promedio: $1,890,000/mes por punto\n• Desviacion estandar: $520,000\n\nDiferencia observada: $260,000/mes a favor de tiendas. ¿Redistribuyes recursos?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Mover recursos de supermercados a tiendas de barrio",
          description: "$260,000 mas por tienda es significativo. Meter mas vendedores al canal tradicional.",
          cost: 2000000,
          revenue: 30000000,
          bsc: { bsc_internal: 5, bsc_customer: -3, bsc_financial: 6, bsc_learning: -2 },
          crossEffects: [
            { area: "marketing", bsc: { bsc_customer: -4 }, narrative: "Reducir presencia en supermercados afecta la visibilidad de marca ante consumidores urbanos." }
          ],
          tags: ["impulsive"],
          feedback: "⚠️ DECISION PRECIPITADA\n\nPrimero, ¿la diferencia es estadisticamente significativa?\n\nSE = √(s₁²/n₁ + s₂²/n₂) = √(680,000²/45 + 520,000²/20)\n= √(10,275,555,556 + 13,520,000,000) = √23,795,555,556\n= $154,259\n\nZ = (2,150,000 - 1,890,000) / 154,259 = 260,000 / 154,259 = 1.686\n\nP(Z > 1.686) = 0.0459 = 4.59%\n\nEs marginalmente significativo (justo en el limite del 5%). No es evidencia contundente.\n\nAdemas, aunque sea significativa estadisticamente, $260,000 vs el costo de reestructurar canales ($8M+) tiene significancia PRACTICA cuestionable.\n\n📚 Concepto: Significancia estadistica vs significancia practica. Un resultado puede ser estadisticamente significativo pero practicamente irrelevante (o viceversa). Siempre evalua AMBAS.",
          next: "fin-06"
        },
        {
          id: "B",
          label: "Mantener ambos canales como estan",
          description: "La diferencia de $260,000 no justifica cambios grandes. Ambos canales son necesarios.",
          cost: 0,
          revenue: 7000000,
          bsc: { bsc_internal: 6, bsc_customer: 6, bsc_financial: 5, bsc_learning: 5 },
          crossEffects: [],
          tags: ["prudent"],
          feedback: "✅ DECISION RAZONABLE\n\nCon Z = 1.686 (p = 0.046), la significancia es marginal. El IC al 95% para la diferencia:\n\n260,000 ± 1.96 × 154,259 = 260,000 ± 302,348\nIC = [-$42,348, $562,348]\n\nEl IC INCLUYE el cero. Esto significa que no podemos descartar que la diferencia real entre canales sea CERO (o incluso negativa).\n\nMantener ambos canales es la decision mas segura cuando la evidencia no es concluyente.\n\n📚 Concepto: IC para diferencia de medias. Si el IC incluye el 0, no hay evidencia suficiente de que exista una diferencia real. Actuar sobre una diferencia que podria no existir es arriesgado.",
          next: "fin-06"
        },
        {
          id: "C",
          label: "Ampliar la muestra de supermercados para decidir mejor",
          description: "Solo 20 supermercados es poco. Analizar mas puntos del canal moderno para tener datos mas solidos.",
          cost: 1000000,
          revenue: 7000000,
          bsc: { bsc_internal: 7, bsc_customer: 0, bsc_financial: -1, bsc_learning: 11 },
          crossEffects: [],
          tags: ["analytical", "cautious"],
          feedback: "💡 DECISION INTELIGENTE\n\nCon n₂ = 20, el SE del canal moderno es alto: 520,000/√20 = $116,276\n\nSi subieras a n₂ = 50:\nSE_nuevo = √(680,000²/45 + 520,000²/50) = √(10,275,556 + 5,408,000) × 1000\n= √(10,275,556 + 5,408,000) ≈ $125,215 (por 1000)\n\nEl IC se estrecharia y la conclusion seria mas clara.\n\nEl n desbalanceado (45 vs 20) afecta la potencia del test. Equilibrar las muestras mejora la capacidad de detectar diferencias reales.\n\n📚 Concepto: Potencia estadistica y tamano de muestra. Con n pequeno, puedes 'no detectar' una diferencia que SI existe (error Tipo II). Ampliar la muestra reduce ese riesgo.",
          next: "fin-06"
        },
        {
          id: "D",
          label: "Invertir fuerte en supermercados - ahi esta el crecimiento",
          description: "Aunque la rentabilidad unitaria sea menor, los supermercados dan volumen y visibilidad. Estrategia de largo plazo.",
          cost: 6000000,
          revenue: 7000000,
          bsc: { bsc_internal: 5, bsc_customer: 8, bsc_financial: -3, bsc_learning: 6 },
          crossEffects: [
            { area: "marketing", bsc: { bsc_customer: 7 }, narrative: "Mayor presencia en cadenas como Exito y D1 aumenta el reconocimiento de marca." }
          ],
          tags: ["strategic", "growth"],
          feedback: "⚠️ DECISION ESTRATEGICA SIN SOPORTE ESTADISTICO\n\nEl argumento cualitativo (volumen, visibilidad, crecimiento) puede ser valido, pero estas ignorando los datos.\n\nCon Z = 1.686, la diferencia de $260,000/punto NO es concluyente. Pero esto no significa que los supermercados sean MEJORES — tampoco hay evidencia de eso.\n\nPara justificar $20M de inversion, necesitas datos de volumen total por canal, no solo rentabilidad por punto.\n\nSi 20 supermercados mueven $37.8M total y 45 tiendas mueven $96.75M total, el canal tradicional mueve 2.6x mas con mayor rentabilidad unitaria.\n\n📚 Concepto: Significancia practica. Antes de invertir, mira el TAMANO DEL EFECTO, no solo la significancia estadistica. Y complementa con datos de volumen total, no solo promedios por punto.",
          next: "fin-06"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-06 | Dia 21 | Integracion de estimaciones estadisticas
       -------------------------------------------------------- */
    "fin-06": {
      id: "fin-06",
      day: 14,
      title: "Valoracion de la empresa para inversionista",
      context: "Un inversionista de Bogota quiere comprar el 30% de tu empresa de platanitos. Necesitas una valoracion solida para negociar.\n\nTu equipo financiero recogio datos clave:\n\n📊 DATOS PARA VALORACION:\n• Ventas mensuales (ultimos 24 meses):\n  X̄ = $285M, s = $42M, n = 24\n• Margen neto (ultimos 24 meses):\n  X̄ = 13.5%, s = 2.8%, n = 24\n• Tasa de crecimiento anual estimada: 8%\n• Metodo de valoracion: 5x utilidad neta anual\n\nUtilidad neta anual estimada:\n$285M × 12 × 13.5% = $461.7M\nValoracion: $461.7M × 5 = $2,308.5M\n\nEl inversionista dice: '$2,308M es su PUNTO estimado. ¿Cual es el RANGO de valoracion con 95% de confianza?'",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Calcular IC para la valoracion integrando la incertidumbre",
          description: "Usar los intervalos de confianza de ventas y margen para construir un rango de valoracion.",
          cost: 2000000,
          revenue: 7000000,
          bsc: { bsc_internal: 11, bsc_customer: 8, bsc_financial: 13, bsc_learning: 15 },
          crossEffects: [
            { area: "analyst", bsc: { bsc_learning: 8 }, narrative: "El modelo de valoracion con intervalos de confianza se convierte en referencia para futuras negociaciones." }
          ],
          tags: ["data-driven", "sophisticated"],
          feedback: "✅ DECISION PROFESIONAL\n\nIC 95% para ventas mensuales:\nSE_ventas = 42/√24 = $8.57M\nIC_ventas = 285 ± 2.069 × 8.57 = 285 ± 17.73\nIC_ventas = [$267.27M, $302.73M]\n\nIC 95% para margen:\nSE_margen = 2.8/√24 = 0.571%\nIC_margen = 13.5% ± 2.069 × 0.571% = 13.5% ± 1.182%\nIC_margen = [12.32%, 14.68%]\n\nValoración (Escenario pesimista):\n$267.27M × 12 × 12.32% × 5 = $1,976M\n\nValoración (Escenario optimista):\n$302.73M × 12 × 14.68% × 5 = $2,667M\n\nRango de valoracion: [$1,976M, $2,667M]\nPunto central: $2,308M\n\nEl 30% vale entre $593M y $800M.\n\n📚 Concepto: Integracion de estimaciones. Cada componente (ventas, margen) tiene su propia incertidumbre. La incertidumbre total es la combinacion de ambas. El IC final te da poder de negociacion: 'mi empresa vale entre X y Y con 95% de confianza'.",
          next: "fin-07"
        },
        {
          id: "B",
          label: "Dar solo el punto estimado: $2,308M",
          description: "El inversionista quiere un numero, no un rango. Darle $2,308M y negociar de ahi.",
          cost: 0,
          revenue: 7000000,
          bsc: { bsc_internal: -3, bsc_customer: -5, bsc_financial: -5, bsc_learning: -5 },
          crossEffects: [],
          tags: ["naive"],
          feedback: "❌ DECISION DEBIL PARA NEGOCIAR\n\nUn punto estimado sin rango es vulnerable:\n• El inversionista va a cuestionar cada supuesto\n• No tienes defensa contra 'ese numero es optimista'\n• Pierdes credibilidad al no mostrar la incertidumbre\n\nCon el IC [$1,976M, $2,667M], puedes decir:\n'Incluso en el escenario PESIMISTA, la empresa vale $1,976M. El 30% no baja de $593M.'\n\nEso es mucho mas poderoso que un simple '$2,308M porque yo lo digo'.\n\n📚 Concepto: El IC es una herramienta de NEGOCIACION, no solo estadistica. Muestra que hiciste la tarea, que conoces la incertidumbre, y que incluso el peor caso respalda tu posicion.",
          next: "fin-07"
        },
        {
          id: "C",
          label: "Inflar la valoracion 20% para tener margen de negociacion",
          description: "Pedir $2,770M sabiendo que el inversionista va a negociar a la baja. Tactica clasica.",
          cost: 0,
          revenue: 7000000,
          bsc: { bsc_internal: -2, bsc_customer: -5, bsc_financial: 0, bsc_learning: -8 },
          crossEffects: [],
          tags: ["manipulative"],
          feedback: "❌ DECISION RIESGOSA Y POCO PROFESIONAL\n\nInflar 20% da $2,770M. Pero un inversionista serio va a pedir justificacion:\n'¿De donde sale ese numero? Muestreme los datos.'\n\nSi tus datos dan IC = [$1,976M, $2,667M] y pediste $2,770M (por encima del limite superior), el inversionista sabe que estas inflando.\n\nPierdes credibilidad instantaneamente.\n\nMejor estrategia: presenta el IC completo y ancla la negociacion en el escenario optimista ($2,667M). Es alto pero JUSTIFICABLE con datos.\n\n📚 Concepto: Las estimaciones estadisticas son TRANSPARENTES. Inflar un numero mas alla del IC es detectable y destruye confianza. Mejor negociar dentro del IC, desde el escenario optimista.",
          next: "fin-07"
        },
        {
          id: "D",
          label: "Contratar firma valoradora externa",
          description: "Que una firma como KPMG o BDO haga la valoracion. Mas credibilidad ante el inversionista.",
          cost: 11000000,
          revenue: 7000000,
          bsc: { bsc_internal: 6, bsc_customer: 6, bsc_financial: -4, bsc_learning: -2 },
          crossEffects: [],
          tags: ["expensive", "delegating"],
          feedback: "💡 PUEDE SUMAR PERO NO REEMPLAZA TU ANALISIS\n\nUna firma externa da credibilidad, pero tambien va a usar muestras, promedios e intervalos. La estadistica es la misma.\n\nAdemas, la firma valoradora no conoce tu negocio como tu. Van a pedirte exactamente los mismos datos que ya tienes.\n\nCosto-beneficio:\n• Firma: $35M\n• Analisis interno con IC: $5M\n• Diferencia: $30M\n\nLo optimo: haz TU analisis estadistico (IC, escenarios) y SI el inversionista pide validacion externa, entonces contrata la firma.\n\n📚 Concepto: La estadistica es una herramienta universal. No necesitas 'expertos externos' para calcular un IC — necesitas entender los datos de tu propio negocio. La firma hace lo mismo que tu, pero cobra $35M.",
          next: "fin-07"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-07 | Dia 15 | Valor esperado con probabilidades
       -------------------------------------------------------- */
    "fin-07": {
      id: "fin-07",
      day: 15,
      title: "Cobrar cartera morosa",
      context: "15 clientes deben $80M en total. El historico dice que la tasa de recuperacion promedio es 60% pero varia mucho segun el cliente.\n\n📊 DATOS:\n• Cartera total: $80M\n• P(recuperacion) historica: 60%\n• Costo de gestion de cobro: $5M\n• Si contratas abogado externo: cuesta $12M pero recupera 75%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Cobro interno intensivo",
          description: "Tu equipo llama, visita y presiona. $5M de gestion para recuperar el 60%.",
          cost: 2000000,
          revenue: 9000000,
          bsc: { bsc_financial: 8, bsc_customer: 4, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["moderate"],
          feedback: "\u2705 E(recuperacion) = $80M \u00d7 0.60 = $48M. Neto = $48M - $5M = $43M. Buen retorno.\n\ud83d\udcda Concepto: Valor esperado. E(ganancia) = E(ingreso) - costo. Multiplica cada resultado por su probabilidad.",
          next: "fin-08"
        },
        {
          id: "B",
          label: "Contratar abogado externo",
          description: "Mas caro pero mas efectivo. El abogado cobra $12M pero recupera mas.",
          cost: 4000000,
          revenue: 11000000,
          bsc: { bsc_financial: 7, bsc_customer: 3, bsc_internal: 4, bsc_learning: 5 },
          crossEffects: [],
          tags: ["professional"],
          feedback: "\u2705 E(recuperacion) = $80M \u00d7 0.75 = $60M. Neto = $60M - $12M = $48M. Mejor que cobro interno!\n\ud83d\udcda Concepto: Compara valores esperados netos. A veces gastar mas genera mas retorno neto.",
          next: "fin-08"
        },
        {
          id: "C",
          label: "Vender la cartera a un tercero al 40%",
          description: "Una firma de cobro compra tu cartera por $32M. Plata segura, sin riesgo.",
          cost: 0,
          revenue: 10000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 4 },
          crossEffects: [],
          tags: ["safe"],
          feedback: "\ud83d\udca1 $32M seguros vs E(cobro interno) = $43M o E(abogado) = $48M. Menos plata pero cero riesgo e incertidumbre.\n\ud83d\udcda Concepto: Certeza vs valor esperado. Vender cartera es como comprar un seguro: pagas prima por eliminar riesgo.",
          next: "fin-08"
        },
        {
          id: "D",
          label: "Castigar la cartera y no cobrar",
          description: "Perder $80M y seguir adelante. No vale la pena el esfuerzo.",
          cost: 0,
          revenue: 2000000,
          bsc: { bsc_financial: -8, bsc_customer: 3, bsc_internal: -3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["passive"],
          feedback: "\u274c Tiraste $48M a la basura (valor esperado de cobro). Incluso vendida la cartera daba $32M seguros.\n\ud83d\udcda Concepto: No actuar no significa costo cero. El costo de oportunidad perdido es real.",
          next: "fin-08"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-08 | Dia 17 | Media vs variabilidad (riesgo-retorno)
       -------------------------------------------------------- */
    "fin-08": {
      id: "fin-08",
      day: 17,
      title: "Inversion en CDT vs expandir planta",
      context: "Tienes $100M para invertir. Dos opciones: CDT seguro o expandir produccion.\n\n📊 OPCION A - CDT Bancolombia:\n• Retorno: 12% anual fijo = $12M\n• Riesgo: cero\n\n📊 OPCION B - Expandir planta:\n• Retorno promedio (3 anos): 28%\n• Desviacion: 15%\n• Podria dar entre 13% y 43% (\u03bc\u00b1\u03c3)",
      type: "choice",
      options: [
        {
          id: "A",
          label: "CDT seguro al 12%",
          description: "$12M garantizados. Dormir tranquilo.",
          cost: 0,
          revenue: 6000000,
          bsc: { bsc_financial: 5, bsc_customer: 3, bsc_internal: 3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\u26a0\ufe0f Seguro pero E(expansion) = $28M vs $12M del CDT. La prima por riesgo es $16M.\n\ud83d\udcda Concepto: Trade-off riesgo-retorno. Mayor retorno esperado = mayor variabilidad. \u00bfCuanto riesgo toleras?",
          next: "fin-09"
        },
        {
          id: "B",
          label: "Expandir planta",
          description: "28% promedio historico. El negocio de platanitos esta en auge.",
          cost: 5000000,
          revenue: 11000000,
          bsc: { bsc_financial: 8, bsc_customer: 7, bsc_internal: 6, bsc_learning: 5 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\u2705 E(retorno) = $28M, pero P(retorno < $12M del CDT) = P(Z < (12-28)/15) = P(Z < -1.07) = 14%.\n\ud83d\udcda Concepto: Probabilidad normal para evaluar riesgo. Solo 14% de chance de que la expansion rinda menos que el CDT.",
          next: "fin-09"
        },
        {
          id: "C",
          label: "Dividir 50/50",
          description: "$50M en CDT + $50M en expansion. Diversificar.",
          cost: 2000000,
          revenue: 8000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 5, bsc_learning: 6 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\ud83d\udca1 E(retorno) = 0.5\u00d7$12M + 0.5\u00d7$28M = $20M. \u03c3 = 0.5\u00d7$15M = $7.5M. Mejor ratio retorno/riesgo.\n\ud83d\udcda Concepto: Diversificacion reduce riesgo sin eliminar retorno. La varianza de la mezcla es menor.",
          next: "fin-09"
        },
        {
          id: "D",
          label: "Esperar 3 meses por mejores tasas",
          description: "Las tasas del CDT podrian subir. Esperar y ver.",
          cost: 0,
          revenue: 4000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: 3, bsc_learning: 4 },
          crossEffects: [],
          tags: ["passive"],
          feedback: "\u26a0\ufe0f Costo de oportunidad: 3 meses sin invertir = 3/12 \u00d7 $12M = $3M perdidos minimo.\n\ud83d\udcda Concepto: El dinero tiene valor en el tiempo. Esperar tambien tiene costo esperado.",
          next: "fin-09"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-09 | Dia 18 | Estimacion bajo incertidumbre
       -------------------------------------------------------- */
    "fin-09": {
      id: "fin-09",
      day: 18,
      title: "El peso se devaluo",
      context: "El dolar subio 15% en un mes. Tu materia prima importada (aceite de palma) ahora cuesta 15% mas. \u00bfAbsorbes el costo o subes precios?\n\n📊 DATOS:\n• Costo actual del aceite: $800/paquete\n• Nuevo costo: $920/paquete (+$120)\n• Margen actual por paquete: $600\n• Nuevo margen si no subes precio: $480",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Subir precios 8% para compensar",
          description: "Trasladar parte del costo al consumidor. No todo, para no espantarlos.",
          cost: 2000000,
          revenue: 8000000,
          bsc: { bsc_financial: 7, bsc_customer: -3, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\u2705 Subir 8% recupera $96 de los $120 extra. Margen nuevo: $576. Pierdes algo pero sobrevives.\n\ud83d\udcda Concepto: Estimacion de elasticidad. Si demanda cae < 8% por el aumento, ganas mas en total.",
          next: "fin-10"
        },
        {
          id: "B",
          label: "Absorber el costo y mantener precios",
          description: "No perder clientes. El margen baja pero mantienes volumen.",
          cost: 2000000,
          revenue: 5000000,
          bsc: { bsc_financial: -3, bsc_customer: 6, bsc_internal: 3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["customer-focused"],
          feedback: "\u26a0\ufe0f Margen cae 20% ($600 \u2192 $480). Si vendes 200K paquetes/mes, pierdes $24M/mes. \u00bfSostenible?\n\ud83d\udcda Concepto: Estimar impacto total. Margen \u00d7 volumen = ganancia. Baja de margen se multiplica por todo el volumen.",
          next: "fin-10"
        },
        {
          id: "C",
          label: "Buscar proveedor nacional de aceite",
          description: "Cambiar a aceite colombiano. Sin impacto cambiario.",
          cost: 3000000,
          revenue: 9000000,
          bsc: { bsc_financial: 6, bsc_customer: 4, bsc_internal: 7, bsc_learning: 6 },
          crossEffects: [],
          tags: ["strategic"],
          feedback: "\u2705 Eliminas riesgo cambiario de raiz. El cambio toma 2-3 meses pero protege a largo plazo.\n\ud83d\udcda Concepto: Reducir varianza de costos. Un proveedor en pesos tiene \u03c3=0 en riesgo cambiario.",
          next: "fin-10"
        },
        {
          id: "D",
          label: "Comprar dolares ahora como cobertura",
          description: "Comprar dolares para 6 meses de importaciones al precio actual.",
          cost: 6000000,
          revenue: 8000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 4, bsc_learning: 7 },
          crossEffects: [],
          tags: ["hedging"],
          feedback: "\ud83d\udca1 Cobertura cambiaria. Fijas el costo por 6 meses. Si el dolar sigue subiendo, ganaste. Si baja, perdiste.\n\ud83d\udcda Concepto: Hedging es comprar certidumbre. Reduces \u03c3 del costo a cambio de un precio fijo.",
          next: "fin-10"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-10 | Dia 20 | Confianza en estimaciones
       -------------------------------------------------------- */
    "fin-10": {
      id: "fin-10",
      day: 20,
      title: "Renegociar con proveedores",
      context: "Llevas 2 anos comprando empaques al mismo proveedor. Tus datos de compra muestran oportunidad de negociar.\n\n📊 DATOS DE COMPRA (24 meses):\n• Precio promedio: $1,200/unidad\n• Desviacion: $150\n• SE = 150/\u221a24 = $30.6\n• Competidor cotiza a $1,050/unidad\n• Diferencia: $150/unidad",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Renegociar con datos en mano",
          description: "Mostrar la cotizacion del competidor y pedir igualar. Tus datos respaldan.",
          cost: 1000000,
          revenue: 8000000,
          bsc: { bsc_financial: 10, bsc_customer: 4, bsc_internal: 6, bsc_learning: 6 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\u2705 IC de tu precio actual: $1,200 \u00b1 $60 = [$1,140, $1,260]. El competidor ($1,050) esta FUERA de tu IC. Evidencia clara de sobreprecio.\n\ud83d\udcda Concepto: El IC como herramienta de negociacion. Si el precio alternativo cae fuera de tu IC, hay diferencia real.",
          next: "fin-11"
        },
        {
          id: "B",
          label: "Cambiar directamente al competidor",
          description: "$150 menos por unidad. A $1,050 ahorro $30M al ano.",
          cost: 2000000,
          revenue: 11000000,
          bsc: { bsc_financial: 8, bsc_customer: 4, bsc_internal: 4, bsc_learning: 4 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\u26a0\ufe0f Cuidado: la cotizacion es un punto, no una garantia. \u00bfCual es la variabilidad del competidor?\n\ud83d\udcda Concepto: Un precio promedio sin desviacion estandar es informacion incompleta.",
          next: "fin-11"
        },
        {
          id: "C",
          label: "Pedir muestra al competidor primero",
          description: "Probar calidad antes de cambiar. 1 mes de prueba en paralelo.",
          cost: 2000000,
          revenue: 7000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["prudent"],
          feedback: "\u2705 Recoger datos propios del competidor te da su \u03bc y \u03c3 reales. Puedes comparar con IC formal.\n\ud83d\udcda Concepto: Antes de comparar, necesitas datos de AMBAS opciones con sus medidas de variabilidad.",
          next: "fin-11"
        },
        {
          id: "D",
          label: "Dejar todo como esta - relacion a largo plazo vale",
          description: "El proveedor actual es confiable. $150 mas no justifica el riesgo de cambiar.",
          cost: 0,
          revenue: 3000000,
          bsc: { bsc_financial: -3, bsc_customer: 3, bsc_internal: 4, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\u274c $150 \u00d7 200K unidades/ano = $30M anuales que regalas. El IC muestra diferencia significativa.\n\ud83d\udcda Concepto: La lealtad tiene limite. Cuando los datos muestran diferencia clara, actua.",
          next: "fin-11"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-11 | Dia 22 | Estimacion por intervalos para planificacion
       -------------------------------------------------------- */
    "fin-11": {
      id: "fin-11",
      day: 22,
      title: "Bono navideno para empleados",
      context: "\u00bfCuanto dar de bono navideno? Necesitas estimar si el Q4 da para ser generoso.\n\n📊 DATOS Q4 (octubre-noviembre):\n• Ventas promedio mensual: $195M\n• Desviacion: $25M, n=8 semanas\n• SE = $25M/\u221a8 = $8.8M\n• Diciembre historicamente sube 20%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Bono de 1 salario completo ($45M total)",
          description: "Generoso. Los datos de Q4 se ven bien y diciembre siempre sube.",
          cost: 14000000,
          revenue: 11000000,
          bsc: { bsc_financial: 4, bsc_customer: 6, bsc_internal: 10, bsc_learning: 4 },
          crossEffects: [],
          tags: ["generous"],
          feedback: "\u26a0\ufe0f IC ventas diciembre: $195M \u00d7 1.2 = $234M \u00b1 $17.3M = [$217M, $251M]. En el peor caso ($217M), \u00bfalcanza para el bono?\n\ud83d\udcda Concepto: Planifica con el limite inferior del IC, no con el promedio. El escenario pesimista debe ser sostenible.",
          next: "fin-12"
        },
        {
          id: "B",
          label: "Medio salario ($22M total)",
          description: "Prudente pero digno. Deja margen para imprevistos.",
          cost: 7000000,
          revenue: 9000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 7, bsc_learning: 5 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\u2705 Con IC pesimista de $217M, medio salario ($22M) es pagable incluso en el peor escenario.\n\ud83d\udcda Concepto: Decision robusta = funciona incluso en el limite inferior del IC.",
          next: "fin-12"
        },
        {
          id: "C",
          label: "Bono variable segun ventas reales de diciembre",
          description: "Prometer % de las ventas de diciembre. Si va bien, buen bono. Si no, bono menor.",
          cost: 3000000,
          revenue: 10000000,
          bsc: { bsc_financial: 7, bsc_customer: 6, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\u2705 Alineas incentivos con resultados. El bono se auto-ajusta al resultado real.\n\ud83d\udcda Concepto: Compartir la incertidumbre. Si el IC es amplio, un bono variable distribuye el riesgo.",
          next: "fin-12"
        },
        {
          id: "D",
          label: "Sin bono - la empresa necesita reservas",
          description: "Guardar la plata para enero que siempre es mes duro.",
          cost: 0,
          revenue: 2000000,
          bsc: { bsc_financial: 5, bsc_customer: -5, bsc_internal: -8, bsc_learning: 3 },
          crossEffects: [],
          tags: ["stingy"],
          feedback: "\u274c Desmoralizas al equipo en plena temporada alta. Perderas mas en productividad y rotacion que lo ahorrado.\n\ud83d\udcda Concepto: El costo de no invertir en personas tiene valor esperado negativo a mediano plazo.",
          next: "fin-12"
        }
      ]
    },

    /* --------------------------------------------------------
       FIN-12 | Dia 24 | Muestreo para auditoria
       -------------------------------------------------------- */
    "fin-12": {
      id: "fin-12",
      day: 24,
      title: "Cierre fiscal y auditoria DIAN",
      context: "La DIAN anuncia auditoria para febrero. Necesitas verificar que tus gastos estan bien soportados. Tienes 2.400 facturas del ano.\n\n📊 DATOS:\n• Total facturas: 2,400\n• Tiempo para revisar 1 factura: 15 min\n• Revisar TODAS: 600 horas (imposible)\n• Meta: detectar si >3% tienen problemas",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Muestra aleatoria de 300 facturas",
          description: "n=300 da margen de error de \u00b13% para proporciones. Suficiente para la DIAN.",
          cost: 2000000,
          revenue: 9000000,
          bsc: { bsc_financial: 8, bsc_customer: 5, bsc_internal: 8, bsc_learning: 8 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\u2705 Con n=300, E = 1.96\u00d7\u221a(0.03\u00d70.97/300) = \u00b11.9%. Si encuentras \u22643% con problemas, puedes demostrar cumplimiento.\n\ud83d\udcda Concepto: Muestreo para auditoria. n=300 es estandar para proporciones con E\u22642%.",
          next: null
        },
        {
          id: "B",
          label: "Revisar solo las facturas grandes (>$5M)",
          description: "Las facturas grandes son las que la DIAN revisa. Unas 150 facturas.",
          cost: 2000000,
          revenue: 7000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["practical"],
          feedback: "\u26a0\ufe0f Sesgo de seleccion. Si solo revisas las grandes, las chicas pueden tener problemas que no detectas.\n\ud83d\udcda Concepto: Muestra por conveniencia \u2260 muestra aleatoria. La DIAN puede muestrear CUALQUIER factura.",
          next: null
        },
        {
          id: "C",
          label: "Revisar TODAS las 2,400 facturas",
          description: "Cero riesgo. Si hay tiempo y plata, revisar todo.",
          cost: 8000000,
          revenue: 10000000,
          bsc: { bsc_financial: 3, bsc_customer: 4, bsc_internal: 6, bsc_learning: 3 },
          crossEffects: [],
          tags: ["perfectionist"],
          feedback: "\ud83d\udca1 600 horas de revision. \u00bfVale $25M de mano de obra vs $8M de la muestra que da casi la misma confianza?\n\ud83d\udcda Concepto: Muestreo existe para ahorrar recursos. Censo solo se justifica cuando el costo es bajo.",
          next: null
        },
        {
          id: "D",
          label: "Muestreo estratificado: 100 grandes + 100 medianas + 100 pequenas",
          description: "Dividir facturas por monto y muestrear proporcionalmente.",
          cost: 2000000,
          revenue: 11000000,
          bsc: { bsc_financial: 7, bsc_customer: 5, bsc_internal: 8, bsc_learning: 10 },
          crossEffects: [],
          tags: ["sophisticated"],
          feedback: "\u2705 Muestreo estratificado reduce varianza y garantiza representacion de todos los rangos de montos.\n\ud83d\udcda Concepto: Estratificado > aleatorio simple cuando los estratos son heterogeneos. Mejor precision por el mismo n.",
          next: null
        }
      ]
    }
  }
};
