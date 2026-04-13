/* ============================================================
   STORAGE - Persistencia local (sesión del estudiante)
   ============================================================ */
const Storage = (() => {
  const KEY = 'plataniwars_session';

  return {
    save(data) {
      localStorage.setItem(KEY, JSON.stringify(data));
    },
    load() {
      try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
    },
    clear() {
      localStorage.removeItem(KEY);
    },

    // Cache del estado global
    cacheState(data) {
      localStorage.setItem(KEY + '_cache', JSON.stringify({ ...data, _ts: Date.now() }));
    },
    getCachedState() {
      try { return JSON.parse(localStorage.getItem(KEY + '_cache')); } catch { return null; }
    },

    // Comodines usados (para cooldown local)
    getComodinHistory() {
      try { return JSON.parse(localStorage.getItem(KEY + '_comodines')) || []; } catch { return []; }
    },
    addComodinUsed(comodinId, day) {
      const hist = this.getComodinHistory();
      hist.push({ id: comodinId, day });
      localStorage.setItem(KEY + '_comodines', JSON.stringify(hist));
    }
  };
})();
