/* assets/js/site.js
   Navigation and submenu behavior (hover, focus, and small close delay)
   Active link highlighting and accessibility tweaks
*/
(function(){
  function ready(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }

  ready(function(){
    var header = document.querySelector('header.site-header, header.header-on-hero, header');
    if(!header) return;

    var path = (location.pathname.split('/').pop() || 'home.html').toLowerCase();
    var tourismPages = ['tourism.html','tourism-museums.html','artists.html'];

    // Active top-level link
    var activeTop = header.querySelector('a.nav-link[href="'+ path +'"]');
    if(activeTop) activeTop.classList.add('nav-active');

    // Keep Tourism submenu open on tourism-related pages
    if(tourismPages.indexOf(path)!==-1){
      var submenu = header.querySelector('.tourism-menu .tourism-submenu');
      if(submenu){ submenu.style.display='block'; }
      var subActive = header.querySelector('.tourism-menu .tourism-submenu a[href="'+ path +'"]');
      if(subActive) subActive.classList.add('submenu-active');
      var parentLink = header.querySelector('.tourism-menu > a.nav-link');
      if(parentLink) parentLink.setAttribute('aria-expanded','true');
    }

    // Enhanced submenu interactions (hover intent + keyboard)
    var tourism = header.querySelector('.tourism-menu');
    if(!tourism) return;
    var parent = tourism.querySelector('> a.nav-link');
    var submenuEl = tourism.querySelector('.tourism-submenu');
    if(!parent || !submenuEl) return;

    // Hover-intent close delay
    var closeTimer;
    tourism.addEventListener('mouseleave', function(){
      closeTimer = setTimeout(function(){
        // Only close if not on a tourism page; on tourism pages keep it open
        if(tourismPages.indexOf(path)===-1){
          parent.setAttribute('aria-expanded','false');
          submenuEl.style.display='';
        }
      }, 180);
    });
    tourism.addEventListener('mouseenter', function(){ if(closeTimer) clearTimeout(closeTimer); });

    // Keyboard open/close
    parent.addEventListener('keydown', function(e){
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        var isOpen = parent.getAttribute('aria-expanded')==='true';
        parent.setAttribute('aria-expanded', String(!isOpen));
        submenuEl.style.display = !isOpen ? 'block' : '';
        if(!isOpen){ var first = submenuEl.querySelector('a'); if(first) first.focus(); }
      }else if(e.key==='ArrowDown'){
        e.preventDefault();
        parent.setAttribute('aria-expanded','true');
        submenuEl.style.display='block';
        var firstItem = submenuEl.querySelector('a');
        if(firstItem) firstItem.focus();
      }
    });
    submenuEl.addEventListener('keydown', function(e){
      if(e.key==='Escape'){
        e.stopPropagation();
        parent.focus();
        parent.setAttribute('aria-expanded','false');
        if(tourismPages.indexOf(path)===-1){ submenuEl.style.display=''; }
      }
    });
  });
})();
