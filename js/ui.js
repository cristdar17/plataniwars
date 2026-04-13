/* ============================================================
   UI - Utilidades de interfaz (toasts, animaciones, formato)
   ============================================================ */
const UI = (() => {
  // Formatear pesos colombianos
  function formatCOP(n) {
    if (n === null || n === undefined) return '$0';
    const abs = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (abs >= 1e9) return sign + '$' + (abs / 1e9).toFixed(1) + 'B';
    if (abs >= 1e6) return sign + '$' + (abs / 1e6).toFixed(1) + 'M';
    if (abs >= 1e3) return sign + '$' + (abs / 1e3).toFixed(0) + 'K';
    return sign + '$' + abs.toLocaleString('es-CO');
  }

  // Toast notification
  function toast(message, type = 'info', duration = 4000) {
    const existing = document.querySelector('.toast-container');
    const container = existing || document.createElement('div');
    if (!existing) {
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
      <span class="toast-msg">${message}</span>
    `;
    container.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 300);
    }, duration);
  }

  // Animar número (counter)
  function animateNumber(el, from, to, duration = 1200) {
    const start = performance.now();
    const diff = to - from;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = formatCOP(Math.round(from + diff * ease));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Barra de progreso BSC
  function bscBar(value, max = 100) {
    const pct = Math.round((value / max) * 100);
    const color = pct >= 70 ? 'var(--color-success)' : pct >= 40 ? 'var(--color-warning)' : 'var(--color-danger)';
    return `<div class="bsc-bar"><div class="bsc-fill" style="width:${pct}%;background:${color}"></div><span>${pct}</span></div>`;
  }

  // Tiempo restante formateado
  function formatTimer(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // Shake animation
  function shake(el) {
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 500);
  }

  // Pulse animation
  function pulse(el) {
    el.classList.add('pulse');
    setTimeout(() => el.classList.remove('pulse'), 600);
  }

  // Confetti simple
  function confetti(container) {
    const colors = ['#FF6B35', '#2EC4B6', '#FFD166', '#EF476F', '#06D6A0', '#118AB2'];
    for (let i = 0; i < 50; i++) {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.cssText = `
        left:${Math.random()*100}%;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-delay:${Math.random()*0.5}s;
        animation-duration:${1+Math.random()*1.5}s;
      `;
      container.appendChild(c);
      setTimeout(() => c.remove(), 3000);
    }
  }

  // Generar ID único
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  return { formatCOP, toast, animateNumber, bscBar, formatTimer, shake, pulse, confetti, uid };
})();
