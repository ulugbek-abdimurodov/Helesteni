/**
 * HELSTEIN VILLAGE - PROFESSIONAL JAVASCRIPT ARCHITECTURE
 * Enterprise-grade modular application with proper separation of concerns
 * 
 * @version 2.0.0
 * @author Professional Development Team
 * @license MIT
 */

(function(window, document) {
  'use strict';

  // ==========================================================================
  // CONFIGURATION & CONSTANTS
  // ==========================================================================

  const CONFIG = {
    // Application settings
    APP_NAME: 'Helstein Village',
    VERSION: '2.0.0',
    DEBUG: false,

    // Navigation settings
    TOURISM_PAGES: ['tourism.html', 'tourism-museums.html', 'artists.html'],
    SUBMENU_CLOSE_DELAY: 150,

    // Internationalization
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'ro'],
    I18N_CACHE_KEY: 'helstein_language',
    I18N_RESOURCE_PATH: 'assets/i18n/',

    // Animation settings
    SCROLL_THRESHOLD: 100,
    ANIMATION_DURATION: 300,

    // CSS classes
    CLASSES: {
      ACTIVE_NAV: 'active',
      ACTIVE_SUBMENU: 'active',
      OPEN_MENU: 'open',
      SCROLLED_HEADER: 'scrolled',
      JS_ENABLED: 'js-enabled',
      MOBILE_MENU_OPEN: 'mobile-menu-open'
    },

    // Selectors
    SELECTORS: {
      HEADER: '.site-header',
      NAV_LINK: '.nav-link',
      TOURISM_MENU: '.tourism-dropdown',
      TOURISM_SUBMENU: '.tourism-dropdown-menu',
      MOBILE_TOGGLE: '.mobile-menu-toggle',
      MOBILE_MENU: '.mobile-menu',
      LANGUAGE_BTN: '.language-btn',
      LANGUAGE_MENU: '.language-menu',
      LANGUAGE_OPTION: '[data-set-lang]',
      I18N_ELEMENT: '[data-i18n]',
      MAIN_CONTENT: 'main'
    }
  };

  // ==========================================================================
  // UTILITIES & HELPERS
  // ==========================================================================

  const Utils = {
    /**
     * Enhanced DOM ready function with error handling
     */
    ready(callback) {
      if (document.readyState !== 'loading') {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback);
      }
    },

    /**
     * Debounce function for performance optimization
     */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Throttle function for scroll events
     */
    throttle(func, delay) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, delay);
        }
      };
    },

    /**
     * Get current page filename
     */
    getCurrentPage() {
      return (window.location.pathname.split('/').pop() || '').toLowerCase();
    },

    /**
     * Safe element selection with error handling
     */
    $(selector, context = document) {
      try {
        return context.querySelector(selector);
      } catch (error) {
        this.log('error', `Invalid selector: ${selector}`, error);
        return null;
      }
    },

    /**
     * Safe multiple element selection
     */
    $$(selector, context = document) {
      try {
        return Array.from(context.querySelectorAll(selector));
      } catch (error) {
        this.log('error', `Invalid selector: ${selector}`, error);
        return [];
      }
    },

    /**
     * Enhanced logging with levels
     */
    log(level, message, data = null) {
      if (!CONFIG.DEBUG && level !== 'error') return;
      
      const timestamp = new Date().toISOString();
      const prefix = `[${CONFIG.APP_NAME}] ${timestamp} [${level.toUpperCase()}]`;
      
      switch (level) {
        case 'error':
          console.error(prefix, message, data);
          break;
        case 'warn':
          console.warn(prefix, message, data);
          break;
        case 'info':
          console.info(prefix, message, data);
          break;
        default:
          console.log(prefix, message, data);
      }
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    /**
     * Smooth scroll to element
     */
    scrollTo(element, offset = 0) {
      if (!element) return;
      
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    },

    /**
     * Cookie utilities
     */
    cookie: {
      set(name, value, days = 30) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
      },

      get(name) {
        return document.cookie
          .split('; ')
          .find(row => row.startsWith(name + '='))
          ?.split('=')[1];
      },

      remove(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    }
  };

  // ==========================================================================
  // NAVIGATION MODULE
  // ==========================================================================

  const Navigation = {
    init() {
      this.setActiveNavigation();
      this.initTourismDropdown();
      this.initMobileMenu();
      this.initScrollEffects();
      Utils.log('info', 'Navigation module initialized');
    },

    /**
     * Set active navigation state based on current page
     */
    setActiveNavigation() {
      const currentPage = Utils.getCurrentPage();
      if (!currentPage) return;

      const header = Utils.$(CONFIG.SELECTORS.HEADER);
      if (!header) return;

      // Set active main navigation
      const activeLink = Utils.$(`${CONFIG.SELECTORS.NAV_LINK}[href="${currentPage}"]`, header);
      if (activeLink) {
        activeLink.classList.add(CONFIG.CLASSES.ACTIVE_NAV);
      }

      // Handle tourism submenu persistence
      if (CONFIG.TOURISM_PAGES.includes(currentPage)) {
        this.persistTourismMenu(header, currentPage);
      }
    },

    /**
     * Keep tourism menu open and active on tourism pages
     */
    persistTourismMenu(header, currentPage) {
      const tourismMenu = Utils.$(CONFIG.SELECTORS.TOURISM_MENU, header);
      const tourismSubmenu = Utils.$(CONFIG.SELECTORS.TOURISM_SUBMENU, header);
      
      if (tourismMenu && tourismSubmenu) {
        tourismMenu.classList.add(CONFIG.CLASSES.OPEN_MENU);
        
        const activeSubmenuLink = Utils.$(`a[href="${currentPage}"]`, tourismSubmenu);
        if (activeSubmenuLink) {
          activeSubmenuLink.classList.add(CONFIG.CLASSES.ACTIVE_SUBMENU);
        }

        // Update ARIA state
        const trigger = Utils.$('.dropdown-trigger', tourismMenu);
        if (trigger) {
          trigger.setAttribute('aria-expanded', 'true');
        }
      }
    },

    /**
     * Initialize tourism dropdown with enhanced UX
     */
    initTourismDropdown() {
      const tourismMenu = Utils.$(CONFIG.SELECTORS.TOURISM_MENU);
      if (!tourismMenu) return;

      let closeTimer = null;
      const currentPage = Utils.getCurrentPage();

      const openMenu = () => {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        tourismMenu.classList.add(CONFIG.CLASSES.OPEN_MENU);
        this.updateAriaExpanded(tourismMenu, true);
      };

      const closeMenu = () => {
        // Don't close if we're on a tourism page
        if (CONFIG.TOURISM_PAGES.includes(currentPage)) return;
        
        tourismMenu.classList.remove(CONFIG.CLASSES.OPEN_MENU);
        this.updateAriaExpanded(tourismMenu, false);
      };

      const scheduleClose = () => {
        closeTimer = setTimeout(closeMenu, CONFIG.SUBMENU_CLOSE_DELAY);
      };

      // Mouse events
      tourismMenu.addEventListener('mouseenter', openMenu);
      tourismMenu.addEventListener('mouseleave', scheduleClose);

      // Keyboard events
      tourismMenu.addEventListener('focusin', openMenu);
      tourismMenu.addEventListener('focusout', (e) => {
        if (!tourismMenu.contains(e.relatedTarget)) {
          scheduleClose();
        }
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });

      Utils.log('info', 'Tourism dropdown initialized');
    },

    /**
     * Update ARIA expanded state
     */
    updateAriaExpanded(menu, expanded) {
      const trigger = Utils.$('.dropdown-trigger', menu);
      if (trigger) {
        trigger.setAttribute('aria-expanded', expanded.toString());
      }
    },

    /**
     * Initialize mobile menu with enhanced accessibility
     */
    initMobileMenu() {
      const toggle = Utils.$(CONFIG.SELECTORS.MOBILE_TOGGLE);
      const menu = Utils.$(CONFIG.SELECTORS.MOBILE_MENU);
      
      if (!toggle || !menu) return;

      const toggleMenu = () => {
        const isOpen = menu.classList.contains(CONFIG.CLASSES.OPEN_MENU);
        
        if (isOpen) {
          this.closeMobileMenu(toggle, menu);
        } else {
          this.openMobileMenu(toggle, menu);
        }
      };

      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          this.closeMobileMenu(toggle, menu);
        }
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains(CONFIG.CLASSES.OPEN_MENU)) {
          this.closeMobileMenu(toggle, menu);
          toggle.focus();
        }
      });

      Utils.log('info', 'Mobile menu initialized');
    },

    openMobileMenu(toggle, menu) {
      menu.classList.add(CONFIG.CLASSES.OPEN_MENU);
      document.body.classList.add(CONFIG.CLASSES.MOBILE_MENU_OPEN);
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      
      // Focus first menu item
      const firstLink = Utils.$(CONFIG.SELECTORS.NAV_LINK, menu);
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    },

    closeMobileMenu(toggle, menu) {
      menu.classList.remove(CONFIG.CLASSES.OPEN_MENU);
      document.body.classList.remove(CONFIG.CLASSES.MOBILE_MENU_OPEN);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    },

    /**
     * Initialize scroll effects for header
     */
    initScrollEffects() {
      const header = Utils.$(CONFIG.SELECTORS.HEADER);
      if (!header) return;

      const handleScroll = Utils.throttle(() => {
        if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
          header.classList.add(CONFIG.CLASSES.SCROLLED_HEADER);
        } else {
          header.classList.remove(CONFIG.CLASSES.SCROLLED_HEADER);
        }
      }, 16); // ~60fps

      window.addEventListener('scroll', handleScroll, { passive: true });
      Utils.log('info', 'Scroll effects initialized');
    }
  };

  // ==========================================================================
  // INTERNATIONALIZATION MODULE
  // ==========================================================================

  const I18n = {
    currentLanguage: CONFIG.DEFAULT_LANGUAGE,
    cache: new Map(),

    init() {
      this.currentLanguage = this.getStoredLanguage();
      this.setDocumentLanguage();
      this.loadTranslations().then(() => {
        this.initLanguageControls();
        Utils.log('info', 'I18n module initialized');
      });
    },

    /**
     * Get stored language preference
     */
    getStoredLanguage() {
      const stored = localStorage.getItem(CONFIG.I18N_CACHE_KEY);
      return CONFIG.SUPPORTED_LANGUAGES.includes(stored) ? stored : CONFIG.DEFAULT_LANGUAGE;
    },

    /**
     * Store language preference
     */
    setStoredLanguage(language) {
      if (!CONFIG.SUPPORTED_LANGUAGES.includes(language)) {
        Utils.log('warn', `Unsupported language: ${language}`);
        return false;
      }
      
      localStorage.setItem(CONFIG.I18N_CACHE_KEY, language);
      this.currentLanguage = language;
      return true;
    },

    /**
     * Set document language attribute
     */
    setDocumentLanguage() {
      document.documentElement.setAttribute('lang', this.currentLanguage);
    },

    /**
     * Load translation resources with caching
     */
    async loadTranslations(language = this.currentLanguage) {
      if (this.cache.has(language)) {
        this.applyTranslations(this.cache.get(language));
        return;
      }

      try {
        const response = await fetch(`${CONFIG.I18N_RESOURCE_PATH}${language}.json`, {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const translations = await response.json();
        this.cache.set(language, translations);
        this.applyTranslations(translations);
        
        Utils.log('info', `Translations loaded for: ${language}`);
      } catch (error) {
        Utils.log('error', `Failed to load translations for ${language}:`, error);
        
        // Fallback to default language if not already trying it
        if (language !== CONFIG.DEFAULT_LANGUAGE) {
          Utils.log('info', 'Falling back to default language');
          await this.loadTranslations(CONFIG.DEFAULT_LANGUAGE);
        }
      }
    },

    /**
     * Apply translations to DOM elements
     */
    applyTranslations(translations) {
      const elements = Utils.$$(CONFIG.SELECTORS.I18N_ELEMENT);
      
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key && translations[key]) {
          element.textContent = translations[key];
        }
      });

      Utils.log('info', `Applied ${Object.keys(translations).length} translations`);
    },

    /**
     * Switch language with smooth transition
     */
    async switchLanguage(language) {
      if (!this.setStoredLanguage(language)) return;

      this.setDocumentLanguage();
      
      // Add loading state
      document.body.classList.add('language-switching');
      
      try {
        await this.loadTranslations(language);
        this.updateLanguageControls();
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('languageChanged', {
          detail: { language, translations: this.cache.get(language) }
        }));
        
        Utils.log('info', `Language switched to: ${language}`);
      } catch (error) {
        Utils.log('error', 'Language switch failed:', error);
      } finally {
        // Remove loading state
        setTimeout(() => {
          document.body.classList.remove('language-switching');
        }, 300);
      }
    },

    /**
     * Initialize language control events
     */
    initLanguageControls() {
      const languageOptions = Utils.$$(CONFIG.SELECTORS.LANGUAGE_OPTION);
      
      languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
          e.preventDefault();
          const language = option.getAttribute('data-set-lang');
          if (language) {
            this.switchLanguage(language);
          }
        });
      });

      this.updateLanguageControls();
      Utils.log('info', 'Language controls initialized');
    },

    /**
     * Update language control states
     */
    updateLanguageControls() {
      const languageOptions = Utils.$$(CONFIG.SELECTORS.LANGUAGE_OPTION);
      
      languageOptions.forEach(option => {
        const language = option.getAttribute('data-set-lang');
        if (language === this.currentLanguage) {
          option.classList.add('active');
          option.setAttribute('aria-current', 'true');
        } else {
          option.classList.remove('active');
          option.removeAttribute('aria-current');
        }
      });
    }
  };

  // ==========================================================================
  // ACCESSIBILITY MODULE
  // ==========================================================================

  const Accessibility = {
    init() {
      this.setupSkipLinks();
      this.enhanceKeyboardNavigation();
      this.setupFocusManagement();
      this.initReducedMotion();
      Utils.log('info', 'Accessibility module initialized');
    },

    /**
     * Setup skip navigation links
     */
    setupSkipLinks() {
      const main = Utils.$(CONFIG.SELECTORS.MAIN_CONTENT);
      if (main && !main.id) {
        main.id = 'main-content';
      }

      // Create skip link if it doesn't exist
      let skipLink = Utils.$('.skip-link');
      if (!skipLink) {
        skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
      }
    },

    /**
     * Enhance keyboard navigation
     */
    enhanceKeyboardNavigation() {
      // Add keyboard support for dropdown menus
      const dropdowns = Utils.$$('.tourism-dropdown');
      
      dropdowns.forEach(dropdown => {
        const trigger = Utils.$('.dropdown-trigger', dropdown);
        const menu = Utils.$('.tourism-dropdown-menu', dropdown);
        
        if (!trigger || !menu) return;

        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropdown.classList.toggle(CONFIG.CLASSES.OPEN_MENU);
            Navigation.updateAriaExpanded(dropdown, dropdown.classList.contains(CONFIG.CLASSES.OPEN_MENU));
          }
        });
      });
    },

    /**
     * Setup focus management for modals and menus
     */
    setupFocusManagement() {
      // Focus trap for mobile menu
      const mobileMenu = Utils.$(CONFIG.SELECTORS.MOBILE_MENU);
      if (mobileMenu) {
        mobileMenu.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            this.trapFocus(e, mobileMenu);
          }
        });
      }
    },

    /**
     * Trap focus within an element
     */
    trapFocus(e, container) {
      const focusableElements = container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    },

    /**
     * Initialize reduced motion support
     */
    initReducedMotion() {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      const handleReducedMotion = (e) => {
        if (e.matches) {
          document.body.classList.add('reduced-motion');
        } else {
          document.body.classList.remove('reduced-motion');
        }
      };

      reducedMotion.addEventListener('change', handleReducedMotion);
      handleReducedMotion(reducedMotion);
    }
  };

  // ==========================================================================
  // PERFORMANCE MODULE
  // ==========================================================================

  const Performance = {
    init() {
      this.setupIntersectionObserver();
      this.preloadCriticalResources();
      this.initLazyLoading();
      Utils.log('info', 'Performance module initialized');
    },

    /**
     * Setup intersection observer for animations
     */
    setupIntersectionObserver() {
      if (!window.IntersectionObserver) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe elements with animation classes
      const animatedElements = Utils.$$('[class*="animate-"]');
      animatedElements.forEach(el => observer.observe(el));
    },

    /**
     * Preload critical resources
     */
    preloadCriticalResources() {
      // Preload critical fonts
      const fonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap'
      ];

      fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        link.onload = function() { this.onload = null; this.rel = 'stylesheet'; };
        document.head.appendChild(link);
      });
    },

    /**
     * Initialize lazy loading for images
     */
    initLazyLoading() {
      if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading support
        const images = Utils.$$('img[data-src]');
        images.forEach(img => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        });
      } else {
        // Fallback for older browsers
        this.setupLazyLoadingFallback();
      }
    },

    setupLazyLoadingFallback() {
      if (!window.IntersectionObserver) return;

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      const images = Utils.$$('img[data-src]');
      images.forEach(img => imageObserver.observe(img));
    }
  };

  // ==========================================================================
  // APPLICATION CONTROLLER
  // ==========================================================================

  const App = {
    modules: [Navigation, I18n, Accessibility, Performance],

    init() {
      Utils.log('info', `Initializing ${CONFIG.APP_NAME} v${CONFIG.VERSION}`);
      
      // Set JS enabled class
      document.documentElement.classList.add(CONFIG.CLASSES.JS_ENABLED);
      
      // Initialize all modules
      this.modules.forEach(module => {
        try {
          module.init();
        } catch (error) {
          Utils.log('error', `Failed to initialize module: ${module.constructor.name}`, error);
        }
      });

      // Setup global error handling
      this.setupErrorHandling();
      
      // Setup analytics if needed
      this.setupAnalytics();
      
      Utils.log('info', 'Application initialized successfully');
    },

    setupErrorHandling() {
      window.addEventListener('error', (e) => {
        Utils.log('error', 'Uncaught error:', {
          message: e.message,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno,
          error: e.error
        });
      });

      window.addEventListener('unhandledrejection', (e) => {
        Utils.log('error', 'Unhandled promise rejection:', e.reason);
      });
    },

    setupAnalytics() {
      // Placeholder for analytics integration
      // Example: Google Analytics, Adobe Analytics, etc.
      if (window.gtag) {
        Utils.log('info', 'Analytics tracking enabled');
      }
    }
  };

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================

  // Initialize application when DOM is ready
  Utils.ready(() => {
    App.init();
  });

  // Expose public API
  window.HelsteinVillage = {
    version: CONFIG.VERSION,
    utils: Utils,
    navigation: Navigation,
    i18n: I18n,
    accessibility: Accessibility,
    performance: Performance
  };

})(window, document);
