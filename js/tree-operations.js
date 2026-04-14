/* ============================================================
   TREE-OPERATIONS - Arbol de decisiones del COO (Dir. Operaciones)
   PlataniWars: Simulador Gerencial Estadistico
   ============================================================ */
window.TREE_OPERATIONS = {
  name: "Operaciones",
  icon: "🏭",
  startNode: "ops-01",
  nodes: {

    /* --------------------------------------------------------
       OPS-01 | Dia 1 | Distribucion muestral de medias, Z-score
       -------------------------------------------------------- */
    "ops-01": {
      id: "ops-01",
      day: 1,
      title: "Control de peso en la linea de empaque",
      context: "Tu equipo de calidad detecto quejas de consumidores reportando paquetes 'livianos'. Mandaste a pesar una muestra de la linea de empaque.\n\n📊 DATOS:\n• Muestra: 50 paquetes\n• Peso promedio muestral: 97g\n• Desviacion estandar poblacional: 8g\n• Estandar de la empresa: 100g +/- 5g\n\nEl tecnico dice 'es normal, siempre varia un poco'. ¿Que decide el Director de Operaciones?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Parar produccion y calibrar la maquina",
          description: "Detenemos la linea 4 horas, el tecnico recalibra el dosificador. Costo de parada + mano de obra.",
          cost: 15000000,
          revenue: 18000000,
          bsc: { bsc_internal: 8, bsc_customer: 5, bsc_financial: -2, bsc_learning: 3 },
          crossEffects: [],
          tags: ["quality", "proactive"],
          feedback: "✅ DECISION ACERTADA\n\nAnalisis estadistico:\nZ = (X̄ - μ₀) / (σ/√n) = (97 - 100) / (8/√50) = -3 / 1.131 = -2.65\n\nP(Z < -2.65) = 0.004 (0.4%)\n\nSi la maquina estuviera calibrada (μ=100g), la probabilidad de obtener un promedio tan bajo como 97g en 50 paquetes es solo 0.4%. Eso es EVIDENCIA FUERTE de descalibracion. Parar fue la decision correcta.\n\n📚 Concepto: Distribucion muestral de medias. El error estandar SE = σ/√n = 8/√50 ≈ 1.13g hace que incluso 3g de diferencia sea estadisticamente enorme. No confundir variabilidad individual (σ=8g) con variabilidad del promedio (SE=1.13g).",
          next: "ops-02"
        },
        {
          id: "B",
          label: "Seguir produciendo y monitorear la proxima semana",
          description: "El tecnico dice que es variacion normal. Seguimos y revisamos la proxima semana.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: -10, bsc_customer: -8, bsc_financial: 2, bsc_learning: -5 },
          crossEffects: [
            { area: "marketing", bsc: { bsc_customer: -3 }, narrative: "Mas quejas de clientes por paquetes livianos afectan la reputacion de marca en redes sociales." }
          ],
          tags: ["risky", "reactive"],
          feedback: "❌ DECISION RIESGOSA\n\nEl tecnico se equivoca. Con Z = -2.65, la probabilidad de que esto sea 'variacion normal' es solo 0.4%. Seguir produciendo significa sacar miles de paquetes con peso bajo, arriesgando:\n• Multa del INVIMA si inspecciona\n• Clientes que no vuelven a comprar\n• Dano de marca acumulativo\n\n📚 Concepto: Distribucion muestral de medias. El error esta en confundir variabilidad INDIVIDUAL (σ=8g es grande para un solo paquete) con variabilidad del PROMEDIO (SE=1.13g es muy preciso). Si el promedio de 50 paquetes es 97g, algo sistematico esta pasando.",
          next: "ops-02"
        },
        {
          id: "C",
          label: "Reducir velocidad de la maquina un 20%",
          description: "Baja la velocidad para mejorar precision sin parar del todo. Menos produccion pero seguimos.",
          cost: 8000000,
          revenue: 12000000,
          bsc: { bsc_internal: 3, bsc_customer: 2, bsc_financial: -3, bsc_learning: 1 },
          crossEffects: [],
          tags: ["moderate"],
          feedback: "⚠️ DECISION PARCIAL\n\nReducir velocidad ayuda a la variabilidad pero no ataca la raiz. Si el dosificador esta descalibrado en -3g, ir mas lento no corrige el sesgo, solo reduce la variabilidad alrededor de un promedio INCORRECTO.\n\nZ = (97 - 100) / (8/√50) = -2.65 sigue siendo significativo. El problema no es la dispersion, es la ubicacion de la media.\n\n📚 Concepto: El sesgo (bias) de un estimador no se corrige aumentando la precision. Si μ real = 97g y deberia ser 100g, esos 3g de sesgo no desaparecen por ir mas despacio. Hay que recalibrar.",
          next: "ops-02"
        },
        {
          id: "D",
          label: "Comprar maquina empacadora nueva",
          description: "Inversion grande: maquina automatizada de ultima generacion con sensor de peso integrado.",
          cost: 120000000,
          revenue: 50000000,
          bsc: { bsc_internal: 15, bsc_customer: 8, bsc_financial: -10, bsc_learning: 10 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -5 }, narrative: "La inversion en maquinaria impacta el flujo de caja del trimestre." }
          ],
          tags: ["investment", "longterm"],
          feedback: "💡 DECISION AMBICIOSA\n\nEstadisticamente, el problema se resolvia con una calibracion de $15M, no una maquina de $120M. El Z = -2.65 indica descalibracion, no obsolescencia.\n\nSin embargo, la maquina nueva con sensor automatico elimina el problema a futuro. La pregunta es: ¿confirmo el diagnostico antes de gastar 8x mas?\n\n📚 Concepto: Antes de una inversion grande, siempre confirmar la causa raiz con analisis estadistico. El Z-score te decia que era descalibracion, no necesidad de reemplazo. Gastar sin diagnostico es como operarse sin hacerse los examenes.",
          next: "ops-02"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-02 | Dia 4 | Intervalo de confianza para la media
       -------------------------------------------------------- */
    "ops-02": {
      id: "ops-02",
      day: 4,
      title: "Proveedor nuevo de platano verde",
      context: "Un proveedor de Cartago ofrece platano verde a $800/kg menos que tu proveedor actual de la galeria de Pereira. Suena tentador, pero necesitas platanos de calibre grueso (minimo 250g por unidad) para que las tajadas queden parejas.\n\nMandaste analizar una muestra de su producto:\n\n📊 DATOS:\n• Muestra: 40 platanos\n• Peso promedio: 243g\n• Desviacion estandar muestral: 18g\n• Tu estandar minimo: 250g por platano\n\nEl proveedor jura que 'son los mejores de Cartago'. ¿Firmas contrato?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Rechazar al proveedor - los datos no cuadran",
          description: "Le dices al proveedor que sus platanos no cumplen el estandar. Seguis con el proveedor actual.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: 5, bsc_customer: 3, bsc_financial: 0, bsc_learning: 5 },
          crossEffects: [],
          tags: ["data-driven", "conservative"],
          feedback: "✅ DECISION ACERTADA\n\nIntervalo de confianza al 95% para la media:\nIC = X̄ ± t₀.₀₂₅,₃₉ × (s/√n)\nIC = 243 ± 2.023 × (18/√40)\nIC = 243 ± 2.023 × 2.846\nIC = 243 ± 5.76\nIC = [237.24g, 248.76g]\n\nEl intervalo entero esta por debajo de 250g. Con 95% de confianza, el peso promedio real de los platanos de Cartago esta entre 237g y 249g. No cumplen tu estandar.\n\n📚 Concepto: Intervalo de confianza para la media. Si el IC no incluye el valor minimo (250g), tenemos evidencia estadistica fuerte de que el proveedor no cumple. No es cuestion de 'probar un poco mas'.",
          next: "ops-03"
        },
        {
          id: "B",
          label: "Firmar contrato - el ahorro vale la pena",
          description: "A $800/kg menos, con 500kg diarios, son $400.000 de ahorro al dia. En un mes son $12 millones.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: -8, bsc_customer: -6, bsc_financial: 5, bsc_learning: -3 },
          crossEffects: [
            { area: "marketing", bsc: { bsc_customer: -4 }, narrative: "Los platanitos salen mas delgados y disparejos. Los consumidores notan la diferencia." }
          ],
          tags: ["risky", "cost-focused"],
          feedback: "❌ DECISION RIESGOSA\n\nEl IC al 95% es [237.24g, 248.76g]. El limite superior (248.76g) ni siquiera alcanza los 250g minimos. Esto significa:\n• Tus tajadas van a salir mas delgadas e irregulares\n• El producto pierde consistencia visual\n• Los $12M de ahorro se pierden en reprocesos y quejas\n\n📚 Concepto: Intervalo de confianza para la media. IC = X̄ ± t × (s/√n). Cuando TODO el intervalo esta por debajo del estandar, no es una cuestion de mala suerte en la muestra — el proveedor simplemente no cumple.",
          next: "ops-03"
        },
        {
          id: "C",
          label: "Pedir otra muestra mas grande para estar seguro",
          description: "40 platanos es poquito. Pedile al proveedor que mande 200 para evaluar mejor.",
          cost: 2000000,
          revenue: 12000000,
          bsc: { bsc_internal: 2, bsc_customer: 0, bsc_financial: -1, bsc_learning: 8 },
          crossEffects: [],
          tags: ["cautious", "analytical"],
          feedback: "⚠️ DECISION PRUDENTE PERO INNECESARIA\n\n40 platanos ya te dan un intervalo suficientemente estrecho: [237.24, 248.76]. Incluso el limite superior (248.76g) no alcanza 250g.\n\nCon n=200, el IC seria aun mas estrecho:\nIC = 243 ± 1.972 × (18/√200) = 243 ± 2.51 = [240.49, 245.51]\n\nSigue sin incluir 250g. Mas datos confirman lo mismo pero perdiste tiempo y plata.\n\n📚 Concepto: Aumentar n estrecha el IC pero no mueve la media. Si X̄ = 243 y necesitas 250, mas muestra solo confirma que no cumple. El error estandar baja, pero la conclusion no cambia.",
          next: "ops-03"
        },
        {
          id: "D",
          label: "Negociar contrato mixto: 50% del proveedor nuevo, 50% del actual",
          description: "Mitad platano caro bueno, mitad platano barato regular. Promediamos la calidad.",
          cost: 5000000,
          revenue: 6000000,
          bsc: { bsc_internal: -2, bsc_customer: -3, bsc_financial: 3, bsc_learning: 2 },
          crossEffects: [],
          tags: ["compromise"],
          feedback: "💡 DECISION CREATIVA PERO CON PROBLEMAS\n\nSi mezclas 50/50, el peso promedio esperado seria:\nE(mezcla) = 0.5 × 243 + 0.5 × 258 ≈ 250.5g\n(asumiendo que tu proveedor actual da ~258g en promedio)\n\nPero la variabilidad AUMENTA porque ahora tienes dos distribuciones mezcladas. Algunos platanos seran de 220g y otros de 280g. La inconsistencia en el producto final puede ser peor que usar solo un proveedor.\n\n📚 Concepto: Mezclar distribuciones no 'promedia' la variabilidad — la AUMENTA. La varianza de una mezcla incluye la varianza entre los grupos, no solo dentro de cada grupo.",
          next: "ops-03"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-03 | Dia 7 | Proporcion muestral, IC para proporcion
       -------------------------------------------------------- */
    "ops-03": {
      id: "ops-03",
      day: 7,
      title: "Lote para exportacion a Panama",
      context: "Un distribuidor de Panama quiere 10.000 paquetes de platanitos. Paga 40% mas que el precio local, pero exige que maximo el 3% de los paquetes tengan defectos (rotos, mal sellados, peso fuera de rango).\n\nTu jefe de calidad tomo una muestra aleatoria del lote listo para enviar:\n\n📊 DATOS:\n• Muestra: 200 paquetes inspeccionados\n• Defectuosos encontrados: 11 paquetes\n• Proporcion muestral: p̂ = 11/200 = 0.055 (5.5%)\n• Requisito del cliente: maximo 3%\n\nEl jefe de planta dice 'de pronto tuvimos mala suerte con la muestra'. ¿Envias el lote?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "No enviar - reprocesar el lote completo",
          description: "Sacamos todo, revisamos paquete por paquete, reemplazamos defectuosos. Cuesta tiempo y plata pero entregamos calidad.",
          cost: 25000000,
          revenue: 22000000,
          bsc: { bsc_internal: 8, bsc_customer: 10, bsc_financial: -3, bsc_learning: 4 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -2 }, narrative: "El reproceso del lote de exportacion genera costos adicionales no presupuestados." }
          ],
          tags: ["quality", "responsible"],
          feedback: "✅ DECISION ACERTADA\n\nIC al 95% para la proporcion de defectuosos:\np̂ = 11/200 = 0.055\nSE = √(p̂(1-p̂)/n) = √(0.055 × 0.945 / 200) = √(0.000260) = 0.01612\nIC = p̂ ± Z₀.₀₂₅ × SE = 0.055 ± 1.96 × 0.01612\nIC = 0.055 ± 0.0316\nIC = [0.0234, 0.0866] = [2.34%, 8.66%]\n\nEl limite inferior del IC (2.34%) esta debajo del 3%, pero el limite superior (8.66%) esta MUY por encima. No puedes garantizar que la proporcion real sea ≤ 3%. Enviar seria una apuesta.\n\n📚 Concepto: IC para proporcion. p̂ ± Z × √(p̂(1-p̂)/n). Cuando el IC incluye valores inaceptables, la decision prudente es NO enviar.",
          next: "ops-04"
        },
        {
          id: "B",
          label: "Enviar el lote tal cual - fue mala suerte",
          description: "El jefe de planta tiene experiencia. 200 paquetes es una muestra chiquita. Mandamos todo.",
          cost: 0,
          revenue: 56000000,
          bsc: { bsc_internal: -12, bsc_customer: -10, bsc_financial: 8, bsc_learning: -5 },
          crossEffects: [
            { area: "marketing", bsc: { bsc_customer: -5 }, narrative: "El cliente panameno rechaza el lote y publica su experiencia negativa en redes del sector." }
          ],
          tags: ["risky", "overconfident"],
          feedback: "❌ DECISION PELIGROSA\n\nEl IC para la proporcion de defectos es [2.34%, 8.66%]. Tu estimacion puntual es 5.5%, casi el doble del maximo permitido (3%).\n\n200 paquetes NO es una muestra chiquita — es mas que suficiente para proporciones. El margen de error es ±3.16 puntos porcentuales, y aun asi todo el rango superior esta fuera del estandar.\n\nSi Panama rechaza el lote:\n• Pierdes el envio ($56M de revenue)\n• Pagas flete de ida y vuelta\n• Pierdes el cliente para siempre\n\n📚 Concepto: IC para proporcion. 200 es un n razonable para proporciones. El error NO fue mala suerte — fue un defecto real de produccion.",
          next: "ops-04"
        },
        {
          id: "C",
          label: "Inspeccionar una segunda muestra para confirmar",
          description: "Tomar otra muestra de 200 paquetes. Si esta sale mejor, enviamos.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: 3, bsc_customer: 2, bsc_financial: -2, bsc_learning: 6 },
          crossEffects: [],
          tags: ["cautious"],
          feedback: "⚠️ DECISION CON TRAMPA LOGICA\n\nTomar otra muestra y quedarse con la que 'salga mejor' es cherry-picking estadistico. Si tomas muchas muestras, eventualmente una dara p̂ < 0.03, pero eso no significa que el lote sea bueno.\n\nLo correcto seria COMBINAR ambas muestras: si la segunda da 8/200 defectuosos, el total seria 19/400 = 4.75%, aun por encima del 3%.\n\n📚 Concepto: El sesgo de seleccion de muestras. No se vale tomar muestras hasta que una 'salga bonita'. La muestra original de n=200 ya te dio informacion suficiente. Mas datos se COMBINAN, no se seleccionan.",
          next: "ops-04"
        },
        {
          id: "D",
          label: "Enviar el lote pero ofrecer 10% de descuento como seguro",
          description: "Le dices al panameno: 'te hago 10% de descuento y si encuentras mas del 3% de defectos, te devuelvo el dinero completo'.",
          cost: 0,
          revenue: 50000000,
          bsc: { bsc_internal: -3, bsc_customer: 1, bsc_financial: 2, bsc_learning: 3 },
          crossEffects: [],
          tags: ["negotiation", "creative"],
          feedback: "💡 DECISION CREATIVA PERO CALCULEMOS\n\nSi p real ≈ 5.5% (tu mejor estimacion), ¿cual es la probabilidad de que el panameno encuentre > 3% en su inspeccion?\n\nCon p = 0.055 y el lote de 10,000 paquetes, es casi SEGURO que encontrara mas del 3%. Estarias ofreciendo una garantia que vas a tener que pagar.\n\nPerdida esperada = 0.95 × ($50M - devolucion completa) ≈ perdida neta\n\n📚 Concepto: La proporcion muestral converge a la proporcion real cuando n es grande. En 10,000 paquetes, p̂ ≈ p = 0.055 con altisima precision. El panameno SEGURO detecta el problema.",
          next: "ops-04"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-04 | Dia 11 | Probabilidad normal (area bajo la curva)
       -------------------------------------------------------- */
    "ops-04": {
      id: "ops-04",
      day: 11,
      title: "Capacidad de produccion vs demanda pico",
      context: "Se acerca el Festival de la Cosecha en Pereira y la Feria de Manizales. Historicamente la demanda de snacks se dispara. Tu planta tiene capacidad maxima de 8,000 paquetes/dia.\n\nEl area de marketing te paso la proyeccion de demanda basada en datos historicos de los ultimos 5 anos:\n\n📊 DATOS DE DEMANDA DIARIA EN TEMPORADA PICO:\n• Media historica: 7,200 paquetes/dia\n• Desviacion estandar: 600 paquetes/dia\n• Distribucion: aproximadamente normal\n• Tu capacidad maxima: 8,000 paquetes/dia\n\n¿Necesitas contratar un turno extra o la planta aguanta?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "La planta aguanta - no contratar turno extra",
          description: "Con capacidad de 8,000 y demanda promedio de 7,200, hay 800 paquetes de colchon. Suficiente.",
          cost: 0,
          revenue: 24000000,
          bsc: { bsc_internal: -5, bsc_customer: -6, bsc_financial: 7, bsc_learning: -2 },
          crossEffects: [
            { area: "hr", bsc: { bsc_internal: -2 }, narrative: "Los operarios existentes terminan haciendo horas extras agotadores sin planificacion." }
          ],
          tags: ["risky", "cost-focused"],
          feedback: "❌ DECISION CON CALCULO INCOMPLETO\n\nP(demanda > 8,000) = P(Z > (8000-7200)/600) = P(Z > 1.33) = 1 - 0.9082 = 0.0918 = 9.18%\n\nHay un 9.18% de probabilidad de que la demanda supere tu capacidad en CUALQUIER dia dado. En una temporada de 15 dias pico:\nP(al menos un dia con faltante) = 1 - (1-0.0918)^15 = 1 - 0.236 = 0.764 = 76.4%\n\nHay 76% de probabilidad de que al menos un dia te quedes corto. No suena tan seguro ahora, ¿verdad?\n\n📚 Concepto: Probabilidad normal (area bajo la curva). 800 paquetes de 'colchon' parece mucho, pero es solo 1.33 desviaciones estandar. Para operaciones criticas, se busca estar a 2σ o 3σ del limite.",
          next: "ops-05"
        },
        {
          id: "B",
          label: "Contratar turno extra completo (capacidad +4,000/dia)",
          description: "Turno nocturno de 8 horas. Capacidad sube a 12,000 paquetes/dia. Costo alto pero cero riesgo.",
          cost: 35000000,
          revenue: 100000000,
          bsc: { bsc_internal: 8, bsc_customer: 11, bsc_financial: -5, bsc_learning: 6 },
          crossEffects: [
            { area: "hr", bsc: { bsc_learning: 6 }, narrative: "Talento Humano gana experiencia gestionando turnos rotativos y contratacion temporal." }
          ],
          tags: ["safe", "expensive"],
          feedback: "⚠️ DECISION SEGURA PERO SOBREDIMENSIONADA\n\nCon capacidad de 12,000:\nP(demanda > 12,000) = P(Z > (12000-7200)/600) = P(Z > 8.0) ≈ 0%\n\nCero riesgo de faltante, pero estas pagando capacidad para 12,000 cuando la demanda maxima razonable (μ + 3σ) es 7,200 + 1,800 = 9,000. Sobran 3,000 paquetes de capacidad ociosa.\n\nCosto del turno extra: $35M. ¿Valia la pena ese exceso?\n\n📚 Concepto: Probabilidad normal. La regla practica dice que el 99.7% de los datos cae dentro de μ ± 3σ. Capacidad = μ + 3σ = 9,000 hubiera sido suficiente.",
          next: "ops-05"
        },
        {
          id: "C",
          label: "Turno extra parcial: subir capacidad a 9,500/dia",
          description: "Medio turno nocturno. Capacidad sube de 8,000 a 9,500 paquetes/dia. Balance entre costo y cobertura.",
          cost: 18000000,
          revenue: 44000000,
          bsc: { bsc_internal: 11, bsc_customer: 10, bsc_financial: 4, bsc_learning: 8 },
          crossEffects: [],
          tags: ["balanced", "data-driven"],
          feedback: "✅ DECISION OPTIMA\n\nCon capacidad de 9,500:\nP(demanda > 9,500) = P(Z > (9500-7200)/600) = P(Z > 3.83) = 0.00006 = 0.006%\n\nPracticamente cero riesgo de faltante. Y el costo es $18M vs $35M del turno completo.\n\nEn 15 dias pico:\nP(al menos un dia corto) = 1 - (1-0.00006)^15 = 0.0009 = 0.09%\n\nMenos del 0.1% de riesgo. Excelente relacion costo-beneficio.\n\n📚 Concepto: Probabilidad normal (area bajo la curva). La clave es cuantificar el riesgo con P(X > capacidad) y luego decidir cuanto riesgo estas dispuesto a aceptar. Subir capacidad a μ + 3.83σ te da seguridad casi total.",
          next: "ops-05"
        },
        {
          id: "D",
          label: "Producir inventario extra esta semana para cubrir la temporada",
          description: "En vez de contratar gente, producir mas esta semana y almacenar. 1,000 paquetes extra por dia durante 5 dias = 5,000 en inventario.",
          cost: 8000000,
          revenue: 24000000,
          bsc: { bsc_internal: 7, bsc_customer: 6, bsc_financial: 0, bsc_learning: 5 },
          crossEffects: [],
          tags: ["creative", "moderate"],
          feedback: "💡 DECISION INTELIGENTE PERO LIMITADA\n\nCon 5,000 paquetes de inventario + 8,000/dia de capacidad, tu capacidad efectiva sube... pero el inventario se agota.\n\nSi la demanda es > 8,000 varios dias seguidos, el buffer se acaba rapido.\n\nEjemplo: Si 3 dias la demanda es 8,500, necesitas 1,500 extra = 4,500 del buffer. Al cuarto dia ya no tienes colchon.\n\nP(demanda > 8,000 en 3+ dias) en 15 dias pico es alta: C(15,3) × 0.0918³ × 0.9082^12 ≈ 16%\n\n📚 Concepto: Probabilidad acumulada. Un buffer finito protege contra picos puntuales, no contra tendencias sostenidas. Para temporada larga, necesitas capacidad, no inventario.",
          next: "ops-05"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-05 | Dia 16 | Diferencia de medias (dos muestras independientes)
       -------------------------------------------------------- */
    "ops-05": {
      id: "ops-05",
      day: 12,
      title: "Turno de la manana vs turno de la noche",
      context: "El supervisor reporta que el turno de la noche 'produce menos y con mas errores'. El coordinador nocturno dice que no es cierto, que es percepcion del supervisor que nunca esta de noche.\n\nDecidiste resolver con datos. Tomaste muestras de produccion de ambos turnos:\n\n📊 DATOS:\nTurno manana (n₁ = 30 dias):\n• Produccion promedio: 7,450 paquetes/dia\n• Desviacion estandar: 320 paquetes/dia\n\nTurno noche (n₂ = 30 dias):\n• Produccion promedio: 7,180 paquetes/dia\n• Desviacion estandar: 410 paquetes/dia\n\nDiferencia observada: 270 paquetes/dia a favor del turno de manana.\n\n¿Es evidencia suficiente para tomar accion?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Investigar causas de la diferencia nocturna",
          description: "Hay una diferencia real y significativa. Antes de sancionar, investigar: ¿iluminacion?, ¿fatiga?, ¿supervision?",
          cost: 5000000,
          revenue: 36000000,
          bsc: { bsc_internal: 13, bsc_customer: 6, bsc_financial: 4, bsc_learning: 11 },
          crossEffects: [
            { area: "hr", bsc: { bsc_learning: 6 }, narrative: "La investigacion revela oportunidades de mejora en condiciones laborales nocturnas." }
          ],
          tags: ["data-driven", "proactive"],
          feedback: "✅ DECISION ACERTADA\n\nDiferencia de medias:\nX̄₁ - X̄₂ = 7,450 - 7,180 = 270 paquetes/dia\n\nError estandar de la diferencia:\nSE = √(s₁²/n₁ + s₂²/n₂) = √(320²/30 + 410²/30)\nSE = √(3,413.3 + 5,603.3) = √9,016.7 = 94.96\n\nZ = (270 - 0) / 94.96 = 2.84\nP(Z > 2.84) = 0.0023 (0.23%)\n\nLa diferencia ES estadisticamente significativa (p < 0.01). El turno de noche produce genuinamente menos. Investigar las causas antes de actuar es la decision correcta.\n\n📚 Concepto: Diferencia de medias (dos muestras independientes). SE de la diferencia = √(s₁²/n₁ + s₂²/n₂). Con Z = 2.84, la probabilidad de que esta diferencia sea por azar es menos del 0.5%.",
          next: "ops-06"
        },
        {
          id: "B",
          label: "Cambiar al coordinador nocturno",
          description: "Si el turno de noche produce menos, es culpa de quien lo lidera. Poner un coordinador nuevo.",
          cost: 8000000,
          revenue: 24000000,
          bsc: { bsc_internal: 6, bsc_customer: 5, bsc_financial: -2, bsc_learning: -3 },
          crossEffects: [
            { area: "hr", bsc: { bsc_internal: -4 }, narrative: "Despedir al coordinador sin investigar genera malestar y desconfianza en los demas empleados." }
          ],
          tags: ["impulsive"],
          feedback: "⚠️ DECISION PRECIPITADA\n\nSi, la diferencia es significativa (Z = 2.84, p = 0.0023). Pero significancia estadistica no dice CAUSA.\n\nLa diferencia podria ser por:\n• Iluminacion deficiente (infraestructura)\n• Fatiga natural (biologia humana)\n• Menos personal de apoyo (logistica)\n• El coordinador (solo una de muchas causas)\n\nCambiar al coordinador sin investigar es como cambiar de carro porque se pincho una llanta.\n\n📚 Concepto: Correlacion/diferencia ≠ causalidad. La estadistica te confirma que HAY diferencia, pero no te dice POR QUE. Necesitas analisis adicional para encontrar la causa raiz.",
          next: "ops-06"
        },
        {
          id: "C",
          label: "No es significativo - 270 paquetes es poca diferencia",
          description: "De 7,400 paquetes, 270 es apenas el 3.6%. No vale la pena hacer cambios por eso.",
          cost: 0,
          revenue: 24000000,
          bsc: { bsc_internal: -5, bsc_customer: -2, bsc_financial: 4, bsc_learning: -6 },
          crossEffects: [],
          tags: ["dismissive"],
          feedback: "❌ DECISION EQUIVOCADA\n\nZ = 270 / 94.96 = 2.84, con p = 0.0023. La diferencia es ALTAMENTE significativa.\n\n270 paquetes/dia × 30 dias/mes = 8,100 paquetes/mes perdidos\n8,100 × $2,500 precio/paquete = $20,250,000/mes de produccion perdida\n\n¿$20M al mes te parece 'poca diferencia'?\n\n📚 Concepto: Significancia estadistica vs significancia practica. Aqui AMBAS son relevantes. Estadisticamente la diferencia es real (Z = 2.84). Practicamente son $20M mensuales. Ignorar evidencia cuesta plata.",
          next: "ops-06"
        },
        {
          id: "D",
          label: "Eliminar el turno nocturno y producir todo de dia",
          description: "Si el turno de noche es peor, para que tenerlo. Concentrar produccion en un super-turno de dia de 12 horas.",
          cost: 10000000,
          revenue: 24000000,
          bsc: { bsc_internal: -3, bsc_customer: -5, bsc_financial: -4, bsc_learning: -2 },
          crossEffects: [
            { area: "hr", bsc: { bsc_internal: -5, bsc_customer: -2 }, narrative: "Eliminar turno nocturno implica despidos o reasignaciones que generan conflicto laboral." }
          ],
          tags: ["extreme"],
          feedback: "❌ DECISION EXTREMA\n\nEl turno de noche produce 7,180 paquetes/dia. Eliminarlo significa perder esa produccion completa. Aunque produce 270 menos que el turno de dia, sigue produciendo MUCHO.\n\nEs como cerrar un restaurante porque la mesera del turno noche atiende 5 minutos mas lento que la del dia.\n\nIC para la diferencia al 95%:\n270 ± 1.96 × 94.96 = 270 ± 186.1 = [83.9, 456.1]\n\nLa diferencia real esta entre 84 y 456 paquetes. Significativa, si, pero no justifica eliminar el turno.\n\n📚 Concepto: IC para la diferencia de medias. El intervalo te da la magnitud de la diferencia. Usalo para dimensionar la respuesta proporcionalmente.",
          next: "ops-06"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-06 | Dia 21 | Estimacion con error estandar, decision de inversion
       -------------------------------------------------------- */
    "ops-06": {
      id: "ops-06",
      day: 14,
      title: "Automatizacion de la linea de empaque",
      context: "La junta directiva te pide una recomendacion: ¿automatizar la linea de empaque? La inversion es de $180M COP. El proveedor promete reducir desperdicios y aumentar velocidad.\n\nPara justificar la inversion, necesitas estimar el ahorro mensual. Tu equipo recogio datos de desperdicios actuales:\n\n📊 DATOS ACTUALES (manual):\n• Muestra: 60 dias de produccion\n• Desperdicio promedio: 4.2% de la produccion\n• Desviacion estandar: 1.1%\n• Produccion mensual: 200,000 paquetes\n• Costo por paquete: $2,500\n\n📊 DATOS DEL PROVEEDOR (automatizado):\n• Desperdicio promedio en otras plantas: 1.8%\n• Desviacion estandar: 0.6%\n\n¿Recomiendas la inversion a la junta?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Recomendar la inversion con analisis estadistico completo",
          description: "Presentar a la junta el analisis de ahorro esperado con intervalos de confianza y periodo de retorno.",
          cost: 180000000,
          revenue: 120000000,
          bsc: { bsc_internal: 15, bsc_customer: 9, bsc_financial: -5, bsc_learning: 13 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: 8 }, narrative: "El analisis estadistico solido facilita la aprobacion del credito bancario para la inversion." },
            { area: "analyst", bsc: { bsc_learning: 6 }, narrative: "El caso de automatizacion se convierte en referencia para futuros analisis de inversion." }
          ],
          tags: ["data-driven", "investment"],
          feedback: "✅ DECISION ACERTADA CON FUNDAMENTO\n\nEstimacion del ahorro mensual:\nDesperdicio actual: IC 95% = 4.2% ± 1.96 × (1.1/√60) = 4.2% ± 0.278% = [3.92%, 4.48%]\nDesperdicio automatizado: 1.8% (dato del proveedor)\n\nReduccion estimada: 4.2% - 1.8% = 2.4 puntos porcentuales\nSE de la diferencia: √((1.1²/60) + (0.6²/60)) = √(0.02017 + 0.006) = 0.162%\n\nPaquetes salvados/mes: 200,000 × 0.024 = 4,800\nAhorro mensual: 4,800 × $2,500 = $12,000,000\n\nIC 95% del ahorro: $12M ± 1.96 × (200,000 × 0.00162 × $2,500)\n= $12M ± $1.59M = [$10.41M, $13.59M]\n\nRetorno de inversion: $180M / $12M = 15 meses\nEscenario pesimista: $180M / $10.41M = 17.3 meses\n\n📚 Concepto: Estimacion con error estandar para decisiones de inversion. El IC te permite presentar escenarios (optimista, esperado, pesimista) con fundamento estadistico.",
          next: "ops-07"
        },
        {
          id: "B",
          label: "Rechazar - la inversion es muy alta y riesgosa",
          description: "$180 millones es mucha plata. Mejor seguir como estamos y controlar desperdicios manualmente.",
          cost: 0,
          revenue: 24000000,
          bsc: { bsc_internal: -5, bsc_customer: -2, bsc_financial: 6, bsc_learning: -5 },
          crossEffects: [],
          tags: ["conservative", "risk-averse"],
          feedback: "❌ DECISION COSTOSA A LARGO PLAZO\n\nEstas perdiendo $12M/mes en desperdicios evitables. En 15 meses, las perdidas acumuladas ($180M) igualan la inversion que rechazaste.\n\nDespues de 15 meses, cada mes que pasa pierdes $12M que podrias estar ahorrando.\n\nEn 3 anos: Costo de NO automatizar = 36 × $12M = $432M\nCosto de automatizar = $180M\nDiferencia: $252M a favor de automatizar\n\nIncluso en el escenario pesimista (ahorro de $10.41M/mes):\n36 × $10.41M - $180M = $194.76M de ahorro neto\n\n📚 Concepto: El costo de la inaccion tambien se mide. El SE y el IC te permiten cuantificar incluso el escenario mas conservador y compararlo con no hacer nada.",
          next: "ops-07"
        },
        {
          id: "C",
          label: "Pedir al proveedor una prueba piloto de 3 meses",
          description: "Que instale la maquina en prueba. Si los numeros se confirman en nuestra planta, compramos.",
          cost: 30000000,
          revenue: 24000000,
          bsc: { bsc_internal: 8, bsc_customer: 5, bsc_financial: -1, bsc_learning: 15 },
          crossEffects: [],
          tags: ["cautious", "analytical"],
          feedback: "💡 DECISION INTELIGENTE\n\nUna prueba piloto te permite recoger DATOS PROPIOS en vez de confiar solo en los del proveedor.\n\nCon 3 meses (≈90 dias) de datos de tu planta:\nSE = 0.6/√90 = 0.063%\nIC 95% = desperdicio_real ± 0.124%\n\nTendrias un intervalo muy preciso del desperdicio REAL en tu planta. Si confirma que baja a ~1.8%, la decision de compra se justifica con tus propios datos.\n\nRiesgo: el proveedor puede no aceptar una prueba de 3 meses. Y el costo de $30M es plata que no recuperas si decides no comprar.\n\n📚 Concepto: Datos propios vs datos del proveedor. El proveedor reporta condiciones ideales. Tu planta tiene sus particularidades. Recoger muestra propia reduce la incertidumbre.",
          next: "ops-07"
        },
        {
          id: "D",
          label: "Automatizar solo la mitad de la linea",
          description: "Invertir $95M en automatizar la mitad. Comparar linea manual vs automatizada en paralelo.",
          cost: 95000000,
          revenue: 100000000,
          bsc: { bsc_internal: 10, bsc_customer: 7, bsc_financial: -3, bsc_learning: 11 },
          crossEffects: [],
          tags: ["moderate", "experimental"],
          feedback: "⚠️ DECISION DE COMPROMISO\n\nAutomatizar la mitad te da un experimento controlado perfecto:\n• Grupo tratamiento: linea automatizada\n• Grupo control: linea manual\n• Misma materia prima, mismos operarios\n\nDespues de n dias, puedes comparar desperdicios con una prueba de diferencia de medias y tener CERTEZA estadistica.\n\nPero el costo unitario de la maquina sube (economia de escala perdida): $95M por media linea vs $180M por la completa. Estas pagando 53% del precio por 50% de capacidad.\n\n📚 Concepto: Diseno experimental en la vida real. La mitad automatizada vs la mitad manual es literalmente un experimento con grupo control. Costoso pero genera evidencia irrefutable.",
          next: "ops-07"
        }
      ]
    },

    /* --------------------------------------------------------
       OPS-07 | Dia 15 | Planificacion de capacidad con distribucion normal
       -------------------------------------------------------- */
    "ops-07": {
      id: "ops-07",
      day: 15,
      title: "Lote urgente para D1",
      context: "D1 quiere 10.000 paquetes en 48 horas. Tu capacidad promedio es 4.500/dia con desviacion de 800.\n\n📊 DATOS:\n• Capacidad diaria: \u03bc=4500, \u03c3=800\n• Pedido: 10.000 en 2 dias\n• Penalidad si no cumples: $30M",
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
          feedback: "\u2705 Buena jugada. Con turno extra la capacidad en 2 dias sube a ~10.500. P(cumplir) > 90%.\n\ud83d\udcda Concepto: Suma de normales. Si X1 y X2 son normales independientes, X1+X2 ~ N(\u03bc1+\u03bc2, \u03c31\u00b2+\u03c32\u00b2).",
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
          feedback: "\u26a0\ufe0f Seguro pero perdiste $35M en ventas. P(cumplir sin turno extra) = P(X1+X2 > 10000) con \u03bc=9000, \u03c3=1131... apenas 19%.\n\ud83d\udcda El riesgo era real pero manejable con turno extra.",
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
          feedback: "\u2705 Negociacion inteligente. P(producir 8000 en 2 dias) = P(X1+X2 > 8000) con \u03bc=9000 \u2248 81%. Muy factible.\n\ud83d\udcda Concepto: Usar la distribucion normal para fijar compromisos realistas.",
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
          feedback: "\ud83d\udca1 Pragmatico. Subcontratar cuesta mas por unidad pero garantiza cumplimiento al 100%.\n\ud83d\udcda A veces reducir incertidumbre (\u03c3\u21920) vale mas que optimizar el costo esperado.",
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
      context: "La empacadora principal empezo a vibrar. El tecnico dice que tiene 30% de probabilidad de fallar esta semana. Repararla ahora cuesta $8M; si falla en produccion, cuesta $40M.\n\n📊 DATOS:\n• P(falla esta semana) = 0.30\n• Costo preventivo: $8M\n• Costo correctivo si falla: $40M",
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
          feedback: "\u2705 E(costo de no reparar) = 0.30 \u00d7 $40M = $12M. Reparar por $8M es mas barato que el valor esperado del dano.\n\ud83d\udcda Concepto: Valor esperado. E(X) = \u03a3 xi\u00b7P(xi). Siempre compara costo seguro vs costo esperado.",
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
          feedback: "\u274c E(costo) = 0.30 \u00d7 $40M = $12M > $8M del preventivo. Jugaste a la ruleta rusa con la produccion.\n\ud83d\udcda El valor esperado dice que esperar es mas caro en promedio.",
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
          feedback: "\ud83d\udca1 E(costo) ahora = 0.10 \u00d7 $40M = $4M. Mas los $5M de produccion perdida = $9M total. Casi empata con reparar ($8M).\n\ud83d\udcda Comparar valores esperados de multiples opciones es la clave.",
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
          feedback: "\u2705 Reparas sin perder produccion. Cuesta $2M mas (fin de semana) pero E(valor) sigue positivo.\n\ud83d\udcda Optimizar CUANDO reparar tambien es una decision bajo incertidumbre.",
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
      context: "Tu proveedor de platano verde ofrece 20% de descuento si compras 3 meses de inventario de una vez. Pero el precio del platano varia y podrias perder si baja.\n\n📊 DATOS:\n• Consumo mensual: 5 toneladas\n• Precio actual: $2M/tonelada\n• Precio con descuento (15 ton): $1.6M/ton\n• Volatilidad historica del precio: \u03c3 = $0.4M/ton",
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
          feedback: "\u2705 Ahorro = 15 \u00d7 ($2M - $1.6M) = $6M. Para perder, el precio tendria que caer a < $1.6M. P(precio < $1.6) = P(Z < -1) = 16%.\n\ud83d\udcda Concepto: El descuento es seguro; la caida de precio es incierta. Compara certeza vs probabilidad.",
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
          feedback: "\u26a0\ufe0f Pierdes $6M de ahorro seguro por miedo a una baja que tiene solo 16% de probabilidad.\n\ud83d\udcda Concepto: Aversion al riesgo excesiva puede ser costosa cuando los datos muestran ventaja clara.",
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
          feedback: "\ud83d\udca1 Ahorro moderado con riesgo moderado. Diversificas temporalmente las compras.\n\ud83d\udcda Concepto: No siempre es todo o nada. Distribuir el riesgo en el tiempo es una estrategia valida.",
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
          feedback: "\ud83d\udca1 Creativo. Menos descuento pero menos riesgo de almacenamiento y deterioro.\n\ud83d\udcda Concepto: El riesgo no es solo precio — incluye almacenamiento, deterioro y costo de oportunidad.",
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
      context: "Llego carta del INVIMA: inspeccion en 3 dias. Tu ultima muestra interna de 200 paquetes encontro 11 con problemas (5.5%). El limite legal es 5%.\n\n📊 DATOS:\n• Muestra interna: n=200, defectos=11\n• p\u0302 = 0.055 (5.5%)\n• Limite INVIMA: 5%\n• Multa por incumplimiento: $50M",
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
          feedback: "\u2705 Con p\u0302=5.5% y limite 5%, IC 95% = [2.3%, 8.7%]. El 5% esta DENTRO del IC, asi que podrias estar OK... o no.\n\ud83d\udcda Concepto: IC para proporcion. Mejor prevenir cuando tu estimado supera el limite aunque no sea significativo.",
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
          feedback: "\u274c Si INVIMA toma n=100, P(encontrar >5 defectos) es considerable. Con p real=5.5%, te juegas la multa de $50M.\n\ud83d\udcda Concepto: La proporcion muestral varia. Tu 5.5% podria salir 7% en la muestra de INVIMA.",
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
          feedback: "\u2705 Buena estrategia. Reduces la proporcion real de defectos en inventario antes de la visita.\n\ud83d\udcda Concepto: Puedes cambiar el parametro poblacional (p real) con accion directa, no solo estimarlo.",
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
          feedback: "\ud83d\udca1 INVIMA valora procesos documentados. Pero si la muestra sale mal, la documentacion no salva de la multa.\n\ud83d\udcda Concepto: La proporcion muestral es lo que miden. Complementa con evidencia de procesos pero no ignores los datos.",
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
      context: "Diciembre se acerca y la demanda se dispara. Un turno extra los sabados cuesta $12M/mes pero podria generar $30M en ventas adicionales... si la demanda se mantiene.\n\n📊 DATOS:\n• P(demanda alta en diciembre) = 0.75\n• Ingreso si demanda alta: $30M\n• Ingreso si demanda baja: $8M\n• Costo del turno extra: $12M/mes",
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
          feedback: "\u2705 E(ingreso) = 0.75\u00d7$30M + 0.25\u00d7$8M = $24.5M. Beneficio esperado = $24.5M - $12M = $12.5M. Positivo!\n\ud83d\udcda Concepto: E(beneficio) = E(ingreso) - costo. Si E(beneficio) > 0, la decision tiene sentido en promedio.",
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
          feedback: "\u26a0\ufe0f Perdiste E(beneficio) = $12.5M. Con P(alta)=75%, la probabilidad estaba muy a tu favor.\n\ud83d\udcda Concepto: No actuar tambien tiene costo de oportunidad. Comparar siempre vs el valor esperado.",
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
          feedback: "\u2705 Estrategia adaptativa. Reduces riesgo a $6M y recoges datos reales antes de comprometer mas.\n\ud83d\udcda Concepto: Muestreo secuencial. Tomar datos antes de decidir reduce la incertidumbre.",
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
          feedback: "\u2705 Decision basada en evidencia en tiempo real. Usas la semana 1 como muestra para estimar la demanda del mes.\n\ud83d\udcda Concepto: Actualizacion de probabilidades con datos nuevos. La semana 1 es informacion que reduce incertidumbre.",
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
      context: "I+D creo platanitos con limon. Un focus group de 40 personas probo el producto: 28 dijeron que lo comprarian (70%).\n\n📊 DATOS:\n• n = 40 personas\n• Favorables: 28 (70%)\n• Inversion necesaria para lanzar: $25M\n• Meta minima de aceptacion: 60%",
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
          feedback: "\u26a0\ufe0f IC 95% con n=40: 70% \u00b1 14.2% = [55.8%, 84.2%]. El limite inferior esta DEBAJO de tu meta de 60%.\n\ud83d\udcda Concepto: Con n=40, el margen de error es grande. La muestra es pequena para una decision de $25M.",
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
          feedback: "\u2705 Con n=200, SE = \u221a(0.7\u00d70.3/200) = 3.2%. IC = 70% \u00b1 6.3%. Mucho mas preciso para decidir.\n\ud83d\udcda Concepto: El tamano de muestra importa. SE = \u221a(pq/n). Cuadruplicar n reduce SE a la mitad.",
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
          feedback: "\u2705 Excelente. Datos de COMPRA real > datos de intencion. La conversion real suele ser 30-50% de la intencion declarada.\n\ud83d\udcda Concepto: Validez externa. Un focus group mide intencion, no comportamiento. El piloto mide lo que importa.",
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
          feedback: "\u26a0\ufe0f Con 70% de aceptacion, descartar sin mas analisis es desperdiciar una oportunidad. Al menos amplia la muestra.\n\ud83d\udcda Concepto: No decidir tambien es una decision. El costo de oportunidad existe.",
          next: null
        }
      ]
    }
  }
};
