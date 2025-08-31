/* helestein.js - shared site behaviors
   - Active nav and submenu persistence
   - Robust Tourism submenu hover with small close delay
   - Language button toggle (if a menu exists)
*/
(function () {
    var CLOSE_DELAY = 150;
    var tourismPages = ['tourism.html', 'tourism-museums.html', 'artists.html'];
    var closeTimer = null;
    var DEFAULT_LANG = 'en';
    var SUPPORTED = ['en', 'ro'];

    function ready(fn) {
        if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
    }

    function setActiveNav() {
        var path = (location.pathname.split('/').pop() || '').toLowerCase();
        if (!path) return;
        var header = document.querySelector('header.site-header') || document.querySelector('header');
        if (!header) return;
        var activeTop = header.querySelector('a.nav-link[href="' + path + '"]');
        if (activeTop) activeTop.classList.add('nav-active');

        if (tourismPages.indexOf(path) !== -1) {
            var submenu = header.querySelector('.tourism-menu .tourism-submenu');
            var parentLink = header.querySelector('.tourism-menu > a.nav-link');
            if (submenu) submenu.style.display = 'block';
            if (parentLink) parentLink.setAttribute('aria-expanded', 'true');
            var subActive = header.querySelector('.tourism-menu .tourism-submenu a[href="' + path + '"]');
            if (subActive) subActive.classList.add('submenu-active');
        }
    }

    function enhanceTourismHover() {
        var container = document.querySelector('.tourism-menu');
        var submenu = container && container.querySelector('.tourism-submenu');
        var parentLink = container && container.querySelector('a.nav-link');
        if (!container || !submenu) return;

        function open() {
            if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
            submenu.style.display = 'block';
            if (parentLink) parentLink.setAttribute('aria-expanded', 'true');
        }
        function close() {
            var path = (location.pathname.split('/').pop() || '').toLowerCase();
            // Keep open on tourism pages to persist context
            if (tourismPages.indexOf(path) !== -1) return;
            submenu.style.display = 'none';
            if (parentLink) parentLink.setAttribute('aria-expanded', 'false');
        }

        container.addEventListener('mouseenter', open);
        container.addEventListener('mouseleave', function () {
            closeTimer = setTimeout(close, CLOSE_DELAY);
        });
        submenu.addEventListener('mouseenter', function () { if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; } });

        // Keyboard support: open on focus within, close on blur with delay
        container.addEventListener('focusin', open);
        container.addEventListener('focusout', function (e) {
            // Only close if focus moves outside the container
            if (!container.contains(e.relatedTarget)) {
                closeTimer = setTimeout(close, CLOSE_DELAY);
            }
        });

        // Escape closes submenu (unless on tourism pages)
        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape') close();
        });

        // Small-screen toggle: clicking the parent arrow area should toggle submenu instead of immediate nav
        if (parentLink) {
            parentLink.addEventListener('click', function (ev) {
                // If submenu is hidden, toggle open and prevent navigation
                var isHidden = submenu.style.display === 'none' || getComputedStyle(submenu).display === 'none';
                if (isHidden) {
                    ev.preventDefault();
                    open();
                }
            });
        }
    }

    function enhanceLanguage() {
        // If a language menu exists, toggle it; otherwise the button is a no-op
        var langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(function (btn) {
            var menu = document.getElementById('lang-menu') || btn.nextElementSibling;
            if (!menu) return;
            function close() { menu.classList.add('hidden'); }
            function open() { menu.classList.remove('hidden'); }
            function toggle() { menu.classList.toggle('hidden'); }
            btn.addEventListener('click', function (ev) { ev.preventDefault(); toggle(); });
            document.addEventListener('click', function (e) {
                if (!menu.contains(e.target) && !btn.contains(e.target)) close();
            });
            document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') close(); });
        });
    }

    function initSkipLink() {
        var main = document.querySelector('main');
        if (main && !main.id) main.id = 'main-content';
    }

    function enhanceMobileMenu() {
        var header = document.querySelector('header.site-header') || document.querySelector('header');
        if (!header) return;
        var toggle = header.querySelector('[data-mobile-toggle]');
        var menu = header.querySelector('[data-mobile-menu]');
        if (!toggle || !menu) return;
        toggle.addEventListener('click', function () { menu.classList.toggle('open'); });
        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) menu.classList.remove('open');
        });
    }

    // Lightweight i18n
    function getLang() {
        var saved = localStorage.getItem('lang');
        if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
        return DEFAULT_LANG;
    }
    function setLang(lang) {
        if (SUPPORTED.indexOf(lang) === -1) return;
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', lang);
    }
    function applyI18n(dict) {
        var nodes = document.querySelectorAll('[data-i18n]');
        nodes.forEach(function (n) {
            var key = n.getAttribute('data-i18n');
            var txt = dict[key];
            if (txt) n.textContent = txt;
        });
    }
    function loadI18n(lang) {
        return fetch('assets/i18n/' + lang + '.json', { cache: 'no-store' })
            .then(function (r) { return r.ok ? r.json() : {}; })
            .catch(function () { return {}; });
    }
    function initI18n() {
        var current = getLang();
        setLang(current);
        loadI18n(current).then(applyI18n);
        // Wire language buttons
        document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var lang = btn.getAttribute('data-set-lang');
                if (!lang) return;
                setLang(lang);
                loadI18n(lang).then(applyI18n);
            });
        });
    }

    ready(function () {
        document.documentElement.classList.add('js-enabled');
        setActiveNav();
        enhanceTourismHover();
        enhanceLanguage();
        enhanceMobileMenu();
        initI18n();
        initSkipLink();
    });
})();
