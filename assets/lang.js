(function () {
  const STORAGE_KEY = 'myvault_lang_pref';
  const SUPPORTED = ['zh', 'en'];

  const normalize = (lang) => {
    if (!lang) return 'en';
    const value = lang.toLowerCase();
    if (value.startsWith('zh')) return 'zh';
    if (value.startsWith('en')) return 'en';
    return 'en';
  };

  const getStored = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (_e) {
      /* ignore */
    }
    return null;
  };

  const savePreference = (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_e) {
      /* ignore */
    }
  };

  const getPreferred = () => getStored() || normalize(navigator.language || navigator.userLanguage || 'en');

  const getCurrent = () => normalize(document.documentElement.lang || 'en');

  const redirectTo = (lang) => {
    const toggle = document.querySelector(`.lang-toggle[data-lang-target='${lang}']`);
    if (toggle) {
      window.location.href = toggle.href;
    }
  };

  document.querySelectorAll('.lang-toggle').forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.dataset.langTarget;
      if (target) {
        savePreference(target);
      }
    });
  });

  const preferred = getPreferred();
  const current = getCurrent();

  if (preferred !== current) {
    redirectTo(preferred);
  }
})();
