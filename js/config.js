/* ============================================================
   CONFIG - PlataniWars: Simulador Gerencial Estadístico
   Dos empresas de platanitos compitiendo en el Eje Cafetero
   ============================================================ */
const CONFIG = {
  // --- Supabase (mismo proyecto del simulador de Admin Ops) ---
  SUPABASE_URL: 'https://lnszgnzgtehawgvhqxjb.supabase.co',
  SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxuc3pnbnpndGVoYXdndmhxeGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NjcyMTcsImV4cCI6MjA5MTM0MzIxN30.HPDJbfPaSjkdCvGecI-07CytBZf44wGhjceFzQ8RZLg',

  // --- Timing ---
  SECONDS_PER_DAY: 180,       // 3 minutos por día simulado
  TOTAL_DAYS: 25,             // 25 días de simulación
  POLL_INTERVAL: 3000,        // polling cada 3 segundos
  DECISION_TIMEOUT: 120,      // segundos para decidir

  // --- Empresas ---
  COMPANIES: [
    { id: 1, name: 'Don Pacho', emoji: '🍌', slogan: 'El sabor de siempre, con datos de verdad', color: '#F59E0B' },
    { id: 2, name: 'PlataniMax', emoji: '🔥', slogan: 'Innovación con crunch', color: '#10B981' }
  ],

  // --- Áreas funcionales (5 departamentos, max 2 por área) ---
  AREAS: [
    { code: 'operations', name: 'Operaciones',     icon: '🏭', budget: 120000000 },
    { code: 'finance',    name: 'Finanzas',         icon: '💰', budget: 100000000 },
    { code: 'marketing',  name: 'Marketing',        icon: '📢', budget: 100000000 },
    { code: 'hr',         name: 'Talento Humano',   icon: '👥', budget: 80000000 },
    { code: 'analyst',    name: 'Análisis de Datos', icon: '📊', budget: 100000000 }
  ],

  MAX_PER_AREA: 2,

  // --- Presupuesto inicial ---
  INITIAL_CASH: 500000000,  // $500M COP

  // --- BSC pesos para score final ---
  BSC_WEIGHTS: {
    financial: 0.30,
    customer:  0.25,
    internal:  0.25,
    learning:  0.20
  },

  // --- Comodines de competencia desleal (legales en Colombia) ---
  COMODINES: [
    {
      id: 'acaparamiento',
      name: 'Acaparamiento de Plátano',
      icon: '🍌',
      description: 'Comprar toda la materia prima de la central de abastos. Tu rival se queda sin plátano verde.',
      cost: 30000000,
      effects_attacker: { cash: -30000000, bsc: { bsc_internal: 5 } },
      effects_victim: { cash: -50000000, bsc: { bsc_internal: -12, bsc_financial: -8 } },
      narrative_attacker: 'Compraste todo el plátano de la galería de Pereira. Tu producción fluye mientras el rival busca plátano en Cartago a precio de oro.',
      narrative_victim: '¡Tu rival acaparó toda la materia prima! Tocó comprar plátano caro en otra ciudad y la producción bajó 40%.',
      legal_basis: 'Legal: libre competencia en compra de insumos no regulados (Art. 333 Constitución).',
      cooldown: 4
    },
    {
      id: 'cazatalentos',
      name: 'Cazatalentos',
      icon: '🎯',
      description: 'Ofrecerle 50% más de salario al mejor técnico de la planta rival.',
      cost: 20000000,
      effects_attacker: { cash: -20000000, bsc: { bsc_internal: 8, bsc_learning: 5 } },
      effects_victim: { cash: 0, bsc: { bsc_internal: -10, bsc_learning: -8, bsc_customer: -3 } },
      narrative_attacker: 'El técnico estrella del rival ahora trabaja contigo. Trajo know-how y contactos de proveedores.',
      narrative_victim: 'Tu mejor técnico renunció. Se fue con la competencia por un 50% más. La línea de producción tarda en estabilizarse.',
      legal_basis: 'Legal: libertad de contratación laboral. No hay cláusula de no competencia en contratos operativos estándar.',
      cooldown: 5
    },
    {
      id: 'publicidad_comparativa',
      name: 'Publicidad Comparativa',
      icon: '📺',
      description: '"Nuestros platanitos tienen 15% más sabor que la marca X" — si es verificable, es legal.',
      cost: 15000000,
      effects_attacker: { cash: -15000000, bsc: { bsc_customer: 10, bsc_financial: 3 } },
      effects_victim: { cash: 0, bsc: { bsc_customer: -7, bsc_financial: -3 } },
      narrative_attacker: 'La campaña fue viral. Consumidores comparan y muchos prueban tu marca por primera vez.',
      narrative_victim: 'La competencia lanzó campaña comparativa contra tu producto. Algunos clientes empiezan a dudar.',
      legal_basis: 'Legal en Colombia: Ley 256 de 1996 permite publicidad comparativa si la información es veraz y verificable.',
      cooldown: 4
    },
    {
      id: 'espionaje',
      name: 'Espionaje de Precios',
      icon: '🕵️',
      description: 'Contratar mystery shoppers para mapear toda la estrategia comercial del rival.',
      cost: 5000000,
      effects_attacker: { cash: -5000000, bsc: { bsc_learning: 8, bsc_customer: 3 } },
      effects_victim: { cash: 0, bsc: {} },
      narrative_attacker: 'Tus mystery shoppers reportaron: precios, empaques, promociones y puntos débiles del rival. Información es poder.',
      narrative_victim: '',
      legal_basis: 'Legal: información disponible públicamente en punto de venta. No hay expectativa de privacidad comercial en retail.',
      cooldown: 3,
      reveals_rival: true  // Muestra KPIs privados del rival por 2 rondas
    },
    {
      id: 'dumping',
      name: 'Dumping Temporal',
      icon: '💣',
      description: 'Vender platanitos a precio de costo durante 2 semanas para quitarle clientes al rival.',
      cost: 45000000,
      effects_attacker: { cash: -45000000, bsc: { bsc_customer: 12, bsc_financial: -8 } },
      effects_victim: { cash: -25000000, bsc: { bsc_customer: -10, bsc_financial: -5 } },
      narrative_attacker: 'Dos semanas vendiendo a costo. Perdiste plata pero ganaste clientes. La pregunta es si se quedan cuando subas el precio.',
      narrative_victim: 'El rival bajó precios brutalmente. Perdiste clientes y tuviste que bajar los tuyos también. Guerra de precios que nadie gana.',
      legal_basis: 'Legal en Colombia para promociones temporales. Solo es ilegal si es predatorio sostenido (SIC, Decreto 2153/1992).',
      cooldown: 6
    },
    {
      id: 'marca_similar',
      name: 'Marca Confusa',
      icon: '🎭',
      description: 'Registrar marca con nombre y empaque confusamente similar al del rival.',
      cost: 10000000,
      effects_attacker: { cash: -10000000, bsc: { bsc_customer: 5, bsc_financial: 4 } },
      effects_victim: { cash: 0, bsc: { bsc_customer: -6, bsc_learning: -3 } },
      narrative_attacker: 'Tu nueva sub-marca "se parece" sospechosamente al rival. Algunos consumidores la compran por error... y les gusta.',
      narrative_victim: 'Apareció un producto con nombre y empaque muy parecido al tuyo. Los clientes se confunden y tu identidad de marca se diluye.',
      legal_basis: 'Zona gris: legal si no hay confusión "directa" ante la SIC. El registro marcario toma 6+ meses de oposición.',
      cooldown: 8
    }
  ]
};
