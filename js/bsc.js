/* ============================================================
   BSC - Balanced Scorecard con indicadores claros
   ============================================================ */
const BSC = (() => {

  const PERSPECTIVES = [
    {
      key: 'financial', label: 'Financiera', icon: '💰', color: '#34C759',
      what: 'Rentabilidad y flujo de caja',
      indicators: [
        { range: [90, 100], label: 'Máquina de dinero', emoji: '🤑' },
        { range: [70, 89],  label: 'Finanzas sólidas', emoji: '💪' },
        { range: [50, 69],  label: 'Estable', emoji: '📊' },
        { range: [30, 49],  label: 'Ajustado', emoji: '😬' },
        { range: [0, 29],   label: 'Crisis financiera', emoji: '🚨' },
      ]
    },
    {
      key: 'customer', label: 'Cliente', icon: '👥', color: '#007AFF',
      what: 'Satisfacción y participación de mercado',
      indicators: [
        { range: [90, 100], label: 'Clientes fans', emoji: '🏆' },
        { range: [70, 89],  label: 'Buena reputación', emoji: '⭐' },
        { range: [50, 69],  label: 'Aceptable', emoji: '👍' },
        { range: [30, 49],  label: 'Perdiendo clientes', emoji: '📉' },
        { range: [0, 29],   label: 'Marca da��ada', emoji: '💀' },
      ]
    },
    {
      key: 'internal', label: 'Procesos', icon: '⚙️', color: '#FF9500',
      what: 'Eficiencia operativa y calidad',
      indicators: [
        { range: [90, 100], label: 'Máxima eficiencia', emoji: '🏭' },
        { range: [70, 89],  label: 'Bien engrasado', emoji: '✅' },
        { range: [50, 69],  label: 'Funcional', emoji: '🔧' },
        { range: [30, 49],  label: 'Cuellos de botella', emoji: '⚠️' },
        { range: [0, 29],   label: 'Caos operativo', emoji: '🔥' },
      ]
    },
    {
      key: 'learning', label: 'Aprendizaje', icon: '📚', color: '#AF52DE',
      what: 'Innovación y desarrollo del equipo',
      indicators: [
        { range: [90, 100], label: 'Equipo élite', emoji: '🧠' },
        { range: [70, 89],  label: 'En crecimiento', emoji: '📈' },
        { range: [50, 69],  label: 'Estándar', emoji: '📋' },
        { range: [30, 49],  label: 'Estancado', emoji: '😴' },
        { range: [0, 29],   label: 'Rezagado', emoji: '🐢' },
      ]
    }
  ];

  function getIndicator(perspective, val) {
    const ind = perspective.indicators.find(i => val >= i.range[0] && val <= i.range[1]);
    return ind || { label: '?', emoji: '❓' };
  }

  function getScoreEmoji(val) {
    if (val >= 80) return '🟢';
    if (val >= 60) return '🟡';
    if (val >= 40) return '🟠';
    return '🔴';
  }

  function getScoreLabel(val) {
    if (val >= 85) return 'Excelente';
    if (val >= 70) return 'Sólido';
    if (val >= 55) return 'Aceptable';
    if (val >= 40) return 'En riesgo';
    if (val >= 20) return 'Crítico';
    return 'Colapso';
  }

  /* Render BSC completo con indicadores */
  function renderFull(bscData, title = 'Balanced Scorecard') {
    const w = CONFIG.BSC_WEIGHTS;
    const vals = {
      financial: bscData.bsc_financial || 50,
      customer: bscData.bsc_customer || 50,
      internal: bscData.bsc_internal || 50,
      learning: bscData.bsc_learning || 50,
    };
    const weighted = vals.financial * w.financial + vals.customer * w.customer +
                     vals.internal * w.internal + vals.learning * w.learning;
    const overall = Math.round(weighted);

    return `
      <div class="bsc-panel">
        ${title ? `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <span style="font-size:0.78rem;font-weight:600;color:var(--text-secondary)">${title}</span>
          <span style="font-size:0.82rem;font-weight:800">${getScoreEmoji(overall)} ${overall}/100</span>
        </div>` : ''}
        <div style="text-align:center;margin-bottom:12px;padding:8px;background:rgba(0,0,0,0.03);border-radius:10px">
          <div style="font-size:1.6rem;font-weight:900;color:${overall >= 70 ? 'var(--color-success)' : overall >= 50 ? 'var(--color-warning)' : 'var(--color-danger)'}">${overall}</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--text-secondary)">${getScoreLabel(overall)}</div>
        </div>
        ${PERSPECTIVES.map(p => {
          const val = vals[p.key];
          const ind = getIndicator(p, val);
          const delta = val - 50;
          const deltaStr = delta > 0 ? `+${delta}` : `${delta}`;
          const deltaColor = delta > 0 ? 'var(--color-success)' : delta < 0 ? 'var(--color-danger)' : 'var(--text-tertiary)';
          return `
            <div style="margin:8px 0">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
                <span style="font-size:0.78rem;font-weight:600;color:var(--text-secondary)">${p.icon} ${p.label}</span>
                <span style="font-size:0.72rem">
                  <span style="font-weight:800;color:${p.color}">${val}</span>
                  <span style="color:${deltaColor};font-weight:600;margin-left:4px">${deltaStr}</span>
                </span>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <div style="flex:1;height:8px;background:rgba(0,0,0,0.06);border-radius:4px;overflow:hidden">
                  <div style="height:100%;width:${val}%;background:${p.color};border-radius:4px;transition:width 0.8s"></div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:4px;margin-top:2px">
                <span style="font-size:0.85rem">${ind.emoji}</span>
                <span style="font-size:0.68rem;color:var(--text-tertiary)">${ind.label}</span>
                <span style="font-size:0.62rem;color:var(--text-tertiary);margin-left:auto;font-style:italic">${p.what}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /* Render BSC compacto con indicadores */
  function renderCompact(bscData) {
    return PERSPECTIVES.map(p => {
      const val = bscData[`bsc_${p.key}`] || 50;
      const ind = getIndicator(p, val);
      return `<span class="pill" style="background:${p.color}15;color:${p.color};border:1px solid ${p.color}30" title="${p.label}: ${ind.label} (${val}/100)">${ind.emoji} ${val}</span>`;
    }).join(' ');
  }

  /* Comparar BSC de dos empresas */
  function renderComparison(company1, company2) {
    return `
      <div class="bsc-comparison">
        ${PERSPECTIVES.map(p => {
          const v1 = company1[`bsc_${p.key}`] || 50;
          const v2 = company2[`bsc_${p.key}`] || 50;
          const leader = v1 > v2 ? 1 : v2 > v1 ? 2 : 0;
          return `
            <div class="bsc-compare-row">
              <span class="bsc-val ${leader === 1 ? 'leading' : ''}">${v1}</span>
              <div class="bsc-compare-bar">
                <div class="bsc-compare-fill left" style="width:${v1}%;background:var(--company-1)"></div>
              </div>
              <span class="bsc-compare-label">${p.icon} ${p.label}</span>
              <div class="bsc-compare-bar">
                <div class="bsc-compare-fill right" style="width:${v2}%;background:var(--company-2)"></div>
              </div>
              <span class="bsc-val ${leader === 2 ? 'leading' : ''}">${v2}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /* Salud financiera del área */
  function areaHealth(area) {
    const remaining = area.budget - area.spent + area.revenue;
    const pct = Math.round((remaining / area.budget) * 100);
    return {
      remaining,
      percentage: pct,
      status: pct > 60 ? 'healthy' : pct > 30 ? 'warning' : 'critical',
      emoji: pct > 60 ? '💚' : pct > 30 ? '💛' : '❤️'
    };
  }

  return { PERSPECTIVES, getIndicator, getScoreEmoji, getScoreLabel, renderFull, renderCompact, renderComparison, areaHealth };
})();
