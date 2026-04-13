/* ============================================================
   API - Cliente REST para Supabase
   ============================================================ */
const API = (() => {
  const base = () => CONFIG.SUPABASE_URL + '/rest/v1';
  const headers = () => ({
    'apikey': CONFIG.SUPABASE_KEY,
    'Authorization': 'Bearer ' + CONFIG.SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  });

  async function query(table, params = '') {
    const r = await fetch(`${base()}/${table}?${params}`, {
      headers: { 'apikey': CONFIG.SUPABASE_KEY, 'Authorization': 'Bearer ' + CONFIG.SUPABASE_KEY }
    });
    return r.json();
  }

  async function rpc(fn, body = {}) {
    const r = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST', headers: headers(), body: JSON.stringify(body)
    });
    if (!r.ok) { const e = await r.text(); console.error(`RPC ${fn} error:`, e); throw new Error(e); }
    const text = await r.text();
    return text ? JSON.parse(text) : null;
  }

  return {
    // --- Lectura ---
    async getState() {
      const rows = await query('game_state', 'select=key,value');
      const state = {};
      rows.forEach(r => state[r.key] = r.value);
      return state;
    },

    async getCompanies() {
      return query('companies', 'select=*&order=id');
    },

    async getAreas(companyId) {
      const filter = companyId ? `&company_id=eq.${companyId}` : '';
      return query('areas', `select=*&order=company_id,area_code${filter}`);
    },

    async getStudents() {
      return query('students', 'select=*&order=company_id,area_code,joined_at');
    },

    async getDecisions(companyId) {
      const filter = companyId ? `&company_id=eq.${companyId}` : '';
      return query('decisions', `select=*&order=day.desc${filter}`);
    },

    async getEvents() {
      return query('events', 'select=*&order=day.desc');
    },

    // --- Acciones ---
    joinGame(id, name, company, area) {
      return rpc('join_game', { p_id: id, p_name: name, p_company: company, p_area: area });
    },

    makeDecision(company, area, day, nodeId, choice, studentId, cost, revenue, bsc, cross, tags, narrative, nextNode) {
      return rpc('make_decision', {
        p_company: company, p_area: area, p_day: day, p_node: nodeId,
        p_choice: choice, p_student: studentId, p_cost: cost, p_revenue: revenue,
        p_bsc: bsc, p_cross: cross, p_tags: tags, p_narrative: narrative, p_next_node: nextNode
      });
    },

    // Cross effect via REST directo
    async applyCrossEffect(company, area, bscDeltas, cost = 0) {
      const h = headers();
      // Leer área actual
      const rows = await query('areas', `select=*&company_id=eq.${company}&area_code=eq.${area}`);
      if (!rows.length) return;
      const a = rows[0];
      const patch = {};
      if (cost > 0) patch.spent = a.spent + cost;
      patch.bsc_financial = Math.max(0, Math.min(100, a.bsc_financial + (bscDeltas.bsc_financial || 0)));
      patch.bsc_customer  = Math.max(0, Math.min(100, a.bsc_customer  + (bscDeltas.bsc_customer  || 0)));
      patch.bsc_internal  = Math.max(0, Math.min(100, a.bsc_internal  + (bscDeltas.bsc_internal  || 0)));
      patch.bsc_learning  = Math.max(0, Math.min(100, a.bsc_learning  + (bscDeltas.bsc_learning  || 0)));
      await fetch(`${base()}/areas?company_id=eq.${company}&area_code=eq.${area}`, {
        method: 'PATCH', headers: h, body: JSON.stringify(patch)
      });
      if (cost > 0) {
        const comp = (await query('companies', `select=*&id=eq.${company}`))[0];
        await fetch(`${base()}/companies?id=eq.${company}`, {
          method: 'PATCH', headers: h, body: JSON.stringify({
            total_costs: comp.total_costs + cost,
            total_cash: comp.total_cash - cost
          })
        });
      }
    },

    // Evento externo via REST directo
    async applyEvent(day, type, title, desc, targetCompany, targetArea, cashDelta, bscDeltas) {
      const h = headers();
      // Insertar evento
      await fetch(`${base()}/events`, {
        method: 'POST', headers: h, body: JSON.stringify({
          day, event_type: type, title, description: desc,
          target_company: targetCompany, target_area: targetArea,
          cash_delta: cashDelta, bsc_deltas: bscDeltas
        })
      });

      // Aplicar a área(s) si se especifica
      if (targetArea) {
        const filter = targetCompany
          ? `company_id=eq.${targetCompany}&area_code=eq.${targetArea}`
          : `area_code=eq.${targetArea}`;
        const rows = await query('areas', `select=*&${filter}`);
        for (const a of rows) {
          await fetch(`${base()}/areas?company_id=eq.${a.company_id}&area_code=eq.${a.area_code}`, {
            method: 'PATCH', headers: h, body: JSON.stringify({
              spent:   cashDelta < 0 ? a.spent + Math.abs(cashDelta) : a.spent,
              revenue: cashDelta > 0 ? a.revenue + cashDelta : a.revenue,
              bsc_financial: Math.max(0, Math.min(100, a.bsc_financial + (bscDeltas.bsc_financial || 0))),
              bsc_customer:  Math.max(0, Math.min(100, a.bsc_customer  + (bscDeltas.bsc_customer  || 0))),
              bsc_internal:  Math.max(0, Math.min(100, a.bsc_internal  + (bscDeltas.bsc_internal  || 0))),
              bsc_learning:  Math.max(0, Math.min(100, a.bsc_learning  + (bscDeltas.bsc_learning  || 0)))
            })
          });
        }
      }

      // Aplicar cash delta a empresa(s)
      if (cashDelta !== 0) {
        const compFilter = targetCompany ? `id=eq.${targetCompany}` : `id=gt.0`;
        const comps = await query('companies', `select=*&${compFilter}`);
        for (const c of comps) {
          await fetch(`${base()}/companies?id=eq.${c.id}`, {
            method: 'PATCH', headers: h, body: JSON.stringify({
              total_cash:    c.total_cash + cashDelta,
              total_costs:   cashDelta < 0 ? c.total_costs + Math.abs(cashDelta) : c.total_costs,
              total_revenue: cashDelta > 0 ? c.total_revenue + cashDelta : c.total_revenue
            })
          });
        }
      }
    },

    // Recalc BSC via REST directo
    async recalcBSC(company) {
      const areas = await query('areas', `select=bsc_financial,bsc_customer,bsc_internal,bsc_learning&company_id=eq.${company}`);
      if (!areas.length) return;
      const avg = (key) => Math.round(areas.reduce((s, a) => s + a[key], 0) / areas.length);
      await fetch(`${base()}/companies?id=eq.${company}`, {
        method: 'PATCH', headers: headers(), body: JSON.stringify({
          bsc_financial: avg('bsc_financial'),
          bsc_customer:  avg('bsc_customer'),
          bsc_internal:  avg('bsc_internal'),
          bsc_learning:  avg('bsc_learning')
        })
      });
    },

    // --- Control del juego ---
    startGame()    { return rpc('game_start'); },
    advanceDay()   { return rpc('game_advance_day'); },
    togglePause()  { return rpc('game_toggle_pause'); },

    // Reset via REST directo (evita pg_safeupdate de Supabase)
    async resetGame() {
      const h = headers();
      const del = (table) => fetch(`${base()}/${table}?id=gt.0`, { method: 'DELETE', headers: h });
      const patch = (table, filter, body) => fetch(`${base()}/${table}?${filter}`, {
        method: 'PATCH', headers: h, body: JSON.stringify(body)
      });

      // Borrar datos (students no tiene id numérico, usar filtro diferente)
      await fetch(`${base()}/events?id=gt.0`, { method: 'DELETE', headers: h });
      await fetch(`${base()}/decisions?id=gt.0`, { method: 'DELETE', headers: h });
      await fetch(`${base()}/students?id=neq.IMPOSSIBLE`, { method: 'DELETE', headers: h });

      // Reset áreas
      const areaCodes = ['operations','finance','marketing','hr','logistics','innovation','gerente'];
      const budgets = { operations:130000000, finance:75000000, marketing:95000000, hr:65000000, logistics:85000000, innovation:50000000, gerente:0 };
      for (const code of areaCodes) {
        await patch('areas', `area_code=eq.${code}`, {
          spent: 0, revenue: 0, budget: budgets[code],
          bsc_financial: 50, bsc_customer: 50, bsc_internal: 50, bsc_learning: 50,
          current_node: null, resting_today: false
        });
      }

      // Reset empresas
      for (const id of [1, 2]) {
        await patch('companies', `id=eq.${id}`, {
          total_cash: 500000000, total_revenue: 0, total_costs: 0,
          bsc_financial: 50, bsc_customer: 50, bsc_internal: 50, bsc_learning: 50
        });
      }

      // Reset game state
      await patch('game_state', `key=eq.status`, { value: 'lobby' });
      await patch('game_state', `key=eq.day`, { value: '0' });
      await patch('game_state', `key=eq.day_started_at`, { value: '' });
      await patch('game_state', `key=eq.active_event`, { value: '' });
    },

    // --- Estado completo (para polling) ---
    async fetchAll() {
      const [state, companies, areas, students, decisions, events] = await Promise.all([
        this.getState(), this.getCompanies(), this.getAreas(),
        this.getStudents(), this.getDecisions(), this.getEvents()
      ]);
      return { state, companies, areas, students, decisions, events };
    }
  };
})();
