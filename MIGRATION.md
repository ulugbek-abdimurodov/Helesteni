# Migration Guide: Legacy to Professional Architecture

## Overview

This guide provides a systematic approach to migrate all existing pages from the legacy Tailwind-based architecture to the new professional design system.

## ✅ Migration Checklist

### Phase 1: Core Architecture (✅ COMPLETED)
- [x] Design system with tokens (`design-system.css`)
- [x] Component library (`components.css`)
- [x] Modern JavaScript application (`app.js`)
- [x] Professional template (`template.html`)
- [x] Updated homepage (`home.html`)

### Phase 2: Page Migration (🔄 IN PROGRESS)
- [x] `home.html` - Professional hero and navigation
- [ ] `tourism.html` - Museums and attractions
- [ ] `tourism-museums.html` - Workshops and experiences  
- [ ] `artists.html` - Artisan profiles
- [ ] `events.html` - Cultural events
- [ ] `stories.html` - Village stories
- [ ] `contacts.html` - Contact and location

### Phase 3: Enhancement (📋 PLANNED)
- [ ] Remove legacy CSS files
- [ ] Update all i18n translations
- [ ] Performance optimizations
- [ ] SEO enhancements
- [ ] Testing and validation

## 🔧 Migration Process

### Step 1: Update HTML Head

**From (Legacy):**
```html
<head>
  <link rel="stylesheet" href="assets/css/helestein.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="assets/js/helestein.js"></script>
</head>
```

**To (Professional):**
```html
<head>
  <!-- Preload critical resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  
  <!-- Professional CSS Architecture -->
  <link rel="stylesheet" href="assets/css/design-system.css">
  <link rel="stylesheet" href="assets/css/components.css">
  
  <!-- Enhanced JavaScript Application -->
  <script defer src="assets/js/app.js"></script>
</head>
```

### Step 2: Update Header Structure

**From (Legacy):**
```html
<header class="site-header sticky top-0 z-50 w-full bg-white/80">
  <div class="container mx-auto flex items-center justify-between">
    <!-- Old structure with Tailwind classes -->
  </div>
</header>
```

**To (Professional):**
```html
<header class="site-header" role="banner">
  <div class="site-header__container">
    <!-- Professional component structure -->
  </div>
</header>
```

### Step 3: Replace Navigation

Use the standardized navigation from `template.html`:

```html
<!-- Primary Navigation -->
<nav class="primary-nav" aria-label="Primary navigation">
  <a class="nav-link" href="home.html" data-i18n="nav.home">Home</a>
  
  <div class="tourism-dropdown">
    <a class="nav-link dropdown-trigger" href="tourism.html" aria-haspopup="true" aria-expanded="false" data-i18n="nav.tourism">
      Tourism
      <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
      </svg>
    </a>
    <div class="tourism-dropdown-menu" role="menu" aria-label="Tourism options">
      <a class="dropdown-item" href="tourism.html" role="menuitem" data-i18n="nav.museums">Museums</a>
      <a class="dropdown-item" href="tourism-museums.html" role="menuitem" data-i18n="nav.workshops">Workshops</a>
      <a class="dropdown-item" href="artists.html" role="menuitem" data-i18n="nav.artisans">Artisans</a>
    </div>
  </div>
  
  <a class="nav-link" href="events.html" data-i18n="nav.events">Events</a>
  <a class="nav-link" href="stories.html" data-i18n="nav.stories">Stories</a>
  <a class="nav-link" href="contacts.html" data-i18n="nav.contact">Contact</a>
</nav>
```

### Step 4: Convert Content Sections

#### Page Headers
**From:**
```html
<div class="px-4 py-16 mx-auto max-w-7xl">
  <h1 class="text-4xl font-bold">Page Title</h1>
</div>
```

**To:**
```html
<section class="page-header">
  <div class="container">
    <div class="page-header__content">
      <h1 class="page-header__title" data-i18n="page.title">Page Title</h1>
      <p class="page-header__subtitle" data-i18n="page.subtitle">Page description</p>
    </div>
  </div>
</section>
```

#### Content Sections
**From:**
```html
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <!-- content -->
  </div>
</section>
```

**To:**
```html
<section class="content-section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title" data-i18n="section.title">Section Title</h2>
      <p class="section-subtitle" data-i18n="section.subtitle">Section description</p>
    </div>
    <!-- content -->
  </div>
</section>
```

#### Feature Cards
**From:**
```html
<div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-semibold mb-2">Card Title</h3>
  <p class="text-gray-600">Card description</p>
</div>
```

**To:**
```html
<article class="feature-card">
  <div class="feature-card__content">
    <h3 class="feature-card__title" data-i18n="card.title">Card Title</h3>
    <p class="feature-card__description" data-i18n="card.description">Card description</p>
    <a href="#" class="feature-card__link" data-i18n="card.link">Learn More</a>
  </div>
</article>
```

### Step 5: Update Buttons and Links

**From:**
```html
<a href="#" class="btn-ios btn-lg">Button Text</a>
<button class="btn-ios-ghost btn-sm">Ghost Button</button>
```

**To:**
```html
<a href="#" class="btn btn--primary btn--large" data-i18n="button.text">Button Text</a>
<button class="btn btn--secondary btn--small" data-i18n="button.ghost">Ghost Button</button>
```

### Step 6: Add Footer

Add the professional footer from `template.html` to all pages:

