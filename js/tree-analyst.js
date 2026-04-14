/* ============================================================
   TREE-ANALYST - Arbol de decisiones del Analista de Datos
   PlataniWars: Simulador Gerencial Estadistico
   ============================================================ */
window.TREE_ANALYST = {
  name: "Analisis de Datos",
  icon: "📊",
  startNode: "dat-01",
  nodes: {

    /* --------------------------------------------------------
       DAT-01 | Dia 1 | Tipos de muestreo
       -------------------------------------------------------- */
    "dat-01": {
      id: "dat-01",
      day: 1,
      title: "Diseno del plan de muestreo",
      context: "La junta directiva quiere un diagnostico completo de calidad en las 3 sedes de PlataniCracks: Pereira (planta principal, 120 operarios, maquinas nuevas), Dosquebradas (planta secundaria, 45 operarios, maquinas de 2018) y Armenia (planta pequena, 20 operarios, procesos semi-artesanales).\n\nCada sede tiene condiciones MUY diferentes: turnos distintos, proveedores locales, climas diferentes, clientes regionales distintos. El presupuesto alcanza para muestrear 150 unidades en total.\n\n📊 DATOS:\n• Pereira: 120 operarios, 65% de la produccion total\n• Dosquebradas: 45 operarios, 25% de la produccion\n• Armenia: 20 operarios, 10% de la produccion\n• Presupuesto de muestreo: $8.000.000\n• Plazo: 5 dias habiles\n\nEl gerente general dice: 'Vayan a la planta de Pereira que es la mas grande y saquen las 150 muestras ahi. Para que complicarse yendo a las otras sedes'. ¿Como disenas el muestreo?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Muestreo estratificado proporcional por sede",
          description: "Dividimos las 150 muestras proporcionalmente: 98 en Pereira (65%), 37 en Dosquebradas (25%), 15 en Armenia (10%). Cada sede es un estrato.",
          cost: 8000000,
          revenue: 12000000,
          bsc: { bsc_internal: 10, bsc_customer: 5, bsc_financial: -1, bsc_learning: 12 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: 3 }, narrative: "El diagnostico por sede permite identificar problemas especificos en cada planta." }
          ],
          tags: ["data-driven", "rigorous"],
          feedback: "✅ DECISION ACERTADA\n\nEl muestreo estratificado es la tecnica correcta cuando la poblacion tiene subgrupos (estratos) con caracteristicas diferentes.\n\nDistribucion optima proporcional:\n• Pereira: 150 × 0.65 = 98 muestras\n• Dosquebradas: 150 × 0.25 = 37 muestras\n• Armenia: 150 × 0.10 = 15 muestras\n\nVentajas sobre aleatorio simple:\n1. Garantiza representacion de TODAS las sedes\n2. Reduce el error estandar del estimador global\n3. Permite comparar calidad ENTRE sedes\n4. Si Armenia tiene problemas graves, los detectas con 15 muestras dedicadas\n\nCon aleatorio simple de 150, podrias terminar con 0 muestras de Armenia por puro azar.\n\n📚 Concepto: Muestreo estratificado. Se usa cuando la poblacion tiene subgrupos heterogeneos entre si pero homogeneos internamente. Los estratos se definen ANTES de muestrear (no despues). La asignacion proporcional al tamano del estrato es la mas comun: nk = n × (Nk/N).",
          next: "dat-02"
        },
        {
          id: "B",
          label: "Muestreo aleatorio simple de toda la produccion",
          description: "Juntamos la produccion de las 3 sedes en una lista, generamos 150 numeros aleatorios y muestreamos sin importar la sede de origen.",
          cost: 6000000,
          revenue: 12000000,
          bsc: { bsc_internal: 4, bsc_customer: 2, bsc_financial: 1, bsc_learning: 5 },
          crossEffects: [],
          tags: ["simple", "suboptimal"],
          feedback: "⚠️ DECISION FUNCIONAL PERO SUBOPTIMA\n\nEl muestreo aleatorio simple (MAS) es valido pero tiene limitaciones aqui:\n\nProblema 1 — Representacion desigual:\nCon n=150 y Armenia = 10% de produccion, esperarias ~15 muestras de Armenia. Pero por azar podrias obtener entre 5 y 25. Si salen solo 5, Armenia queda sub-representada.\n\nProblema 2 — No puedes comparar sedes:\nSin estratificacion, las comparaciones entre sedes tienen tamanos muestrales inciertos.\n\nProblema 3 — Mayor varianza:\nVar(MAS) >= Var(Estratificado) siempre que los estratos sean diferentes entre si.\n\nEl MAS funciona bien cuando la poblacion es HOMOGENEA. Aqui no lo es: maquinas diferentes, operarios diferentes, climas diferentes.\n\n📚 Concepto: Muestreo aleatorio simple. Cada elemento tiene la misma probabilidad de ser seleccionado: P = n/N. Es el baseline pero no siempre es el mejor. Cuando hay heterogeneidad conocida, el estratificado es superior.",
          next: "dat-02"
        },
        {
          id: "C",
          label: "Hacerle caso al gerente: 150 muestras en Pereira",
          description: "Pereira es la planta mas grande y la mas importante. Concentramos todo el esfuerzo ahi y ahorramos los viaticos a las otras sedes.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: -8, bsc_customer: -4, bsc_financial: 2, bsc_learning: -10 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: -5 }, narrative: "Los problemas de calidad en Dosquebradas y Armenia siguen sin detectarse durante semanas." }
          ],
          tags: ["biased", "convenience"],
          feedback: "❌ DECISION INCORRECTA\n\nEsto es muestreo por CONVENIENCIA, el peor tipo de muestreo para inferencia estadistica.\n\nProblemas graves:\n1. Sesgo de seleccion: Solo muestreas donde es facil llegar\n2. No representativo: Ignoras el 35% de la produccion\n3. Conclusiones invalidas: No puedes decir NADA sobre la calidad de Dosquebradas ni Armenia\n4. Riesgo oculto: Si Armenia tiene 15% de defectos, no lo sabras hasta que un cliente se queje\n\nEl ahorro en viaticos ($3M) es ridiculo comparado con el costo de NO detectar un problema de calidad en una sede completa.\n\n📚 Concepto: Muestreo por conveniencia. Se seleccionan los elementos mas faciles de acceder. Produce sesgo de seleccion y NO permite generalizacion estadistica. Es aceptable solo para estudios exploratorios preliminares, NUNCA para diagnosticos formales.",
          next: "dat-02"
        },
        {
          id: "D",
          label: "Muestreo sistematico: cada k-esimo paquete en todas las sedes",
          description: "Calculamos k = N/n y tomamos cada paquete numero k de la linea de produccion de cada sede. Eficiente y mecanico.",
          cost: 7000000,
          revenue: 12000000,
          bsc: { bsc_internal: 5, bsc_customer: 3, bsc_financial: 0, bsc_learning: 7 },
          crossEffects: [],
          tags: ["systematic", "moderate"],
          feedback: "💡 DECISION ACEPTABLE CON RIESGOS\n\nEl muestreo sistematico es practico: eliges un arranque aleatorio r y luego tomas cada k-esimo elemento.\n\nSi produccion total diaria = 3000 paquetes y n = 150:\nk = 3000/150 = 20 → tomas el paquete 1, 21, 41, 61...\n\nVentaja: Facil de implementar en linea de produccion.\n\nRiesgo: Si hay un patron periodico en la produccion (ej: cada 20 paquetes la maquina tiene un ciclo), el muestreo sistematico puede coincidir con el patron y dar resultados sesgados.\n\nAdemas, no garantiza cobertura proporcional entre sedes si no defines cuotas por planta.\n\n📚 Concepto: Muestreo sistematico. Seleccion cada k = N/n elementos con arranque aleatorio. Equivale al aleatorio simple cuando no hay periodicidad en los datos. Peligroso si hay patrones ciclicos en la poblacion. Mejor que conveniencia, pero inferior al estratificado cuando hay grupos heterogeneos.",
          next: "dat-02"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-02 | Dia 4 | Teorema Central del Limite, distribucion de X̄
       -------------------------------------------------------- */
    "dat-02": {
      id: "dat-02",
      day: 4,
      title: "Pronostico de ventas trimestrales",
      context: "El director financiero necesita el presupuesto del proximo trimestre URGENTE. Bancolombia exige una proyeccion de ingresos para renovar la linea de credito rotativo.\n\nTu equipo recopilo datos historicos de ventas mensuales de los ultimos 3 anos (36 meses).\n\n📊 DATOS HISTORICOS:\n• Ventas mensuales promedio: μ = $180.000.000\n• Desviacion estandar mensual: σ = $40.000.000\n• Distribucion mensual: Asimetrica positiva (algunos meses pico como diciembre)\n• Necesitan: Proyeccion del PROMEDIO del proximo trimestre (3 meses)\n\nEl director financiero dice: 'Como la desviacion es de $40 millones, el proximo trimestre podemos vender entre $140M y $220M en promedio. Pongamos $180M y ya'. ¿Que le recomiendas?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Presupuesto basado en intervalo de confianza del promedio trimestral",
          description: "Calculamos el error estandar para n=3 meses, construimos IC al 95% y usamos el limite inferior como presupuesto conservador.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: 8, bsc_customer: 3, bsc_financial: 10, bsc_learning: 12 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: 5 }, narrative: "Bancolombia aprueba la linea de credito al ver una proyeccion fundamentada con intervalos de confianza." }
          ],
          tags: ["data-driven", "rigorous"],
          feedback: "✅ DECISION ACERTADA\n\nPor el Teorema Central del Limite, el promedio de n meses tiene distribucion:\nX̄ ~ N(μ, σ/√n) = N(180, 40/√3)\n\nError estandar del promedio trimestral:\nSE = σ/√n = 40/√3 = $23.09M\n\nIntervalo de confianza al 95%:\nIC = μ ± Z × SE = 180 ± 1.96 × 23.09\nIC = 180 ± 45.26\nIC = [$134.74M, $225.26M]\n\nEstrategia optima para Bancolombia:\n• Escenario conservador (presupuesto base): $134.74M (limite inferior)\n• Escenario esperado: $180M\n• Escenario optimista: $225.26M\n\nOJO: n=3 es pequeno. El TCL funciona mejor con n >= 30, pero como referencia con datos historicos de 36 meses, la estimacion de μ y σ es confiable.\n\n📚 Concepto: Teorema Central del Limite. Sin importar la distribucion original de los datos, la distribucion del promedio muestral X̄ se aproxima a una Normal cuando n crece. La clave es que SE = σ/√n, asi que el promedio es MENOS variable que los datos individuales. $40M de variabilidad mensual se convierten en $23M de variabilidad trimestral.",
          next: "dat-03"
        },
        {
          id: "B",
          label: "Usar el promedio historico directo: $180M",
          description: "El promedio de 36 meses es $180M. Es el mejor estimador puntual. Se lo damos a Bancolombia sin mas vueltas.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: 2, bsc_customer: 0, bsc_financial: -3, bsc_learning: -5 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -3 }, narrative: "Bancolombia cuestiona la proyeccion por falta de margen de error. Pide informacion adicional." }
          ],
          tags: ["simplistic", "incomplete"],
          feedback: "⚠️ DECISION INCOMPLETA\n\nSi, $180M es el mejor estimador PUNTUAL de μ. Pero un numero solo, sin margen de error, es peligroso:\n\n¿Que pasa si el trimestre real da $140M? ¿O $220M? Sin IC, no sabes que tan probable es cada escenario.\n\nEl director financiero comete un error comun: usar μ ± σ = [140, 220]. Eso es el rango de MESES INDIVIDUALES, no del PROMEDIO trimestral.\n\nEl rango correcto del promedio es μ ± 1.96 × SE = [134.74, 225.26].\n\nLa diferencia es crucial:\n• σ individual = $40M (variabilidad de UN mes)\n• SE del promedio = $23.09M (variabilidad del PROMEDIO de 3 meses)\n\n📚 Concepto: Distribucion muestral de X̄. No confundir σ (variabilidad individual) con SE = σ/√n (variabilidad del promedio). El promedio siempre es menos variable que los datos individuales. Por eso las estimaciones basadas en promedios son mas precisas.",
          next: "dat-03"
        },
        {
          id: "C",
          label: "Proyeccion basada en el peor trimestre historico",
          description: "Buscamos el peor trimestre de los ultimos 3 anos y usamos ese como base. Mejor ser pesimista que quedarnos sin plata.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: 3, bsc_customer: 0, bsc_financial: -6, bsc_learning: -2 },
          crossEffects: [
            { area: "hr", bsc: { bsc_learning: -2 }, narrative: "El presupuesto pesimista lleva a congelar contrataciones y capacitaciones." }
          ],
          tags: ["conservative", "non-statistical"],
          feedback: "⚠️ DECISION EXCESIVAMENTE CONSERVADORA\n\nUsar el peor trimestre historico (digamos $135M) ignora toda la informacion de los otros 11 trimestres. Es como estudiar para un parcial leyendo solo la peor nota que sacaste.\n\nEl enfoque estadistico correcto:\n• El IC al 95% tiene limite inferior $134.74M\n• Eso ya captura el escenario pesimista CON fundamento probabilistico\n• No necesitas 'adivinar' cual fue el peor — el IC lo calcula con la teoria\n\nAdemas, ser DEMASIADO pesimista tiene costos reales:\n• No inviertes en materia prima suficiente\n• Rechazas pedidos grandes por miedo\n• Pierdes oportunidades de crecimiento\n\n📚 Concepto: El limite inferior del IC no es 'pesimismo', es el peor escenario RAZONABLE dado los datos. Tiene fundamento probabilistico (95% de confianza). Usar el peor caso historico no tiene fundamento — es anecdotico.",
          next: "dat-03"
        },
        {
          id: "D",
          label: "Modelo de regresion con tendencia y estacionalidad",
          description: "Con 36 meses de datos, ajustamos un modelo con tendencia lineal + efecto estacional. Mas sofisticado, mas preciso.",
          cost: 15000000,
          revenue: 12000000,
          bsc: { bsc_internal: 6, bsc_customer: 2, bsc_financial: 1, bsc_learning: 8 },
          crossEffects: [],
          tags: ["advanced", "time-consuming"],
          feedback: "💡 DECISION SOFISTICADA PERO EXCESIVA PARA EL CONTEXTO\n\nUn modelo de regresion con estacionalidad es mas preciso SI:\n1. Hay tendencia clara (crecimiento o decrecimiento)\n2. Hay estacionalidad fuerte (diciembre arriba, enero abajo)\n3. Tienes tiempo para ajustarlo y validarlo\n\nPero Bancolombia necesita la proyeccion URGENTE, y con solo 36 datos mensuales:\n• Estimacion de tendencia: poco confiable (pocos puntos)\n• Estacionalidad: necesitas al menos 3-4 ciclos completos\n• Riesgo de sobreajuste: mas parametros que los que los datos soportan\n\nEl TCL con IC es mas robusto para este caso:\nSE = 40/√3 = $23.09M\nIC 95% = [$134.74M, $225.26M]\n\nSimple, defendible y listo en 10 minutos.\n\n📚 Concepto: TCL vs modelos complejos. El Teorema Central del Limite da una estimacion rapida y confiable del promedio. Los modelos de series de tiempo son mas poderosos pero requieren mas datos y mas tiempo. No uses un cuchillo de chef cuando un cuchillo de cocina resuelve.",
          next: "dat-03"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-03 | Dia 7 | Probabilidades, eventos raros, inferencia
       -------------------------------------------------------- */
    "dat-03": {
      id: "dat-03",
      day: 7,
      title: "Irregularidades en el sistema de ventas",
      context: "El sistema contable detecto algo raro. La auditora de la DIAN viene en 3 semanas y necesitas saber si hay un problema REAL o si es variacion normal.\n\nTu equipo analizo una muestra aleatoria de las transacciones del ultimo mes.\n\n📊 DATOS:\n• Muestra analizada: 200 transacciones\n• Transacciones sospechosas encontradas: 8 (descuentos no autorizados, devoluciones sin soporte, ventas a credito sin aprobacion)\n• Proporcion muestral de irregularidades: p̂ = 8/200 = 0.04 (4%)\n• Tasa historica de errores normales: p₀ = 0.01 (1%)\n• El jefe de ventas dice: 'Tranquilo, siempre hay errorcitos, es normal'\n\nLa auditora de la DIAN no perdona. Si encuentra irregularidades sistematicas, la multa puede superar los $200M. ¿Que haces?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Auditoria interna profunda con equipo forense",
          description: "Contratas un equipo de auditoria forense que revise TODAS las transacciones del ultimo semestre. Si hay fraude, lo encuentran antes que la DIAN.",
          cost: 45000000,
          revenue: 12000000,
          bsc: { bsc_internal: 12, bsc_customer: 3, bsc_financial: -5, bsc_learning: 10 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: 4 }, narrative: "La auditoria preventiva permite corregir irregularidades antes de la visita de la DIAN, evitando multas millonarias." }
          ],
          tags: ["proactive", "data-driven"],
          feedback: "✅ DECISION ACERTADA\n\nLa evidencia estadistica es CONTUNDENTE:\n\nPrueba de hipotesis para la proporcion:\nH₀: p = 0.01 (tasa normal de errores)\nH₁: p > 0.01 (hay mas errores de lo normal)\n\nEstadistico Z:\nZ = (p̂ - p₀) / √(p₀(1-p₀)/n)\nZ = (0.04 - 0.01) / √(0.01 × 0.99 / 200)\nZ = 0.03 / √(0.0000495)\nZ = 0.03 / 0.00703\nZ = 4.27\n\nP(Z > 4.27) < 0.00001\n\nCon Z = 4.27, la probabilidad de observar 4% de irregularidades cuando la tasa normal es 1% es practicamente CERO. Esto no es 'errorcitos normales'. Hay un problema sistematico.\n\nInvertir $45M en auditoria forense es barato comparado con una multa de $200M+ de la DIAN.\n\n📚 Concepto: Prueba de hipotesis para proporcion. Cuando p̂ = 0.04 y p₀ = 0.01, el Z = 4.27 esta MUY lejos del valor critico (1.645 para alfa = 0.05). P-valor < 0.00001 significa que seria practicamente imposible ver tantas irregularidades si todo estuviera normal. Evidencia APLASTANTE.",
          next: "dat-04"
        },
        {
          id: "B",
          label: "No hacer nada - el jefe de ventas tiene experiencia",
          description: "El jefe de ventas lleva 12 anos en la empresa. Dice que siempre hay errores y que no pasa nada. Le crees y esperas la visita de la DIAN tranquilo.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: -15, bsc_customer: -5, bsc_financial: -10, bsc_learning: -8 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -15 }, narrative: "La DIAN encuentra irregularidades sistematicas y aplica sancion por $200M mas intereses moratorios." },
            { area: "hr", bsc: { bsc_learning: -5 }, narrative: "El equipo de ventas no recibe retroalimentacion y las practicas irregulares se normalizan." }
          ],
          tags: ["risky", "negligent"],
          feedback: "❌ DECISION PELIGROSA\n\nLa experiencia del jefe de ventas no supera la MATEMATICA:\n\nZ = (0.04 - 0.01) / √(0.01 × 0.99 / 200) = 4.27\n\nPara Z = 4.27:\n• P-valor < 0.00001 (1 en 100,000)\n• Es como decir 'saque 4 veces seguidas cara con una moneda justa' — posible pero MUY sospechoso\n\nLa DIAN usa analisis estadistico forense. Si TU detectaste el patron con 200 transacciones, ELLOS lo van a detectar revisando miles.\n\nRiesgos:\n• Multa minima: $200M\n• Sancion por no reportar: $50M adicionales\n• Inhabilidades para el representante legal\n\n📚 Concepto: Eventos raros e inferencia. Un evento con P < 0.001 bajo la hipotesis nula (normalidad) es tan improbable que la conclusion logica es RECHAZAR la hipotesis nula. Los datos gritan que algo esta mal. Ignorarlos es negligencia.",
          next: "dat-04"
        },
        {
          id: "C",
          label: "Revisar solo las 8 transacciones sospechosas",
          description: "Investigamos las 8 transacciones puntuales. Si tienen justificacion, todo bien. Si no, actuamos solo sobre esas.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: 1, bsc_customer: 0, bsc_financial: 0, bsc_learning: 3 },
          crossEffects: [],
          tags: ["partial", "reactive"],
          feedback: "⚠️ DECISION INSUFICIENTE\n\nRevisar solo las 8 transacciones es como tratar los sintomas ignorando la enfermedad.\n\nEl punto clave: encontraste 8 en una MUESTRA de 200. El total de transacciones del mes es ~5,000.\n\nSi p real ≈ 4%, el numero esperado de irregularidades en 5,000 transacciones es:\nE(irregularidades) = 5000 × 0.04 = 200 transacciones sospechosas\n\nIC 95% para el total:\nTotal estimado: 5000 × 0.04 ± 5000 × 1.96 × 0.01387\nTotal: 200 ± 136\nEntre 64 y 336 transacciones irregulares en el mes\n\nCorregir 8 de 200+ es como tapar el 4% de un hueco.\n\n📚 Concepto: Inferencia de muestra a poblacion. Los 8 casos son la punta del iceberg. La proporcion muestral p̂ = 0.04 ESTIMA la proporcion poblacional. Con Z = 4.27, hay evidencia de un problema SISTEMATICO, no 8 errores aislados.",
          next: "dat-04"
        },
        {
          id: "D",
          label: "Ampliar la muestra a 500 transacciones antes de decidir",
          description: "200 transacciones puede ser poco. Ampliamos a 500 para tener mas certeza antes de gastar $45M en auditoria forense.",
          cost: 8000000,
          revenue: 12000000,
          bsc: { bsc_internal: 4, bsc_customer: 1, bsc_financial: -2, bsc_learning: 6 },
          crossEffects: [],
          tags: ["cautious", "analytical"],
          feedback: "💡 DECISION PRUDENTE PERO PROBABLEMENTE INNECESARIA\n\nCon Z = 4.27 y P-valor < 0.00001, la evidencia ya es abrumadora. Ampliar la muestra solo confirma lo que ya sabes.\n\nSimulemos: si en 500 transacciones encuentras 18 sospechosas (3.6%):\nZ = (0.036 - 0.01) / √(0.01 × 0.99 / 500)\nZ = 0.026 / 0.00445 = 5.84\n\nAun MAS significativo. Mas datos solo fortalecen la conclusion.\n\nEl riesgo real es el TIEMPO: mientras amplias la muestra, pierdes 3-5 dias. La DIAN viene en 3 semanas. Cada dia cuenta para preparar la respuesta.\n\n📚 Concepto: Potencia estadistica y tamano muestral. Cuando el Z-score ya es 4.27 (MUY lejos de 1.645), ampliar la muestra no cambia la decision. El tiempo y dinero invertidos en 'mas datos' habria sido mejor invertirlo en la auditoria correctiva. A veces, la muestra original ya es suficiente.",
          next: "dat-04"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-04 | Dia 11 | Varianzas se SUMAN (no se restan)
       -------------------------------------------------------- */
    "dat-04": {
      id: "dat-04",
      day: 11,
      title: "Comparacion estadistica de proveedores",
      context: "El CFO llamo a reunion de urgencia. PlataniCracks compra platano verde a dos proveedores: Don Hernan (Pereira) y Agroandes (Armenia). Quieren saber que tan variable es la DIFERENCIA de peso entre los dos proveedores para decidir si estandarizan con uno solo.\n\nEl equipo de calidad tomo muestras independientes de ambos proveedores:\n\n📊 DATOS:\n• Proveedor A (Don Hernan): X̄a = 98g, σa = 3g, n = 60\n• Proveedor B (Agroandes): X̄b = 99g, σb = 7g, n = 45\n• La diferencia promedio es: X̄a - X̄b = 98 - 99 = -1g\n\nEl CFO presenta su analisis en la reunion: 'La varianza de la diferencia es 7² - 3² = 49 - 9 = 40. La desviacion estandar de la diferencia es √40 = 6.32g'.\n\nTe mira y dice: '¿Verdad, analista?'. La junta directiva entera te mira. ¿Que respondes?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Corregir al CFO: las varianzas se SUMAN, no se restan",
          description: "Explicas respetuosamente que Var(A-B) = Var(A) + Var(B) cuando son independientes. La varianza correcta es 9 + 49 = 58, no 40.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: 10, bsc_customer: 2, bsc_financial: 5, bsc_learning: 15 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: 3 }, narrative: "El CFO agradece la correccion y ajusta los modelos financieros de costos de insumos." }
          ],
          tags: ["data-driven", "brave"],
          feedback: "✅ DECISION ACERTADA\n\nEl error del CFO es uno de los mas comunes en estadistica:\n\n❌ INCORRECTO: Var(A - B) = Var(A) - Var(B) = 49 - 9 = 40\n✅ CORRECTO: Var(A - B) = Var(A) + Var(B) = 9 + 49 = 58\n\n¿Por que se SUMAN? Porque la incertidumbre SIEMPRE se acumula:\n• Don Hernan varia ±3g (a veces da mas, a veces menos)\n• Agroandes varia ±7g (a veces da mas, a veces menos)\n• La DIFERENCIA puede variar porque CUALQUIERA de los dos se desvie\n\nDesviacion estandar de la diferencia:\nSD(A-B) = √(σa² + σb²) = √(9 + 49) = √58 = 7.62g\n\nError estandar de la diferencia de medias:\nSE(X̄a - X̄b) = √(σa²/na + σb²/nb) = √(9/60 + 49/45) = √(0.15 + 1.089) = √1.239 = 1.11g\n\nIC 95% para la diferencia:\n(-1) ± 1.96 × 1.11 = [-3.18g, 1.18g]\n\nComo el IC incluye 0, NO hay evidencia de diferencia significativa entre proveedores.\n\n📚 Concepto: Varianza de la diferencia. Para variables independientes, Var(X-Y) = Var(X) + Var(Y). La clave es que RESTAR dos variables NO reduce la incertidumbre — la AUMENTA. Piensa en dos dados: la diferencia entre ellos es MAS impredecible que cada dado por separado, no menos.",
          next: "dat-05"
        },
        {
          id: "B",
          label: "Darle la razon al CFO frente a la junta",
          description: "El CFO es tu jefe. No lo vas a contradecir frente a toda la junta directiva. Asientes con la cabeza y sigues.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: -12, bsc_customer: -3, bsc_financial: -8, bsc_learning: -15 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: -5 }, narrative: "Las decisiones de proveedores se basan en calculos erroneos. Los contratos firmados no reflejan la variabilidad real." }
          ],
          tags: ["political", "wrong"],
          feedback: "❌ DECISION INCORRECTA\n\nDarle la razon al CFO propaga un error que afecta TODAS las decisiones posteriores:\n\nCon Var = 40 (SD = 6.32g), la junta subestima la variabilidad real.\nCon Var = 58 (SD = 7.62g), la variabilidad es 20% MAYOR de lo que creen.\n\nConsecuencias:\n1. Los limites de tolerancia en contratos seran demasiado estrechos\n2. Los proveedores 'incumpliran' limites que fueron mal calculados\n3. Los costos de rechazo de materia prima se disparan\n\nAdemas, si la auditora externa detecta el error, la credibilidad del equipo de datos se destruye.\n\n📚 Concepto: Var(X-Y) = Var(X) + Var(Y) para variables independientes. SIEMPRE. No importa si es suma o resta de variables — las varianzas se SUMAN. La unica excepcion es cuando las variables estan CORRELACIONADAS: Var(X-Y) = Var(X) + Var(Y) - 2Cov(X,Y). Pero si son independientes, Cov = 0.",
          next: "dat-05"
        },
        {
          id: "C",
          label: "Pedir mas datos antes de concluir cualquier cosa",
          description: "Sugieres que con 60 y 45 muestras no es suficiente para decidir. Propones un estudio mas grande antes de tomar decisiones.",
          cost: 12000000,
          revenue: 12000000,
          bsc: { bsc_internal: 2, bsc_customer: 0, bsc_financial: -3, bsc_learning: 4 },
          crossEffects: [],
          tags: ["evasive", "cautious"],
          feedback: "⚠️ DECISION EVASIVA\n\nEl problema principal NO es el tamano muestral. n=60 y n=45 son mas que suficientes para estimar medias y varianzas.\n\nEl problema es que el CFO calculo MAL la varianza:\n❌ Var(A-B) = 49 - 9 = 40\n✅ Var(A-B) = 9 + 49 = 58\n\nPedir mas datos no corrige un error algebraico. Es como decir 'no estoy seguro de que 2+2=4, traigamos mas calculadoras'.\n\nAdemas, evitar la correccion no hace que el error desaparezca — solo pospone las consecuencias.\n\nSE(X̄a - X̄b) = √(9/60 + 49/45) = 1.11g ya es un error estandar razonablemente pequeno.\n\n📚 Concepto: La formula Var(X-Y) = Var(X) + Var(Y) no depende del tamano muestral. Es una propiedad matematica de las variables aleatorias independientes. Mas datos mejoran las ESTIMACIONES de las varianzas individuales, pero no cambian la formula.",
          next: "dat-05"
        },
        {
          id: "D",
          label: "Proponer estandarizar con Agroandes porque tiene media mas alta",
          description: "Agroandes da platanos de 99g en promedio vs 98g de Don Hernan. Aunque la variabilidad es mayor, el peso promedio es superior. Recomiendas cambiar.",
          cost: 10000000,
          revenue: 18000000,
          bsc: { bsc_internal: -4, bsc_customer: -2, bsc_financial: -1, bsc_learning: -3 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: -4 }, narrative: "La mayor variabilidad de Agroandes (σ=7g vs σ=3g) genera inconsistencia en la linea de produccion." }
          ],
          tags: ["impulsive", "incomplete"],
          feedback: "💡 DECISION PRECIPITADA\n\nAntes de elegir proveedor, necesitas responder DOS preguntas:\n\n1. ¿La diferencia de 1g es significativa?\nSE = √(9/60 + 49/45) = 1.11g\nZ = (98-99)/1.11 = -0.90\nP-valor = 0.368 → NO es significativa\nLa diferencia de 1g es RUIDO estadistico.\n\n2. ¿Que pesa mas: media o variabilidad?\nDon Hernan: 98g ± 3g (rango tipico: 92-104g)\nAgroandes: 99g ± 7g (rango tipico: 85-113g)\n\nAgroandes tiene 1g mas de media pero 2.3 veces mas de variabilidad. Eso significa mas paquetes fuera de especificacion.\n\n% fuera de [90g, 110g]:\nDon Hernan: P(X<90) + P(X>110) ≈ 0.38%\nAgroandes: P(X<90) + P(X>110) ≈ 14.8%\n\nAgroandes generaria 39 VECES mas rechazos.\n\n📚 Concepto: No solo importa la media, importa la varianza. Un proveedor con media ligeramente menor pero varianza MUCHO menor es preferible cuando necesitas consistencia. Var(A-B) = Var(A) + Var(B) = 58 te dice que la variabilidad combinada es alta.",
          next: "dat-05"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-05 | Dia 16 | Interpretacion CORRECTA de intervalos de confianza
       -------------------------------------------------------- */
    "dat-05": {
      id: "dat-05",
      day: 12,
      title: "Reporte de KPIs a la junta directiva",
      context: "Llego el dia de la presentacion trimestral a la junta directiva de PlataniCracks. Tu equipo analizo los margenes de ganancia con una muestra representativa de operaciones del trimestre.\n\n📊 RESULTADOS DEL ANALISIS:\n• Muestra: 80 operaciones del trimestre\n• Margen de ganancia promedio muestral: X̄ = 21%\n• Desviacion estandar muestral: s = 6%\n• IC al 95%: X̄ ± Z × (s/√n) = 21 ± 1.96 × (6/√80) = 21 ± 1.32 = [19.68%, 22.32%]\n• Meta de la empresa: margen >= 20%\n\nEl gerente general revisa la presentacion antes de entrar a la sala de juntas. Lee el IC y dice:\n'Perfecto, hay un 95% de probabilidad de que nuestro margen real sea mayor al 19.68%. La meta de 20% esta asegurada. Escribe eso en la diapositiva.'\n\n¿Que haces?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Corregir la interpretacion del gerente antes de la presentacion",
          description: "Le explicas al gerente que la interpretacion del IC no es asi. El 95% se refiere al PROCEDIMIENTO de construccion del intervalo, no a la probabilidad de que el parametro este ahi.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: 8, bsc_customer: 5, bsc_financial: 3, bsc_learning: 15 },
          crossEffects: [],
          tags: ["rigorous", "brave"],
          feedback: "✅ DECISION ACERTADA\n\nLa interpretacion del gerente es un error CLASICO:\n\n❌ INCORRECTO: 'Hay un 95% de probabilidad de que μ este entre 19.68% y 22.32%'\n\n✅ CORRECTO: 'Si repetimos este procedimiento de muestreo muchas veces, el 95% de los intervalos construidos contendran el valor real de μ'\n\n¿Por que importa la diferencia?\n\nEl parametro μ (margen real) es un valor FIJO, no aleatorio. No tiene 'probabilidad' de estar en ningun lado. O esta ahi o no esta.\n\nLo que es aleatorio es el INTERVALO. Cada muestra da un IC diferente. El 95% es la tasa de exito del METODO a largo plazo.\n\nAplicado a la meta de 20%:\n• El IC es [19.68%, 22.32%]\n• El 20% esta DENTRO del intervalo\n• NO podemos rechazar que μ >= 20%, pero tampoco podemos asegurar que lo sea\n• Lo correcto es decir: 'Los datos son consistentes con un margen >= 20%, pero tambien con margenes tan bajos como 19.68%'\n\n📚 Concepto: Interpretacion del intervalo de confianza. El IC NO es una declaracion probabilistica sobre el parametro. Es una declaracion sobre el PROCEDIMIENTO. El parametro es fijo; el intervalo es aleatorio. Decir '95% de probabilidad de que μ este aqui' es estadistica bayesiana, no frecuentista.",
          next: "dat-06"
        },
        {
          id: "B",
          label: "Poner la frase del gerente en la diapositiva tal cual",
          description: "El gerente es el jefe. Si quiere que la diapositiva diga '95% de probabilidad', asi se pone. No es momento de dar clases de estadistica.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: -10, bsc_customer: -5, bsc_financial: -3, bsc_learning: -12 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -5 }, narrative: "La junta directiva toma decisiones de inversion basadas en una interpretacion incorrecta del intervalo de confianza." }
          ],
          tags: ["wrong", "compliant"],
          feedback: "❌ DECISION INCORRECTA\n\nPoner '95% de probabilidad de que μ > 19.68%' es ESTADISTICAMENTE FALSO y tiene consecuencias reales:\n\n1. La junta cree que la meta esta 'asegurada' al 95%\n2. Toman decisiones de expansion basadas en esa falsa seguridad\n3. Si el margen real es 19.5% (posible dado el IC), los planes financieros fallan\n\nPeor aun: si un miembro de la junta tiene formacion estadistica, detecta el error y la credibilidad del equipo de datos se destruye.\n\nLa interpretacion correcta:\n'Estamos 95% confiados en que el margen real esta entre 19.68% y 22.32%. La meta de 20% cae dentro del rango estimado.'\n\nOJO: 'confiados' en el sentido de que el metodo acierta el 95% de las veces, NO de que haya 95% de probabilidad.\n\n📚 Concepto: El IC frecuentista no asigna probabilidad al parametro. μ es un numero fijo que desconocemos. El intervalo es una estimacion construida con datos aleatorios. El '95%' describe la confiabilidad del METODO, no la ubicacion del PARAMETRO.",
          next: "dat-06"
        },
        {
          id: "C",
          label: "Reformular con IC mas amplio al 99% para mas seguridad",
          description: "Propones usar IC al 99% para que la junta tenga aun mas confianza. Si el 95% no convence, el 99% si.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: 3, bsc_customer: 2, bsc_financial: 0, bsc_learning: 5 },
          crossEffects: [],
          tags: ["cautious", "misguided"],
          feedback: "⚠️ DECISION QUE NO RESUELVE EL PROBLEMA\n\nCambiar al 99% no corrige la INTERPRETACION erronea — solo cambia el numero.\n\nIC al 99%:\nIC = 21 ± 2.576 × (6/√80) = 21 ± 1.73 = [19.27%, 22.73%]\n\nEl IC es mas ANCHO (menos preciso) pero el gerente seguira diciendo '99% de probabilidad de que μ este ahi', que sigue siendo incorrecto.\n\nAdemas, un IC mas amplio es MENOS util para la junta, no mas. Decir 'el margen esta entre 19.27% y 22.73%' es menos informativo que 'entre 19.68% y 22.32%'.\n\nEl problema no es el nivel de confianza — es la INTERPRETACION.\n\n📚 Concepto: Aumentar el nivel de confianza (95% → 99%) amplia el intervalo, reduciendo precision. No cambia la naturaleza del IC ni corrige errores de interpretacion. El trade-off es: mas confianza = menos precision. Siempre.",
          next: "dat-06"
        },
        {
          id: "D",
          label: "Presentar solo el promedio muestral sin intervalo de confianza",
          description: "Para evitar confusiones, quitas el IC de la presentacion y solo pones 'Margen de ganancia: 21%'. Limpio y simple.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: -5, bsc_customer: -1, bsc_financial: -2, bsc_learning: -8 },
          crossEffects: [],
          tags: ["simplistic", "hiding-uncertainty"],
          feedback: "❌ DECISION REGRESIVA\n\nQuitar el IC es PEOR que interpretarlo mal. Un solo numero sin margen de error es enganoso:\n\n• X̄ = 21% podria venir de una muestra con s = 6% (razonable incertidumbre)\n• O podria venir de una muestra con s = 25% (enormemente incierto)\n\nSin el IC, la junta no sabe si 21% es una estimacion confiable o una moneda al aire.\n\nLo correcto es presentar AMBOS:\n'El margen estimado es 21% (IC 95%: 19.68% - 22.32%)'\n\nY explicar:\n'Esto significa que nuestro metodo de estimacion, aplicado repetidamente, acertaria el rango del verdadero margen el 95% de las veces. Nuestros datos son consistentes con la meta de 20%.'\n\n📚 Concepto: Toda estimacion puntual debe acompanarse de una medida de incertidumbre (IC, margen de error, SE). Un numero sin contexto de precision puede llevar a decisiones sobreconfiadas. La junta necesita saber NO solo el estimado, sino QUE TAN CONFIABLE es.",
          next: "dat-06"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-06 | Dia 21 | Integracion de TODOS los conceptos del curso
       -------------------------------------------------------- */
    "dat-06": {
      id: "dat-06",
      day: 14,
      title: "Modelo de prediccion para el cierre anual",
      context: "Faltan 2 semanas para el cierre fiscal y la junta directiva necesita la proyeccion final de PlataniCracks. El gerente te pide integrar TODO lo que has analizado este mes en un modelo de prediccion unificado.\n\nTienes datos de 4 areas criticas:\n\n📊 DATOS CONSOLIDADOS:\n\n1. CALIDAD (Proporcion de defectos):\n   • Muestra: 500 paquetes, 18 defectuosos\n   • p̂ = 18/500 = 0.036 (3.6%)\n   • IC 95%: [2.0%, 5.2%]\n\n2. VENTAS (Media mensual):\n   • Muestra: 12 meses, X̄ = $185M, s = $35M\n   • SE = 35/√12 = $10.1M\n   • IC 95%: [$164.8M, $205.2M]\n\n3. COSTOS (Diferencia entre turnos dia vs noche):\n   • Turno dia: X̄₁ = $45M, s₁ = $8M, n₁ = 30\n   • Turno noche: X̄₂ = $52M, s₂ = $12M, n₂ = 30\n   • Diferencia: $7M mas caro el turno noche\n   • SE(dif) = √(64/30 + 144/30) = √(2.13 + 4.80) = √6.93 = $2.63M\n\n4. SATISFACCION DEL CLIENTE:\n   • Muestra: 300 clientes, 234 satisfechos\n   • p̂ = 234/300 = 0.78 (78%)\n   • IC 95%: [73.3%, 82.7%]\n\nEl gerente quiere UNA sola diapositiva con la proyeccion. ¿Que enfoque usas?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Dashboard integrado con IC para cada KPI y analisis cruzado",
          description: "Presentas los 4 KPIs con sus intervalos de confianza, cruzas las implicaciones entre areas, y proyectas 3 escenarios (conservador, esperado, optimista).",
          cost: 15000000,
          revenue: 22000000,
          bsc: { bsc_internal: 12, bsc_customer: 8, bsc_financial: 10, bsc_learning: 15 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: 5 }, narrative: "El dashboard integrado revela que la diferencia de costos entre turnos se correlaciona con la tasa de defectos del turno noche." },
            { area: "marketing", bsc: { bsc_customer: 4 }, narrative: "Los datos de satisfaccion del cliente permiten al equipo de marketing ajustar la estrategia de retencion con evidencia solida." },
            { area: "finance", bsc: { bsc_financial: 5 }, narrative: "El modelo con IC permite al CFO presentar rangos creibles a Bancolombia y la DIAN." }
          ],
          tags: ["data-driven", "holistic", "rigorous"],
          feedback: "✅ DECISION ACERTADA\n\nEste es el trabajo del analista de datos en su maxima expresion. Integremos:\n\n1. CALIDAD — Proporcion de defectos:\np̂ = 0.036, IC 95%: [0.020, 0.052]\nSE = √(0.036 × 0.964 / 500) = 0.0083\nEsta dentro del estandar INVIMA (max 5%), pero el limite superior (5.2%) esta al filo.\n\n2. VENTAS — Media mensual con TCL:\nX̄ = $185M, SE = $10.1M\nIC 95%: [$165.2M, $204.8M]\nProyeccion anual: IC × 12 = [$1,982M, $2,458M]\n\n3. COSTOS — Diferencia entre turnos:\nDif = $7M, SE = $2.63M\nIC 95%: [7 ± 1.96 × 2.63] = [$1.8M, $12.2M]\nZ = 7/2.63 = 2.66, P = 0.008 → La diferencia es significativa\nVar(dif) = Var(dia) + Var(noche) = 64 + 144 = 208 (se SUMAN!)\n\n4. SATISFACCION — Proporcion:\np̂ = 0.78, SE = √(0.78 × 0.22 / 300) = 0.024\nIC 95%: [0.733, 0.827]\nMeta 80%: esta dentro del IC → no se puede confirmar que lleguemos.\n\nESCENARIOS:\n• Conservador: Ventas $165M/mes, defectos 5.2%, satisfaccion 73% → Margen neto ~14%\n• Esperado: Ventas $185M/mes, defectos 3.6%, satisfaccion 78% → Margen neto ~21%\n• Optimista: Ventas $205M/mes, defectos 2.0%, satisfaccion 83% → Margen neto ~27%\n\n📚 Concepto: Integracion estadistica. Cada KPI tiene su propio IC y SE. La proyeccion integrada combina estimaciones puntuales para el escenario esperado y usa los limites de IC para los escenarios extremos. Las varianzas de diferencias se SUMAN (costos turno), las proporciones usan la formula p̂(1-p̂)/n, y las medias usan s/√n. Todo lo del curso en una sola presentacion.",
          next: null
        },
        {
          id: "B",
          label: "Solo promedios puntuales en una tabla limpia",
          description: "Pones los 4 KPIs como numeros limpios: defectos 3.6%, ventas $185M, diferencia de costos $7M, satisfaccion 78%. Sin intervalos ni complicaciones.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: -3, bsc_customer: 0, bsc_financial: -5, bsc_learning: -10 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -4 }, narrative: "La junta toma decisiones asumiendo que los numeros son exactos, sin considerar margenes de error ni riesgo." }
          ],
          tags: ["simplistic", "incomplete"],
          feedback: "❌ DECISION INCOMPLETA\n\nPresentar solo promedios es como dar el pronostico del clima diciendo 'manana hace 22 grados' sin decir si podria llover o hacer sol.\n\nLos problemas de cada KPI SIN intervalo:\n\n1. Defectos = 3.6%: ¿Pero podria ser 5.2%? SI (limite superior del IC). Eso podria significar multa del INVIMA.\n\n2. Ventas = $185M: ¿Podrian ser $165M? SI. Esa diferencia de $20M/mes ($240M/ano) cambia TOTALMENTE el presupuesto.\n\n3. Diferencia costos = $7M: ¿Es significativa o ruido? Con SE = $2.63M y Z = 2.66, SI es significativa. Pero sin IC, la junta no lo sabe.\n\n4. Satisfaccion = 78%: ¿Llegamos a la meta de 80%? IC dice [73.3%, 82.7%]. NO podemos afirmarlo.\n\nSin IC, la junta NO puede evaluar riesgo. Y si no pueden evaluar riesgo, toman malas decisiones.\n\n📚 Concepto: Toda estimacion puntual es solo la mitad de la historia. El IC completa el cuadro mostrando QUE TAN CONFIABLE es cada estimacion. Un buen analista NUNCA presenta un numero sin su margen de error.",
          next: null
        },
        {
          id: "C",
          label: "Enfocarse solo en ventas porque es lo que le importa a la junta",
          description: "A la junta le importa la plata. Presentas un analisis profundo SOLO de ventas con proyeccion anual, IC, escenarios y TCL. Los otros KPIs los dejas como bullet points.",
          cost: 8000000,
          revenue: 12000000,
          bsc: { bsc_internal: 2, bsc_customer: -2, bsc_financial: 3, bsc_learning: 0 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: -3 }, narrative: "Los problemas de calidad y la diferencia de costos entre turnos quedan sin atencion por falta de visibilidad en la junta." }
          ],
          tags: ["partial", "finance-focused"],
          feedback: "⚠️ DECISION MIOPE\n\nSolo presentar ventas ignora que los KPIs estan INTERCONECTADOS:\n\n• Si defectos suben de 3.6% a 5.2% → reproceso sube → costos suben → margen baja\n• Si satisfaccion baja de 78% a 73% → ventas del proximo trimestre caen\n• Si turno noche cuesta $7M mas → y no se corrige → 12 meses × $7M = $84M perdidos\n\nLa interconexion se demuestra estadisticamente:\n\nCorrelacion estimada defectos <-> satisfaccion:\nSi p_defectos sube 1%, p_satisfaccion baja ~2-3 puntos\n\nImpacto de costos en margen:\nMargen estimado = Ventas - Costos. Si Var(Costos) = 208 (turnos), esa variabilidad se TRANSMITE al margen.\n\nUn dashboard INTEGRADO muestra estas conexiones. Un reporte solo de ventas las esconde.\n\n📚 Concepto: Pensamiento sistemico en estadistica. Los KPIs no viven aislados. Proporcion de defectos afecta satisfaccion, que afecta ventas, que afecta margen. Un buen modelo integra estimaciones de multiples variables con sus respectivos IC y analiza las dependencias.",
          next: null
        },
        {
          id: "D",
          label: "Modelo predictivo de machine learning con los datos historicos",
          description: "Entrenas un modelo de regresion multiple con 36 meses de datos para predecir ventas, costos y margen del proximo trimestre. Le metes Random Forest y Neural Networks.",
          cost: 50000000,
          revenue: 50000000,
          bsc: { bsc_internal: 4, bsc_customer: 2, bsc_financial: -8, bsc_learning: 6 },
          crossEffects: [
            { area: "hr", bsc: { bsc_learning: 3 }, narrative: "El equipo de datos aprende herramientas de ML, pero el modelo no es interpretable para la junta." }
          ],
          tags: ["overengineered", "advanced"],
          feedback: "💡 DECISION EXCESIVA PARA EL CONTEXTO\n\nMachine Learning con 36 datos mensuales es como usar un Formula 1 para ir a la tienda:\n\n1. Tamano muestral insuficiente:\n• Random Forest necesita minimo cientos de observaciones\n• Neural Networks necesita miles\n• Con n=36, sobreajuste garantizado (memoriza los datos en vez de aprender patrones)\n\n2. No es interpretable:\n• La junta pregunta '¿por que el modelo dice $190M?' y tu respuesta es 'los pesos de las neuronas...' — NO sirve\n• Los IC y pruebas de hipotesis SON interpretables: 'Con 95% de confianza, las ventas estaran entre $165M y $205M'\n\n3. Costo desproporcionado:\n• $50M en consultoria de ML vs $15M en un buen analisis estadistico clasico\n• El ROI no justifica la complejidad\n\nEstadistica clasica (TCL, IC, pruebas de hipotesis) es MAS que suficiente para este problema. No todo necesita ML.\n\n📚 Concepto: Parsimonia. El mejor modelo no es el mas complejo, sino el mas simple que resuelve el problema. Con n=36, los metodos clasicos (IC, pruebas de hipotesis, SE) son robustos, interpretables y baratos. ML requiere muchos mas datos para ser util y confiable. Navaja de Occam aplicada a la estadistica.",
          next: null
        }
      ]
    }

  }
};
