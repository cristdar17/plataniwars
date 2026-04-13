/* ============================================================
   TREE-MARKETING - Arbol de decisiones del CMO (Dir. Marketing)
   PlataniWars: Simulador Gerencial Estadistico
   ============================================================ */
window.TREE_MARKETING = {
  name: "Marketing",
  icon: "📢",
  startNode: "mkt-01",
  nodes: {

    /* --------------------------------------------------------
       MKT-01 | Dia 1 | Proporcion muestral, IC para proporcion
       -------------------------------------------------------- */
    "mkt-01": {
      id: "mkt-01",
      day: 1,
      title: "Lanzamiento de platanitos de maduro",
      context: "Tu equipo de innovacion desarrollo platanitos de platano maduro — dulces y crocantes. Nadie en el Eje Cafetero los vende. Pero antes de meter $80M en produccion y empaque, necesitas saber si la gente los compraria.\n\nHiciste una degustacion en la Plaza de Bolivar de Pereira:\n\n📊 DATOS DE LA DEGUSTACION:\n• Personas que probaron: 180\n• Dijeron 'si lo compraria': 126\n• Dijeron 'no lo compraria': 54\n• Proporcion favorable: p̂ = 126/180 = 0.70 (70%)\n\nEl jefe de producto dice que con 70% de aceptacion, es un exito seguro. ¿Lanzas el producto?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Lanzar con precaucion - produccion limitada",
          description: "Los datos son buenos pero no perfectos. Lanzar un lote piloto de 5,000 paquetes para probar el mercado real.",
          cost: 20000000,
          revenue: 15000000,
          bsc: { bsc_internal: 5, bsc_customer: 6, bsc_financial: 2, bsc_learning: 7 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: 3 }, narrative: "Operaciones ajusta una linea para el lote piloto de maduro sin alterar la produccion principal." }
          ],
          tags: ["prudent", "data-driven"],
          feedback: "✅ DECISION ACERTADA\n\nIC al 95% para la proporcion de aceptacion:\np̂ = 0.70\nSE = √(p̂(1-p̂)/n) = √(0.70 × 0.30 / 180) = √(0.001167) = 0.03416\nIC = 0.70 ± 1.96 × 0.03416 = 0.70 ± 0.067\nIC = [0.633, 0.767] = [63.3%, 76.7%]\n\nIncluso en el escenario pesimista (63.3%), la aceptacion es buena. Pero un lote piloto confirma si 'decir que compraria' se traduce en COMPRAR de verdad.\n\nOjo: degustacion gratis ≠ compra real. La proporcion de compra real suele ser 30-50% de la intencion declarada.\n\n📚 Concepto: IC para proporcion. p̂ ± Z × √(p̂(1-p̂)/n). El IC te da el rango de la aceptacion real. Pero cuidado con el sesgo de cortesia: la gente dice 'si' mas facil cuando prueba gratis.",
          next: "mkt-02"
        },
        {
          id: "B",
          label: "Lanzamiento masivo - meter los $80M",
          description: "70% de aceptacion es altisimo. Produccion a toda maquina. Primero en el mercado gana.",
          cost: 80000000,
          revenue: 45000000,
          bsc: { bsc_internal: -3, bsc_customer: 4, bsc_financial: -8, bsc_learning: -2 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -5 }, narrative: "La inversion de $80M en un producto no probado en mercado real presiona fuertemente el flujo de caja." },
            { area: "operations", bsc: { bsc_internal: -4 }, narrative: "La linea de produccion se reestructura de emergencia para el lanzamiento masivo." }
          ],
          tags: ["risky", "aggressive"],
          feedback: "❌ DECISION DEMASIADO AGRESIVA\n\nEl IC es [63.3%, 76.7%] — buena aceptacion, si. Pero hay problemas:\n\n1. SESGO DE SELECCION: la muestra es de la Plaza de Bolivar, un lugar concurrido. No representa al consumidor que compra en D1 o en la tienda del barrio.\n\n2. SESGO DE CORTESIA: la gente dice 'si' a algo gratis. La tasa de conversion real (degustacion → compra) suele ser 30-50%.\n\n3. Aceptacion real estimada: 70% × 0.40 = 28% de conversion. ¿Justifica $80M?\n\n📚 Concepto: Proporcion muestral y sus limitaciones. p̂ estima p, pero SOLO si la muestra es representativa y la pregunta no tiene sesgo. Una degustacion gratis viola ambos supuestos.",
          next: "mkt-02"
        },
        {
          id: "C",
          label: "Cancelar - 30% de rechazo es mucho",
          description: "Si 54 de 180 personas no lo comprarian, eso es 1 de cada 3. Demasiado riesgo para un producto nuevo.",
          cost: 0,
          revenue: 0,
          bsc: { bsc_internal: -2, bsc_customer: -5, bsc_financial: 2, bsc_learning: -5 },
          crossEffects: [],
          tags: ["risk-averse", "wrong-interpretation"],
          feedback: "❌ DECISION BASADA EN MALA INTERPRETACION\n\n30% de rechazo en una degustacion es NORMAL y hasta bueno. Ningun producto tiene 100% de aceptacion.\n\nPara referencia:\n• Coca-Cola Zero cuando se lanzo: ~60% de aceptacion\n• Platanitos de limon (otro sabor nuevo): ~55% de aceptacion\n• Tu producto: 70% de aceptacion [IC: 63.3% - 76.7%]\n\nEl IC muestra que incluso en el peor caso, 63% acepta el producto. Eso esta por encima del benchmark de la industria de snacks (55-60% para productos nuevos).\n\n📚 Concepto: Contexto del IC. Un numero aislado (30% rechazo) asusta, pero en contexto (vs benchmark) es excelente. Siempre compara tu proporcion con el estandar de la industria.",
          next: "mkt-02"
        },
        {
          id: "D",
          label: "Repetir la degustacion en otras ciudades",
          description: "Pereira no es todo el Eje Cafetero. Hacer degustaciones en Armenia, Manizales y Dosquebradas.",
          cost: 12000000,
          revenue: 0,
          bsc: { bsc_internal: 3, bsc_customer: 2, bsc_financial: -2, bsc_learning: 8 },
          crossEffects: [],
          tags: ["thorough", "analytical"],
          feedback: "💡 DECISION VALIOSA PARA LA REPRESENTATIVIDAD\n\nPeeira sola NO representa al Eje Cafetero. Al agregar Armenia, Manizales y Dosquebradas:\n• Reduces sesgo de seleccion geografico\n• Capturas preferencias de diferentes mercados\n• Puedes comparar proporciones entre ciudades\n\nSi Pereira da p̂₁ = 0.70 y Manizales da p̂₂ = 0.55, la diferencia podria indicar que el producto funciona mejor en ciertas zonas.\n\nPero cuidado: $12M para degustaciones es caro. Podrias lograr representatividad con muestreo estratificado (cuotas por ciudad) en una sola ronda.\n\n📚 Concepto: Representatividad de la muestra. Un IC preciso con muestra no representativa sigue dando una conclusion errada. La representatividad importa tanto como el tamano de muestra.",
          next: "mkt-02"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-02 | Dia 4 | Diferencia de proporciones (dos muestras)
       -------------------------------------------------------- */
    "mkt-02": {
      id: "mkt-02",
      day: 4,
      title: "Reconocimiento de marca: nosotros vs la competencia",
      context: "El equipo de inteligencia de mercado hizo un estudio de reconocimiento de marca en Pereira y Dosquebradas. Pararon gente en la calle y preguntaron: '¿Conoce la marca [nombre]?'\n\n📊 DATOS:\nTu marca (Don Pacho / PlataniMax):\n• n₁ = 250 personas encuestadas\n• 165 la reconocen\n• p̂₁ = 165/250 = 0.66 (66%)\n\nMarca rival:\n• n₂ = 250 personas encuestadas\n• 190 la reconocen\n• p̂₂ = 190/250 = 0.76 (76%)\n\nDiferencia: el rival te gana por 10 puntos porcentuales. El director general quiere saber si la diferencia es real o si 'fue la muestra'.",
      type: "choice",
      options: [
        {
          id: "A",
          label: "La diferencia es real - invertir en branding urgente",
          description: "10 puntos de diferencia en reconocimiento es grave. Campana agresiva en redes, radio y vallas.",
          cost: 35000000,
          revenue: 12000000,
          bsc: { bsc_internal: 3, bsc_customer: 8, bsc_financial: -5, bsc_learning: 5 },
          crossEffects: [],
          tags: ["proactive", "data-driven"],
          feedback: "✅ DECISION BIEN FUNDAMENTADA\n\nDiferencia de proporciones:\np̂₁ - p̂₂ = 0.66 - 0.76 = -0.10\n\nError estandar de la diferencia:\nSE = √(p̂₁(1-p̂₁)/n₁ + p̂₂(1-p̂₂)/n₂)\nSE = √(0.66×0.34/250 + 0.76×0.24/250)\nSE = √(0.000898 + 0.000730) = √0.001628 = 0.04035\n\nZ = -0.10 / 0.04035 = -2.478\nP(Z < -2.478) = 0.0066 (0.66%)\n\nLa diferencia es ESTADISTICAMENTE SIGNIFICATIVA (p < 0.01). El rival genuinamente tiene mayor reconocimiento.\n\nIC 95% para la diferencia: -0.10 ± 1.96 × 0.04035 = [-0.179, -0.021]\nTraduccion: el rival te gana entre 2.1 y 17.9 puntos porcentuales.\n\n📚 Concepto: Diferencia de proporciones. SE = √(p̂₁q̂₁/n₁ + p̂₂q̂₂/n₂). Con Z = -2.48 y p < 0.01, la diferencia no es ruido muestral — es real.",
          next: "mkt-03"
        },
        {
          id: "B",
          label: "Fue la muestra - no preocuparse",
          description: "250 personas un sabado en la calle no representan nada. El rival tiene mas tiempo en el mercado, es normal.",
          cost: 0,
          revenue: 0,
          bsc: { bsc_internal: -5, bsc_customer: -8, bsc_financial: 2, bsc_learning: -6 },
          crossEffects: [],
          tags: ["dismissive"],
          feedback: "❌ DECISION EQUIVOCADA\n\nCon n₁ = n₂ = 250 y Z = -2.478 (p = 0.0066), la probabilidad de que esta diferencia sea solo 'ruido muestral' es menos del 1%.\n\nDecir 'es normal porque el rival tiene mas tiempo' puede ser una EXPLICACION valida, pero no cambia el HECHO: te estan ganando en reconocimiento. Una explicacion no es una solucion.\n\n250 personas es un tamano de muestra mas que adecuado para proporciones. El margen de error individual es ±6%, y la diferencia observada (10pp) supera ese margen.\n\n📚 Concepto: n=250 es robusto para proporciones. El margen de error es ±1.96×√(p(1-p)/250) ≈ ±6%. Una diferencia de 10pp con ambas muestras de 250 es detectableconfiablemente.",
          next: "mkt-03"
        },
        {
          id: "C",
          label: "Investigar DONDE nos reconocen menos y enfocar ahi",
          description: "No es solo saber que nos ganan, sino DONDE. ¿En que barrios, edades, NSE somos debiles?",
          cost: 15000000,
          revenue: 8000000,
          bsc: { bsc_internal: 6, bsc_customer: 7, bsc_financial: -1, bsc_learning: 10 },
          crossEffects: [
            { area: "analyst", bsc: { bsc_learning: 4 }, narrative: "El estudio segmentado genera datos valiosos para el area de analisis." }
          ],
          tags: ["strategic", "analytical"],
          feedback: "✅ EXCELENTE DECISION ESTRATEGICA\n\nLa diferencia global es significativa (Z = -2.48). Pero segmentar permite focalizar:\n\nSi en estrato 3-4 tu reconocimiento es 75% y el rival 72% (diferencia no significativa), pero en estrato 1-2 tu reconocimiento es 50% vs rival 82% (diferencia enorme), sabes exactamente donde invertir.\n\nCada segmento tiene su propia prueba de diferencia de proporciones. El marketing eficiente no es gastar mas, es gastar DONDE el gap es mayor.\n\n📚 Concepto: Analisis estratificado de proporciones. La diferencia global puede ocultar heterogeneidad. Segmentar por grupos relevantes te da informacion accionable.",
          next: "mkt-03"
        },
        {
          id: "D",
          label: "Copiar la estrategia de marketing del rival",
          description: "Si el rival tiene 76% de reconocimiento, algo esta haciendo bien. Observar y replicar.",
          cost: 5000000,
          revenue: 5000000,
          bsc: { bsc_internal: -3, bsc_customer: 2, bsc_financial: 1, bsc_learning: -4 },
          crossEffects: [],
          tags: ["reactive", "imitative"],
          feedback: "⚠️ DECISION PEREZOSA\n\nCopiar no te diferencia. Si ambos hacen lo mismo, el rival mantiene su ventaja de 10pp porque ya esta posicionado.\n\nAdemas, no sabes POR QUE tiene 76%. Podria ser:\n• Lleva mas anos en el mercado (imposible de copiar)\n• Tiene mejor distribucion (problema de operaciones, no marketing)\n• Su nombre es mas memorable (dificil de replicar)\n\nCorrelacion entre 'hacer lo mismo que el rival' y 'alcanzar su reconocimiento' es CERO si la causa es tiempo de mercado.\n\n📚 Concepto: Correlacion no implica causalidad. El rival tiene alto reconocimiento Y cierta estrategia, pero la estrategia puede no ser la CAUSA del reconocimiento. Investigar antes de copiar.",
          next: "mkt-03"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-03 | Dia 7 | Tamano de muestra SIN piloto (p=0.5 conservador)
       -------------------------------------------------------- */
    "mkt-03": {
      id: "mkt-03",
      day: 7,
      title: "Estudio de empaque ecologico",
      context: "Estas evaluando si cambiar el empaque de plastico a material biodegradable. Es mas caro ($200 mas por paquete) pero podria atraer al consumidor 'verde'.\n\nAntes de invertir, quieres saber que proporcion de consumidores del Eje Cafetero PAGARIAN mas por un empaque ecologico. No tienes datos previos — nunca se ha estudiado esto en la region.\n\n📊 PARAMETROS DEL ESTUDIO:\n• Margen de error deseado: ±4 puntos porcentuales\n• Nivel de confianza: 95%\n• Proporcion esperada: DESCONOCIDA (no hay piloto)\n• Costo por encuesta: $8,000\n• Presupuesto disponible: $5,000,000\n\n¿Como disenas el estudio?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Usar p = 0.5 (conservador) y calcular n",
          description: "Sin datos previos, asumir 50/50 da el tamano de muestra maximo. Seguro pero caro.",
          cost: 4808000,
          revenue: 0,
          bsc: { bsc_internal: 5, bsc_customer: 3, bsc_financial: -1, bsc_learning: 10 },
          crossEffects: [],
          tags: ["data-driven", "conservative"],
          feedback: "✅ DECISION CORRECTA\n\nSin informacion previa, p = 0.5 maximiza p(1-p) = 0.25, dando el n mas grande (conservador):\n\nn = Z² × p(1-p) / E² = 1.96² × 0.5 × 0.5 / 0.04²\nn = 3.8416 × 0.25 / 0.0016\nn = 0.9604 / 0.0016 = 600.25 ≈ 601\n\nCosto: 601 × $8,000 = $4,808,000 (cabe en el presupuesto de $5M)\n\n¿Por que p = 0.5? Porque es el valor que MAXIMIZA la varianza p(1-p). Cualquier otro valor de p daria un n menor:\n• p = 0.3: n = 1.96² × 0.3 × 0.7 / 0.04² = 504\n• p = 0.5: n = 601 (maximo)\n• p = 0.7: n = 504\n\nUsando p = 0.5 garantizas que, sea cual sea la proporcion real, tu margen de error sera ≤ ±4%.\n\n📚 Concepto: Tamano de muestra conservador con p = 0.5. Cuando no hay piloto, p = 0.5 es la eleccion segura porque da el n maximo. Nunca subestimaras el tamano necesario.",
          next: "mkt-04"
        },
        {
          id: "B",
          label: "Estimar p = 0.3 basado en intuicion",
          description: "En Colombia, la gente no paga mas por ecologico. Asumir 30% y calcular un n menor.",
          cost: 4032000,
          revenue: 0,
          bsc: { bsc_internal: -3, bsc_customer: 0, bsc_financial: 1, bsc_learning: -5 },
          crossEffects: [],
          tags: ["biased", "cheap"],
          feedback: "❌ DECISION BASADA EN SUPUESTO NO VERIFICADO\n\nSi asumes p = 0.3:\nn = 1.96² × 0.3 × 0.7 / 0.04² = 504\nCosto: 504 × $8,000 = $4,032,000\n\nAhorras $776,000 vs el conservador. PERO:\n\nSi la proporcion real resulta ser 0.50 (no 0.30), tu margen de error real seria:\nE = 1.96 × √(0.5 × 0.5 / 504) = 1.96 × 0.02228 = 0.0437 = ±4.37%\n\nExcede tu meta de ±4%. Tu estudio NO cumple la precision prometida.\n\nEl problema de usar intuicion como p: si te equivocas, el estudio es INVALIDO.\n\n📚 Concepto: Riesgo de asumir p sin datos. Si p_real > p_asumido, la muestra es insuficiente y el margen de error excede lo permitido. Por eso p = 0.5 es la opcion segura cuando no hay piloto.",
          next: "mkt-04"
        },
        {
          id: "C",
          label: "Hacer un piloto de 50 personas primero",
          description: "Invertir poco en un piloto para estimar p, y luego calcular el n definitivo con esa p.",
          cost: 5000000,
          revenue: 0,
          bsc: { bsc_internal: 4, bsc_customer: 0, bsc_financial: -2, bsc_learning: 8 },
          crossEffects: [],
          tags: ["two-stage", "smart"],
          feedback: "💡 BUENA IDEA PERO CUIDADO CON EL PRESUPUESTO\n\nPiloto: 50 × $8,000 = $400,000\nSupon que el piloto da p̂ = 0.35\nn_definitivo = 1.96² × 0.35 × 0.65 / 0.04² = 546\nMuestra adicional: 546 - 50 = 496 encuestas\nCosto adicional: 496 × $8,000 = $3,968,000\nTotal: $400,000 + $3,968,000 = $4,368,000\n\nAhorro vs conservador: $440,000. ¿Vale la pena la complejidad logistica de dos etapas por $440K?\n\nSi el piloto da p̂ = 0.5, no ahorras NADA y gastaste $400K extra en logistica.\n\n📚 Concepto: Muestreo en dos etapas. El piloto da informacion para optimizar la segunda etapa. Pero tiene costo fijo y solo ahorra mucho si p esta lejos de 0.5. Si p ≈ 0.5, el piloto fue un gasto innecesario.",
          next: "mkt-04"
        },
        {
          id: "D",
          label: "Encuestar 200 personas y ya - lo que salga",
          description: "200 es un buen numero. No necesitamos formulas, con 200 se ve la tendencia.",
          cost: 1600000,
          revenue: 0,
          bsc: { bsc_internal: -6, bsc_customer: 0, bsc_financial: 3, bsc_learning: -8 },
          crossEffects: [],
          tags: ["arbitrary", "insufficient"],
          feedback: "❌ DECISION SIN FUNDAMENTO ESTADISTICO\n\nCon n = 200 y p = 0.5:\nMargen de error = 1.96 × √(0.5 × 0.5 / 200) = 1.96 × 0.03536 = ±6.93%\n\nCasi el DOBLE de tu meta de ±4%. El resultado seria algo como:\n'Entre el 33% y el 47% pagaria mas por empaque ecologico.'\n\nEse rango es tan amplio que no te dice si vale la pena o no el cambio. Podria ser 33% (no vale) o 47% (si vale). Gastaste $1.6M para no saber nada.\n\n📚 Concepto: Tamano de muestra arbitrario vs calculado. Elegir n 'porque suena bien' da precision arbitraria. La formula n = Z²p(1-p)/E² te garantiza la precision que necesitas.",
          next: "mkt-04"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-04 | Dia 11 | Correccion por poblacion finita
       -------------------------------------------------------- */
    "mkt-04": {
      id: "mkt-04",
      day: 11,
      title: "Expansion a un pueblo pequeno",
      context: "Quieres expandirte a Marsella (Risaralda), un pueblo cafetero de 32,000 habitantes. Antes de montar distribucion, necesitas saber que proporcion de hogares consume platanitos regularmente.\n\nEl alcalde te ofrece un censo parcial de hogares:\n\n📊 DATOS:\n• Total hogares en Marsella: 8,200\n• Presupuesto para encuesta: $3,200,000\n• Costo por hogar encuestado: $12,000\n• Encuestas posibles: 3,200,000 / 12,000 = 266 hogares\n• Meta: margen de error ≤ ±5% con 95% de confianza\n• Proporcion esperada: desconocida (usar p = 0.5)\n\n¿266 hogares son suficientes?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Si, 266 es suficiente - incluso sobra con la correccion por poblacion finita",
          description: "La formula da n = 385 para poblacion infinita, pero Marsella tiene solo 8,200 hogares. Con la correccion, 266 puede bastar.",
          cost: 3192000,
          revenue: 0,
          bsc: { bsc_internal: 6, bsc_customer: 4, bsc_financial: 2, bsc_learning: 10 },
          crossEffects: [],
          tags: ["data-driven", "efficient"],
          feedback: "⚠️ VEAMOS SI ES CIERTO\n\nSin correccion (poblacion infinita):\nn₀ = 1.96² × 0.5 × 0.5 / 0.05² = 384.16 ≈ 385\n\nCon correccion por poblacion finita (N = 8,200):\nn = n₀ / (1 + (n₀ - 1)/N) = 385 / (1 + 384/8200)\nn = 385 / 1.04683 = 367.7 ≈ 368\n\n266 < 368. NO es suficiente. Te faltan 102 encuestas.\n\nCon n = 266, tu margen de error real seria:\nE = 1.96 × √(0.5×0.5/266) × √((8200-266)/(8200-1))\nE = 1.96 × 0.03067 × √(0.9676) = 1.96 × 0.03067 × 0.9837\nE = 0.0591 = ±5.91%\n\nExcede tu meta de ±5%.\n\n📚 Concepto: Correccion por poblacion finita. n_corr = n₀/(1 + (n₀-1)/N). Reduce el n necesario cuando la muestra es proporcion grande de N. Pero la reduccion aqui es solo de 385 a 368 (poblacion de 8,200 es 'grande').",
          next: "mkt-05"
        },
        {
          id: "B",
          label: "No, necesito mas presupuesto - pedir $4,500,000",
          description: "Hacer los calculos bien: necesito 368 hogares × $12,000 = $4,416,000. Pedir un poco mas de presupuesto.",
          cost: 4416000,
          revenue: 0,
          bsc: { bsc_internal: 8, bsc_customer: 5, bsc_financial: -2, bsc_learning: 12 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -1 }, narrative: "Marketing solicita ampliacion de presupuesto de investigacion." }
          ],
          tags: ["precise", "professional"],
          feedback: "✅ DECISION CORRECTA\n\nn₀ = 385 (poblacion infinita)\nn_corr = 385 / (1 + 384/8200) = 368 hogares\nCosto: 368 × $12,000 = $4,416,000\n\nLa correccion por poblacion finita ahorro:\n385 - 368 = 17 hogares = $204,000 de ahorro\n\nNo es enorme porque N = 8,200 es relativamente grande vs n₀ = 385 (n₀/N = 4.7%).\n\nLa correccion importa MUCHO cuando n₀/N es grande:\n• n₀/N = 5%: correccion reduce ~5%\n• n₀/N = 20%: correccion reduce ~17%\n• n₀/N = 50%: correccion reduce ~33%\n\n📚 Concepto: Factor de correccion por poblacion finita = √((N-n)/(N-1)). Se aplica cuando n/N > 5%. Reduce variabilidad porque una muestra grande de poblacion pequena 'cubre' proporcion significativa.",
          next: "mkt-05"
        },
        {
          id: "C",
          label: "Encuestar solo 100 hogares - es un pueblo chiquito",
          description: "Marsella es un pueblo. 100 hogares ya es mas del 1% de la poblacion. Con eso basta.",
          cost: 1200000,
          revenue: 0,
          bsc: { bsc_internal: -5, bsc_customer: -2, bsc_financial: 3, bsc_learning: -7 },
          crossEffects: [],
          tags: ["insufficient", "wrong-logic"],
          feedback: "❌ DECISION CON LOGICA INCORRECTA\n\nEl argumento '1% de la poblacion es suficiente' es un MITO estadistico.\n\nCon n = 100:\nE = 1.96 × √(0.5×0.5/100) × √((8200-100)/(8200-1))\nE = 1.96 × 0.05 × 0.9939 = 0.0974 = ±9.74%\n\nCasi el doble de tu meta (±5%). Un resultado como 'entre 40% y 60% consume platanitos' no te sirve para decidir.\n\nEl tamano de muestra necesario depende del MARGEN DE ERROR deseado y de la variabilidad, NO del porcentaje de la poblacion.\n\n📚 Concepto: El tamano de muestra NO depende del tamano de la poblacion (excepto la correccion por poblacion finita, que es menor). n = 385 es necesario para ±5% ya sea en Marsella (8,200) o en Bogota (3,000,000).",
          next: "mkt-05"
        },
        {
          id: "D",
          label: "Encuestar a TODOS los 8,200 hogares (censo)",
          description: "Es un pueblo chiquito. Hacemos censo y punto. Cero incertidumbre.",
          cost: 98400000,
          revenue: 0,
          bsc: { bsc_internal: 5, bsc_customer: 3, bsc_financial: -15, bsc_learning: -3 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -8 }, narrative: "El gasto de $98M en un censo de un pueblo de 32,000 habitantes es desproporcional." }
          ],
          tags: ["wasteful", "perfectionist"],
          feedback: "💡 TECNICAMENTE PERFECTO, FINANCIERAMENTE ABSURDO\n\n8,200 hogares × $12,000 = $98,400,000\n\nVs la muestra de 368 hogares × $12,000 = $4,416,000\n\nEstas pagando $94M EXTRA por pasar de ±5% a ±0% de error. Ese dinero es mas que lo que ganaras vendiendo platanitos en Marsella en un ano.\n\nLa estadistica inferencial EXISTE para evitar esto: con 368 hogares (4.5% de la poblacion) obtienes precision de ±5% a 1/22 del costo.\n\n📚 Concepto: Censo vs muestreo. El muestreo con correccion por poblacion finita te da precision suficiente a una fraccion del costo. El censo se justifica cuando el costo por unidad es muy bajo o cuando necesitas datos a nivel individual.",
          next: "mkt-05"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-05 | Dia 16 | SE como medida de riesgo, comparacion de estrategias
       -------------------------------------------------------- */
    "mkt-05": {
      id: "mkt-05",
      day: 16,
      title: "Estrategia de riesgo: ¿campana segura o arriesgada?",
      context: "Tienes presupuesto para UNA campana publicitaria grande. Tu agencia de publicidad te presenta dos opciones:\n\n📊 CAMPANA A — 'Tradicion' (Radio + perifoneo + tiendas):\n• Basada en 30 campanas similares de la agencia\n• Retorno promedio: $45M\n• Desviacion estandar: $8M\n• Error estandar: SE = 8/√30 = $1.46M\n\n📊 CAMPANA B — 'Viral' (TikTok + influencers + reto platanito):\n• Basada en 12 campanas similares\n• Retorno promedio: $62M\n• Desviacion estandar: $28M\n• Error estandar: SE = 28/√12 = $8.08M\n\nLa campana viral promete mas pero con mucha mas variabilidad. ¿Cual eliges?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Campana A - Tradicion (segura)",
          description: "Retorno estable, error estandar bajo, riesgo controlado. En negocio de alimentos, la consistencia gana.",
          cost: 30000000,
          revenue: 45000000,
          bsc: { bsc_internal: 5, bsc_customer: 5, bsc_financial: 5, bsc_learning: 2 },
          crossEffects: [],
          tags: ["conservative", "safe"],
          feedback: "✅ DECISION SOLIDA\n\nIC 95% del retorno esperado:\nCampana A: $45M ± 1.96 × $1.46M = [$42.1M, $47.9M]\nCampana B: $62M ± 1.96 × $8.08M = [$46.2M, $77.8M]\n\nCampana A: rango de $5.8M (muy predecible)\nCampana B: rango de $31.6M (alta incertidumbre)\n\nEl SE de la Campana A ($1.46M) es 5.5x mas bajo que el de B ($8.08M). Esto significa que la estimacion del retorno de A es mucho mas CONFIABLE.\n\nAunque B promete mas, podria dar tan poco como $46M (apenas mas que A) o tanto como $78M. Con A sabes que obtendras entre $42M y $48M. Para una empresa que necesita predecibilidad, A es la eleccion racional.\n\n📚 Concepto: SE como medida de riesgo. Menor SE = mayor precision en la estimacion = menor incertidumbre = menor riesgo. En finanzas y marketing, el SE es analogamente una medida de riesgo.",
          next: "mkt-06"
        },
        {
          id: "B",
          label: "Campana B - Viral (arriesgada)",
          description: "$62M vs $45M — $17M mas de retorno esperado. El riesgo vale la pena.",
          cost: 30000000,
          revenue: 62000000,
          bsc: { bsc_internal: 2, bsc_customer: 8, bsc_financial: 3, bsc_learning: 5 },
          crossEffects: [],
          tags: ["risky", "high-reward"],
          feedback: "⚠️ DECISION VALIENTE PERO RIESGOSA\n\nEl retorno esperado es $17M mayor. Pero miremos el riesgo:\n\nCoeficiente de variacion (CV = σ/X̄):\nCV_A = 8/45 = 0.178 (17.8%)\nCV_B = 28/62 = 0.452 (45.2%)\n\nB tiene 2.5x mas riesgo relativo que A.\n\nProbabilidad de que B rinda MENOS que el promedio de A:\nP(B < 45) = P(Z < (45-62)/28) = P(Z < -0.607) = 0.272 = 27.2%\n\nHay 27% de probabilidad de que la campana viral rinda MENOS que la campana segura. ¿Estas dispuesto a aceptar ese riesgo?\n\n📚 Concepto: Relacion riesgo-retorno. Mayor retorno esperado generalmente viene con mayor variabilidad (riesgo). El SE y el CV te permiten comparar el riesgo entre alternativas.",
          next: "mkt-06"
        },
        {
          id: "C",
          label: "Dividir presupuesto: 60% Tradicion, 40% Viral",
          description: "No apostar todo a una sola carta. Diversificar el riesgo.",
          cost: 30000000,
          revenue: 52000000,
          bsc: { bsc_internal: 4, bsc_customer: 6, bsc_financial: 4, bsc_learning: 6 },
          crossEffects: [],
          tags: ["balanced", "diversified"],
          feedback: "💡 DECISION DE DIVERSIFICACION\n\nRetorno esperado ponderado:\nE(mezcla) = 0.6 × $45M + 0.4 × $62M = $27M + $24.8M = $51.8M\n\nVarianza ponderada (asumiendo independencia):\nVar(mezcla) = 0.6² × 8² + 0.4² × 28² = 0.36 × 64 + 0.16 × 784\n= 23.04 + 125.44 = 148.48\nσ(mezcla) = √148.48 = $12.19M\n\nSE(mezcla) mucho menor que si fuera 100% Viral ($28M), pero mayor que 100% Tradicion ($8M).\n\nRetorno/Riesgo:\nA pura: 45/8 = 5.63\nB pura: 62/28 = 2.21\nMezcla: 51.8/12.19 = 4.25\n\nLa mezcla tiene mejor ratio retorno/riesgo que B pura.\n\n📚 Concepto: Diversificacion y varianzas. Cuando combinas estrategias independientes, la varianza total es la suma ponderada de varianzas. Diversificar reduce el riesgo total sin reducir proporcionalmente el retorno.",
          next: "mkt-06"
        },
        {
          id: "D",
          label: "No hacer ninguna - guardar el presupuesto",
          description: "El mercado esta inestable. Mejor guardar la plata y esperar mejor momento.",
          cost: 0,
          revenue: 0,
          bsc: { bsc_internal: -3, bsc_customer: -10, bsc_financial: 3, bsc_learning: -5 },
          crossEffects: [
            { area: "operations", bsc: { bsc_customer: -3 }, narrative: "Sin campana de marketing, las ventas bajan y operaciones tiene que reducir produccion." }
          ],
          tags: ["passive", "risk-averse"],
          feedback: "❌ DECISION POR PARALISIS\n\nIncluso la campana 'segura' (A) tiene IC de [$42M, $48M]. En el PEOR escenario, retorna $42M sobre una inversion de $30M = $12M de ganancia neta.\n\nNo invertir tiene retorno CERO y costo de oportunidad alto:\n• Pierdes posicionamiento de marca\n• El rival ocupa el espacio publicitario\n• Las ventas pueden caer sin soporte de marketing\n\nEl SE bajo de la Campana A ($1.46M) te dice que es casi seguro ganar dinero con ella. Dejar pasar eso por miedo es dejar que la incertidumbre te paralice.\n\n📚 Concepto: El costo de la inaccion. Cuando el IC de una opcion NO incluye valores negativos (toda la distribucion esta en ganancia), no actuar es estadisticamente suboptimo.",
          next: "mkt-06"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-06 | Dia 21 | Estimacion de demanda con datos muestrales
       -------------------------------------------------------- */
    "mkt-06": {
      id: "mkt-06",
      day: 21,
      title: "Alianza con supermercado D1",
      context: "D1 te ofrece un espacio premium en 45 tiendas del Eje Cafetero. Quieren un compromiso de volumen minimo: 3,000 paquetes/semana por tienda. Si no cumples, pierdes el espacio.\n\nPara decidir, estimaste la demanda en tiendas donde ya vendes:\n\n📊 DATOS DE DEMANDA SEMANAL POR TIENDA:\n• Muestra: 18 tiendas actuales (similares a D1)\n• Demanda promedio: 2,750 paquetes/semana\n• Desviacion estandar: 480 paquetes/semana\n\n¿Firmas la alianza con el compromiso de 3,000/semana?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "No firmar - los datos dicen que no alcanzamos",
          description: "Promedio de 2,750 contra compromiso de 3,000. Estamos cortos. No arriesgar.",
          cost: 0,
          revenue: 0,
          bsc: { bsc_internal: 3, bsc_customer: -5, bsc_financial: 2, bsc_learning: 5 },
          crossEffects: [],
          tags: ["cautious", "data-driven"],
          feedback: "✅ DECISION FUNDAMENTADA\n\nIC al 95% para la demanda promedio:\nSE = s/√n = 480/√18 = 113.14\nt₀.₀₂₅,₁₇ = 2.110 (n pequeno, usamos t)\nIC = 2,750 ± 2.110 × 113.14 = 2,750 ± 238.7\nIC = [2,511, 2,989]\n\nEl limite superior del IC (2,989) NO alcanza 3,000. Con 95% de confianza, la demanda real promedio esta por debajo de 3,000.\n\nProbabilidad de que la demanda promedio real sea ≥ 3,000:\nt = (3000 - 2750) / 113.14 = 2.21\nP(t > 2.21) con 17 gl ≈ 0.021 = 2.1%\n\nSolo 2.1% de probabilidad de cumplir el compromiso. Firmar seria una apuesta muy arriesgada.\n\n📚 Concepto: Estimacion de demanda con datos muestrales. El IC te dice si puedes cumplir compromisos. Cuando el valor comprometido queda FUERA del IC, la evidencia dice que no.",
          next: null
        },
        {
          id: "B",
          label: "Firmar - con buena promocion subimos la demanda",
          description: "2,750 es el promedio SIN estar en D1. Con la visibilidad de D1, la demanda sube seguro.",
          cost: 15000000,
          revenue: 40000000,
          bsc: { bsc_internal: -5, bsc_customer: 3, bsc_financial: -3, bsc_learning: -3 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: -4 }, narrative: "El compromiso de 3,000/semana por tienda × 45 tiendas = 135,000 paquetes semanales adicionales presiona la capacidad de planta." }
          ],
          tags: ["risky", "optimistic"],
          feedback: "❌ DECISION BASADA EN ESPERANZA, NO EN DATOS\n\n'Seguro que sube' no es un analisis. ¿Cuanto sube? ¿Hay datos que respalden ese 'seguro'?\n\nPara cumplir 3,000/semana, necesitas que la demanda suba un 9.1% = (3000-2750)/2750.\n\nSin datos de cuanto sube la demanda al entrar en D1, estas apostando a ciegas. El IC actual [2,511, 2,989] dice que ni el escenario optimista alcanza.\n\nSi firmas y no cumples en 45 tiendas, pierdes el espacio Y la inversion de posicionamiento.\n\n📚 Concepto: No mezclar estimaciones con deseos. El IC se basa en datos OBSERVADOS. Si crees que la demanda subira, necesitas datos de situaciones similares, no intuicion.",
          next: null
        },
        {
          id: "C",
          label: "Negociar compromiso de 2,500/semana en vez de 3,000",
          description: "Contraoferta: acepto el espacio pero con compromiso de 2,500. Eso si lo puedo cumplir con los datos.",
          cost: 5000000,
          revenue: 35000000,
          bsc: { bsc_internal: 7, bsc_customer: 6, bsc_financial: 6, bsc_learning: 8 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: 3 }, narrative: "El compromiso de 2,500/semana es manejable con la capacidad actual de la planta." }
          ],
          tags: ["negotiation", "data-driven"],
          feedback: "✅ DECISION OPTIMA\n\nIC al 95%: [2,511, 2,989]\n\nCon compromiso de 2,500:\nP(demanda real > 2,500):\nt = (2500 - 2750) / 113.14 = -2.21\nP(t > -2.21) con 17 gl ≈ 0.979 = 97.9%\n\nHay 97.9% de probabilidad de que la demanda promedio real supere 2,500. Puedes firmar con alta confianza.\n\nComparacion:\n• Compromiso 3,000: P(cumplir) = 2.1% (suicidio comercial)\n• Compromiso 2,750: P(cumplir) = 50% (moneda al aire)\n• Compromiso 2,500: P(cumplir) = 97.9% (apuesta segura)\n\n📚 Concepto: Usar el IC para negociar. El limite inferior del IC (2,511) te dice el minimo que puedes comprometer con alta confianza. Negociar cerca del limite inferior es inteligente.",
          next: null
        },
        {
          id: "D",
          label: "Pedir a D1 una prueba piloto de 5 tiendas primero",
          description: "Antes de comprometerse con 45 tiendas, probar en 5 para medir la demanda real en D1.",
          cost: 8000000,
          revenue: 10000000,
          bsc: { bsc_internal: 4, bsc_customer: 4, bsc_financial: 0, bsc_learning: 10 },
          crossEffects: [],
          tags: ["cautious", "experimental"],
          feedback: "💡 EXCELENTE PARA REDUCIR INCERTIDUMBRE\n\nCon 5 tiendas D1 durante, digamos, 8 semanas:\n• 5 × 8 = 40 observaciones de demanda semanal en D1\n• SE nuevo = s/√40 (mucho mas preciso)\n\nSi el piloto da X̄ = 2,900 con s = 350:\nSE = 350/√40 = 55.3\nIC 95% = [2,787, 3,013]\n\nAhora el IC INCLUYE 3,000. La decision de firmar las 45 tiendas seria mas informada.\n\nEl costo del piloto ($8M) es seguro contra la inversion. Si el piloto muestra que no alcanzas 3,000, perdiste $8M en vez de arriesgar $40M+.\n\n📚 Concepto: Reduccion de incertidumbre con datos. El piloto te da datos PROPIOS del canal D1 (no extrapolados de tiendas similares). Reduce el SE y puede cambiar la conclusion del IC.",
          next: null
        }
      ]
    }
  }
};
