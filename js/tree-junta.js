/* ============================================================
   TREE-JUNTA - Decisiones de Junta Directiva (TODA la empresa vota)
   Estas decisiones aparecen para TODOS los departamentos.
   Cada jugador vota A/B/C/D y la mayoría gana.
   ============================================================ */
window.TREE_JUNTA = {
  name: "Junta Directiva",
  icon: "🏛️",
  nodes: {

    "junta-01": {
      id: "junta-01",
      day: 13,
      title: "¿Abrir segunda planta en Dosquebradas?",
      context: "La demanda crece 20% trimestral. La planta de Pereira está al 87% de capacidad. Dosquebradas ofrece terreno industrial con exención de impuestos por 3 años.\n\n📊 DATOS:\n• Inversión nueva planta: $180M\n• Capacidad actual: 15.000 paq/día (87% uso)\n• Demanda proyectada: 19.500 paq/día en 3 meses\n• Margen por paquete: $1.800\n• Exención tributaria: ahorro $12M/año",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Abrir planta en Dosquebradas YA",
          description: "Inversión fuerte pero captura toda la demanda creciente antes que la competencia.",
          cost: 28000000,
          revenue: 16000000,
          bsc: { bsc_financial: -5, bsc_customer: 10, bsc_internal: 8, bsc_learning: 6 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: 5 }, narrative: "Nueva planta amplía capacidad operativa." },
            { area: "hr", bsc: { bsc_learning: 3 }, narrative: "Nuevas contrataciones dinamizan talento humano." }
          ],
          tags: ["investment", "growth"],
          feedback: "💡 APUESTA AGRESIVA\n\nCon demanda de 19.500 y capacidad de 15.000, el déficit es 4.500 paq/día × $1.800 = $8.1M/día en ventas perdidas. En 90 días eso es $729M. La planta nueva de $180M se paga sola en menos de un trimestre.\n\n📚 Concepto: Costo de oportunidad. El análisis estadístico de la tendencia (20% trimestral con datos de 4 trimestres) da IC 95% de [15%, 25%] — la demanda SÍ crece."
        },
        {
          id: "B",
          label: "Tercerizar producción excedente",
          description: "Contratar maquilador local para cubrir el exceso. Menor inversión, menor control.",
          cost: 7000000,
          revenue: 11000000,
          bsc: { bsc_financial: 5, bsc_customer: 3, bsc_internal: -4, bsc_learning: 2 },
          crossEffects: [],
          tags: ["moderate"],
          feedback: "✅ DECISION CONSERVADORA INTELIGENTE\n\nTercerizar cuesta más por unidad pero no compromete $180M. Si la demanda no crece como esperan (el IC incluye 15%), no quedas con planta ociosa.\n\n📚 Concepto: Gestión de riesgo basada en intervalos de confianza. Cuando el IC es amplio, comprometerse menos es prudente."
        },
        {
          id: "C",
          label: "Ampliar turno nocturno en Pereira",
          description: "Tercer turno para subir capacidad a 20.000/día sin nueva planta.",
          cost: 5000000,
          revenue: 9000000,
          bsc: { bsc_financial: 4, bsc_customer: 5, bsc_internal: 2, bsc_learning: 1 },
          crossEffects: [
            { area: "hr", bsc: { bsc_internal: -3 }, narrative: "Turnos nocturnos generan desgaste en el personal." }
          ],
          tags: ["efficient"],
          feedback: "⚠️ SOLUCION TEMPORAL\n\nEl turno nocturno sube capacidad a ~20.000 pero con 15% más de defectos (datos de industrias similares). A largo plazo necesitarás la planta igual.\n\n📚 Concepto: La media no lo es todo — la variabilidad nocturna (σ más alto) impacta calidad."
        },
        {
          id: "D",
          label: "Esperar 3 meses y ver si la demanda se sostiene",
          description: "No invertir hasta confirmar que el crecimiento es real, no estacional.",
          cost: 0,
          revenue: 2000000,
          bsc: { bsc_financial: 2, bsc_customer: -8, bsc_internal: 0, bsc_learning: 3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "❌ PARÁLISIS POR ANÁLISIS\n\nEsperar 3 meses cuando la demanda ya supera tu capacidad significa $8.1M/día en ventas perdidas. El IC de la tendencia ([15%, 25%]) no incluye 0% — la demanda SÍ crece.\n\n📚 Concepto: La estadística sirve para ACTUAR, no solo para esperar más datos. Cuando la evidencia es fuerte (Z > 2), decidir."
        }
      ]
    },

    "junta-02": {
      id: "junta-02",
      day: 16,
      title: "Oferta hostil: comprar al rival más pequeño",
      context: "Una empresa pequeña de platanitos artesanales ('Plátano Feliz', 8% del mercado) está en problemas financieros. Su dueño ofrece vender por $120M. Sus clientes son premium y pagan 40% más.\n\n📊 DATOS:\n• Precio de venta: $120M\n• Clientes activos: 340 (encuesta: 78% se quedarían con nueva gerencia, n=80)\n• Margen bruto: 42% (vs tu 28%)\n• Deuda oculta estimada: entre $20M y $60M (auditoría pendiente)\n• Market share combinado: tu 45% + su 8% = 53%",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Comprar TODO por $120M sin auditoría",
          description: "Rápido y agresivo. Si sale bien, dominas el mercado.",
          cost: 21000000,
          revenue: 14000000,
          bsc: { bsc_financial: -3, bsc_customer: 12, bsc_internal: 4, bsc_learning: 2 },
          crossEffects: [
            { area: "marketing", bsc: { bsc_customer: 5 }, narrative: "Marca premium adquirida amplía portafolio." }
          ],
          tags: ["risky", "aggressive"],
          feedback: "⚠️ RIESGO ALTO, RECOMPENSA ALTA\n\nSin auditoría, la deuda oculta puede ser $60M (peor caso). Pero el IC para retención de clientes es [68%, 88%] (n=80, p̂=0.78). Si se quedan ~265 clientes premium a 40% más de margen, recuperas rápido.\n\n📚 Concepto: IC para proporción. Con n=80, E = 1.96√(0.78×0.22/80) ≈ 0.091. El rango es razonable pero la muestra podría ser más grande."
        },
        {
          id: "B",
          label: "Comprar con auditoría previa ($8M extra, 2 semanas)",
          description: "Gastas más y tardas más, pero sabes exactamente qué compras.",
          cost: 12000000,
          revenue: 12000000,
          bsc: { bsc_financial: 5, bsc_customer: 8, bsc_internal: 6, bsc_learning: 5 },
          crossEffects: [],
          tags: ["smart"],
          feedback: "✅ LA MEJOR DECISIÓN ESTADÍSTICA\n\nLa auditoría reduce la incertidumbre de la deuda de [$20M, $60M] a un rango estrecho. El costo extra de $8M es insignificante vs el riesgo de $40M de sorpresa.\n\n📚 Concepto: Valor de la información. Reducir varianza de una estimación siempre tiene valor cuando la decisión es grande. $8M por reducir σ de $20M a $5M es una ganga."
        },
        {
          id: "C",
          label: "Solo comprar la cartera de clientes ($40M)",
          description: "No compras la empresa, solo los 340 clientes premium. Sin deudas.",
          cost: 7000000,
          revenue: 9000000,
          bsc: { bsc_financial: 4, bsc_customer: 6, bsc_internal: 0, bsc_learning: 1 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "💡 JUEGO SEGURO\n\nEvitas toda deuda oculta. Pero la retención sin la marca original baja: p̂ probable ≈ 0.55 (sin respaldo de datos, solo benchmark del sector).\n\n📚 Concepto: Sin datos propios, usas el caso conservador p=0.5 para estimar retención. Menos riesgo, menos ganancia."
        },
        {
          id: "D",
          label: "Dejarlos quebrar y captar clientes gratis",
          description: "Esperar a que cierren y sus clientes vengan solos.",
          cost: 0,
          revenue: 4000000,
          bsc: { bsc_financial: 2, bsc_customer: -3, bsc_internal: 0, bsc_learning: 0 },
          crossEffects: [],
          tags: ["cheap"],
          feedback: "❌ SE VE BARATO PERO NO LO ES\n\nCuando 'Plátano Feliz' cierre, la competencia también va a ir por esos 340 clientes. Sin datos, estimas captar solo 20-30%. Con la compra aseguras 78%.\n\n📚 Concepto: El costo de oportunidad de NO actuar. La diferencia entre 78% y 25% de 340 clientes a margen premium es enorme."
        }
      ]
    },

    "junta-03": {
      id: "junta-03",
      day: 19,
      title: "Crisis: video viral de cucaracha en paquete",
      context: "Un cliente subió video a TikTok mostrando un insecto dentro de un paquete de platanitos. Lleva 200K vistas en 6 horas. Los comentarios son brutales. El INVIMA podría actuar.\n\n📊 DATOS:\n• Tasa histórica de reclamos: 0.3% (3 en 1.000 paquetes)\n• Producción mensual: 450.000 paquetes\n• Costo de recall completo: $85M\n• Seguro cubre hasta $40M\n• Encuesta rápida interna (n=200 paquetes): 0 insectos encontrados",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Recall voluntario + comunicado público inmediato",
          description: "Retiras el lote completo, pides disculpas públicas y ofreces reembolso total.",
          cost: 14000000,
          revenue: 7000000,
          bsc: { bsc_financial: -5, bsc_customer: 12, bsc_internal: 5, bsc_learning: 8 },
          crossEffects: [
            { area: "marketing", bsc: { bsc_customer: 5 }, narrative: "La transparencia del recall mejora la imagen de marca." }
          ],
          tags: ["proactive", "transparent"],
          feedback: "✅ GESTIÓN DE CRISIS EJEMPLAR\n\nLa muestra de 200 paquetes sin insectos sugiere que el problema es aislado (IC 95% para proporción: [0%, 1.8%]). Pero el recall demuestra responsabilidad.\n\n📚 Concepto: IC para proporción con p̂=0. Aunque 0/200 tiene IC [0%, 1.8%], no puedes ASEGURAR 0% defectos. La percepción pública importa tanto como la estadística."
        },
        {
          id: "B",
          label: "Investigar primero, comunicar después",
          description: "48 horas de investigación interna antes de decir algo públicamente.",
          cost: 5000000,
          revenue: 5000000,
          bsc: { bsc_financial: 2, bsc_customer: -5, bsc_internal: 3, bsc_learning: 4 },
          crossEffects: [],
          tags: ["moderate"],
          feedback: "⚠️ RAZONABLE PERO LENTO\n\n48 horas en redes sociales es una eternidad. El video puede llegar a 2M de vistas. La investigación interna (n=200, 0 hallazgos) ya sugiere incidente aislado.\n\n📚 Concepto: n=200 con 0 defectos da IC 95% de [0%, 1.8%]. Ya tienes evidencia suficiente para comunicar con confianza que es un caso aislado."
        },
        {
          id: "C",
          label: "Ofrecer compensación solo al cliente afectado",
          description: "Contactar al tiktoker, ofrecer $2M y productos gratis a cambio de bajar el video.",
          cost: 2000000,
          revenue: 3000000,
          bsc: { bsc_financial: 3, bsc_customer: -10, bsc_internal: -2, bsc_learning: -3 },
          crossEffects: [],
          tags: ["risky", "cheap"],
          feedback: "❌ TAPAR EL SOL CON UN DEDO\n\nSi el tiktoker rechaza (o peor, sube OTRO video contando que le ofrecieron plata), el daño se multiplica. La estrategia de silenciar nunca funciona en era digital.\n\n📚 Concepto: Sesgo de selección. Compensar solo al quejoso visible ignora a los demás afectados. Tu muestra de 'quejas recibidas' NO representa la insatisfacción real."
        },
        {
          id: "D",
          label: "No hacer nada y esperar que pase",
          description: "En redes todo se olvida en 3 días. No alimentar el drama.",
          cost: 0,
          revenue: 0,
          bsc: { bsc_financial: 0, bsc_customer: -15, bsc_internal: -5, bsc_learning: -5 },
          crossEffects: [
            { area: "marketing", bsc: { bsc_customer: -8 }, narrative: "La falta de respuesta daña severamente la reputación de marca." }
          ],
          tags: ["negligent"],
          feedback: "❌ ERROR GRAVE\n\nLa probabilidad de que 'se olvide' con INVIMA potencialmente investigando es baja. Si INVIMA inspecciona y encuentras 0 defectos (tu muestra lo sugiere), bien. Pero si encuentran UNO, la multa sin recall voluntario previo es 3x peor.\n\n📚 Concepto: Valor esperado de la inacción vs acción. E(no hacer nada) incluye escenarios de cola pesada (multa masiva). La distribución de pérdidas es asimétrica."
        }
      ]
    },

    "junta-04": {
      id: "junta-04",
      day: 22,
      title: "Propuesta: exportar a Ecuador",
      context: "Un broker comercial ofrece un contrato de exportación a Quito. 50.000 paquetes mensuales a precio 30% mayor que el local. Pero requiere certificación ARCSA y ajuste de empaque.\n\n📊 DATOS:\n• Volumen: 50.000 paq/mes (12% de tu producción)\n• Precio FOB: $2.800/paq (vs $2.150 local)\n• Costo certificación ARCSA: $25M (una vez)\n• Costo ajuste empaque: $8M/mes\n• Tasa de cambio actual: 1 USD = $4.200 COP\n• Volatilidad histórica del dólar: σ = $350/mes\n• Tiempo para certificar: 3-6 meses",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Aceptar y arrancar certificación",
          description: "Inversión en ARCSA + empaque. En 3-6 meses estás exportando.",
          cost: 9000000,
          revenue: 14000000,
          bsc: { bsc_financial: 6, bsc_customer: 10, bsc_internal: 5, bsc_learning: 10 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: 3, bsc_learning: 3 }, narrative: "La certificación ARCSA mejora procesos internos." },
            { area: "finance", bsc: { bsc_financial: 3 }, narrative: "Nuevo flujo de ingresos en dólares diversifica riesgo cambiario." }
          ],
          tags: ["growth", "international"],
          feedback: "✅ EXPANSIÓN INTELIGENTE\n\nIngreso extra por paquete: $2.800 - $2.150 = $650. × 50.000 = $32.5M/mes adicional. Menos costos de empaque ($8M) = $24.5M neto/mes. La inversión de $25M se recupera en ~1 mes de exportación.\n\n📚 Concepto: Con σ del dólar = $350/mes, el IC 95% para el tipo de cambio es [$3.514, $4.886]. Aun en el peor caso, el negocio es rentable porque vendes en dólares."
        },
        {
          id: "B",
          label: "Negociar contrato más pequeño primero (20.000 paq)",
          description: "Menos volumen, menos riesgo. Prueba piloto antes de escalar.",
          cost: 6000000,
          revenue: 10000000,
          bsc: { bsc_financial: 4, bsc_customer: 6, bsc_internal: 3, bsc_learning: 6 },
          crossEffects: [],
          tags: ["moderate", "smart"],
          feedback: "💡 PILOTO INTELIGENTE\n\nReducir a 20.000 paq baja el ingreso a $13M/mes neto pero también el riesgo operativo. Es como tomar una muestra antes de decidir sobre la población.\n\n📚 Concepto: Muestra piloto. Antes de comprometer 12% de tu producción, probar con 5% te da datos reales del mercado ecuatoriano sin asumir todo el riesgo."
        },
        {
          id: "C",
          label: "Rechazar y enfocarse en mercado local",
          description: "No distraerse con exportación. El mercado colombiano aún tiene espacio.",
          cost: 0,
          revenue: 3000000,
          bsc: { bsc_financial: 2, bsc_customer: 0, bsc_internal: 2, bsc_learning: -3 },
          crossEffects: [],
          tags: ["conservative"],
          feedback: "⚠️ SEGURO PERO LIMITANTE\n\nEl mercado local crece 8%/año. El de exportación puede dar 30% más de margen. La diversificación geográfica también reduce el riesgo de depender de un solo mercado.\n\n📚 Concepto: Diversificación reduce la varianza del portafolio. Var(A+B) < Var(A) + Var(B) cuando la correlación es baja."
        },
        {
          id: "D",
          label: "Contrapropuesta: que el broker asuma la certificación",
          description: "Que él pague ARCSA y tú produces. Margen menor pero sin inversión.",
          cost: 2000000,
          revenue: 7000000,
          bsc: { bsc_financial: 5, bsc_customer: 4, bsc_internal: 0, bsc_learning: 2 },
          crossEffects: [],
          tags: ["negotiation"],
          feedback: "💡 NEGOCIACIÓN ASTUTA\n\nSi el broker acepta, eliminas el riesgo de $25M. Tu margen baja de $650/paq a ~$400/paq pero sin inversión. Es un punto de equilibrio más rápido.\n\n📚 Concepto: Transferencia de riesgo. Pagas con margen (menos ganancia por unidad) para reducir la varianza de tu inversión inicial."
        }
      ]
    },

    "junta-05": {
      id: "junta-05",
      day: 25,
      title: "Decisión final: estrategia para 2027",
      context: "Último día de simulación. La junta debe definir el rumbo de la empresa para el próximo año. Los datos del semestre están sobre la mesa.\n\n📊 DATOS CONSOLIDADOS:\n• Revisen la caja, los KPIs y el BSC de su empresa\n• Comparen con el rival\n• Consideren: ¿ganaron mercado? ¿La calidad subió? ¿El equipo está motivado?\n• El puntaje final combina: Caja (50%) + BSC (30%) + Salud de áreas (20%)",
      type: "choice",
      options: [
        {
          id: "A",
          label: "Crecimiento agresivo: duplicar producción",
          description: "Todo al crecimiento. Máxima inversión, máximo riesgo, máximo potencial.",
          cost: 18000000,
          revenue: 23000000,
          bsc: { bsc_financial: 5, bsc_customer: 8, bsc_internal: 3, bsc_learning: 5 },
          crossEffects: [
            { area: "operations", bsc: { bsc_internal: 5 }, narrative: "La apuesta por crecimiento dinamiza operaciones." },
            { area: "marketing", bsc: { bsc_customer: 5 }, narrative: "Mayor producción permite captar nuevos mercados." }
          ],
          tags: ["aggressive", "growth"],
          feedback: "🚀 ALL-IN\n\nSi tus KPIs son fuertes (BSC > 60 en todas las dimensiones), esta apuesta puede darte el primer lugar. Si son débiles, es doblemente arriesgado.\n\n📚 Concepto: La decisión final integra TODOS los datos del semestre. La estadística no es solo fórmulas — es tomar mejores decisiones con la información disponible."
        },
        {
          id: "B",
          label: "Consolidación: fortalecer lo que funciona",
          description: "Invertir en calidad, equipo y eficiencia. Crecer orgánicamente.",
          cost: 7000000,
          revenue: 12000000,
          bsc: { bsc_financial: 6, bsc_customer: 5, bsc_internal: 8, bsc_learning: 8 },
          crossEffects: [],
          tags: ["balanced", "smart"],
          feedback: "✅ ESTRATEGIA EQUILIBRADA\n\nConsolidar es la opción con menor varianza en los resultados. Sube todos los KPIs de forma moderada.\n\n📚 Concepto: En un portafolio de decisiones, la diversificación reduce el riesgo total. Fortalecer TODAS las dimensiones es estadísticamente más robusto que apostar todo a una."
        },
        {
          id: "C",
          label: "Innovación radical: platanitos funcionales",
          description: "Línea nueva con proteína, fibra y superalimentos. Para millennials fitness.",
          cost: 12000000,
          revenue: 18000000,
          bsc: { bsc_financial: 3, bsc_customer: 10, bsc_internal: 4, bsc_learning: 12 },
          crossEffects: [
            { area: "analyst", bsc: { bsc_learning: 5 }, narrative: "Nuevo producto requiere análisis de mercado y datos de aceptación." }
          ],
          tags: ["innovation"],
          feedback: "💡 APUESTA INNOVADORA\n\nAlto potencial pero basado en tendencia (no en datos propios). Los estudios del sector muestran crecimiento de snacks saludables del 35% anual, pero tu empresa no tiene datos propios de ese segmento.\n\n📚 Concepto: Extrapolar tendencias del mercado (datos secundarios) tiene más incertidumbre que usar datos propios (datos primarios). La varianza del estimador es mayor."
        },
        {
          id: "D",
          label: "Austeridad total: guardar caja para crisis",
          description: "Minimizar gastos, maximizar efectivo. Prepararse para tiempos difíciles.",
          cost: 0,
          revenue: 5000000,
          bsc: { bsc_financial: 8, bsc_customer: -3, bsc_internal: -2, bsc_learning: -5 },
          crossEffects: [],
          tags: ["conservative", "safe"],
          feedback: "⚠️ DINERO EN EL BANCO PIERDE VALOR\n\nGuardar caja puede subirte en el componente financiero (50% del score) pero baja BSC (-30%) y salud de áreas (-20%). El score final es PONDERADO.\n\n📚 Concepto: Optimizar UN componente ignorando los demás es como minimizar sesgo ignorando varianza. El ECM (Error Cuadrático Medio) = Sesgo² + Varianza. Necesitas equilibrar ambos."
        }
      ]
    }
  }
};
