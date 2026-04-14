/* ============================================================
   ENGINE - Motor del juego: árboles, rotación, comodines
   Adaptado para PlataniWars (5 áreas, sin gerente)
   ============================================================ */
const Engine = (() => {

  const AREA_CODES = ['operations', 'finance', 'marketing', 'hr', 'analyst'];

  /* ----------------------------------------------------------
     Obtener el árbol de un área
  ---------------------------------------------------------- */
  function getTree(areaCode) {
    const map = {
      operations: window.TREE_OPERATIONS,
      finance:    window.TREE_FINANCE,
      marketing:  window.TREE_MARKETING,
      hr:         window.TREE_HR,
      analyst:    window.TREE_ANALYST
    };
    return map[areaCode] || null;
  }

  /* ----------------------------------------------------------
     Obtener nodo actual de un área para una empresa
  ---------------------------------------------------------- */
  function getCurrentNode(areaCode, currentNodeId) {
    const tree = getTree(areaCode);
    if (!tree) return null;
    const nodeId = currentNodeId || tree.startNode;
    return tree.nodes[nodeId] || null;
  }

  /* ----------------------------------------------------------
     Determinar qué áreas tienen decisión pendiente
  ---------------------------------------------------------- */
  function getActiveAreas(day, areas) {
    const active = [];
    AREA_CODES.forEach(code => {
      const tree = getTree(code);
      if (!tree) return;
      const area = areas.find(a => a.area_code === code);
      const currentNodeId = area ? area.current_node : null;
      const node = getCurrentNode(code, currentNodeId);
      if (!node) return;
      if (node.day <= day) {
        active.push(code);
      }
    });
    return active;
  }

  /* ----------------------------------------------------------
     Calendario de decisiones por área
  ---------------------------------------------------------- */
  function getDecisionSchedule() {
    const schedule = {};
    AREA_CODES.forEach(code => {
      const tree = getTree(code);
      if (!tree) return;
      const days = new Set();
      Object.values(tree.nodes).forEach(n => days.add(n.day));
      schedule[code] = [...days].sort((a, b) => a - b);
    });
    return schedule;
  }

  /* ----------------------------------------------------------
     Rotación de decisor dentro del área
  ---------------------------------------------------------- */
  function getDecisionMaker(areaCode, companyId, students, day) {
    const members = students
      .filter(s => s.company_id === companyId && s.area_code === areaCode)
      .sort((a, b) => new Date(a.joined_at) - new Date(b.joined_at));

    if (members.length === 0) return null;
    if (members.length === 1) return members[0];
    const idx = (day - 1) % members.length;
    return members[idx];
  }

  /* ----------------------------------------------------------
     Calcular efectos de una opción
  ---------------------------------------------------------- */
  function calculateEffects(option) {
    return {
      cost: option.cost || 0,
      revenue: option.revenue || 0,
      bsc: option.bsc || {},
      crossEffects: option.crossEffects || [],
      tags: option.tags || [],
      narrative: option.feedback || option.narrative || '',
      next: option.next
    };
  }

  /* ----------------------------------------------------------
     Calcular modificador de KPI para el rango de riesgo
     KPIs altos en áreas relevantes mejoran resultados
  ---------------------------------------------------------- */
  function calculateKPIModifier(areaCode, areaData) {
    if (!areaData) return 1.0;
    const avg = (
      (areaData.bsc_financial || 50) +
      (areaData.bsc_customer || 50) +
      (areaData.bsc_internal || 50) +
      (areaData.bsc_learning || 50)
    ) / 4;
    // Rango: 0.85 (BSC=0) a 1.15 (BSC=100)
    return 0.85 + (avg / 100) * 0.30;
  }

  /* ----------------------------------------------------------
     Roll con rango de riesgo (bonus/penalty aleatorio)
  ---------------------------------------------------------- */
  // Azar eliminado: las decisiones son 100% deterministas
  function rollRisk(option, kpiModifier = 1.0) {
    return 0;
  }

  /* ----------------------------------------------------------
     Progreso del árbol para visualización
  ---------------------------------------------------------- */
  function getTreeProgress(areaCode, companyId, decisions) {
    const tree = getTree(areaCode);
    if (!tree) return { allNodes: [], path: [], currentId: null, visited: [] };

    const visited = new Set();
    const areaDecisions = decisions
      .filter(d => d.company_id === companyId && d.area_code === areaCode)
      .sort((a, b) => a.day - b.day);

    let currentId = tree.startNode;
    areaDecisions.forEach(d => {
      visited.add(d.node_id);
      const node = tree.nodes[d.node_id];
      if (node) {
        const opt = node.options.find(o => o.id === d.choice);
        if (opt && opt.next) currentId = opt.next;
      }
    });

    const allNodes = Object.entries(tree.nodes).map(([id, node]) => ({
      id, day: node.day, title: node.title,
      visited: visited.has(id),
      current: id === currentId && !visited.has(id)
    }));

    return { allNodes, path: [], currentId, visited: [...visited] };
  }

  /* ----------------------------------------------------------
     Verificar si un comodín está disponible
  ---------------------------------------------------------- */
  function isComodinAvailable(comodinId, currentDay, usedComodines) {
    const comodin = CONFIG.COMODINES.find(c => c.id === comodinId);
    if (!comodin) return false;
    const lastUse = usedComodines
      .filter(u => u.comodin_id === comodinId)
      .sort((a, b) => b.day - a.day)[0];
    if (!lastUse) return true;
    return (currentDay - lastUse.day) >= comodin.cooldown;
  }

  /* ----------------------------------------------------------
     Obtener comodines disponibles para una empresa
  ---------------------------------------------------------- */
  function getAvailableComodines(companyId, currentDay, allEvents) {
    const companyEvents = allEvents.filter(e =>
      e.target_company === companyId || (!e.target_company && e.event_type === 'comodin')
    );
    return CONFIG.COMODINES.filter(c =>
      isComodinAvailable(c.id, currentDay, companyEvents.filter(e => e.event_type === 'comodin_' + c.id))
    );
  }

  /* ----------------------------------------------------------
     Score final
  ---------------------------------------------------------- */
  function calculateFinalScore(company, areas) {
    const companyAreas = areas.filter(a => a.company_id === company.id);
    const netProfit = company.total_revenue - company.total_costs;
    const w = CONFIG.BSC_WEIGHTS;
    const bscScore =
      (company.bsc_financial || 50) * w.financial +
      (company.bsc_customer || 50) * w.customer +
      (company.bsc_internal || 50) * w.internal +
      (company.bsc_learning || 50) * w.learning;

    const areaHealth = companyAreas.reduce((sum, a) => {
      const remaining = a.budget - a.spent + a.revenue;
      return sum + (remaining > 0 ? 1 : 0);
    }, 0) / Math.max(companyAreas.length, 1) * 100;

    const profitScore = Math.min(100, Math.max(0, 50 + (netProfit / CONFIG.INITIAL_CASH) * 50));
    const finalScore = profitScore * 0.5 + bscScore * 0.3 + areaHealth * 0.2;

    return {
      netProfit,
      bscScore: Math.round(bscScore),
      areaHealth: Math.round(areaHealth),
      finalScore: Math.round(finalScore),
      cash: company.total_cash
    };
  }

  /* ----------------------------------------------------------
     Auto-decisión (opción menos costosa)
  ---------------------------------------------------------- */
  function getDefaultChoice(node) {
    if (!node || !node.options || node.options.length === 0) return null;
    return node.options.reduce((best, opt) => {
      const net = (opt.cost || 0) - (opt.revenue || 0);
      const bestNet = (best.cost || 0) - (best.revenue || 0);
      return net < bestNet ? opt : best;
    });
  }

  return {
    AREA_CODES,
    getTree,
    getCurrentNode,
    getActiveAreas,
    getDecisionSchedule,
    getDecisionMaker,
    calculateEffects,
    calculateKPIModifier,
    rollRisk,
    getTreeProgress,
    isComodinAvailable,
    getAvailableComodines,
    calculateFinalScore,
    getDefaultChoice
  };
})();
