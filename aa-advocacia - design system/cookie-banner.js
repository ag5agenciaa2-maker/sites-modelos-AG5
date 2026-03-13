/**
 * Cookie Banner — A&A Advocacia Especializada
 * Sistema de consentimento de cookies (LGPD)
 * Armazena preferências no localStorage
 */

(function () {
    'use strict';

    // Configurações
    const STORAGE_KEY = 'aa_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;

    // Estado
    let preferences = {
        necessary: true,   // Sempre ativo
        functional: false,
        analytics: false,
        performance: false,
        advertising: false,
        decided: false,    // Usuário já tomou uma decisão?
        timestamp: null
    };

    // ========== INICIALIZAÇÃO ==========
    function init() {
        const saved = loadPreferences();

        if (saved && saved.decided && !isExpired(saved.timestamp)) {
            // Usuário já decidiu — mostra botão flutuante, não mostra banner
            applyPreferences(saved);
            showPrefsBtn();
            return;
        }

        // Mostra o banner após pequeno delay (UX)
        setTimeout(showBanner, 600);
    }

    // ========== PERSISTÊNCIA ==========
    function loadPreferences() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }

    function savePreferences(prefs) {
        try {
            prefs.timestamp = Date.now();
            prefs.decided = true;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        } catch {
            // localStorage indisponível (modo privado restrito)
        }
    }

    function isExpired(timestamp) {
        if (!timestamp) return true;
        const expiryMs = COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        return Date.now() - timestamp > expiryMs;
    }

    // ========== BANNER ==========
    function showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (!banner) return;
        banner.classList.add('cookie-banner--visible');
        banner.removeAttribute('aria-hidden');
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (!banner) return;
        banner.classList.remove('cookie-banner--visible');
        banner.classList.add('cookie-banner--hidden');
        banner.setAttribute('aria-hidden', 'true');
        // Mostra o botão flutuante após fechar o banner
        setTimeout(showPrefsBtn, 400);
    }

    // ========== BOTÃO FLUTUANTE DE PREFERÊNCIAS ==========
    function showPrefsBtn() {
        const btn = document.getElementById('cookie-prefs-btn');
        if (btn) btn.classList.add('cookie-prefs-btn--visible');
    }

    function hidePrefsBtn() {
        const btn = document.getElementById('cookie-prefs-btn');
        if (btn) btn.classList.remove('cookie-prefs-btn--visible');
    }

    // ========== MODAL ==========
    function openModal() {
        const modal = document.getElementById('cookie-modal');
        if (!modal) return;

        // Sincroniza toggles com estado atual
        syncToggles();

        modal.classList.add('cookie-modal--visible');
        modal.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden';

        // Foco no primeiro elemento interativo
        setTimeout(() => {
            const closeBtn = document.getElementById('cookie-modal-close');
            if (closeBtn) closeBtn.focus();
        }, 100);
    }

    function closeModal() {
        const modal = document.getElementById('cookie-modal');
        if (!modal) return;
        modal.classList.remove('cookie-modal--visible');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function syncToggles() {
        const toggleMap = {
            'cookie-functional': 'functional',
            'cookie-analytics': 'analytics',
            'cookie-performance': 'performance',
            'cookie-advertising': 'advertising'
        };

        Object.entries(toggleMap).forEach(([id, key]) => {
            const el = document.getElementById(id);
            if (el) el.checked = preferences[key] || false;
        });
    }

    function readToggles() {
        const toggleMap = {
            'cookie-functional': 'functional',
            'cookie-analytics': 'analytics',
            'cookie-performance': 'performance',
            'cookie-advertising': 'advertising'
        };

        const result = { necessary: true };
        Object.entries(toggleMap).forEach(([id, key]) => {
            const el = document.getElementById(id);
            result[key] = el ? el.checked : false;
        });
        return result;
    }

    // ========== AÇÕES ==========
    function acceptAll() {
        preferences = {
            necessary: true,
            functional: true,
            analytics: true,
            performance: true,
            advertising: true,
            decided: true
        };
        savePreferences(preferences);
        applyPreferences(preferences);
        hideBanner();
        closeModal();
        showFeedback('Preferências salvas: todos os cookies aceitos.');
    }

    function rejectAll() {
        preferences = {
            necessary: true,
            functional: false,
            analytics: false,
            performance: false,
            advertising: false,
            decided: true
        };
        savePreferences(preferences);
        applyPreferences(preferences);
        hideBanner();
        closeModal();
        showFeedback('Preferências salvas: apenas cookies necessários.');
    }

    function saveCustom() {
        const custom = readToggles();
        preferences = { ...custom, decided: true };
        savePreferences(preferences);
        applyPreferences(preferences);
        hideBanner();
        closeModal();
        showFeedback('Suas preferências foram salvas.');
    }

    // ========== APLICAR PREFERÊNCIAS ==========
    function applyPreferences(prefs) {
        // Dispara evento customizado para integração com scripts de terceiros
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
            detail: { preferences: prefs }
        }));

        // Exemplo de uso no console (remova em produção se desejar)
        // console.log('[Cookie Consent]', prefs);
    }

    // ========== FEEDBACK VISUAL ==========
    function showFeedback(message) {
        const existing = document.getElementById('cookie-feedback');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'cookie-feedback';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #0d2d38;
      color: #c9a962;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 6px;
      border: 1px solid rgba(201,169,98,0.3);
      box-shadow: 0 8px 24px rgba(13,45,56,0.3);
      z-index: 9999;
      opacity: 0;
      transition: all 300ms ease;
      white-space: nowrap;
    `;
        toast.textContent = '✓ ' + message;
        document.body.appendChild(toast);

        // Anima entrada
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(-50%) translateY(0)';
            });
        });

        // Remove após 3s
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(10px)';
            setTimeout(() => toast.remove(), 350);
        }, 3000);
    }

    // ========== EVENT LISTENERS ==========
    function bindEvents() {
        // Banner
        on('cookie-accept-all', 'click', acceptAll);
        on('cookie-reject', 'click', rejectAll);
        on('cookie-customize', 'click', openModal);

        // Modal
        on('cookie-modal-close', 'click', closeModal);
        on('cookie-modal-overlay', 'click', closeModal);
        on('cookie-modal-accept-all', 'click', acceptAll);
        on('cookie-modal-reject', 'click', rejectAll);
        on('cookie-modal-save', 'click', saveCustom);

        // Fechar modal com ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('cookie-modal');
                if (modal && modal.classList.contains('cookie-modal--visible')) {
                    closeModal();
                }
            }
        });

        // Botão flutuante de preferências
        on('cookie-prefs-btn', 'click', openModal);
    }

    function on(id, event, handler) {
        const el = document.getElementById(id);
        if (el) el.addEventListener(event, handler);
    }

    // ========== API PÚBLICA ==========
    // Permite reabrir o modal de preferências (ex: link no rodapé)
    window.CookieBanner = {
        open: openModal,
        acceptAll: acceptAll,
        rejectAll: rejectAll,
        getPreferences: function () {
            return loadPreferences();
        }
    };

    // ========== BOOTSTRAP ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            bindEvents();
            init();
        });
    } else {
        bindEvents();
        init();
    }

})();
