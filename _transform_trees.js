const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'js');

const files = [
  'tree-operations.js',
  'tree-finance.js',
  'tree-marketing.js',
  'tree-hr.js',
  'tree-analyst.js',
];

const prefixes = ['ops', 'fin', 'mkt', 'hr', 'dat'];

// New nodes for each tree
const newNodes = {
  ops: `
    /* --------------------------------------------------------
       OPS-07 | Dia 15 | Planificacion de capacidad con distribucion normal
       -------------------------------------------------------- */
    "ops-07": {
      id: "ops-07",
      day: 15,
      title: "Lote urgente para D1",
      context: "D1 quiere 10.000 paquetes en 48 horas. Tu capacidad promedio es 4.500/dia con desviacion de 800.\\n\\n📊 DATOS:\\n• Capacidad diaria: \\u03bc=4500, \\u03c3=800\\n• Pedido: 10.000 en 2 dias\\n• Penalidad si no cumples: $30M",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Aceptar y meter turno extra",
          description: "Doble turno para cumplir. Cuesta mas pero aseguras el pedido grande.",
          cost: 12000000,
          revenue: 35000000,
          bsc: { bsc_financial: 8, bsc_customer: 10, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\\u2705 Buena jugada. Con turno extra la capacidad en 2 dias sube a ~10.500. P(cumplir) > 90%.\\n\\ud83d\\udcda Concepto: Suma de normales. Si X1 y X2 son normales independientes, X1+X2 ~ N(\\u03bc1+\\u03bc2, \\u03c31\\u00b2+\\u03c32\\u00b2).",
          next: "ops-08"
        },
        {
          id: "B",
          label: "Rechazar - muy arriesgado",
          description: "No alcanzamos con certeza. Mejor no prometer lo que no podemos cumplir.",
          cost: 0,
          revenue: 5000000,
          bsc: { bsc_financial: 3, bsc_customer: -5, bsc_internal: 4, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\\u26a0\\ufe0f Seguro pero perdiste $35M en ventas. P(cumplir sin turno extra) = P(X1+X2 > 10000) con \\u03bc=9000, \\u03c3=1131... apenas 19%.\\n\\ud83d\\udcda El riesgo era real pero manejable con turno extra.",
          next: "ops-08"
        },
        {
          id: "C",
          label: "Aceptar parcial: ofrecer 8.000 paquetes",
          description: "Contraoferta realista. 4.000 por dia es seguro y D1 recibe algo.",
          cost: 5000000,
          revenue: 22000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 5 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\u2705 Negociacion inteligente. P(producir 8000 en 2 dias) = P(X1+X2 > 8000) con \\u03bc=9000 \\u2248 81%. Muy factible.\\n\\ud83d\\udcda Concepto: Usar la distribucion normal para fijar compromisos realistas.",
          next: "ops-08"
        },
        {
          id: "D",
          label: "Aceptar y subcontratar el faltante",
          description: "Lo que no alcances, lo maquila un tercero. Mas caro pero cumples seguro.",
          cost: 18000000,
          revenue: 32000000,
          bsc: { bsc_financial: 5, bsc_customer: 8, bsc_internal: 3, bsc_learning: 4 },
          crossEffects: [],
          tags: ["creative"],
          feedback: "\\ud83d\\udca1 Pragmatico. Subcontratar cuesta mas por unidad pero garantiza cumplimiento al 100%.\\n\\ud83d\\udcda A veces reducir incertidumbre (\\u03c3\\u21920) vale mas que optimizar el costo esperado.",
          next: "ops-08"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-08 | Dia 17 | Valor esperado en mantenimiento
       -------------------------------------------------------- */
    "ops-08": {
      id: "ops-08",
      day: 17,
      title: "La maquina hace ruidos raros",
      context: "La empacadora principal empezo a vibrar. El tecnico dice que tiene 30% de probabilidad de fallar esta semana. Repararla ahora cuesta $8M; si falla en produccion, cuesta $40M.\\n\\n📊 DATOS:\\n• P(falla esta semana) = 0.30\\n• Costo preventivo: $8M\\n• Costo correctivo si falla: $40M",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Mantenimiento preventivo YA",
          description: "Parar 4 horas, reparar y seguir tranquilo. $8M y listo.",
          cost: 8000000,
          revenue: 25000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 10, bsc_learning: 5 },
          crossEffects: [],
          tags: ["proactive"],
          feedback: "\\u2705 E(costo de no reparar) = 0.30 \\u00d7 $40M = $12M. Reparar por $8M es mas barato que el valor esperado del dano.\\n\\ud83d\\udcda Concepto: Valor esperado. E(X) = \\u03a3 xi\\u00b7P(xi). Siempre compara costo seguro vs costo esperado.",
          next: "ops-09"
        },
        {
          id: "B",
          label: "Esperar y rezar",
          description: "70% de que NO falle. Me la juego.",
          cost: 0,
          revenue: 8000000,
          bsc: { bsc_financial: -3, bsc_customer: -4, bsc_internal: -6, bsc_learning: 3 },
          crossEffects: [],
          tags: ["risky"],
          feedback: "\\u274c E(costo) = 0.30 \\u00d7 $40M = $12M > $8M del preventivo. Jugaste a la ruleta rusa con la produccion.\\n\\ud83d\\udcda El valor esperado dice que esperar es mas caro en promedio.",
          next: "ops-09"
        },
        {
          id: "C",
          label: "Reducir velocidad al 50% mientras monitoreas",
          description: "Menos produccion pero menos estres en la maquina. Reduce P(falla) a 10%.",
          cost: 5000000,
          revenue: 18000000,
          bsc: { bsc_financial: 4, bsc_customer: 3, bsc_internal: 5, bsc_learning: 6 },
          crossEffects: [],
          tags: ["moderate"],
          feedback: "\\ud83d\\udca1 E(costo) ahora = 0.10 \\u00d7 $40M = $4M. Mas los $5M de produccion perdida = $9M total. Casi empata con reparar ($8M).\\n\\ud83d\\udcda Comparar valores esperados de multiples opciones es la clave.",
          next: "ops-09"
        },
        {
          id: "D",
          label: "Programar mantenimiento para el fin de semana",
          description: "No parar produccion hoy. Reparar sabado cuando no se produce.",
          cost: 10000000,
          revenue: 28000000,
          bsc: { bsc_financial: 5, bsc_customer: 6, bsc_internal: 7, bsc_learning: 4 },
          crossEffects: [],
          tags: ["strategic"],
          feedback: "\\u2705 Reparas sin perder produccion. Cuesta $2M mas (fin de semana) pero E(valor) sigue positivo.\\n\\ud83d\\udcda Optimizar CUANDO reparar tambien es una decision bajo incertidumbre.",
          next: "ops-09"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-09 | Dia 18 | Riesgo vs recompensa con incertidumbre
       -------------------------------------------------------- */
    "ops-09": {
      id: "ops-09",
      day: 18,
      title: "Proveedor ofrece descuento por volumen",
      context: "Tu proveedor de platano verde ofrece 20% de descuento si compras 3 meses de inventario de una vez. Pero el precio del platano varia y podrias perder si baja.\\n\\n📊 DATOS:\\n• Consumo mensual: 5 toneladas\\n• Precio actual: $2M/tonelada\\n• Precio con descuento (15 ton): $1.6M/ton\\n• Volatilidad historica del precio: \\u03c3 = $0.4M/ton",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Comprar las 15 toneladas con descuento",
          description: "Ahorro de $6M garantizado. El platano no se va a desplomar tanto.",
          cost: 24000000,
          revenue: 32000000,
          bsc: { bsc_financial: 8, bsc_customer: 4, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\\u2705 Ahorro = 15 \\u00d7 ($2M - $1.6M) = $6M. Para perder, el precio tendria que caer a < $1.6M. P(precio < $1.6) = P(Z < -1) = 16%.\\n\\ud83d\\udcda Concepto: El descuento es seguro; la caida de precio es incierta. Compara certeza vs probabilidad.",
          next: "ops-10"
        },
        {
          id: "B",
          label: "Comprar solo 1 mes - no arriesgar",
          description: "Seguir comprando mensual. Si el precio baja, compro mas barato despues.",
          cost: 10000000,
          revenue: 15000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: 4, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\\u26a0\\ufe0f Pierdes $6M de ahorro seguro por miedo a una baja que tiene solo 16% de probabilidad.\\n\\ud83d\\udcda Concepto: Aversion al riesgo excesiva puede ser costosa cuando los datos muestran ventaja clara.",
          next: "ops-10"
        },
        {
          id: "C",
          label: "Comprar 2 meses (10 ton) - termino medio",
          description: "Descuento del 15% por 10 toneladas. Menos riesgo, menos ahorro.",
          cost: 17000000,
          revenue: 24000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 5, bsc_learning: 5 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\ud83d\\udca1 Ahorro moderado con riesgo moderado. Diversificas temporalmente las compras.\\n\\ud83d\\udcda Concepto: No siempre es todo o nada. Distribuir el riesgo en el tiempo es una estrategia valida.",
          next: "ops-10"
        },
        {
          id: "D",
          label: "Negociar descuento del 10% por 1 mes grande",
          description: "Contraoferta: compro 7 toneladas este mes a 10% de descuento.",
          cost: 12600000,
          revenue: 20000000,
          bsc: { bsc_financial: 4, bsc_customer: 3, bsc_internal: 5, bsc_learning: 6 },
          crossEffects: [],
          tags: ["negotiation"],
          feedback: "\\ud83d\\udca1 Creativo. Menos descuento pero menos riesgo de almacenamiento y deterioro.\\n\\ud83d\\udcda Concepto: El riesgo no es solo precio — incluye almacenamiento, deterioro y costo de oportunidad.",
          next: "ops-10"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-10 | Dia 20 | Control de calidad y proporcion
       -------------------------------------------------------- */
    "ops-10": {
      id: "ops-10",
      day: 20,
      title: "INVIMA viene de visita",
      context: "Llego carta del INVIMA: inspeccion en 3 dias. Tu ultima muestra interna de 200 paquetes encontro 11 con problemas (5.5%). El limite legal es 5%.\\n\\n📊 DATOS:\\n• Muestra interna: n=200, defectos=11\\n• p\\u0302 = 0.055 (5.5%)\\n• Limite INVIMA: 5%\\n• Multa por incumplimiento: $50M",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Parar y corregir ANTES de la visita",
          description: "Recalibrar todo, hacer limpieza profunda, revisar protocolos. 2 dias de parada.",
          cost: 15000000,
          revenue: 30000000,
          bsc: { bsc_financial: 6, bsc_customer: 8, bsc_internal: 10, bsc_learning: 5 },
          crossEffects: [],
          tags: ["proactive"],
          feedback: "\\u2705 Con p\\u0302=5.5% y limite 5%, IC 95% = [2.3%, 8.7%]. El 5% esta DENTRO del IC, asi que podrias estar OK... o no.\\n\\ud83d\\udcda Concepto: IC para proporcion. Mejor prevenir cuando tu estimado supera el limite aunque no sea significativo.",
          next: "ops-11"
        },
        {
          id: "B",
          label: "No hacer nada - 5.5% esta cerca del 5%",
          description: "Es solo 0.5% arriba. Puede que la muestra del INVIMA salga bien.",
          cost: 0,
          revenue: 8000000,
          bsc: { bsc_financial: -4, bsc_customer: -6, bsc_internal: -8, bsc_learning: 3 },
          crossEffects: [],
          tags: ["risky"],
          feedback: "\\u274c Si INVIMA toma n=100, P(encontrar >5 defectos) es considerable. Con p real=5.5%, te juegas la multa de $50M.\\n\\ud83d\\udcda Concepto: La proporcion muestral varia. Tu 5.5% podria salir 7% en la muestra de INVIMA.",
          next: "ops-11"
        },
        {
          id: "C",
          label: "Hacer inspeccion interna masiva y descartar lotes malos",
          description: "Revisar los ultimos 5.000 paquetes, separar los defectuosos, reempacar.",
          cost: 10000000,
          revenue: 25000000,
          bsc: { bsc_financial: 5, bsc_customer: 7, bsc_internal: 8, bsc_learning: 4 },
          crossEffects: [],
          tags: ["thorough"],
          feedback: "\\u2705 Buena estrategia. Reduces la proporcion real de defectos en inventario antes de la visita.\\n\\ud83d\\udcda Concepto: Puedes cambiar el parametro poblacional (p real) con accion directa, no solo estimarlo.",
          next: "ops-11"
        },
        {
          id: "D",
          label: "Preparar la documentacion y capacitar al equipo",
          description: "INVIMA revisa procesos, no solo producto. Tener todo en orden puede compensar.",
          cost: 5000000,
          revenue: 18000000,
          bsc: { bsc_financial: 4, bsc_customer: 5, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["strategic"],
          feedback: "\\ud83d\\udca1 INVIMA valora procesos documentados. Pero si la muestra sale mal, la documentacion no salva de la multa.\\n\\ud83d\\udcda Concepto: La proporcion muestral es lo que miden. Complementa con evidencia de procesos pero no ignores los datos.",
          next: "ops-11"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-11 | Dia 22 | Beneficio esperado con demanda incierta
       -------------------------------------------------------- */
    "ops-11": {
      id: "ops-11",
      day: 22,
      title: "Turno extra de fin de semana",
      context: "Diciembre se acerca y la demanda se dispara. Un turno extra los sabados cuesta $12M/mes pero podria generar $30M en ventas adicionales... si la demanda se mantiene.\\n\\n📊 DATOS:\\n• P(demanda alta en diciembre) = 0.75\\n• Ingreso si demanda alta: $30M\\n• Ingreso si demanda baja: $8M\\n• Costo del turno extra: $12M/mes",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Abrir turno extra todo diciembre",
          description: "75% de demanda alta es suficiente. A producir platanitos navidenos!",
          cost: 12000000,
          revenue: 28000000,
          bsc: { bsc_financial: 7, bsc_customer: 8, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\\u2705 E(ingreso) = 0.75\\u00d7$30M + 0.25\\u00d7$8M = $24.5M. Beneficio esperado = $24.5M - $12M = $12.5M. Positivo!\\n\\ud83d\\udcda Concepto: E(beneficio) = E(ingreso) - costo. Si E(beneficio) > 0, la decision tiene sentido en promedio.",
          next: "ops-12"
        },
        {
          id: "B",
          label: "No abrir turno - diciembre es impredecible",
          description: "Puede que este ano no se venda tanto. No arriesgar los $12M.",
          cost: 0,
          revenue: 8000000,
          bsc: { bsc_financial: 3, bsc_customer: -5, bsc_internal: 3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\\u26a0\\ufe0f Perdiste E(beneficio) = $12.5M. Con P(alta)=75%, la probabilidad estaba muy a tu favor.\\n\\ud83d\\udcda Concepto: No actuar tambien tiene costo de oportunidad. Comparar siempre vs el valor esperado.",
          next: "ops-12"
        },
        {
          id: "C",
          label: "Turno extra solo las 2 primeras semanas",
          description: "Probar 2 semanas y si funciona, extender. Costo: $6M.",
          cost: 6000000,
          revenue: 20000000,
          bsc: { bsc_financial: 6, bsc_customer: 6, bsc_internal: 6, bsc_learning: 6 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\u2705 Estrategia adaptativa. Reduces riesgo a $6M y recoges datos reales antes de comprometer mas.\\n\\ud83d\\udcda Concepto: Muestreo secuencial. Tomar datos antes de decidir reduce la incertidumbre.",
          next: "ops-12"
        },
        {
          id: "D",
          label: "Turno extra solo si los pedidos de la semana 1 superan X",
          description: "Definir umbral: si pedidos semana 1 > $8M, abrir turno extra el resto del mes.",
          cost: 4000000,
          revenue: 22000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 7, bsc_learning: 8 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 Decision basada en evidencia en tiempo real. Usas la semana 1 como muestra para estimar la demanda del mes.\\n\\ud83d\\udcda Concepto: Actualizacion de probabilidades con datos nuevos. La semana 1 es informacion que reduce incertidumbre.",
          next: "ops-12"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-12 | Dia 24 | Tamano de muestra adecuado
       -------------------------------------------------------- */
    "ops-12": {
      id: "ops-12",
      day: 24,
      title: "Nueva receta: platanitos con limon",
      context: "I+D creo platanitos con limon. Un focus group de 40 personas probo el producto: 28 dijeron que lo comprarian (70%).\\n\\n📊 DATOS:\\n• n = 40 personas\\n• Favorables: 28 (70%)\\n• Inversion necesaria para lanzar: $25M\\n• Meta minima de aceptacion: 60%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Lanzar - 70% de aceptacion es excelente",
          description: "28 de 40 es contundente. A producir platanitos con limon!",
          cost: 25000000,
          revenue: 40000000,
          bsc: { bsc_financial: 7, bsc_customer: 10, bsc_internal: 5, bsc_learning: 5 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\\u26a0\\ufe0f IC 95% con n=40: 70% \\u00b1 14.2% = [55.8%, 84.2%]. El limite inferior esta DEBAJO de tu meta de 60%.\\n\\ud83d\\udcda Concepto: Con n=40, el margen de error es grande. La muestra es pequena para una decision de $25M.",
          next: null
        },
        {
          id: "B",
          label: "Ampliar la muestra a 200 personas antes de decidir",
          description: "40 personas es poco. Necesitamos mas datos para una inversion de $25M.",
          cost: 8000000,
          revenue: 35000000,
          bsc: { bsc_financial: 6, bsc_customer: 8, bsc_internal: 6, bsc_learning: 10 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 Con n=200, SE = \\u221a(0.7\\u00d70.3/200) = 3.2%. IC = 70% \\u00b1 6.3%. Mucho mas preciso para decidir.\\n\\ud83d\\udcda Concepto: El tamano de muestra importa. SE = \\u221a(pq/n). Cuadruplicar n reduce SE a la mitad.",
          next: null
        },
        {
          id: "C",
          label: "Lanzar edicion limitada de prueba",
          description: "2.000 paquetes en 10 tiendas. Datos reales de venta, no solo opinion.",
          cost: 10000000,
          revenue: 28000000,
          bsc: { bsc_financial: 5, bsc_customer: 7, bsc_internal: 7, bsc_learning: 8 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\u2705 Excelente. Datos de COMPRA real > datos de intencion. La conversion real suele ser 30-50% de la intencion declarada.\\n\\ud83d\\udcda Concepto: Validez externa. Un focus group mide intencion, no comportamiento. El piloto mide lo que importa.",
          next: null
        },
        {
          id: "D",
          label: "Descartar - el mercado de limon es nicho",
          description: "70% en focus group pero eso no se traduce al mercado. Muy arriesgado.",
          cost: 0,
          revenue: 5000000,
          bsc: { bsc_financial: 3, bsc_customer: -3, bsc_internal: 3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\\u26a0\\ufe0f Con 70% de aceptacion, descartar sin mas analisis es desperdiciar una oportunidad. Al menos amplia la muestra.\\n\\ud83d\\udcda Concepto: No decidir tambien es una decision. El costo de oportunidad existe.",
          next: null
        }
      ]
    }`,

  fin: `
    /* --------------------------------------------------------
       FIN-07 | Dia 15 | Valor esperado con probabilidades
       -------------------------------------------------------- */
    "fin-07": {
      id: "fin-07",
      day: 15,
      title: "Cobrar cartera morosa",
      context: "15 clientes deben $80M en total. El historico dice que la tasa de recuperacion promedio es 60% pero varia mucho segun el cliente.\\n\\n📊 DATOS:\\n• Cartera total: $80M\\n• P(recuperacion) historica: 60%\\n• Costo de gestion de cobro: $5M\\n• Si contratas abogado externo: cuesta $12M pero recupera 75%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Cobro interno intensivo",
          description: "Tu equipo llama, visita y presiona. $5M de gestion para recuperar el 60%.",
          cost: 5000000,
          revenue: 30000000,
          bsc: { bsc_financial: 8, bsc_customer: 4, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["moderate"],
          feedback: "\\u2705 E(recuperacion) = $80M \\u00d7 0.60 = $48M. Neto = $48M - $5M = $43M. Buen retorno.\\n\\ud83d\\udcda Concepto: Valor esperado. E(ganancia) = E(ingreso) - costo. Multiplica cada resultado por su probabilidad.",
          next: "fin-08"
        },
        {
          id: "B",
          label: "Contratar abogado externo",
          description: "Mas caro pero mas efectivo. El abogado cobra $12M pero recupera mas.",
          cost: 12000000,
          revenue: 38000000,
          bsc: { bsc_financial: 7, bsc_customer: 3, bsc_internal: 4, bsc_learning: 5 },
          crossEffects: [],
          tags: ["professional"],
          feedback: "\\u2705 E(recuperacion) = $80M \\u00d7 0.75 = $60M. Neto = $60M - $12M = $48M. Mejor que cobro interno!\\n\\ud83d\\udcda Concepto: Compara valores esperados netos. A veces gastar mas genera mas retorno neto.",
          next: "fin-08"
        },
        {
          id: "C",
          label: "Vender la cartera a un tercero al 40%",
          description: "Una firma de cobro compra tu cartera por $32M. Plata segura, sin riesgo.",
          cost: 0,
          revenue: 32000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 4 },
          crossEffects: [],
          tags: ["safe"],
          feedback: "\\ud83d\\udca1 $32M seguros vs E(cobro interno) = $43M o E(abogado) = $48M. Menos plata pero cero riesgo e incertidumbre.\\n\\ud83d\\udcda Concepto: Certeza vs valor esperado. Vender cartera es como comprar un seguro: pagas prima por eliminar riesgo.",
          next: "fin-08"
        },
        {
          id: "D",
          label: "Castigar la cartera y no cobrar",
          description: "Perder $80M y seguir adelante. No vale la pena el esfuerzo.",
          cost: 0,
          revenue: 5000000,
          bsc: { bsc_financial: -8, bsc_customer: 3, bsc_internal: -3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["passive"],
          feedback: "\\u274c Tiraste $48M a la basura (valor esperado de cobro). Incluso vendida la cartera daba $32M seguros.\\n\\ud83d\\udcda Concepto: No actuar no significa costo cero. El costo de oportunidad perdido es real.",
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
      context: "Tienes $100M para invertir. Dos opciones: CDT seguro o expandir produccion.\\n\\n📊 OPCION A - CDT Bancolombia:\\n• Retorno: 12% anual fijo = $12M\\n• Riesgo: cero\\n\\n📊 OPCION B - Expandir planta:\\n• Retorno promedio (3 anos): 28%\\n• Desviacion: 15%\\n• Podria dar entre 13% y 43% (\\u03bc\\u00b1\\u03c3)",
      type: "choice",
      options: [
        {
          id: "A",
          label: "CDT seguro al 12%",
          description: "$12M garantizados. Dormir tranquilo.",
          cost: 0,
          revenue: 20000000,
          bsc: { bsc_financial: 5, bsc_customer: 3, bsc_internal: 3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\\u26a0\\ufe0f Seguro pero E(expansion) = $28M vs $12M del CDT. La prima por riesgo es $16M.\\n\\ud83d\\udcda Concepto: Trade-off riesgo-retorno. Mayor retorno esperado = mayor variabilidad. \\u00bfCuanto riesgo toleras?",
          next: "fin-09"
        },
        {
          id: "B",
          label: "Expandir planta",
          description: "28% promedio historico. El negocio de platanitos esta en auge.",
          cost: 15000000,
          revenue: 35000000,
          bsc: { bsc_financial: 8, bsc_customer: 7, bsc_internal: 6, bsc_learning: 5 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\\u2705 E(retorno) = $28M, pero P(retorno < $12M del CDT) = P(Z < (12-28)/15) = P(Z < -1.07) = 14%.\\n\\ud83d\\udcda Concepto: Probabilidad normal para evaluar riesgo. Solo 14% de chance de que la expansion rinda menos que el CDT.",
          next: "fin-09"
        },
        {
          id: "C",
          label: "Dividir 50/50",
          description: "$50M en CDT + $50M en expansion. Diversificar.",
          cost: 5000000,
          revenue: 28000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 5, bsc_learning: 6 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\ud83d\\udca1 E(retorno) = 0.5\\u00d7$12M + 0.5\\u00d7$28M = $20M. \\u03c3 = 0.5\\u00d7$15M = $7.5M. Mejor ratio retorno/riesgo.\\n\\ud83d\\udcda Concepto: Diversificacion reduce riesgo sin eliminar retorno. La varianza de la mezcla es menor.",
          next: "fin-09"
        },
        {
          id: "D",
          label: "Esperar 3 meses por mejores tasas",
          description: "Las tasas del CDT podrian subir. Esperar y ver.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: 3, bsc_learning: 4 },
          crossEffects: [],
          tags: ["passive"],
          feedback: "\\u26a0\\ufe0f Costo de oportunidad: 3 meses sin invertir = 3/12 \\u00d7 $12M = $3M perdidos minimo.\\n\\ud83d\\udcda Concepto: El dinero tiene valor en el tiempo. Esperar tambien tiene costo esperado.",
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
      context: "El dolar subio 15% en un mes. Tu materia prima importada (aceite de palma) ahora cuesta 15% mas. \\u00bfAbsorbes el costo o subes precios?\\n\\n📊 DATOS:\\n• Costo actual del aceite: $800/paquete\\n• Nuevo costo: $920/paquete (+$120)\\n• Margen actual por paquete: $600\\n• Nuevo margen si no subes precio: $480",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Subir precios 8% para compensar",
          description: "Trasladar parte del costo al consumidor. No todo, para no espantarlos.",
          cost: 5000000,
          revenue: 25000000,
          bsc: { bsc_financial: 7, bsc_customer: -3, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\u2705 Subir 8% recupera $96 de los $120 extra. Margen nuevo: $576. Pierdes algo pero sobrevives.\\n\\ud83d\\udcda Concepto: Estimacion de elasticidad. Si demanda cae < 8% por el aumento, ganas mas en total.",
          next: "fin-10"
        },
        {
          id: "B",
          label: "Absorber el costo y mantener precios",
          description: "No perder clientes. El margen baja pero mantienes volumen.",
          cost: 8000000,
          revenue: 18000000,
          bsc: { bsc_financial: -3, bsc_customer: 6, bsc_internal: 3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["customer-focused"],
          feedback: "\\u26a0\\ufe0f Margen cae 20% ($600 \\u2192 $480). Si vendes 200K paquetes/mes, pierdes $24M/mes. \\u00bfSostenible?\\n\\ud83d\\udcda Concepto: Estimar impacto total. Margen \\u00d7 volumen = ganancia. Baja de margen se multiplica por todo el volumen.",
          next: "fin-10"
        },
        {
          id: "C",
          label: "Buscar proveedor nacional de aceite",
          description: "Cambiar a aceite colombiano. Sin impacto cambiario.",
          cost: 10000000,
          revenue: 30000000,
          bsc: { bsc_financial: 6, bsc_customer: 4, bsc_internal: 7, bsc_learning: 6 },
          crossEffects: [],
          tags: ["strategic"],
          feedback: "\\u2705 Eliminas riesgo cambiario de raiz. El cambio toma 2-3 meses pero protege a largo plazo.\\n\\ud83d\\udcda Concepto: Reducir varianza de costos. Un proveedor en pesos tiene \\u03c3=0 en riesgo cambiario.",
          next: "fin-10"
        },
        {
          id: "D",
          label: "Comprar dolares ahora como cobertura",
          description: "Comprar dolares para 6 meses de importaciones al precio actual.",
          cost: 20000000,
          revenue: 28000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 4, bsc_learning: 7 },
          crossEffects: [],
          tags: ["hedging"],
          feedback: "\\ud83d\\udca1 Cobertura cambiaria. Fijas el costo por 6 meses. Si el dolar sigue subiendo, ganaste. Si baja, perdiste.\\n\\ud83d\\udcda Concepto: Hedging es comprar certidumbre. Reduces \\u03c3 del costo a cambio de un precio fijo.",
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
      context: "Llevas 2 anos comprando empaques al mismo proveedor. Tus datos de compra muestran oportunidad de negociar.\\n\\n📊 DATOS DE COMPRA (24 meses):\\n• Precio promedio: $1,200/unidad\\n• Desviacion: $150\\n• SE = 150/\\u221a24 = $30.6\\n• Competidor cotiza a $1,050/unidad\\n• Diferencia: $150/unidad",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Renegociar con datos en mano",
          description: "Mostrar la cotizacion del competidor y pedir igualar. Tus datos respaldan.",
          cost: 3000000,
          revenue: 28000000,
          bsc: { bsc_financial: 10, bsc_customer: 4, bsc_internal: 6, bsc_learning: 6 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 IC de tu precio actual: $1,200 \\u00b1 $60 = [$1,140, $1,260]. El competidor ($1,050) esta FUERA de tu IC. Evidencia clara de sobreprecio.\\n\\ud83d\\udcda Concepto: El IC como herramienta de negociacion. Si el precio alternativo cae fuera de tu IC, hay diferencia real.",
          next: "fin-11"
        },
        {
          id: "B",
          label: "Cambiar directamente al competidor",
          description: "$150 menos por unidad. A $1,050 ahorro $30M al ano.",
          cost: 8000000,
          revenue: 35000000,
          bsc: { bsc_financial: 8, bsc_customer: 4, bsc_internal: 4, bsc_learning: 4 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\\u26a0\\ufe0f Cuidado: la cotizacion es un punto, no una garantia. \\u00bfCual es la variabilidad del competidor?\\n\\ud83d\\udcda Concepto: Un precio promedio sin desviacion estandar es informacion incompleta.",
          next: "fin-11"
        },
        {
          id: "C",
          label: "Pedir muestra al competidor primero",
          description: "Probar calidad antes de cambiar. 1 mes de prueba en paralelo.",
          cost: 5000000,
          revenue: 22000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["prudent"],
          feedback: "\\u2705 Recoger datos propios del competidor te da su \\u03bc y \\u03c3 reales. Puedes comparar con IC formal.\\n\\ud83d\\udcda Concepto: Antes de comparar, necesitas datos de AMBAS opciones con sus medidas de variabilidad.",
          next: "fin-11"
        },
        {
          id: "D",
          label: "Dejar todo como esta - relacion a largo plazo vale",
          description: "El proveedor actual es confiable. $150 mas no justifica el riesgo de cambiar.",
          cost: 0,
          revenue: 10000000,
          bsc: { bsc_financial: -3, bsc_customer: 3, bsc_internal: 4, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\\u274c $150 \\u00d7 200K unidades/ano = $30M anuales que regalas. El IC muestra diferencia significativa.\\n\\ud83d\\udcda Concepto: La lealtad tiene limite. Cuando los datos muestran diferencia clara, actua.",
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
      context: "\\u00bfCuanto dar de bono navideno? Necesitas estimar si el Q4 da para ser generoso.\\n\\n📊 DATOS Q4 (octubre-noviembre):\\n• Ventas promedio mensual: $195M\\n• Desviacion: $25M, n=8 semanas\\n• SE = $25M/\\u221a8 = $8.8M\\n• Diciembre historicamente sube 20%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Bono de 1 salario completo ($45M total)",
          description: "Generoso. Los datos de Q4 se ven bien y diciembre siempre sube.",
          cost: 45000000,
          revenue: 38000000,
          bsc: { bsc_financial: 4, bsc_customer: 6, bsc_internal: 10, bsc_learning: 4 },
          crossEffects: [],
          tags: ["generous"],
          feedback: "\\u26a0\\ufe0f IC ventas diciembre: $195M \\u00d7 1.2 = $234M \\u00b1 $17.3M = [$217M, $251M]. En el peor caso ($217M), \\u00bfalcanza para el bono?\\n\\ud83d\\udcda Concepto: Planifica con el limite inferior del IC, no con el promedio. El escenario pesimista debe ser sostenible.",
          next: "fin-12"
        },
        {
          id: "B",
          label: "Medio salario ($22M total)",
          description: "Prudente pero digno. Deja margen para imprevistos.",
          cost: 22000000,
          revenue: 30000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 7, bsc_learning: 5 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\u2705 Con IC pesimista de $217M, medio salario ($22M) es pagable incluso en el peor escenario.\\n\\ud83d\\udcda Concepto: Decision robusta = funciona incluso en el limite inferior del IC.",
          next: "fin-12"
        },
        {
          id: "C",
          label: "Bono variable segun ventas reales de diciembre",
          description: "Prometer % de las ventas de diciembre. Si va bien, buen bono. Si no, bono menor.",
          cost: 10000000,
          revenue: 32000000,
          bsc: { bsc_financial: 7, bsc_customer: 6, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 Alineas incentivos con resultados. El bono se auto-ajusta al resultado real.\\n\\ud83d\\udcda Concepto: Compartir la incertidumbre. Si el IC es amplio, un bono variable distribuye el riesgo.",
          next: "fin-12"
        },
        {
          id: "D",
          label: "Sin bono - la empresa necesita reservas",
          description: "Guardar la plata para enero que siempre es mes duro.",
          cost: 0,
          revenue: 8000000,
          bsc: { bsc_financial: 5, bsc_customer: -5, bsc_internal: -8, bsc_learning: 3 },
          crossEffects: [],
          tags: ["stingy"],
          feedback: "\\u274c Desmoralizas al equipo en plena temporada alta. Perderas mas en productividad y rotacion que lo ahorrado.\\n\\ud83d\\udcda Concepto: El costo de no invertir en personas tiene valor esperado negativo a mediano plazo.",
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
      context: "La DIAN anuncia auditoria para febrero. Necesitas verificar que tus gastos estan bien soportados. Tienes 2.400 facturas del ano.\\n\\n📊 DATOS:\\n• Total facturas: 2,400\\n• Tiempo para revisar 1 factura: 15 min\\n• Revisar TODAS: 600 horas (imposible)\\n• Meta: detectar si >3% tienen problemas",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Muestra aleatoria de 300 facturas",
          description: "n=300 da margen de error de \\u00b13% para proporciones. Suficiente para la DIAN.",
          cost: 8000000,
          revenue: 30000000,
          bsc: { bsc_financial: 8, bsc_customer: 5, bsc_internal: 8, bsc_learning: 8 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 Con n=300, E = 1.96\\u00d7\\u221a(0.03\\u00d70.97/300) = \\u00b11.9%. Si encuentras \\u22643% con problemas, puedes demostrar cumplimiento.\\n\\ud83d\\udcda Concepto: Muestreo para auditoria. n=300 es estandar para proporciones con E\\u22642%.",
          next: null
        },
        {
          id: "B",
          label: "Revisar solo las facturas grandes (>$5M)",
          description: "Las facturas grandes son las que la DIAN revisa. Unas 150 facturas.",
          cost: 5000000,
          revenue: 22000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["practical"],
          feedback: "\\u26a0\\ufe0f Sesgo de seleccion. Si solo revisas las grandes, las chicas pueden tener problemas que no detectas.\\n\\ud83d\\udcda Concepto: Muestra por conveniencia \\u2260 muestra aleatoria. La DIAN puede muestrear CUALQUIER factura.",
          next: null
        },
        {
          id: "C",
          label: "Revisar TODAS las 2,400 facturas",
          description: "Cero riesgo. Si hay tiempo y plata, revisar todo.",
          cost: 25000000,
          revenue: 32000000,
          bsc: { bsc_financial: 3, bsc_customer: 4, bsc_internal: 6, bsc_learning: 3 },
          crossEffects: [],
          tags: ["perfectionist"],
          feedback: "\\ud83d\\udca1 600 horas de revision. \\u00bfVale $25M de mano de obra vs $8M de la muestra que da casi la misma confianza?\\n\\ud83d\\udcda Concepto: Muestreo existe para ahorrar recursos. Censo solo se justifica cuando el costo es bajo.",
          next: null
        },
        {
          id: "D",
          label: "Muestreo estratificado: 100 grandes + 100 medianas + 100 pequenas",
          description: "Dividir facturas por monto y muestrear proporcionalmente.",
          cost: 8000000,
          revenue: 35000000,
          bsc: { bsc_financial: 7, bsc_customer: 5, bsc_internal: 8, bsc_learning: 10 },
          crossEffects: [],
          tags: ["sophisticated"],
          feedback: "\\u2705 Muestreo estratificado reduce varianza y garantiza representacion de todos los rangos de montos.\\n\\ud83d\\udcda Concepto: Estratificado > aleatorio simple cuando los estratos son heterogeneos. Mejor precision por el mismo n.",
          next: null
        }
      ]
    }`,

  mkt: `
    /* --------------------------------------------------------
       MKT-07 | Dia 15 | Riesgo de extrapolacion
       -------------------------------------------------------- */
    "mkt-07": {
      id: "mkt-07",
      day: 15,
      title: "TikTok viral",
      context: "Un influencer con 500K seguidores posteo un video comiendo tus platanitos. Ya tiene 2M de vistas y las ventas online subieron 300% en 2 dias.\\n\\n📊 DATOS:\\n• Ventas normales online: 200 pedidos/dia\\n• Ventas post-viral: 800 pedidos/dia (2 dias)\\n• Inventario disponible: 3.000 paquetes\\n• Costo de produccion urgente: $15M por 10.000 extra",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Producir 10.000 paquetes extra de urgencia",
          description: "Aprovechar la ola viral. Meter turno extra y producir como locos.",
          cost: 15000000,
          revenue: 35000000,
          bsc: { bsc_financial: 7, bsc_customer: 10, bsc_internal: 4, bsc_learning: 5 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\\u26a0\\ufe0f Cuidado con extrapolar 2 dias al futuro. Los virales duran 3-7 dias tipicamente. Podrias quedarte con inventario.\\n\\ud83d\\udcda Concepto: Extrapolacion con datos insuficientes. n=2 dias NO es muestra para predecir tendencia.",
          next: "mkt-08"
        },
        {
          id: "B",
          label: "Producir 3.000 extra y monitorear",
          description: "Cantidad moderada. Si sigue la demanda, producir mas.",
          cost: 6000000,
          revenue: 25000000,
          bsc: { bsc_financial: 6, bsc_customer: 7, bsc_internal: 6, bsc_learning: 7 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\u2705 Produccion adaptativa. Esperas 2-3 dias mas de datos antes de comprometer mas recursos.\\n\\ud83d\\udcda Concepto: Muestreo secuencial. No decides todo con los primeros datos; recoges mas y ajustas.",
          next: "mkt-08"
        },
        {
          id: "C",
          label: "Contactar al influencer para alianza pagada",
          description: "Si ya le gusto gratis, que lo promocione por plata. $5M por una campana de 1 semana.",
          cost: 5000000,
          revenue: 30000000,
          bsc: { bsc_financial: 8, bsc_customer: 8, bsc_internal: 4, bsc_learning: 6 },
          crossEffects: [],
          tags: ["strategic"],
          feedback: "\\u2705 Conviertes suerte en estrategia. Si el influencer ya genera traccion organica, la pagada amplifica.\\n\\ud83d\\udcda Concepto: Pasar de dato observacional (espontaneo) a experimental (controlado) mejora la predictibilidad.",
          next: "mkt-08"
        },
        {
          id: "D",
          label: "No hacer nada - los virales pasan rapido",
          description: "Manana hay otro video viral de otro producto. No invertir en humo.",
          cost: 0,
          revenue: 8000000,
          bsc: { bsc_financial: 3, bsc_customer: -4, bsc_internal: 3, bsc_learning: 4 },
          crossEffects: [],
          tags: ["passive"],
          feedback: "\\u26a0\\ufe0f Puede que tengas razon, pero $0 de inversion cuando la demanda sube 300% es desperdiciar oportunidad.\\n\\ud83d\\udcda Concepto: Costo de oportunidad. Aunque el viral sea temporal, hay ganancia inmediata real.",
          next: "mkt-08"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-08 | Dia 17 | Tendencias de proporcion
       -------------------------------------------------------- */
    "mkt-08": {
      id: "mkt-08",
      day: 17,
      title: "Competencia baja precios 20%",
      context: "PlataniMax (tu rival) bajo precios 20%. Tu market share ya cayo de 35% a 30% en 2 semanas.\\n\\n📊 DATOS:\\n• Tu market share hace 1 mes: 35%\\n• Tu market share hoy: 30% (n=500 encuestas)\\n• Precio PlataniMax: $2,400 (antes $3,000)\\n• Tu precio: $3,200",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Bajar precios para igualar",
          description: "Guerra de precios. Si ellos bajan, tu bajas. No perder mas market share.",
          cost: 20000000,
          revenue: 30000000,
          bsc: { bsc_financial: -3, bsc_customer: 6, bsc_internal: 4, bsc_learning: 3 },
          crossEffects: [],
          tags: ["reactive"],
          feedback: "\\u26a0\\ufe0f Bajar a $2,400 destruye tu margen. Ellos pueden tener costos mas bajos. Guerra de precios solo sirve si tienes ventaja en costos.\\n\\ud83d\\udcda Concepto: Antes de reaccionar, analiza si el cambio de proporcion es significativo o temporal.",
          next: "mkt-09"
        },
        {
          id: "B",
          label: "Diferenciarse en calidad, no en precio",
          description: "Campana de 'platanitos premium' - ingredientes naturales, empaque especial.",
          cost: 12000000,
          revenue: 32000000,
          bsc: { bsc_financial: 6, bsc_customer: 8, bsc_internal: 6, bsc_learning: 7 },
          crossEffects: [],
          tags: ["strategic"],
          feedback: "\\u2705 La proporcion que importa no es market share sino RENTABILIDAD por unidad. Si tu margen es 2x el de ellos, 30% share puede dar mas ganancia.\\n\\ud83d\\udcda Concepto: Proporcion de mercado \\u2260 proporcion de ganancias. Mide lo que importa.",
          next: "mkt-09"
        },
        {
          id: "C",
          label: "Lanzar linea economica aparte",
          description: "Platanitos 'PlataniPop' a $2,200 para competir, sin tocar la marca premium.",
          cost: 18000000,
          revenue: 35000000,
          bsc: { bsc_financial: 5, bsc_customer: 8, bsc_internal: 5, bsc_learning: 6 },
          crossEffects: [],
          tags: ["creative"],
          feedback: "\\u2705 Segmentas el mercado. La linea economica captura el share perdido sin dañar la marca premium.\\n\\ud83d\\udcda Concepto: Dos proporciones, dos segmentos. Mide cada uno por separado.",
          next: "mkt-09"
        },
        {
          id: "D",
          label: "Esperar - puede que PlataniMax no aguante esos precios",
          description: "A $2,400 su margen es minimo. En 2 meses suben de nuevo.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_financial: 4, bsc_customer: -3, bsc_internal: 3, bsc_learning: 5 },
          crossEffects: [],
          tags: ["wait-and-see"],
          feedback: "\\ud83d\\udca1 Puede funcionar si tienes datos de que su margen es insostenible. Pero perder 5pp de share tiene costo real.\\n\\ud83d\\udcda Concepto: Monitorear la tendencia de la proporcion en el tiempo para decidir cuando actuar.",
          next: "mkt-09"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-09 | Dia 18 | ROI esperado
       -------------------------------------------------------- */
    "mkt-09": {
      id: "mkt-09",
      day: 18,
      title: "Feria gastronomica en Pereira",
      context: "La Feria Gastronomica del Eje Cafetero es en 2 semanas. Un stand cuesta $8M. Historicamente, marcas similares venden entre $15M y $40M en la feria.\\n\\n📊 DATOS DE FERIAS ANTERIORES (marcas de snacks):\\n• Promedio de ventas: $25M\\n• Desviacion: $10M\\n• n = 8 marcas participantes\\n• SE = $10M/\\u221a8 = $3.54M",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Participar con stand premium ($12M)",
          description: "Stand grande, degustaciones, merchandising. Maximo impacto.",
          cost: 12000000,
          revenue: 32000000,
          bsc: { bsc_financial: 7, bsc_customer: 10, bsc_internal: 5, bsc_learning: 5 },
          crossEffects: [],
          tags: ["aggressive"],
          feedback: "\\u2705 E(ROI) = E(ventas) - costo = $25M - $12M = $13M. IC ventas 95%: [$18M, $32M]. Hasta pesimista da ganancia.\\n\\ud83d\\udcda Concepto: Si el limite inferior del IC de ingresos > costo, la inversion es segura estadisticamente.",
          next: "mkt-10"
        },
        {
          id: "B",
          label: "Stand basico ($8M)",
          description: "Lo minimo para estar presente. Si funciona, el proximo ano invertir mas.",
          cost: 8000000,
          revenue: 25000000,
          bsc: { bsc_financial: 6, bsc_customer: 7, bsc_internal: 5, bsc_learning: 5 },
          crossEffects: [],
          tags: ["moderate"],
          feedback: "\\u2705 E(ganancia) = $25M - $8M = $17M. Excelente retorno esperado con inversion minima.\\n\\ud83d\\udcda Concepto: ROI = (ingreso - costo)/costo. A veces menos inversion = mejor ROI.",
          next: "mkt-10"
        },
        {
          id: "C",
          label: "No participar - muy caro",
          description: "$8M es mucha plata para un evento de 3 dias.",
          cost: 0,
          revenue: 5000000,
          bsc: { bsc_financial: 3, bsc_customer: -5, bsc_internal: 3, bsc_learning: 3 },
          crossEffects: [],
          tags: ["passive"],
          feedback: "\\u274c E(ventas) = $25M con IC [$18M, $32M]. Incluso el peor escenario ($18M) supera el costo de $8M.\\n\\ud83d\\udcda Concepto: Cuando todo el IC de ingresos esta por encima del costo, no participar es irracional.",
          next: "mkt-10"
        },
        {
          id: "D",
          label: "Patrocinar un evento dentro de la feria",
          description: "En vez de stand, patrocinar la competencia de cocina. Mas visibilidad, $10M.",
          cost: 10000000,
          revenue: 28000000,
          bsc: { bsc_financial: 5, bsc_customer: 8, bsc_internal: 4, bsc_learning: 6 },
          crossEffects: [],
          tags: ["creative"],
          feedback: "\\ud83d\\udca1 Diferente formato pero sin datos historicos de retorno de patrocinios. Mayor incertidumbre (\\u03c3 desconocida).\\n\\ud83d\\udcda Concepto: Sin datos historicos, tu estimacion de retorno tiene SE desconocido. Mas riesgo informacional.",
          next: "mkt-10"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-10 | Dia 20 | Margen de error con muestra pequena
       -------------------------------------------------------- */
    "mkt-10": {
      id: "mkt-10",
      day: 20,
      title: "Lanzar app de pedidos",
      context: "Encuesta a clientes: 68% dice que usaria una app para pedir platanitos directo. Pero solo encuestaste 50 personas.\\n\\n📊 DATOS:\\n• n = 50\\n• Favorables: 34 (68%)\\n• Inversion en app: $35M\\n• SE = \\u221a(0.68\\u00d70.32/50) = 6.6%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Desarrollar la app completa",
          description: "68% es altisimo. Meter los $35M y lanzar.",
          cost: 35000000,
          revenue: 30000000,
          bsc: { bsc_financial: 3, bsc_customer: 6, bsc_internal: 4, bsc_learning: 4 },
          crossEffects: [],
          tags: ["risky"],
          feedback: "\\u26a0\\ufe0f IC 95% = 68% \\u00b1 12.9% = [55.1%, 80.9%]. Rango de 26 puntos! Con n=50, la incertidumbre es enorme.\\n\\ud83d\\udcda Concepto: Margen de error con n pequeno. SE = \\u221a(pq/n). Con n=50, el IC es demasiado ancho para una inversion de $35M.",
          next: "mkt-11"
        },
        {
          id: "B",
          label: "Ampliar encuesta a 300 personas primero",
          description: "Con n=300, el margen de error baja a \\u00b15.3%. Mucho mas confiable.",
          cost: 5000000,
          revenue: 25000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 5, bsc_learning: 10 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 Con n=300, SE = 2.7%, IC = \\u00b15.3%. Reduces la incertidumbre antes de invertir $35M.\\n\\ud83d\\udcda Concepto: Multiplicar n por 6 reduce SE a la mitad. El costo de mas datos ($5M) << costo de mala decision ($35M).",
          next: "mkt-11"
        },
        {
          id: "C",
          label: "MVP basico (pagina web de pedidos) por $8M",
          description: "En vez de app completa, una pagina web simple para pedidos. Prueba el concepto.",
          cost: 8000000,
          revenue: 22000000,
          bsc: { bsc_financial: 6, bsc_customer: 7, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["lean"],
          feedback: "\\u2705 MVP valida con COMPORTAMIENTO real, no solo intencion declarada. Mucho mas confiable que encuesta.\\n\\ud83d\\udcda Concepto: Datos de comportamiento > datos de intencion. La conversion real puede ser 30-50% de la declarada.",
          next: "mkt-11"
        },
        {
          id: "D",
          label: "Descartar - la gente dice si a todo en encuestas",
          description: "68% en encuesta = 30% en realidad. No vale la pena.",
          cost: 0,
          revenue: 5000000,
          bsc: { bsc_financial: 3, bsc_customer: -3, bsc_internal: 3, bsc_learning: 5 },
          crossEffects: [],
          tags: ["skeptical"],
          feedback: "\\ud83d\\udca1 Buen punto sobre sesgo de cortesia, pero descartar sin validar tambien es un error.\\n\\ud83d\\udcda Concepto: Sesgo en encuestas es real pero cuantificable. Ajusta por sesgo, no descartes los datos.",
          next: "mkt-11"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-11 | Dia 22 | Punto de equilibrio con estimaciones
       -------------------------------------------------------- */
    "mkt-11": {
      id: "mkt-11",
      day: 22,
      title: "Alianza con Rappi",
      context: "Rappi ofrece meter tus platanitos en su app. Comision: 18% sobre cada venta. Pero el volumen podria subir mucho.\\n\\n📊 DATOS:\\n• Ventas actuales: 15.000 paquetes/mes\\n• Precio: $3,200/paquete\\n• Margen actual: $600/paquete\\n• Comision Rappi: 18% = $576/paquete\\n• Volumen esperado adicional por Rappi: 3,000-8,000 paquetes/mes",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Aceptar la alianza",
          description: "18% es alto pero el volumen adicional compensa. Mas platanitos en mas manos.",
          cost: 5000000,
          revenue: 28000000,
          bsc: { bsc_financial: 5, bsc_customer: 8, bsc_internal: 4, bsc_learning: 5 },
          crossEffects: [],
          tags: ["growth"],
          feedback: "\\u26a0\\ufe0f Margen por paquete en Rappi: $600 - $576 = $24. Necesitas vender MUCHOS para que valga la pena.\\n\\ud83d\\udcda Concepto: Punto de equilibrio. Costos fijos de alianza / margen unitario = volumen minimo necesario.",
          next: "mkt-12"
        },
        {
          id: "B",
          label: "Negociar comision al 12%",
          description: "18% es abusivo. Proponer 12% y hacer numeros con ese margen.",
          cost: 3000000,
          revenue: 30000000,
          bsc: { bsc_financial: 7, bsc_customer: 7, bsc_internal: 5, bsc_learning: 6 },
          crossEffects: [],
          tags: ["negotiation"],
          feedback: "\\u2705 Al 12%, comision = $384. Margen = $216/paquete. Con 5.000 extra = $1.08M de ganancia adicional/mes.\\n\\ud83d\\udcda Concepto: Sensibilidad. Pequenos cambios en la comision tienen gran impacto en el punto de equilibrio.",
          next: "mkt-12"
        },
        {
          id: "C",
          label: "Crear tu propia plataforma de delivery",
          description: "Cero comisiones. App propia + domiciliarios propios.",
          cost: 30000000,
          revenue: 35000000,
          bsc: { bsc_financial: 4, bsc_customer: 5, bsc_internal: 3, bsc_learning: 5 },
          crossEffects: [],
          tags: ["ambitious"],
          feedback: "\\ud83d\\udca1 Cero comision pero costo fijo de $30M + operacion de delivery. \\u00bfCuantos paquetes para recuperar $30M?\\n\\ud83d\\udcda Concepto: Costo fijo alto vs costo variable bajo. El break-even depende del volumen estimado.",
          next: "mkt-12"
        },
        {
          id: "D",
          label: "Rechazar - el delivery no es nuestro negocio",
          description: "Somos una fabrica de platanitos, no una empresa de tecnologia.",
          cost: 0,
          revenue: 8000000,
          bsc: { bsc_financial: 3, bsc_customer: -4, bsc_internal: 4, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\\u26a0\\ufe0f El canal digital crece 25% anual. Ignorarlo es perder mercado a largo plazo.\\n\\ud83d\\udcda Concepto: Las tendencias de proporcion en canales de venta son datos que no debes ignorar.",
          next: "mkt-12"
        }
      ]
    },

    /* --------------------------------------------------------
       MKT-12 | Dia 24 | Comparar efectividad
       -------------------------------------------------------- */
    "mkt-12": {
      id: "mkt-12",
      day: 24,
      title: "Campana de Navidad",
      context: "Presupuesto de $20M para campana navidena. Dos opciones con datos de conversion historicos.\\n\\n📊 DIGITAL (Instagram + TikTok):\\n• Conversion promedio: 3.2%\\n• n = 15 campanas previas, s = 1.1%\\n\\n📊 TRADICIONAL (Radio + perifoneo):\\n• Conversion promedio: 2.1%\\n• n = 20 campanas previas, s = 0.6%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "100% digital",
          description: "3.2% vs 2.1% de conversion. Digital gana por goleada.",
          cost: 20000000,
          revenue: 38000000,
          bsc: { bsc_financial: 7, bsc_customer: 8, bsc_internal: 5, bsc_learning: 6 },
          crossEffects: [],
          tags: ["digital"],
          feedback: "\\u26a0\\ufe0f Ojo: SE digital = 1.1/\\u221a15 = 0.28%, SE tradicional = 0.6/\\u221a20 = 0.13%. Digital tiene mas variabilidad.\\n\\ud83d\\udcda Concepto: Compara medias Y variabilidades. Mayor promedio con mayor varianza no siempre es mejor.",
          next: null
        },
        {
          id: "B",
          label: "100% tradicional",
          description: "Radio y perifoneo llegan al pueblo donde estan nuestros clientes de verdad.",
          cost: 20000000,
          revenue: 28000000,
          bsc: { bsc_financial: 5, bsc_customer: 6, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["traditional"],
          feedback: "\\u26a0\\ufe0f Conversion mas baja pero mas estable. IC 95%: 2.1% \\u00b1 0.26% vs digital 3.2% \\u00b1 0.56%.\\n\\ud83d\\udcda Concepto: Menor varianza = mayor predictibilidad. Para presupuesto limitado, la certeza tiene valor.",
          next: null
        },
        {
          id: "C",
          label: "Dividir 60% digital, 40% tradicional",
          description: "Lo mejor de ambos mundos. Digital para jovenes, radio para pueblos.",
          cost: 20000000,
          revenue: 35000000,
          bsc: { bsc_financial: 7, bsc_customer: 9, bsc_internal: 5, bsc_learning: 7 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\u2705 E(conversion mezcla) = 0.6\\u00d73.2% + 0.4\\u00d72.1% = 2.76%. Varianza reducida por diversificacion.\\n\\ud83d\\udcda Concepto: Diversificacion. La mezcla tiene retorno intermedio pero varianza menor que 100% digital.",
          next: null
        },
        {
          id: "D",
          label: "A/B test: mitad ciudades digital, mitad tradicional",
          description: "Asignar aleatoriamente ciudades a cada canal y medir cual convierte mas.",
          cost: 20000000,
          revenue: 33000000,
          bsc: { bsc_financial: 5, bsc_customer: 7, bsc_internal: 5, bsc_learning: 10 },
          crossEffects: [],
          tags: ["experimental"],
          feedback: "\\u2705 Diseno experimental real. Despues de Navidad tendras datos PROPIOS para decidir el 2027.\\n\\ud83d\\udcda Concepto: A/B testing. Asignacion aleatoria + medicion = evidencia causal de efectividad.",
          next: null
        }
      ]
    }`,

  hr: `
    /* --------------------------------------------------------
       HR-07 | Dia 15 | Comparar con parametro poblacional
       -------------------------------------------------------- */
    "hr-07": {
      id: "hr-07",
      day: 15,
      title: "Empleado estrella pide aumento",
      context: "Tu mejor operario pide aumento de $1.8M a $2.2M. Dice que el mercado paga mas. Necesitas datos para decidir.\\n\\n📊 DATOS:\\n• Salario actual del empleado: $1,800,000\\n• Salario que pide: $2,200,000\\n• Salario promedio sector (encuesta DANE): \\u03bc = $2,050,000\\n• \\u03c3 sector = $300,000\\n• Tu empresa: X\\u0304 = $1,750,000 (n=48 operarios)",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Subir a $2,050,000 (promedio del sector)",
          description: "Igualar el mercado. Ni mas ni menos de lo que el sector paga.",
          cost: 5000000,
          revenue: 20000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 8, bsc_learning: 6 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 Si \\u03bc del sector = $2.05M y tu pagas $1.75M, estas 1 desviacion estandar por debajo. Eso explica la rotacion.\\n\\ud83d\\udcda Concepto: Z = (X-\\u03bc)/\\u03c3 = (1.75-2.05)/0.3 = -1.0. Tu empresa paga en el percentil 16 del sector. Bajo!",
          next: "hr-08"
        },
        {
          id: "B",
          label: "Dar los $2,200,000 que pide",
          description: "Es tu mejor empleado. Perderlo cuesta mas que el aumento.",
          cost: 8000000,
          revenue: 25000000,
          bsc: { bsc_financial: 4, bsc_customer: 5, bsc_internal: 9, bsc_learning: 4 },
          crossEffects: [],
          tags: ["generous"],
          feedback: "\\u26a0\\ufe0f $2.2M esta en el percentil 69 del sector. Genial para el, pero \\u00bfque pasa cuando los otros 47 pidan lo mismo?\\n\\ud83d\\udcda Concepto: Z = (2.2-2.05)/0.3 = 0.5 \\u2192 P69. Ajuste individual sin politica general genera problemas.",
          next: "hr-08"
        },
        {
          id: "C",
          label: "Negar el aumento - no hay presupuesto",
          description: "Si le subo a uno, todos van a pedir. No podemos abrir esa puerta.",
          cost: 0,
          revenue: 5000000,
          bsc: { bsc_financial: 4, bsc_customer: -3, bsc_internal: -8, bsc_learning: 3 },
          crossEffects: [],
          tags: ["stingy"],
          feedback: "\\u274c Costo de reemplazo: $8-12M (reclutamiento + capacitacion). El aumento costaba $4.8M/ano. Mas barato retener.\\n\\ud83d\\udcda Concepto: E(costo de rotacion) > costo de aumento cuando el empleado es clave.",
          next: "hr-08"
        },
        {
          id: "D",
          label: "Revisar TODA la escala salarial vs el sector",
          description: "El problema no es un empleado — es que toda la empresa paga bajo. Revision general.",
          cost: 15000000,
          revenue: 30000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 10, bsc_learning: 10 },
          crossEffects: [],
          tags: ["strategic"],
          feedback: "\\u2705 Si X\\u0304 empresa = $1.75M y \\u03bc sector = $2.05M, Z = -1.0. Tu empresa COMPLETA esta por debajo del mercado.\\n\\ud83d\\udcda Concepto: Comparar tu media muestral con el parametro del sector. Si Z < -1, tienes un problema sistemico.",
          next: "hr-08"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-08 | Dia 17 | Test de proporcion
       -------------------------------------------------------- */
    "hr-08": {
      id: "hr-08",
      day: 17,
      title: "3 operarios se enfermaron",
      context: "Esta semana faltaron 3 de 48 operarios por enfermedad. El supervisor dice que es normal. Tu tasa historica de ausentismo es 2% semanal.\\n\\n📊 DATOS:\\n• Operarios: 48\\n• Ausentes esta semana: 3\\n• p\\u0302 = 3/48 = 6.25%\\n• p historica = 2%\\n• Epoca de gripe en la region",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Investigar - 6.25% es el triple del normal",
          description: "Algo esta pasando. Puede ser brote de gripe, problema de ventilacion, o coincidencia.",
          cost: 3000000,
          revenue: 18000000,
          bsc: { bsc_financial: 4, bsc_customer: 4, bsc_internal: 8, bsc_learning: 7 },
          crossEffects: [],
          tags: ["proactive"],
          feedback: "\\u2705 Z = (0.0625-0.02)/\\u221a(0.02\\u00d70.98/48) = 0.0425/0.0202 = 2.10. P=0.018. Significativo al 5%!\\n\\ud83d\\udcda Concepto: Test de proporcion. La diferencia es estadisticamente significativa. No es coincidencia.",
          next: "hr-09"
        },
        {
          id: "B",
          label: "Es normal - epoca de gripe",
          description: "Es invierno, la gente se enferma. No exagerar.",
          cost: 0,
          revenue: 8000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: -4, bsc_learning: 3 },
          crossEffects: [],
          tags: ["dismissive"],
          feedback: "\\u274c Z=2.10 dice que NO es normal. Aunque la gripe sea la causa, actuar previene que empeore.\\n\\ud83d\\udcda Concepto: 'Es epoca de gripe' explica la causa pero no elimina el problema. Significativo = actua.",
          next: "hr-09"
        },
        {
          id: "C",
          label: "Implementar protocolo de salud preventivo",
          description: "Gel, tapabocas, ventilacion. Prevenir es mas barato que curar.",
          cost: 2000000,
          revenue: 15000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 8, bsc_learning: 6 },
          crossEffects: [],
          tags: ["preventive"],
          feedback: "\\u2705 Accion preventiva basada en la senal estadistica. Si p sigue subiendo la proxima semana, escalar medidas.\\n\\ud83d\\udcda Concepto: No esperes a que el problema crezca. Una proporcion anormal temprana es una alerta.",
          next: "hr-09"
        },
        {
          id: "D",
          label: "Esperar una semana mas de datos",
          description: "Una semana no es suficiente para concluir. Si la proxima tambien es alta, actuar.",
          cost: 0,
          revenue: 10000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: 3, bsc_learning: 6 },
          crossEffects: [],
          tags: ["analytical"],
          feedback: "\\ud83d\\udca1 Razonable pero arriesgado. Si es un brote, 1 semana mas de inaccion puede significar 10 ausentes.\\n\\ud83d\\udcda Concepto: Balance entre datos suficientes y urgencia de accion. Con Z=2.10, ya hay evidencia.",
          next: "hr-09"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-09 | Dia 18 | Media muestral como predictor
       -------------------------------------------------------- */
    "hr-09": {
      id: "hr-09",
      day: 18,
      title: "Practicantes de la UTP",
      context: "La UTP ofrece 5 practicantes de ingenieria industrial. Sin costo salarial pero hay que invertir en capacitacion y supervision.\\n\\n📊 DATOS HISTORICOS DE PRACTICANTES:\\n• Productividad promedio (6 cohortes): 70% de un operario regular\\n• Desviacion: 15%\\n• Costo de supervision por practicante: $800,000/mes\\n• Duracion: 6 meses",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Aceptar los 5 practicantes",
          description: "Mano de obra gratis al 70% de productividad. Los numeros dan.",
          cost: 4000000,
          revenue: 22000000,
          bsc: { bsc_financial: 6, bsc_customer: 4, bsc_internal: 5, bsc_learning: 10 },
          crossEffects: [],
          tags: ["growth"],
          feedback: "\\u2705 E(productividad) = 70% de operario = $1.4M de produccion. Costo = $800K. Neto = $600K/practicante/mes.\\n\\ud83d\\udcda Concepto: X\\u0304 historica como predictor. Con 6 cohortes, el 70% es estimacion razonable pero con \\u03c3=15%.",
          next: "hr-10"
        },
        {
          id: "B",
          label: "Aceptar 2 como prueba",
          description: "Empezar con 2, si funcionan, pedir mas el proximo semestre.",
          cost: 1600000,
          revenue: 15000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 5, bsc_learning: 7 },
          crossEffects: [],
          tags: ["cautious"],
          feedback: "\\u2705 Reduces riesgo. Si estos 2 rinden bien, datos propios refuerzan la decision de ampliar.\\n\\ud83d\\udcda Concepto: Muestra piloto. Recoges datos de TU contexto antes de escalar.",
          next: "hr-10"
        },
        {
          id: "C",
          label: "Rechazar - los practicantes mas estorban que ayudan",
          description: "Hay que ensernarles todo. Los supervisores pierden tiempo.",
          cost: 0,
          revenue: 5000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: 3, bsc_learning: -5 },
          crossEffects: [],
          tags: ["skeptical"],
          feedback: "\\u26a0\\ufe0f Con X\\u0304=70% y \\u03c3=15%, P(productividad < 50%) = P(Z < -1.33) = 9%. Solo 9% de chance de que sean malos.\\n\\ud83d\\udcda Concepto: Usa los datos para decidir, no la intuicion. 6 cohortes dicen que funcionan en promedio.",
          next: "hr-10"
        },
        {
          id: "D",
          label: "Aceptar pero con KPIs claros desde el dia 1",
          description: "Contrato con metas: producir al menos 60% de un operario regular o se van.",
          cost: 4000000,
          revenue: 25000000,
          bsc: { bsc_financial: 6, bsc_customer: 4, bsc_internal: 7, bsc_learning: 8 },
          crossEffects: [],
          tags: ["structured"],
          feedback: "\\u2705 Excelente. Defines umbral minimo basado en datos: \\u03bc - \\u03c3 = 70% - 15% = 55%. Pedir 60% es razonable.\\n\\ud83d\\udcda Concepto: Usar \\u03bc y \\u03c3 para definir umbrales realistas. 1\\u03c3 debajo de la media = percentil 16.",
          next: "hr-10"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-10 | Dia 20 | Comparar dos grupos
       -------------------------------------------------------- */
    "hr-10": {
      id: "hr-10",
      day: 20,
      title: "Conflicto entre supervisores",
      context: "Dos supervisores se echan la culpa de la baja productividad. Mides sus equipos por separado.\\n\\n📊 EQUIPO SUPERVISOR A (n=25):\\n• Produccion promedio: 1,150 piezas/dia\\n• Desviacion: 180 piezas\\n\\n📊 EQUIPO SUPERVISOR B (n=23):\\n• Produccion promedio: 1,020 piezas/dia\\n• Desviacion: 200 piezas",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Los datos muestran que B es peor - tomar accion",
          description: "130 piezas de diferencia es significativa. B necesita mejorar o ser reemplazado.",
          cost: 5000000,
          revenue: 22000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 7, bsc_learning: 6 },
          crossEffects: [],
          tags: ["decisive"],
          feedback: "\\u2705 SE = \\u221a(180\\u00b2/25 + 200\\u00b2/23) = \\u221a(1296+1739) = 55.1. Z = 130/55.1 = 2.36. P=0.009. Significativo!\\n\\ud83d\\udcda Concepto: Diferencia de medias. Z=2.36 confirma que la diferencia NO es azar. Hay problema real en equipo B.",
          next: "hr-11"
        },
        {
          id: "B",
          label: "Investigar CAUSAS antes de culpar al supervisor",
          description: "Puede ser maquinaria, materiales, turno, experiencia del personal...",
          cost: 3000000,
          revenue: 20000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 8, bsc_learning: 8 },
          crossEffects: [],
          tags: ["analytical"],
          feedback: "\\u2705 Correcto. Z=2.36 dice que HAY diferencia pero no dice POR QUE. Puede ser el supervisor o variables confusoras.\\n\\ud83d\\udcda Concepto: Significancia estadistica \\u2260 causalidad. Antes de atribuir causa, controla variables confusoras.",
          next: "hr-11"
        },
        {
          id: "C",
          label: "Rotar los equipos y medir de nuevo",
          description: "Que A supervise al equipo de B y viceversa. Si el patron se repite, es el supervisor.",
          cost: 3000000,
          revenue: 18000000,
          bsc: { bsc_financial: 4, bsc_customer: 4, bsc_internal: 6, bsc_learning: 10 },
          crossEffects: [],
          tags: ["experimental"],
          feedback: "\\u2705 Diseno experimental perfecto! Controlas la variable 'equipo' y aislas el efecto 'supervisor'.\\n\\ud83d\\udcda Concepto: Experimento controlado. Rotar elimina variables confusoras y establece causalidad.",
          next: "hr-11"
        },
        {
          id: "D",
          label: "No es significativo - 130 piezas es poco",
          description: "De 1,100 piezas, 130 es solo 12%. No vale la pena el conflicto.",
          cost: 0,
          revenue: 8000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: -5, bsc_learning: -3 },
          crossEffects: [],
          tags: ["dismissive"],
          feedback: "\\u274c Z=2.36, p=0.009. ES significativo. 130 piezas \\u00d7 22 dias \\u00d7 $2,500 = $7.15M/mes de diferencia. Nada despreciable.\\n\\ud83d\\udcda Concepto: No confundas porcentaje con significancia. El SE determina si la diferencia es real, no tu intuicion.",
          next: "hr-11"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-11 | Dia 22 | Combinar estimaciones
       -------------------------------------------------------- */
    "hr-11": {
      id: "hr-11",
      day: 22,
      title: "Evaluacion de desempeno anual",
      context: "Disenas la evaluacion anual. Tres metricas disponibles: produccion, calidad y puntualidad. \\u00bfComo combinarlas en una nota final justa?\\n\\n📊 DATOS (48 operarios):\\n• Produccion: \\u03bc=1100 piezas, \\u03c3=150\\n• Calidad: \\u03bc=95% sin defectos, \\u03c3=3%\\n• Puntualidad: \\u03bc=92%, \\u03c3=8%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Promedio simple de las 3 metricas (estandarizadas)",
          description: "Convertir a Z-scores y promediar. Todas pesan igual.",
          cost: 2000000,
          revenue: 18000000,
          bsc: { bsc_financial: 4, bsc_customer: 4, bsc_internal: 7, bsc_learning: 8 },
          crossEffects: [],
          tags: ["fair"],
          feedback: "\\u2705 Z-score estandariza: Zi = (Xi-\\u03bci)/\\u03c3i. Pone todas las metricas en la misma escala.\\n\\ud83d\\udcda Concepto: Z-score permite comparar metricas en diferentes unidades. Promedio de Z = nota integrada.",
          next: "hr-12"
        },
        {
          id: "B",
          label: "Ponderado: 50% produccion, 30% calidad, 20% puntualidad",
          description: "Produccion es lo que genera plata. Debe pesar mas.",
          cost: 3000000,
          revenue: 22000000,
          bsc: { bsc_financial: 6, bsc_customer: 4, bsc_internal: 8, bsc_learning: 6 },
          crossEffects: [],
          tags: ["strategic"],
          feedback: "\\u2705 Promedio ponderado: Nota = 0.5\\u00d7Zprod + 0.3\\u00d7Zcal + 0.2\\u00d7Zpunt. Refleja prioridades del negocio.\\n\\ud83d\\udcda Concepto: Promedios ponderados. Los pesos deben reflejar la importancia relativa de cada metrica.",
          next: "hr-12"
        },
        {
          id: "C",
          label: "Solo produccion - lo demas es subjetivo",
          description: "Piezas producidas es objetivo y medible. Lo unico que cuenta.",
          cost: 1000000,
          revenue: 12000000,
          bsc: { bsc_financial: 4, bsc_customer: -3, bsc_internal: -4, bsc_learning: -3 },
          crossEffects: [],
          tags: ["simplistic"],
          feedback: "\\u274c Calidad (\\u03c3=3%) y puntualidad (\\u03c3=8%) son tan medibles como produccion. Ignorarlas incentiva cantidad sin calidad.\\n\\ud83d\\udcda Concepto: Optimizar UNA metrica ignorando otras genera distorsiones. Multidimensional > unidimensional.",
          next: "hr-12"
        },
        {
          id: "D",
          label: "Que el supervisor evalue cualitativamente",
          description: "Los numeros no capturan todo. El supervisor conoce a su gente.",
          cost: 1000000,
          revenue: 8000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: -5, bsc_learning: -5 },
          crossEffects: [],
          tags: ["subjective"],
          feedback: "\\u274c Tienes datos OBJETIVOS y propones evaluacion subjetiva. Sesgo garantizado.\\n\\ud83d\\udcda Concepto: Datos cuantitativos > opinion cuando los datos existen. Estandariza con Z y pondera.",
          next: "hr-12"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-12 | Dia 24 | Percentiles y metas
       -------------------------------------------------------- */
    "hr-12": {
      id: "hr-12",
      day: 24,
      title: "Plan de incentivos 2027",
      context: "Disenas el plan de bonos para el proximo ano. Necesitas umbrales basados en datos, no en opinion.\\n\\n📊 DATOS DE PRODUCCION 2026 (distribucion normal):\\n• \\u03bc = 1,100 piezas/mes\\n• \\u03c3 = 150 piezas/mes\\n• Presupuesto de bonos: $20M\\n• 48 operarios",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Bono al top 25% (P75 = 1,201 piezas)",
          description: "12 operarios reciben bono de $1.67M cada uno. Alcanzable y motivador.",
          cost: 20000000,
          revenue: 30000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 10, bsc_learning: 7 },
          crossEffects: [],
          tags: ["balanced"],
          feedback: "\\u2705 P75 = \\u03bc + 0.6745\\u03c3 = 1,201. 25% del equipo lo alcanza. Buen equilibrio motivacion/presupuesto.\\n\\ud83d\\udcda Concepto: Percentiles para fijar umbrales. P75 es alcanzable para 1 de cada 4. Suficiente para motivar.",
          next: null
        },
        {
          id: "B",
          label: "Bono escalonado: bronce (P60), plata (P75), oro (P90)",
          description: "3 niveles de bono. Mas operarios motivados a distintos niveles.",
          cost: 20000000,
          revenue: 35000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 10, bsc_learning: 10 },
          crossEffects: [],
          tags: ["sophisticated"],
          feedback: "\\u2705 P60=1,138, P75=1,201, P90=1,292. 40% recibe algo. Maximiza motivacion con presupuesto fijo.\\n\\ud83d\\udcda Concepto: Multiples percentiles como umbrales. Cada nivel corresponde a un Z-score especifico.",
          next: null
        },
        {
          id: "C",
          label: "Bono para todos los que superen la media",
          description: "Premiar a la mitad superior. $833K por persona.",
          cost: 20000000,
          revenue: 22000000,
          bsc: { bsc_financial: 3, bsc_customer: 4, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["generous"],
          feedback: "\\u26a0\\ufe0f 24 operarios \\u00d7 $833K. El monto individual es bajo y no se siente como premio. Diluyes el incentivo.\\n\\ud83d\\udcda Concepto: El 50% siempre esta arriba del promedio en una normal. 'Superar la media' no es excepcional.",
          next: null
        },
        {
          id: "D",
          label: "Sin bonos fijos - pagar por pieza extra sobre la media",
          description: "Cada pieza por encima de 1,100 paga $5,000 extra. Incentivo marginal.",
          cost: 20000000,
          revenue: 28000000,
          bsc: { bsc_financial: 6, bsc_customer: 4, bsc_internal: 7, bsc_learning: 6 },
          crossEffects: [],
          tags: ["variable"],
          feedback: "\\ud83d\\udca1 Incentivo continuo. E(bono) = E(piezas extra) \\u00d7 $5K. Cada operario tiene su propio objetivo.\\n\\ud83d\\udcda Concepto: Incentivo variable alinea esfuerzo con recompensa. El E(bono) depende de cada trabajador.",
          next: null
        }
      ]
    }`,

  dat: `
    /* --------------------------------------------------------
       DAT-07 | Dia 15 | Error estandar como ruido
       -------------------------------------------------------- */
    "dat-07": {
      id: "dat-07",
      day: 15,
      title: "Dashboard en tiempo real",
      context: "La gerencia quiere un dashboard que muestre KPIs en tiempo real. Pero los datos fluctuan mucho hora a hora.\\n\\n📊 DATOS EJEMPLO (ventas por hora, hoy):\\n• 8am: $2.1M | 9am: $4.8M | 10am: $3.2M | 11am: $5.1M\\n• Promedio: $3.8M/hora\\n• Desviacion: $1.3M\\n• SE = $1.3M/\\u221a4 = $0.65M",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Mostrar promedios moviles, no datos crudos",
          description: "Promedio de 4 horas suaviza el ruido. Tendencia real mas visible.",
          cost: 8000000,
          revenue: 25000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 8, bsc_learning: 8 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 El promedio movil reduce \\u03c3 por factor \\u221an. Con n=4 horas, SE = $0.65M vs \\u03c3 = $1.3M. La mitad de ruido.\\n\\ud83d\\udcda Concepto: Error estandar = ruido de la estimacion. SE = \\u03c3/\\u221an. Mas observaciones = menos ruido.",
          next: "dat-08"
        },
        {
          id: "B",
          label: "Datos en crudo actualizados cada minuto",
          description: "Tiempo real significa tiempo real. Sin suavizar.",
          cost: 12000000,
          revenue: 18000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: 4, bsc_learning: 5 },
          crossEffects: [],
          tags: ["noisy"],
          feedback: "\\u274c Datos crudos = ruido + senal mezclados. La gerencia vera fluctuaciones y entrara en panico por nada.\\n\\ud83d\\udcda Concepto: Variabilidad natural (\\u03c3) \\u2260 problema real. Sin filtro, todo parece urgente.",
          next: "dat-08"
        },
        {
          id: "C",
          label: "Dashboard con bandas de confianza",
          description: "Promedio + IC en tiempo real. Si el dato sale de las bandas, alerta.",
          cost: 15000000,
          revenue: 30000000,
          bsc: { bsc_financial: 6, bsc_customer: 6, bsc_internal: 8, bsc_learning: 10 },
          crossEffects: [],
          tags: ["sophisticated"],
          feedback: "\\u2705 Alertas solo cuando el dato sale del IC = deteccion de anomalias reales, no ruido.\\n\\ud83d\\udcda Concepto: Control estadistico de procesos. La banda \\u03bc\\u00b12\\u03c3 captura 95% del ruido normal.",
          next: "dat-08"
        },
        {
          id: "D",
          label: "Reporte diario en vez de dashboard en vivo",
          description: "Un resumen al final del dia es mas util que numeros saltando cada minuto.",
          cost: 3000000,
          revenue: 15000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 5, bsc_learning: 4 },
          crossEffects: [],
          tags: ["simple"],
          feedback: "\\ud83d\\udca1 n=8 horas da SE = $1.3/\\u221a8 = $0.46M. Mucho mas estable que hora a hora. Pero pierdes inmediatez.\\n\\ud83d\\udcda Concepto: Trade-off entre frecuencia y precision. Mas datos por periodo = menor SE = mejor estimacion.",
          next: "dat-08"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-08 | Dia 17 | Estimacion de tendencia
       -------------------------------------------------------- */
    "dat-08": {
      id: "dat-08",
      day: 17,
      title: "Prediccion de ventas para enero",
      context: "Enero historicamente es el mes mas flojo. La gerencia quiere saber cuanto esperar.\\n\\n📊 VENTAS DE ENERO (ultimos 5 anos):\\n• 2022: $120M | 2023: $135M | 2024: $142M | 2025: $155M | 2026: $160M\\n• Promedio: $142.4M, Desviacion: $15.8M\\n• Tendencia: +$10M por ano aprox",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Proyectar con tendencia: $170M para enero 2027",
          description: "La tendencia sube $10M/ano. 2026 fue $160M, asi que 2027 = $170M.",
          cost: 3000000,
          revenue: 25000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 6, bsc_learning: 7 },
          crossEffects: [],
          tags: ["trend-based"],
          feedback: "\\u2705 Proyeccion con tendencia lineal. Pero con solo n=5, la incertidumbre es alta. SE de la pendiente es grande.\\n\\ud83d\\udcda Concepto: Estimacion de tendencia. Con n pequeno, la tendencia es estimacion burda. Acompanar con IC.",
          next: "dat-09"
        },
        {
          id: "B",
          label: "Usar el promedio historico: $142M",
          description: "Mejor no extrapolar. El promedio de 5 anos es mas seguro.",
          cost: 2000000,
          revenue: 18000000,
          bsc: { bsc_financial: 4, bsc_customer: 4, bsc_internal: 5, bsc_learning: 5 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "\\u26a0\\ufe0f Ignoras la tendencia creciente. Con 5 datos consecutivos al alza, el promedio SUBESTIMA el futuro.\\n\\ud83d\\udcda Concepto: El promedio simple ignora tendencia. Si hay patron temporal, la media no es buen predictor.",
          next: "dat-09"
        },
        {
          id: "C",
          label: "Dar rango: entre $155M y $185M",
          description: "Proyeccion central $170M con margen de \\u00b1$15M.",
          cost: 5000000,
          revenue: 28000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 7, bsc_learning: 8 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 IC informativo. Punto central + rango da mejor informacion que un solo numero.\\n\\ud83d\\udcda Concepto: Toda proyeccion debe tener intervalo. SE con n=5 es grande, el rango lo refleja honestamente.",
          next: "dat-09"
        },
        {
          id: "D",
          label: "Pedir datos mensuales de los 5 anos (60 meses) para modelo",
          description: "5 puntos no alcanzan. Con 60 meses se puede modelar estacionalidad completa.",
          cost: 8000000,
          revenue: 32000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 10 },
          crossEffects: [],
          tags: ["thorough"],
          feedback: "\\u2705 Con n=60 puedes estimar estacionalidad + tendencia + variabilidad por mes. Mucho mas robusto.\\n\\ud83d\\udcda Concepto: Mas datos = mejor modelo. De 5 a 60 observaciones cambia dramaticamente la precision.",
          next: "dat-09"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-09 | Dia 18 | Intervalo de confianza unilateral
       -------------------------------------------------------- */
    "dat-09": {
      id: "dat-09",
      day: 18,
      title: "Cliente pide garantia de calidad",
      context: "Exito quiere que garantices <2% de defectos. Tu tasa actual medida en 500 paquetes: 9 defectuosos = 1.8%.\\n\\n📊 DATOS:\\n• n = 500, defectos = 9\\n• p\\u0302 = 1.8%\\n• SE = \\u221a(0.018\\u00d70.982/500) = 0.59%\\n• IC 95% unilateral superior: p\\u0302 + 1.645\\u00d7SE = 2.77%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Firmar garantia de <2% - estamos en 1.8%",
          description: "1.8% < 2%. Cumplimos. Firmar.",
          cost: 5000000,
          revenue: 35000000,
          bsc: { bsc_financial: -3, bsc_customer: 5, bsc_internal: 3, bsc_learning: 4 },
          crossEffects: [],
          tags: ["risky"],
          feedback: "\\u274c El IC unilateral dice que p real podria ser hasta 2.77%. Firmaste garantia que probablemente incumples.\\n\\ud83d\\udcda Concepto: IC unilateral. El limite superior al 95% es 2.77% > 2%. No puedes garantizar <2% con estos datos.",
          next: "dat-10"
        },
        {
          id: "B",
          label: "No firmar hasta mejorar el proceso",
          description: "1.8% esta cerca del 2%. Primero bajar a 1% y luego firmar con confianza.",
          cost: 10000000,
          revenue: 30000000,
          bsc: { bsc_financial: 5, bsc_customer: 6, bsc_internal: 8, bsc_learning: 7 },
          crossEffects: [],
          tags: ["prudent"],
          feedback: "\\u2705 Con p\\u0302=1.0% y n=500, IC unilateral = 1.0% + 1.645\\u00d70.45% = 1.74% < 2%. Ahora SI puedes garantizar.\\n\\ud83d\\udcda Concepto: Para garantizar un umbral, el IC unilateral debe estar por debajo. Mejora p antes de prometer.",
          next: "dat-10"
        },
        {
          id: "C",
          label: "Firmar garantia de <3% en vez de <2%",
          description: "Negociar un limite mas realista. 3% es alcanzable con confianza.",
          cost: 3000000,
          revenue: 28000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 6, bsc_learning: 6 },
          crossEffects: [],
          tags: ["negotiation"],
          feedback: "\\u2705 IC unilateral al 95% = 2.77% < 3%. Puedes firmar <3% con 95% de confianza.\\n\\ud83d\\udcda Concepto: Negocia el umbral basado en tu IC. Si no puedes garantizar 2%, ofrece lo que tus datos respaldan.",
          next: "dat-10"
        },
        {
          id: "D",
          label: "Aumentar muestra a 2,000 paquetes para IC mas estrecho",
          description: "Con n=2000, el IC se estrecha y puedes responder con mas certeza.",
          cost: 5000000,
          revenue: 32000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["analytical"],
          feedback: "\\u2705 Con n=2000, SE = 0.30%. IC unilateral = 1.8% + 1.645\\u00d70.30% = 2.29%. Sigue > 2%. Necesitas mejorar p, no solo n.\\n\\ud83d\\udcda Concepto: Mas muestra estrecha IC pero no cambia p\\u0302. Si p real es ~1.8%, nunca garantizas <2% solo con mas n.",
          next: "dat-10"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-10 | Dia 20 | Variabilidad muestral
       -------------------------------------------------------- */
    "dat-10": {
      id: "dat-10",
      day: 20,
      title: "Datos de encuesta contradictorios",
      context: "Dos encuestas de satisfaccion dan resultados diferentes. \\u00bfCual creer?\\n\\n📊 ENCUESTA A (presencial en tiendas):\\n• n = 80, satisfechos = 72, p\\u0302 = 90%\\n\\n📊 ENCUESTA B (online via WhatsApp):\\n• n = 200, satisfechos = 152, p\\u0302 = 76%\\n\\nDiferencia: 14 puntos porcentuales. \\u00bfError de medicion o diferencia real?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Confiar en la encuesta B (n mas grande)",
          description: "n=200 > n=80. Mayor muestra, mayor precision.",
          cost: 3000000,
          revenue: 22000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 5, bsc_learning: 6 },
          crossEffects: [],
          tags: ["practical"],
          feedback: "\\u26a0\\ufe0f Tamano no lo es todo. La encuesta presencial puede tener sesgo de cortesia (la gente dice 'si' de frente).\\n\\ud83d\\udcda Concepto: Variabilidad muestral Y sesgo. n grande reduce SE pero no elimina sesgo sistematico.",
          next: "dat-11"
        },
        {
          id: "B",
          label: "Las dos miden cosas diferentes - no son comparables",
          description: "Presencial vs online captura poblaciones distintas. Ambas son validas en su contexto.",
          cost: 2000000,
          revenue: 20000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 10 },
          crossEffects: [],
          tags: ["analytical"],
          feedback: "\\u2705 Correcto! Diferentes metodos = diferentes sesgos = diferentes estimaciones. p\\u0302 depende del COMO se mide.\\n\\ud83d\\udcda Concepto: Variabilidad entre estudios \\u2260 error. Diferentes muestras pueden estimar parametros DIFERENTES.",
          next: "dat-11"
        },
        {
          id: "C",
          label: "Promediar: (90%+76%)/2 = 83%",
          description: "Promedio de las dos. La verdad esta en el medio.",
          cost: 1000000,
          revenue: 15000000,
          bsc: { bsc_financial: 4, bsc_customer: 4, bsc_internal: 4, bsc_learning: 4 },
          crossEffects: [],
          tags: ["simplistic"],
          feedback: "\\u26a0\\ufe0f Promediar sin ponderar por precision ni ajustar por sesgo mezcla manzanas con naranjas.\\n\\ud83d\\udcda Concepto: Promedio ponderado por inverso de varianza es mejor. Y si hay sesgo, primero corregirlo.",
          next: "dat-11"
        },
        {
          id: "D",
          label: "Hacer una tercera encuesta con metodologia hibrida",
          description: "Disenar una encuesta que combine presencial y online con muestreo aleatorio.",
          cost: 8000000,
          revenue: 28000000,
          bsc: { bsc_financial: 4, bsc_customer: 5, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["thorough"],
          feedback: "\\u2705 Muestreo aleatorio + metodo estandarizado reduce AMBOS: sesgo y variabilidad muestral.\\n\\ud83d\\udcda Concepto: El diseno de la encuesta importa tanto como el tamano. Aleatorio + estandarizado = gold standard.",
          next: "dat-11"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-11 | Dia 22 | Intervalos de prediccion
       -------------------------------------------------------- */
    "dat-11": {
      id: "dat-11",
      day: 22,
      title: "Modelo de costos vs realidad",
      context: "Tu modelo predijo costos de $145M para noviembre. La realidad fue $162M. \\u00bfEl modelo esta malo?\\n\\n📊 DATOS DEL MODELO:\\n• Prediccion: $145M\\n• Realidad: $162M\\n• Diferencia: +$17M (11.7% mas)\\n• \\u03c3 del modelo (historico): $12M\\n• Intervalo de prediccion 95%: $145M \\u00b1 $23.5M = [$121.5M, $168.5M]",
      type: "choice",
      options: [
        {
          id: "A",
          label: "El modelo esta bien - $162M cae dentro del intervalo",
          description: "$162M esta dentro de [$121.5M, $168.5M]. No hay evidencia de falla.",
          cost: 3000000,
          revenue: 22000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["analytical"],
          feedback: "\\u2705 Correcto. Z = (162-145)/12 = 1.42. P(Z>1.42) = 7.8%. No es extremo. Dentro de lo esperado.\\n\\ud83d\\udcda Concepto: Intervalo de prediccion incluye incertidumbre del modelo. Si el dato cae dentro, el modelo no fallo.",
          next: "dat-12"
        },
        {
          id: "B",
          label: "El modelo subestima - hay que recalibrarlo",
          description: "$17M de diferencia es mucho. Algo cambio que el modelo no captura.",
          cost: 10000000,
          revenue: 25000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 7, bsc_learning: 6 },
          crossEffects: [],
          tags: ["cautious"],
          feedback: "\\u26a0\\ufe0f $17M suena mucho pero Z=1.42 dice que es fluctuacion normal. Recalibrar por UN dato atipico es sobreajustar.\\n\\ud83d\\udcda Concepto: No recalibres por un solo dato. Si 3+ meses consecutivos salen arriba, ahi si hay tendencia.",
          next: "dat-12"
        },
        {
          id: "C",
          label: "Monitorear los proximos 3 meses antes de decidir",
          description: "Un mes no es patron. Si diciembre y enero tambien salen altos, hay problema.",
          cost: 2000000,
          revenue: 20000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 6, bsc_learning: 8 },
          crossEffects: [],
          tags: ["data-driven"],
          feedback: "\\u2705 Excelente. Un dato no es tendencia. Si 3 meses consecutivos salen por encima, P(3 consecutivos por azar) es baja.\\n\\ud83d\\udcda Concepto: Distinguir senal de ruido requiere multiples observaciones. Un dato fuera de lo esperado puede ser azar.",
          next: "dat-12"
        },
        {
          id: "D",
          label: "Descartar el modelo y usar promedios simples",
          description: "Si el modelo falla $17M, mejor usar el promedio historico.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: -3, bsc_learning: -5 },
          crossEffects: [],
          tags: ["regressive"],
          feedback: "\\u274c El modelo NO fallo. $162M esta dentro del intervalo. Tirarlo por un dato normal es destruir valor.\\n\\ud83d\\udcda Concepto: Evalua modelos con el intervalo de prediccion, no con un solo dato. Todo modelo tiene error.",
          next: "dat-12"
        }
      ]
    },

    /* --------------------------------------------------------
       DAT-12 | Dia 24 | Sintesis de metodos estadisticos
       -------------------------------------------------------- */
    "dat-12": {
      id: "dat-12",
      day: 24,
      title: "Reporte final para inversionistas",
      context: "El inversionista de Bogota pide tu reporte final antes de decidir si invierte. Necesitas presentar el desempeno de PlataniCracks con rigor.\\n\\n📊 RESUMEN DEL ANO:\\n• Ventas: X\\u0304=$285M/mes, s=$42M, n=12\\n• Defectos: 1.8%, n=500\\n• Satisfaccion: 78%, n=300\\n• Crecimiento: 8% anual",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Reporte con IC para cada KPI y analisis integrado",
          description: "Cada metrica con su intervalo de confianza, escenarios y proyecciones.",
          cost: 10000000,
          revenue: 38000000,
          bsc: { bsc_financial: 10, bsc_customer: 8, bsc_internal: 8, bsc_learning: 10 },
          crossEffects: [],
          tags: ["professional"],
          feedback: "\\u2705 IC ventas: [$258M, $312M]. IC defectos: [0.6%, 3.0%]. IC satisfaccion: [73%, 83%]. Cada KPI con su precision.\\n\\ud83d\\udcda Concepto: Sintesis estadistica. Todo lo del semestre en un reporte: IC, proporciones, diferencias, estimaciones.",
          next: null
        },
        {
          id: "B",
          label: "Solo los numeros headline sin intervalos",
          description: "Ventas $285M, defectos 1.8%, satisfaccion 78%, crecimiento 8%. Limpio y directo.",
          cost: 3000000,
          revenue: 20000000,
          bsc: { bsc_financial: 3, bsc_customer: 3, bsc_internal: 3, bsc_learning: -5 },
          crossEffects: [],
          tags: ["simplistic"],
          feedback: "\\u274c Un inversionista serio preguntara '\\u00bfcon que confianza?' y '\\u00bfcual es el peor escenario?'. Sin IC no hay respuesta.\\n\\ud83d\\udcda Concepto: Estimacion sin incertidumbre es incompleta. El inversionista necesita el rango, no solo el punto.",
          next: null
        },
        {
          id: "C",
          label: "Presentacion optimista enfocada en crecimiento",
          description: "Resaltar el 8% de crecimiento y el potencial futuro. Los inversionistas quieren vision.",
          cost: 5000000,
          revenue: 25000000,
          bsc: { bsc_financial: 5, bsc_customer: 5, bsc_internal: 4, bsc_learning: 3 },
          crossEffects: [],
          tags: ["marketing-style"],
          feedback: "\\u26a0\\ufe0f Presentar solo lo bueno destruye credibilidad. Un inversionista detecta cherry-picking de datos.\\n\\ud83d\\udcda Concepto: Presentar datos completos (buenos y malos) con IC genera mas confianza que solo lo positivo.",
          next: null
        },
        {
          id: "D",
          label: "Dashboard interactivo con datos en vivo",
          description: "Acceso en tiempo real a todos los datos. Que el inversionista explore por su cuenta.",
          cost: 15000000,
          revenue: 33000000,
          bsc: { bsc_financial: 6, bsc_customer: 7, bsc_internal: 6, bsc_learning: 7 },
          crossEffects: [],
          tags: ["tech-forward"],
          feedback: "\\ud83d\\udca1 Impresionante pero necesita narracion. Datos sin interpretacion son numeros. Combina dashboard + analisis narrativo.\\n\\ud83d\\udcda Concepto: Los datos cuentan una historia solo si alguien la narra con contexto estadistico adecuado.",
          next: null
        }
      ]
    }`,
};