```html
<!-- Professional Site Footer -->
<footer class="site-footer" role="contentinfo">
  <div class="site-footer__container">
    <!-- Full footer structure from template.html -->
  </div>
</footer>
```

### Step 7: Update Accessibility Features

1. **Add skip link:**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

2. **Update main content:**
```html
<main id="main-content" role="main">
  <!-- Page content -->
</main>
```

3. **Ensure proper heading hierarchy (h1 → h2 → h3)**

4. **Add ARIA labels and data-i18n attributes**

## 📋 Component Mapping

### Legacy → Professional Components

| Legacy Class | Professional Component | Usage |
|--------------|----------------------|-------|
| `btn-ios` | `btn btn--primary` | Primary buttons |
| `btn-ios-ghost` | `btn btn--secondary` | Secondary buttons |
| `nav-link` | `nav-link` | Navigation links |
| `tourism-menu` | `tourism-dropdown` | Tourism submenu |
| `mobile-toggle` | `mobile-menu-toggle` | Mobile menu button |
| `hero-section` | `hero` | Hero sections |
| Custom cards | `feature-card` | Content cards |
| Tailwind grid | `card-grid` | Card layouts |

### CSS Class Conversions

```css
/* Legacy Tailwind → Professional Classes */
.container.mx-auto.px-4     → .container
.flex.items-center          → .flex-center
.grid.grid-cols-3          → .card-grid
.bg-white.shadow-lg        → .feature-card
.text-xl.font-semibold     → .feature-card__title
.text-gray-600             → .feature-card__description
.py-16.bg-gray-50          → .content-section
```

## 🎨 Design Token Updates

### Color Migration

**From Tailwind:**
```css
.text-blue-600    → color: var(--color-primary-600)
.bg-gray-50       → background: var(--color-neutral-50)
.border-gray-200  → border-color: var(--color-neutral-200)
```

**Professional Tokens:**
```css
/* Use semantic color tokens */
.text-primary     → color: var(--color-primary)
.bg-surface       → background: var(--color-surface)
.border-subtle    → border-color: var(--color-border)
```

### Spacing Migration

**From Tailwind:**
```css
.p-6     → padding: var(--space-6)
.mb-4    → margin-bottom: var(--space-4)
.gap-8   → gap: var(--space-8)
```

## 🌐 Internationalization Updates

### Add i18n Attributes

Replace hardcoded text with i18n attributes:

**Before:**
```html
<h1>Welcome to Helesteni Village</h1>
<p>Discover our rich heritage</p>
<button>Learn More</button>
```

**After:**
```html
<h1 data-i18n="welcome.title">Welcome to Helesteni Village</h1>
<p data-i18n="welcome.subtitle">Discover our rich heritage</p>
<button data-i18n="welcome.cta">Learn More</button>
```

### Update Translation Files

Add new keys to `assets/i18n/en.json` and `assets/i18n/ro.json`:

```json
{
  "welcome": {
    "title": "Welcome to Helesteni Village",
    "subtitle": "Discover our rich heritage",
    "cta": "Learn More"
  }
}
```

## 🧪 Testing Checklist

### For Each Migrated Page

- [ ] **Visual**: Compare with template.html design
- [ ] **Navigation**: Test all menu items and dropdowns
- [ ] **Mobile**: Verify mobile menu functionality
- [ ] **Accessibility**: Tab navigation and screen reader testing
- [ ] **Internationalization**: Test language switching (EN/RO)
- [ ] **Performance**: Check Core Web Vitals
- [ ] **Cross-browser**: Test in Chrome, Firefox, Safari, Edge

### Validation Tools

```bash
# HTML validation
npx html-validate *.html

# Accessibility testing
npx @axe-core/cli http://localhost:8000

# Performance testing
npx lighthouse http://localhost:8000 --output=html
```

## 🚀 Post-Migration Tasks

### 1. Remove Legacy Files

After all pages are migrated:

```bash
# Backup legacy files
mkdir backup
mv assets/css/helestein.css backup/
mv assets/js/helestein.js backup/

# Update all HTML references
# Remove Tailwind CDN references
```

### 2. SEO Optimization

- Update meta descriptions
- Add structured data markup
- Optimize image alt text
- Implement proper heading hierarchy

### 3. Performance Optimization

- Implement critical CSS inlining
- Add service worker for caching
- Optimize image delivery
- Enable compression

### 4. Analytics Setup

- Implement performance monitoring
- Add error tracking
- Set up user behavior analytics
- Monitor Core Web Vitals

## 📚 Reference Materials

- **Professional Template**: Use `template.html` as the reference implementation
- **Design System**: Check `design-system.css` for available tokens
- **Component Library**: Reference `components.css` for component patterns
- **JavaScript API**: See `app.js` for available methods and events

## 🆘 Troubleshooting

### Common Issues

1. **Navigation not working**: Ensure `app.js` is loaded and navigation structure matches template
2. **Styles not applying**: Check CSS file order and component class names
3. **Mobile menu broken**: Verify mobile menu structure and JavaScript initialization
4. **i18n not working**: Ensure translation files exist and keys match HTML attributes

### Debug Steps

1. Check browser console for JavaScript errors
2. Validate HTML structure against template
3. Verify CSS classes exist in design system
4. Test with reduced motion preferences
5. Validate accessibility with screen reader

---

**Next Steps**: Begin migrating `tourism.html` following this systematic approach, then proceed with remaining pages in order of priority.
