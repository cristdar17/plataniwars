/* ============================================================
   TREE-HR - Arbol de decisiones del CHRO (Dir. Talento Humano)
   PlataniWars: Simulador Gerencial Estadistico
   ============================================================ */
window.TREE_HR = {
  name: "Talento Humano",
  icon: "👥",
  startNode: "hr-01",
  nodes: {

    /* --------------------------------------------------------
       HR-01 | Dia 1 | Parametro vs estadistico
       -------------------------------------------------------- */
    "hr-01": {
      id: "hr-01",
      day: 1,
      title: "Evaluacion del supervisor de planta",
      context: "El supervisor de planta dice que sus 48 operarios tienen un desempeno 'excelente'. Quieres verificar con datos antes de darle la bonificacion de $3M al equipo.\n\nEl area de calidad tiene registro del TOTAL de piezas producidas por cada operario en el ultimo mes (poblacion completa):\n\n📊 DATOS POBLACIONALES (los 48 operarios):\n• Promedio de produccion: μ = 1,250 piezas/operario/mes\n• Desviacion estandar: σ = 180 piezas\n• Estandar de 'excelente': ≥ 1,300 piezas/operario/mes\n\nPero el supervisor te muestra solo los datos de sus 10 mejores operarios:\n• Promedio del grupo seleccionado: X̄ = 1,420 piezas\n\n'Mire jefe, 1,420 — muy por encima de 1,300. Pagueme la bonificacion.'",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Usar el parametro poblacional (μ = 1,250) para decidir",
          description: "Tenemos datos de TODOS los 48 operarios. No necesitamos muestra. El promedio real es 1,250, no 1,300.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: 10, bsc_customer: 2, bsc_financial: 5, bsc_learning: 8 },
          crossEffects: [],
          tags: ["data-driven", "fair"],
          feedback: "✅ DECISION CORRECTA\n\nAqui no necesitas estadistica inferencial porque tienes la POBLACION COMPLETA (N = 48 operarios, todos medidos).\n\nμ = 1,250 es el PARAMETRO (valor real de la poblacion). No es una estimacion, no tiene error estandar, no necesita intervalo de confianza.\n\nEl supervisor mostro X̄ = 1,420, que es un ESTADISTICO de una muestra SESGADA (los 10 mejores). Cherry-picking puro.\n\nμ = 1,250 < 1,300 (estandar). El equipo NO cumple el criterio de 'excelente'. No pagar bonificacion.\n\n📚 Concepto: Parametro vs Estadistico. μ (parametro) es el valor REAL de la poblacion — fijo, sin error. X̄ (estadistico) es un valor calculado de una MUESTRA — variable, con error. Si tienes la poblacion completa, usa el parametro. Punto.",
          next: "hr-02"
        },
        {
          id: "B",
          label: "Aceptar los datos del supervisor (X̄ = 1,420)",
          description: "El supervisor conoce a su gente. Si dice que son buenos, confiemos en sus numeros.",
          cost: 3000000,
          revenue: 12000000,
          bsc: { bsc_internal: -10, bsc_customer: -2, bsc_financial: -5, bsc_learning: -8 },
          crossEffects: [],
          tags: ["naive", "biased"],
          feedback: "❌ DECISION BASADA EN DATOS MANIPULADOS\n\nEl supervisor te mostro los 10 MEJORES operarios (cherry-picking). Su X̄ = 1,420 es un estadistico de muestra SESGADA — no representa al equipo completo.\n\nLa poblacion completa (48 operarios) tiene μ = 1,250, que esta DEBAJO del estandar de 1,300.\n\nSi aceptas una muestra seleccionada a dedo, cualquier supervisor puede 'demostrar' lo que quiera. Es como juzgar una pelicula solo por las mejores escenas.\n\n📚 Concepto: Muestra sesgada vs muestra aleatoria. X̄ solo estima μ correctamente si la muestra es ALEATORIA. Una muestra seleccionada por conveniencia (los mejores) siempre sobreestima.",
          next: "hr-02"
        },
        {
          id: "C",
          label: "Tomar una muestra aleatoria de 15 operarios para verificar",
          description: "No confio en el supervisor ni en el dato completo (puede haber errores). Muestra aleatoria propia.",
          cost: 1000000,
          revenue: 12000000,
          bsc: { bsc_internal: 3, bsc_customer: 0, bsc_financial: -1, bsc_learning: 5 },
          crossEffects: [],
          tags: ["cautious", "unnecessary"],
          feedback: "⚠️ DECISION INNECESARIA\n\nYa tienes los datos de los 48 operarios (poblacion completa). ¿Para que tomar una muestra de 15?\n\nUna muestra de 15 daria:\nSE = σ/√n = 180/√15 = 46.5\nIC 95% = X̄ ± 2.145 × 46.5 (con t de Student)\n\nPero... ¿por que ESTIMAR algo que ya SABES con certeza?\n\nμ = 1,250 es el parametro. No tiene error. No necesita IC. Tomar una muestra cuando tienes la poblacion es como sacar una foto de una persona que esta parada frente a ti.\n\n📚 Concepto: Cuando tienes la poblacion completa, NO necesitas inferencia. La inferencia estadistica existe para cuando NO podemos medir toda la poblacion. Si ya la mediste, usa el parametro directamente.",
          next: "hr-02"
        },
        {
          id: "D",
          label: "Pagar bonificacion proporcional al desempeno real",
          description: "μ = 1,250 no es 'excelente' pero tampoco es malo. Pagar un porcentaje proporcional.",
          cost: 2000000,
          revenue: 12000000,
          bsc: { bsc_internal: 6, bsc_customer: 3, bsc_financial: -2, bsc_learning: 4 },
          crossEffects: [],
          tags: ["moderate", "fair"],
          feedback: "💡 DECISION CREATIVA CON BUEN USO DEL PARAMETRO\n\nUsas el parametro real (μ = 1,250) para calcular proporcion:\n1,250 / 1,300 = 96.15% del estandar\n\nBonificacion proporcional: 96.15% × $3M = $2.88M\nO si pones umbral minimo en 1,000: (1,250 - 1,000) / (1,300 - 1,000) = 83.3% → $2.5M\n\nEs una decision justa basada en el PARAMETRO (no en la muestra sesgada del supervisor). El equipo recibe reconocimiento proporcional a su desempeno real.\n\n📚 Concepto: El parametro μ permite decisiones exactas, sin incertidumbre. Cuando tienes la poblacion completa, la decision se basa en hechos, no en estimaciones. La inferencia no aplica — pero el analisis descriptivo si.",
          next: "hr-02"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-02 | Dia 4 | Diferencia de medias pareadas (before/after)
       -------------------------------------------------------- */
    "hr-02": {
      id: "hr-02",
      day: 4,
      title: "¿La capacitacion valio la pena?",
      context: "Invertiste $18M en un programa de capacitacion en buenas practicas de manufactura (BPM) para los operarios. La gerencia quiere saber si sirvio de algo.\n\nMediste la productividad de los MISMOS 20 operarios antes y despues de la capacitacion:\n\n📊 DATOS PAREADOS (mismos operarios, antes vs despues):\n• n = 20 operarios\n• Productividad promedio ANTES: 1,180 piezas/dia\n• Productividad promedio DESPUES: 1,245 piezas/dia\n• Diferencia promedio (d̄): 65 piezas/dia\n• Desviacion estandar de las diferencias (sd): 42 piezas/dia\n\nEl gerente general pregunta: '$18 millones por 65 piezas mas? ¿Eso es significativo?'",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Si, es significativo - la capacitacion funciono",
          description: "Mostrar el analisis estadistico pareado que demuestra que la mejora es real, no casualidad.",
          cost: 0,
          revenue: 22000000,
          bsc: { bsc_internal: 8, bsc_customer: 3, bsc_financial: 3, bsc_learning: 10 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: 4 }, narrative: "La mejora en productividad post-capacitacion se refleja directamente en la linea de produccion." }
          ],
          tags: ["data-driven", "proactive"],
          feedback: "✅ DECISION CORRECTA\n\nPrueba t pareada:\nt = d̄ / (sd/√n) = 65 / (42/√20) = 65 / 9.39 = 6.92\n\nGrados de libertad: n - 1 = 19\nt critico (α=0.05, 19 gl): 2.093\n\nt calculado (6.92) >> t critico (2.093)\n\np-valor ≈ 0.0000012 (practicamente cero)\n\nIC 95% para la diferencia media:\n65 ± 2.093 × 9.39 = 65 ± 19.66 = [45.34, 84.66]\n\nCon 95% de confianza, la capacitacion mejoro la productividad entre 45 y 85 piezas/dia por operario.\n\n20 operarios × 65 piezas extra × 22 dias × $2,500/pieza = $71.5M/mes\nRetorno de inversion: $71.5M / $18M = 3.97x en un solo mes.\n\n📚 Concepto: Prueba t pareada. Se usa cuando mides lo MISMO antes y despues. La ventaja: cada operario es su propio control, eliminando diferencias individuales.",
          next: "hr-03"
        },
        {
          id: "B",
          label: "No, 65 piezas es insignificante frente a $18M",
          description: "65 piezas de 1,180 es solo 5.5% de mejora. No justifica la inversion.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: -5, bsc_customer: -2, bsc_financial: 2, bsc_learning: -8 },
          crossEffects: [],
          tags: ["wrong-conclusion"],
          feedback: "❌ DECISION CON MAL ANALISIS\n\nParece poco pero hagamos cuentas:\nt = 6.92 con p < 0.000002. La mejora es ALTAMENTE significativa.\n\nEn dinero:\n20 operarios × 65 piezas × 22 dias × $2,500 = $71,500,000/mes\nInversion: $18,000,000\nROI mensual: 297%\nPayback: 7.6 dias laborales\n\n¿$18M por $71.5M de retorno mensual te parece insignificante?\n\nEl error: juzgar 65 piezas sin contexto financiero. El porcentaje (5.5%) suena chiquito, pero multiplicado por 20 personas × 22 dias × precio por pieza, es un platal.\n\n📚 Concepto: Significancia estadistica + significancia practica. t = 6.92 confirma que la mejora es REAL. El calculo financiero confirma que es VALIOSA. Ambas dimensiones importan.",
          next: "hr-03"
        },
        {
          id: "C",
          label: "Necesitamos mas datos - comparar con un grupo control",
          description: "¿Y si la mejora fue por otra razon? Sin grupo control no podemos atribuirla a la capacitacion.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: 3, bsc_customer: 0, bsc_financial: -2, bsc_learning: 6 },
          crossEffects: [],
          tags: ["cautious", "academic"],
          feedback: "💡 VALIDO PERO YA TENEMOS EVIDENCIA FUERTE\n\nEl diseno pareado (mismos sujetos antes/despues) ya controla por:\n• Diferencias individuales de habilidad\n• Diferencias en maquinaria asignada\n• Diferencias en experiencia\n\nCada operario es su propio control. t = 6.92 es contundente.\n\nUn grupo control externo ayudaria a descartar:\n• Efecto estacional (¿la produccion sube en esta epoca?)\n• Efecto Hawthorne (¿mejoraron porque los observaban?)\n\nPero con p < 0.000002, la evidencia actual ya es muy fuerte. Un grupo control es ideal en teoria, costoso y lento en practica.\n\n📚 Concepto: Diseno pareado vs grupo control. El pareado elimina variabilidad entre sujetos. El grupo control elimina confusores externos. El pareado es mas eficiente cuando puedes medir antes/despues.",
          next: "hr-03"
        },
        {
          id: "D",
          label: "Repetir la capacitacion con todos los operarios",
          description: "Si funciono con 20, funcionara con los 48. Invertir $45M para capacitar a todo el personal.",
          cost: 45000000,
          revenue: 12000000,
          bsc: { bsc_internal: 5, bsc_customer: 3, bsc_financial: -5, bsc_learning: 8 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -3 }, narrative: "La inversion de $45M en capacitacion masiva requiere aprobacion financiera adicional." }
          ],
          tags: ["proactive", "expensive"],
          feedback: "⚠️ ENTUSIASMO CORRECTO, CALCULO INCOMPLETO\n\nLa evidencia (t = 6.92, p < 0.000002) respalda la eficacia. Pero antes de escalar:\n\nIC 95% de la mejora: [45, 85] piezas/dia por operario\n\nProyeccion para 48 operarios (escenario conservador):\n48 × 45 piezas × 22 dias × $2,500 = $118.8M/mes\n\nInversion: $45M\nPayback: ~11 dias laborales. Excelente ROI.\n\nPERO: los 20 operarios originales podrian ser los mas motivados (sesgo de seleccion). Si los 28 restantes son menos receptivos, la mejora podria ser menor.\n\nRecomendacion: escalar, pero monitorear los resultados de la segunda cohorte.\n\n📚 Concepto: Generalizacion de resultados. Los datos pareados de n=20 son contundentes para ESE grupo. Extrapolar a los 48 requiere el supuesto de que la muestra es representativa de toda la planta.",
          next: "hr-03"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-03 | Dia 7 | Sesgo de no-respuesta, representatividad
       -------------------------------------------------------- */
    "hr-03": {
      id: "hr-03",
      day: 7,
      title: "Encuesta de clima laboral con baja respuesta",
      context: "Enviaste una encuesta de satisfaccion laboral a los 120 empleados de la empresa. Solo respondieron 35.\n\n📊 DATOS DE LA ENCUESTA:\n• Enviada a: 120 empleados\n• Respondieron: 35 (tasa de respuesta: 29.2%)\n• Satisfaccion promedio (escala 1-10): 7.8\n• Desviacion estandar: 1.2\n\nEl resultado de 7.8/10 se ve genial. El CEO quiere publicarlo en la pagina web: 'Nuestros empleados nos califican 7.8 de 10'.\n\n¿Apruebas publicar ese dato?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "No publicar - la muestra no es representativa",
          description: "29% de respuesta es muy bajo. Los que no respondieron pueden ser los insatisfechos. El dato esta sesgado.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: 8, bsc_customer: 2, bsc_financial: 0, bsc_learning: 10 },
          crossEffects: [],
          tags: ["data-driven", "honest"],
          feedback: "✅ DECISION ACERTADA\n\nEl 7.8 NO representa a la empresa. Solo el 29.2% respondio. El sesgo de no-respuesta es el elefante en la sala:\n\n¿Quienes NO responden encuestas de satisfaccion?\n• Los insatisfechos (no les importa, o temen represalias)\n• Los muy ocupados (sobrecargados de trabajo)\n• Los desconectados (bajo compromiso)\n\n¿Quienes SI responden?\n• Los satisfechos (quieren que se sepa)\n• Los muy comprometidos\n• Los que quieren complacer a RRHH\n\nSi los 85 que no respondieron tienen satisfaccion promedio de 5.5:\nμ_real = (35 × 7.8 + 85 × 5.5) / 120 = (273 + 467.5) / 120 = 6.17\n\n¡De 7.8 a 6.17! El sesgo de no-respuesta puede distorsionar ENORMEMENTE.\n\n📚 Concepto: Sesgo de no-respuesta. Cuando la tasa de respuesta es baja (< 60%), los resultados estan sesgados porque los que responden son SISTEMATICAMENTE diferentes de los que no.",
          next: "hr-04"
        },
        {
          id: "B",
          label: "Publicar - 35 es una buena muestra",
          description: "35 de 120 es casi el 30%. El IC da un margen razonable. Publicar con el intervalo.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: -8, bsc_customer: 3, bsc_financial: 1, bsc_learning: -8 },
          crossEffects: [],
          tags: ["naive", "risky"],
          feedback: "❌ DECISION ENGAÑOSA\n\nEl IC se calcula asi:\nSE = 1.2/√35 = 0.2028\nIC 95% = 7.8 ± 2.032 × 0.2028 = 7.8 ± 0.412\nIC = [7.39, 8.21]\n\nParece solido... PERO el IC asume muestra ALEATORIA. Tu muestra es AUTO-SELECCIONADA (voluntarios). El IC es valido solo para los que responden, NO para toda la empresa.\n\nPublicar '7.8/10' cuando podria ser 6.2/10 es publicidad enganosa interna. Si los empleados insatisfechos ven eso, se sentiran ignorados.\n\n📚 Concepto: IC valido solo con muestra aleatoria. Un IC estrecho con muestra sesgada da FALSA precision. Parece exacto pero estima el valor equivocado. Precision ≠ exactitud.",
          next: "hr-04"
        },
        {
          id: "C",
          label: "Reenviar la encuesta con incentivo para subir respuesta",
          description: "Ofrecer medio dia libre a quien responda. Subir la tasa de respuesta al 70%+.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: 6, bsc_customer: 0, bsc_financial: -2, bsc_learning: 8 },
          crossEffects: [],
          tags: ["proactive", "smart"],
          feedback: "✅ BUENA ESTRATEGIA PARA REDUCIR EL SESGO\n\nCon incentivo, la tasa de respuesta sube significativamente. Si logras 70%+ (84+ de 120), el sesgo de no-respuesta se reduce mucho.\n\nPero cuidado: el incentivo puede introducir OTRO sesgo. Si la gente responde solo por el medio dia libre, puede responder rapido y sin cuidado, inflando las calificaciones.\n\nEstrategias complementarias:\n• Garantizar ANONIMATO real (no solo prometerlo)\n• Hacer seguimiento personalizado a los que no responden\n• Analizar si las respuestas tardias difieren de las tempranas (wave analysis)\n\nSi las tardias (obtenidas con insistencia) dan X̄ = 6.5 vs las tempranas X̄ = 7.8, confirmas sesgo de no-respuesta.\n\n📚 Concepto: Tecnicas para reducir sesgo de no-respuesta: incentivos, seguimiento, anonimato, wave analysis. La meta: tasa de respuesta > 60% y verificar que respondedores tardios no difieran de los tempranos.",
          next: "hr-04"
        },
        {
          id: "D",
          label: "Hacer la encuesta obligatoria y presencial",
          description: "Todo el mundo a la sala de reuniones. Encuesta en papel, ahi mismo. 100% de respuesta.",
          cost: 3000000,
          revenue: 12000000,
          bsc: { bsc_internal: -3, bsc_customer: 0, bsc_financial: -1, bsc_learning: 3 },
          crossEffects: [],
          tags: ["authoritarian"],
          feedback: "⚠️ 100% RESPUESTA PERO NUEVO SESGO\n\nLogras N = 120 respuestas (censo). Pero introduces sesgo de deseabilidad social:\n\n• En presencial, la gente califica mas alto por miedo a represalias\n• El anonimato se percibe como ficticio ('seguro saben quien soy')\n• Presion de grupo: nadie quiere ser el unico poniendo 3/10 mientras todos ponen 8\n\nEl resultado podria subir de 7.8 a 8.5... siendo MENOS preciso que antes.\n\n📚 Concepto: Sesgo de deseabilidad social. Forzar la respuesta no elimina el sesgo — lo cambia de tipo. Ahora tienes sesgo por presion social en vez de sesgo por no-respuesta. Lo ideal: encuesta voluntaria, anonima, con incentivo y alta tasa de respuesta.",
          next: "hr-04"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-04 | Dia 11 | Distribucion normal, percentiles
       -------------------------------------------------------- */
    "hr-04": {
      id: "hr-04",
      day: 11,
      title: "Bonificacion por rendimiento excepcional",
      context: "La junta aprobo bonificaciones para operarios con rendimiento 'excepcional'. Pero necesitas definir que es 'excepcional' de forma objetiva.\n\nTienes datos de produccion mensual de todos los operarios de la planta:\n\n📊 DATOS DE PRODUCCION MENSUAL:\n• N = 120 operarios\n• Produccion promedio: μ = 1,100 piezas\n• Desviacion estandar: σ = 150 piezas\n• Distribucion: aproximadamente normal\n• Presupuesto para bonificaciones: $15,000,000\n• Bonificacion individual: $500,000\n• Maximo operarios bonificados: 30 (15M / 500K)\n\n¿Donde pones el corte de 'excepcional'?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Top 25% (percentil 75) - produccion >= 1,201 piezas",
          description: "El cuartil superior. Bonificar al 25% mas productivo, que serian 30 operarios (justo el presupuesto).",
          cost: 15000000,
          revenue: 18000000,
          bsc: { bsc_internal: 8, bsc_customer: 3, bsc_financial: 0, bsc_learning: 7 },
          crossEffects: [],
          tags: ["data-driven", "balanced"],
          feedback: "✅ DECISION BIEN CALIBRADA\n\nPercentil 75 en distribucion normal:\nP75 = μ + Z₇₅ × σ = 1,100 + 0.6745 × 150 = 1,100 + 101.2 = 1,201 piezas\n\nOperarios con produccion ≥ 1,201: 25% de 120 = 30 operarios\nPresupuesto: 30 × $500,000 = $15,000,000 (ajuste perfecto)\n\nEste criterio:\n• Es objetivo (basado en datos, no en opinion del supervisor)\n• Es transparente (todos saben el umbral)\n• Es alcanzable (1 de cada 4 lo logra)\n• Cabe en el presupuesto\n\n📚 Concepto: Percentiles en la distribucion normal. P = μ + Z_p × σ. El Z para P75 es 0.6745. La distribucion normal te permite convertir percentiles en puntos de corte exactos.",
          next: "hr-05"
        },
        {
          id: "B",
          label: "Top 10% (percentil 90) - solo los mejores de los mejores",
          description: "'Excepcional' debe ser realmente excepcional. Solo el top 10%. Dar $1,250,000 a cada uno.",
          cost: 15000000,
          revenue: 12000000,
          bsc: { bsc_internal: 5, bsc_customer: 2, bsc_financial: 0, bsc_learning: 5 },
          crossEffects: [],
          tags: ["selective", "elitist"],
          feedback: "⚠️ MATEMATICAMENTE SOLIDO, MOTIVACIONALMENTE CUESTIONABLE\n\nPercentil 90:\nP90 = μ + Z₉₀ × σ = 1,100 + 1.2816 × 150 = 1,100 + 192.2 = 1,292 piezas\n\nOperarios que califican: 10% de 120 = 12 personas\nBonificacion: $15M / 12 = $1,250,000 cada uno\n\nEstadisticamente perfecto. Pero motivacionalmente:\n• 108 operarios (90%) no reciben nada → desmotivacion masiva\n• El corte (1,292) es demasiado alto para la mayoria → 'para que esforzarse'\n• Concentras la motivacion en los que YA son buenos\n\nLa teoria de incentivos dice que el corte debe ser alcanzable para al menos 20-30% para maximizar el esfuerzo general.\n\n📚 Concepto: Percentil 90 = μ + 1.28σ. Estadisticamente correcto pero la decision no es solo estadistica — es de gestion. Los percentiles son herramientas, no respuestas automaticas.",
          next: "hr-05"
        },
        {
          id: "C",
          label: "Todos los que superen el promedio (> 1,100 piezas)",
          description: "'Excepcional' = por encima del promedio. Bonificar al 50% superior.",
          cost: 15000000,
          revenue: 22000000,
          bsc: { bsc_internal: 3, bsc_customer: 3, bsc_financial: -3, bsc_learning: 2 },
          crossEffects: [
            { area: "finance", bsc: { bsc_financial: -2 }, narrative: "Bonificar al 50% implica 60 operarios × $500K = $30M, el doble del presupuesto aprobado." }
          ],
          tags: ["generous", "over-budget"],
          feedback: "❌ DECISION QUE REVIENTA EL PRESUPUESTO\n\nP(X > 1,100) = P(Z > 0) = 50%\n50% de 120 = 60 operarios\n60 × $500,000 = $30,000,000\n\n¡El doble del presupuesto! Solo tienes $15M.\n\nAdemas, 'por encima del promedio' no es 'excepcional'. En una distribucion normal, el 50% esta arriba del promedio por definicion. Bonificar a la mitad de la gente por ser 'promedio o mejor' diluye el concepto de excelencia.\n\nSi reduces la bonificacion a $250,000 para que alcance, el monto es tan bajo que pierde efecto motivacional.\n\n📚 Concepto: En una distribucion normal simetrica, exactamente el 50% esta por encima de la media. 'Por encima del promedio' es la MITAD de la poblacion, no la elite.",
          next: "hr-05"
        },
        {
          id: "D",
          label: "Que el supervisor elija a los 30 mejores",
          description: "El supervisor conoce a su gente. Que el decida quien merece la bonificacion.",
          cost: 15000000,
          revenue: 12000000,
          bsc: { bsc_internal: -8, bsc_customer: -3, bsc_financial: 0, bsc_learning: -10 },
          crossEffects: [],
          tags: ["subjective", "biased"],
          feedback: "❌ DECISION SUBJETIVA Y CONFLICTIVA\n\nDejar la decision al supervisor introduce:\n• Sesgo de favoritismo (premia a sus amigos)\n• Sesgo de recencia (solo recuerda el ultimo mes)\n• Percepcion de injusticia (los no seleccionados reclaman)\n• Riesgo legal (discriminacion potencial)\n\nTienes DATOS OBJETIVOS de produccion de cada operario. Usar el percentil 75 (≥ 1,201 piezas) es:\n• Transparente: todos conocen el criterio\n• Verificable: se basa en numeros, no opiniones\n• Justo: el mismo criterio para todos\n• Apelable: si alguien reclama, los datos respaldan\n\n📚 Concepto: La distribucion normal y los percentiles te dan herramientas OBJETIVAS para decisiones que tradicionalmente son subjetivas. Datos > opiniones cuando los datos existen.",
          next: "hr-05"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-05 | Dia 16 | Test de proporcion (¿nuestra tasa es diferente del sector?)
       -------------------------------------------------------- */
    "hr-05": {
      id: "hr-05",
      day: 12,
      title: "Rotacion de personal: ¿estamos bien o mal?",
      context: "La asociacion de empresas de alimentos del Eje Cafetero publico que la tasa de rotacion promedio del sector es del 18% anual. Tu CEO quiere saber si tu empresa esta por encima o por debajo.\n\n📊 DATOS DE TU EMPRESA:\n• Total empleados al inicio del ano: 120\n• Renuncias en el ano: 28\n• Tasa de rotacion: p̂ = 28/120 = 0.2333 (23.33%)\n• Tasa del sector: p₀ = 0.18 (18%)\n\nEl CEO dice: '23% parece mas alto que 18%, pero son solo 6 personas mas de las esperadas. ¿Es significativo o fue mala suerte?'",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Si es significativo - tenemos un problema de retencion",
          description: "23.33% vs 18% del sector. Hay que investigar por que se nos va la gente y actuar rapido.",
          cost: 8000000,
          revenue: 12000000,
          bsc: { bsc_internal: 5, bsc_customer: 2, bsc_financial: -2, bsc_learning: 6 },
          crossEffects: [],
          tags: ["cautious"],
          feedback: "⚠️ LA CONCLUSION ES CORRECTA PERO HAGAMOS EL TEST\n\nTest de proporcion (una muestra):\nH₀: p = 0.18 (somos iguales al sector)\nH₁: p > 0.18 (somos peores)\n\nZ = (p̂ - p₀) / √(p₀(1-p₀)/n)\nZ = (0.2333 - 0.18) / √(0.18 × 0.82 / 120)\nZ = 0.0533 / √(0.001230)\nZ = 0.0533 / 0.03507 = 1.52\n\nP(Z > 1.52) = 0.0643 = 6.43%\n\nCon α = 0.05, NO es significativo (p > 0.05). Con α = 0.10, SI es significativo.\n\nLa evidencia es MARGINAL. No es concluyente, pero la tendencia es preocupante. Investigar es prudente aunque no sea estadisticamente significativo al 5%.\n\n📚 Concepto: Test de proporcion. Z = (p̂ - p₀)/√(p₀q₀/n). Con Z = 1.52 y p = 0.064, estamos en zona gris. La decision depende de tu tolerancia al riesgo.",
          next: "hr-06"
        },
        {
          id: "B",
          label: "No es significativo - es variacion normal",
          description: "Solo 5.33 puntos mas que el sector. Con 120 empleados, eso puede ser casualidad.",
          cost: 0,
          revenue: 12000000,
          bsc: { bsc_internal: -5, bsc_customer: -3, bsc_financial: 2, bsc_learning: -4 },
          crossEffects: [],
          tags: ["dismissive"],
          feedback: "⚠️ TECNICAMENTE CORRECTO PERO PELIGROSO\n\nZ = 1.52, p = 0.064. Con α = 0.05, no rechazamos H₀. Tecnicamente, no hay evidencia 'significativa' al 5%.\n\nPERO:\n1. p = 0.064 esta MUY cerca de 0.05. Es evidencia 'casi significativa'.\n2. No rechazar H₀ NO significa que H₀ sea verdad. Significa que no hay SUFICIENTE evidencia para descartarla.\n3. Cada rotacion cuesta ~$5M (reclutamiento + capacitacion). 28 vs 22 esperadas = 6 extras × $5M = $30M de costo adicional.\n\nIgnorar una senal preocupante porque 'no llega al 5%' es como ignorar fiebre de 37.4°C porque 'fiebre empieza en 38°C'.\n\n📚 Concepto: No rechazar H₀ ≠ aceptar H₀. La ausencia de evidencia no es evidencia de ausencia. Con p = 0.064, la senal esta ahi — solo es debil.",
          next: "hr-06"
        },
        {
          id: "C",
          label: "Calcular un IC para nuestra tasa real y comparar",
          description: "En vez de solo testear, construir un intervalo para saber en que rango esta nuestra tasa verdadera.",
          cost: 2000000,
          revenue: 12000000,
          bsc: { bsc_internal: 7, bsc_customer: 2, bsc_financial: -1, bsc_learning: 12 },
          crossEffects: [
            { area: "analyst", bsc: { bsc_learning: 3 }, narrative: "El enfoque de intervalos de confianza se adopta como estandar para reportes de RRHH." }
          ],
          tags: ["data-driven", "analytical"],
          feedback: "✅ EXCELENTE ENFOQUE\n\nIC 95% para nuestra tasa de rotacion:\np̂ = 0.2333\nSE = √(0.2333 × 0.7667 / 120) = √(0.001490) = 0.03861\nIC = 0.2333 ± 1.96 × 0.03861\nIC = 0.2333 ± 0.0757\nIC = [15.76%, 30.90%]\n\nEl IC INCLUYE el 18% del sector. Esto es consistente con el test (Z = 1.52, no significativo al 5%).\n\nPero ojo: el IC tambien incluye valores de hasta 31%. En el peor caso, nuestra rotacion podria ser casi el doble del sector.\n\nEl IC te da MAS informacion que el test: no solo 'si o no', sino el RANGO plausible de tu tasa real.\n\n📚 Concepto: IC vs test de hipotesis. El IC da informacion sobre magnitud (¿cuanto?), no solo direccion (¿si o no?). Un IC que incluye el valor de referencia es equivalente a no rechazar H₀.",
          next: "hr-06"
        },
        {
          id: "D",
          label: "Comparar con otras empresas de platanitos, no con todo el sector",
          description: "El sector de alimentos incluye desde Alpina hasta tiendas de barrio. No es comparable. Buscar empresas similares.",
          cost: 5000000,
          revenue: 12000000,
          bsc: { bsc_internal: 4, bsc_customer: 0, bsc_financial: -2, bsc_learning: 7 },
          crossEffects: [],
          tags: ["strategic", "contextual"],
          feedback: "💡 EXCELENTE PUNTO SOBRE COMPARABILIDAD\n\nEl 18% del sector incluye empresas de todos los tamanos y subsectores. Tu empresa de 120 empleados no es comparable con Alpina (10,000+ empleados).\n\nFactores que afectan la comparacion:\n• Tamano de empresa (pymes vs grandes)\n• Tipo de producto (snacks vs lacteos vs carnicos)\n• Ubicacion (Eje Cafetero vs Bogota)\n• Tipo de empleado (operarios vs administrativos)\n\nSin embargo, el dato del sector (18%) es lo MEJOR que tienes. Comparar con un grupo mas especifico requiere datos que probablemente no existen.\n\nLo ideal: comparar p̂ = 23.33% vs el 18% del sector PERO interpretar con cautela.\n\n📚 Concepto: Representatividad de la referencia. La prueba de proporcion compara tu dato vs una referencia. Si la referencia no es comparable, la conclusion puede ser invalida aunque la estadistica sea correcta.",
          next: "hr-06"
        }
      ]
    },

    /* --------------------------------------------------------
       HR-06 | Dia 21 | IC para proporcion, decision basada en datos
       -------------------------------------------------------- */
    "hr-06": {
      id: "hr-06",
      day: 14,
      title: "Plan de retencion: ¿a quien retener?",
      context: "Decidiste implementar un plan de retencion para los proximos 12 meses. Pero el presupuesto ($40M) no alcanza para todos. Necesitas priorizar.\n\nTu equipo hizo una encuesta ANONIMA de intencion de renuncia a toda la planta, con buena tasa de respuesta:\n\n📊 DATOS DE INTENCION DE RENUNCIA:\n\nOperarios (n = 80, respondieron 68):\n• 'Estoy buscando trabajo': 22 de 68\n• p̂_operarios = 22/68 = 0.3235 (32.35%)\n\nAdministrativos (n = 40, respondieron 36):\n• 'Estoy buscando trabajo': 6 de 36\n• p̂_admin = 6/36 = 0.1667 (16.67%)\n\n¿Como distribuyes el presupuesto de retencion?",
      type: "choice",
      options: [
        {
          id: "A",
          label: "80% a operarios, 20% a administrativos",
          description: "Los operarios tienen el doble de intencion de renuncia. Enfocar recursos donde esta el problema.",
          cost: 40000000,
          revenue: 35000000,
          bsc: { bsc_internal: 8, bsc_customer: 5, bsc_financial: 2, bsc_learning: 8 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: 5 }, narrative: "El plan de retencion enfocado en operarios estabiliza la linea de produccion." }
          ],
          tags: ["data-driven", "focused"],
          feedback: "✅ DECISION BIEN FUNDAMENTADA\n\nIC 95% para operarios:\np̂ = 0.3235, SE = √(0.3235 × 0.6765 / 68) = 0.0567\nIC = [0.2124, 0.4346] = [21.2%, 43.5%]\n\nIC 95% para administrativos:\np̂ = 0.1667, SE = √(0.1667 × 0.8333 / 36) = 0.0622\nIC = [0.0448, 0.2886] = [4.5%, 28.9%]\n\nDiferencia de proporciones:\np̂₁ - p̂₂ = 0.3235 - 0.1667 = 0.1568\nSE_diff = √(0.0567² + 0.0622²) = √(0.003213 + 0.003869) = 0.0841\nZ = 0.1568 / 0.0841 = 1.864\nIC diff = [−0.008, 0.322]\n\nLa diferencia es marginalmente significativa (p ≈ 0.031 unilateral). Los operarios PROBABLEMENTE tienen mayor intencion de renuncia.\n\nEnfocar 80/20 esta alineado con la evidencia.\n\n📚 Concepto: IC para proporcion por grupos. Comparar intervalos te permite priorizar recursos donde el problema es mayor. El IC te da el rango de la proporcion real para cada grupo.",
          next: null
        },
        {
          id: "B",
          label: "50/50 - tratar a todos por igual",
          description: "Equidad: el mismo presupuesto por persona, sin importar el cargo.",
          cost: 40000000,
          revenue: 22000000,
          bsc: { bsc_internal: 2, bsc_customer: 2, bsc_financial: -2, bsc_learning: -3 },
          crossEffects: [],
          tags: ["egalitarian", "inefficient"],
          feedback: "⚠️ DECISION EQUITATIVA PERO INEFICIENTE\n\nDistribuir 50/50 ignora que los grupos tienen riesgos MUY diferentes:\n\nIC operarios: [21.2%, 43.5%] de intencion de renuncia\nIC administrativos: [4.5%, 28.9%] de intencion de renuncia\n\nIncluso en el MEJOR escenario, los operarios (21.2%) tienen mas riesgo que el promedio de los administrativos (16.7%).\n\nGastar $20M en retener administrativos que ya tienen baja intencion de renuncia es ineficiente. Ese dinero tendria mas impacto en operarios.\n\nCosto de rotacion de 1 operario: ~$4M\nCosto de rotacion de 1 administrativo: ~$8M\n\nAun con mayor costo unitario de admin, el VOLUMEN de riesgo esta en operarios.\n\n📚 Concepto: Eficiencia en asignacion de recursos basada en IC. Los intervalos de confianza por grupo te dicen DONDE esta el mayor riesgo. Asignar proporcionalmente al riesgo es mas eficiente que distribuir uniformemente.",
          next: null
        },
        {
          id: "C",
          label: "100% a operarios - los administrativos estan bien",
          description: "16.67% es bajo. Los operarios con 32.35% son la prioridad total.",
          cost: 40000000,
          revenue: 50000000,
          bsc: { bsc_internal: 5, bsc_customer: 3, bsc_financial: 0, bsc_learning: 3 },
          crossEffects: [],
          tags: ["aggressive", "risky"],
          feedback: "⚠️ OJO CON LOS INTERVALOS\n\nIC administrativos: [4.5%, 28.9%]\n\nEl limite superior es 28.9%. Aunque el punto estimado (16.67%) parece bajo, la realidad podria ser hasta 29%. Dejar a los administrativos sin NADA de retencion es arriesgado.\n\nAdemas, un administrativo clave que renuncia (contador, jefe de compras) puede impactar mas que varios operarios.\n\nEl IC amplio de los administrativos (rango de 24.4pp) se debe a n = 36 (muestra pequena). Hay MUCHA incertidumbre sobre su tasa real.\n\n📚 Concepto: Amplitud del IC y tamano de muestra. Con n = 36, el IC es muy ancho. La incertidumbre es alta. 'No hay evidencia de problema' no significa 'no hay problema' — puede significar 'no tengo suficientes datos para verlo'.",
          next: null
        },
        {
          id: "D",
          label: "Entrevistar individualmente a los 28 que quieren irse",
          description: "Antes de gastar $40M en planes genericos, hablar con cada uno. ¿Que los retiene? ¿Que los espanta?",
          cost: 3000000,
          revenue: 12000000,
          bsc: { bsc_internal: 10, bsc_customer: 0, bsc_financial: 1, bsc_learning: 12 },
          crossEffects: [],
          tags: ["qualitative", "empathetic"],
          feedback: "💡 COMPLEMENTO PERFECTO AL ANALISIS CUANTITATIVO\n\nLos ICs te dicen CUANTOS piensan irse. Las entrevistas te dicen POR QUE.\n\nSi los 22 operarios dicen 'el salario es bajo', el plan de retencion es aumento salarial.\nSi dicen 'el turno nocturno me esta matando', el plan es reestructurar turnos.\nSi dicen 'no veo futuro aqui', el plan es un programa de desarrollo.\n\nCada causa requiere intervencion diferente. Gastar $40M en 'bonos de retencion' puede ser inutil si el problema es el ambiente laboral.\n\nEstrategia optima: entrevistas PRIMERO ($3M), luego plan focalizado con los $37M restantes.\n\n📚 Concepto: Datos cuantitativos (proporciones, ICs) te dicen QUE pasa y CUANTO. Datos cualitativos (entrevistas) te dicen POR QUE. La mejor decision combina ambos.",
          next: null
        }
      ]
    }
  }
};