// Process each file
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const prefix = prefixes[i];
  const filePath = path.join(baseDir, file);

  let content = fs.readFileSync(filePath, 'utf8');

  // --- A) MOVE DAYS ---
  // Find node 05 (day: 16 -> day: 12) and node 06 (day: 21 -> day: 14)
  // We need to be careful to only change the correct day values
  // Node 05 has prefix-05 near it
  const node05Regex = new RegExp(`"${prefix}-05":\\s*\\{[^}]*day:\\s*16`, 's');
  if (node05Regex.test(content)) {
    // Replace day: 16 that's in node 05
    content = content.replace(
      new RegExp(`("${prefix}-05":\\s*\\{\\s*id:\\s*"${prefix}-05",\\s*day:\\s*)16`),
      '$112'
    );
  }

  const node06Regex = new RegExp(`"${prefix}-06":\\s*\\{[^}]*day:\\s*21`, 's');
  if (node06Regex.test(content)) {
    content = content.replace(
      new RegExp(`("${prefix}-06":\\s*\\{\\s*id:\\s*"${prefix}-06",\\s*day:\\s*)21`),
      '$114'
    );
  }

  // --- B) BOOST REVENUES and BSC on nodes 04, 05, 06 ---
  // We need to process nodes 04, 05, 06 specifically
  for (let nodeNum = 4; nodeNum <= 6; nodeNum++) {
    const nodeId = `${prefix}-0${nodeNum}`;

    // Find the node block
    const nodeStartIdx = content.indexOf(`"${nodeId}":`);
    if (nodeStartIdx === -1) continue;

    // Find the end of this node (next node or end of nodes object)
    let depth = 0;
    let nodeEndIdx = nodeStartIdx;
    let foundFirstBrace = false;
    for (let j = nodeStartIdx; j < content.length; j++) {
      if (content[j] === '{') {
        depth++;
        foundFirstBrace = true;
      }
      if (content[j] === '}') {
        depth--;
        if (foundFirstBrace && depth === 0) {
          nodeEndIdx = j + 1;
          break;
        }
      }
    }

    let nodeBlock = content.substring(nodeStartIdx, nodeEndIdx);

    // Double revenues (if 0, set to cost * 0.3)
    // Find all options in this node
    nodeBlock = nodeBlock.replace(/cost:\s*(\d+),\s*\n(\s*)revenue:\s*(\d+)/g, (match, cost, indent, revenue) => {
      const costNum = parseInt(cost);
      const revNum = parseInt(revenue);
      let newRev;
      if (revNum === 0) {
        newRev = Math.round(costNum * 0.3);
      } else {
        newRev = revNum * 2;
      }
      return `cost: ${costNum},\n${indent}revenue: ${newRev}`;
    });

    // Boost BSC: add +3 to every positive value
    nodeBlock = nodeBlock.replace(/bsc:\s*\{([^}]+)\}/g, (match, bscContent) => {
      const boosted = bscContent.replace(/(bsc_\w+):\s*(-?\d+)/g, (m, key, val) => {
        const v = parseInt(val);
        if (v > 0) {
          return `${key}: ${v + 3}`;
        }
        return m;
      });
      return `bsc: {${boosted}}`;
    });

    content = content.substring(0, nodeStartIdx) + nodeBlock + content.substring(nodeEndIdx);
  }

  // --- C) CHANGE CHAIN: next: null -> next: "XXX-07" in node 06 ---
  const node06Id = `${prefix}-06`;
  const node06Start = content.indexOf(`"${node06Id}":`);
  if (node06Start !== -1) {
    // Find end of node 06
    let depth = 0;
    let node06End = node06Start;
    let foundFirst = false;
    for (let j = node06Start; j < content.length; j++) {
      if (content[j] === '{') { depth++; foundFirst = true; }
      if (content[j] === '}') { depth--; if (foundFirst && depth === 0) { node06End = j + 1; break; } }
    }

    let node06Block = content.substring(node06Start, node06End);
    node06Block = node06Block.replace(/next:\s*null/g, `next: "${prefix}-07"`);
    content = content.substring(0, node06Start) + node06Block + content.substring(node06End);
  }

  // --- D) ADD NEW NODES ---
  // Insert before the final closing of nodes and the tree
  // Find the pattern: closing of node 06 (}) then optional whitespace then } (closing nodes) then }; (closing window.TREE_X)
  // We need to insert after the closing of node 06

  const newNodesContent = newNodes[prefix];

  // Find the last node's closing brace, then the nodes closing brace, then the tree closing
  // Pattern: the file ends with something like:
  //     }  // close node 06
  //   }  // close nodes
  // };  // close tree

  // Find "  }\n};" at end of file
  const endPattern = /(\s*\}\s*\n\s*\}\s*\n\};?\s*)$/;
  const endMatch = content.match(endPattern);

  if (endMatch) {
    const insertPos = content.length - endMatch[0].length;
    // We need to insert after node 06 closes but before nodes closes
    // Actually let's find the exact position more carefully

    // The structure is:
    //     }     <- end of node 06 options array
    //   }       <- end of node 06
    //           <- we want to insert new nodes here
    //   }       <- end of nodes object
    // };        <- end of tree

    // Find the last two closing braces before };
    const trimmed = content.trimEnd();
    // Should end with }; or just }

    // Let's find the position of the `  }\n};` at the very end
    const closingNodesIdx = content.lastIndexOf('\n  }\n};');
    if (closingNodesIdx !== -1) {
      // Insert the new nodes content right before `\n  }\n};`
      // But we need it after node 06 closes
      content = content.substring(0, closingNodesIdx) + ',\n' + newNodesContent + '\n  }\n};' + '\n';
    } else {
      // Try alternative pattern
      const alt = content.lastIndexOf('}\n};');
      if (alt !== -1) {
        content = content.substring(0, alt) + '},\n' + newNodesContent + '\n  }\n};\n';
      }
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed: ${file}`);
}

console.log('All files processed!');
