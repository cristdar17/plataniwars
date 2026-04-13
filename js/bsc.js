/* ============================================================
   BSC - Balanced Scorecard calculations & rendering
   ============================================================ */
const BSC = (() => {

  const PERSPECTIVES = [
    { key: 'financial', label: 'Financiera',           icon: '💰', color: '#34C759' },
    { key: 'customer',  label: 'Cliente',              icon: '👥', color: '#007AFF' },
    { key: 'internal',  label: 'Procesos Internos',    icon: '⚙️', color: '#FF9500' },
    { key: 'learning',  label: 'Aprendizaje y Crec.', icon: '📚', color: '#AF52DE' }
  ];

  function getScoreEmoji(val) {
    if (val >= 80) return '🟢';
    if (val >= 60) return '🟡';
    if (val >= 40) return '🟠';
    return '🔴';
  }

  function getScoreLabel(val) {
    if (val >= 80) return 'Excelente';
    if (val >= 60) return 'Bueno';
    if (val >= 40) return 'Regular';
    if (val >= 20) return 'Deficiente';
    return 'Crítico';
  }

  /* Render BSC completo como HTML */
  function renderFull(bscData, title = 'Balanced Scorecard') {
    const w = CONFIG.BSC_WEIGHTS;
    const weighted =
      (bscData.bsc_financial || 50) * w.financial +
      (bscData.bsc_customer || 50) * w.customer +
      (bscData.bsc_internal || 50) * w.internal +
      (bscData.bsc_learning || 50) * w.learning;
    const overall = Math.round(weighted);

    return `
      <div class="bsc-panel">
        <div class="bsc-header">
          <span class="bsc-title">${title}</span>
          <span class="bsc-overall">${getScoreEmoji(overall)} ${overall}/100 <small>${getScoreLabel(overall)}</small></span>
        </div>
        ${PERSPECTIVES.map(p => {
          const val = bscData[`bsc_${p.key}`] || 50;
          return `
            <div class="bsc-row">
              <span class="bsc-label">${p.icon} ${p.label}</span>
              <div class="bsc-bar">
                <div class="bsc-fill" style="width:${val}%;background:${p.color}"></div>
              </div>
              <span class="bsc-value" style="color:${p.color}">${val}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /* Render BSC compacto (una línea) */
  function renderCompact(bscData) {
    return PERSPECTIVES.map(p => {
      const val = bscData[`bsc_${p.key}`] || 50;
      return `<span class="pill" style="background:${p.color}20;color:${p.color}">${p.icon} ${val}</span>`;
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

  /* Calcular salud financiera del área */
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

  return { PERSPECTIVES, getScoreEmoji, getScoreLabel, renderFull, renderCompact, renderComparison, areaHealth };
})();
