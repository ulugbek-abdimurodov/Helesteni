# Helesteni Village 🏘️

![Helesteni Village](https://img.shields.io/badge/Status-Live-brightgreen)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue)
![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**🌐 Live Website:** [https://yourusername.github.io/Helesteni](https://yourusername.github.io/Helesteni)

> Discover the heart of Moldova Region through the rich cultural heritage and breathtaking landscapes of Helesteni Village. Experience authentic Romanian village life, traditional crafts, museums, and cultural events.

## ✨ Features

- 🏛️ **Virtual Museums** - Explore local history and cultural artifacts
- 🎨 **Artisan Workshops** - Traditional crafts and hands-on experiences  
- 📅 **Cultural Events** - Festivals and community celebrations
- 📖 **Village Stories** - Local history and personal narratives
- 🌍 **Bilingual Support** - English and Romanian languages
- 📱 **Mobile Responsive** - Optimized for all devices
- ♿ **Accessible** - WCAG 2.1 AA compliant

## 🚀 Live Demo

Visit the live website: **[https://yourusername.github.io/Helesteni](https://yourusername.github.io/Helesteni)**

### 📄 Pages Available

- **🏠 [Home](https://yourusername.github.io/Helesteni/home.html)** - Welcome and overview
- **🏛️ [Museums](https://yourusername.github.io/Helesteni/tourism.html)** - Cultural attractions
- **🎨 [Workshops](https://yourusername.github.io/Helesteni/tourism-museums.html)** - Traditional crafts
- **👨‍🎨 [Artisans](https://yourusername.github.io/Helesteni/artists.html)** - Local craftspeople
- **📅 [Events](https://yourusername.github.io/Helesteni/events.html)** - Cultural calendar
- **📖 [Stories](https://yourusername.github.io/Helesteni/stories.html)** - Village narratives
- **📞 [Contact](https://yourusername.github.io/Helesteni/contacts.html)** - Get in touch

## 🛠️ Technology Stack

### Frontend Architecture
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Professional design system with custom properties
- **JavaScript ES6+** - Modern modular application architecture
- **Design Tokens** - Scalable theming system
- **Component Library** - Reusable UI components

### Design System
- **Typography** - Inter & Playfair Display fonts
- **Color Palette** - Professional brand colors with semantic variants
- **Spacing** - 8-point grid system
- **Components** - BEM methodology with consistent patterns
- **Responsive** - Mobile-first design approach

## ✨ Design System Features

### 🎨 Design Tokens

- **Color System**: Comprehensive palette with primary, neutral, and semantic colors
- **Typography Scale**: Modular scale with Inter and Playfair Display fonts
- **Spacing System**: 8-point grid system for consistent spacing
- **Component Tokens**: Shadows, border radius, z-index scales
- **Animation Library**: Smooth transitions and micro-interactions

### 🧩 Component Library

- **Site Header**: Professional navigation with mobile menu and language controls
- **Hero Sections**: Full-screen and standard hero components
- **Feature Cards**: Modular content cards with consistent styling
- **Form Components**: Accessible form inputs and controls
- **Utility Components**: Buttons, badges, breadcrumbs, and more

### 📱 Responsive Design

- **Mobile-First**: Progressive enhancement from mobile to desktop
- **Breakpoint System**: Consistent breakpoints across all components
- **Flexible Grid**: CSS Grid and Flexbox for modern layouts
- **Adaptive Images**: Responsive images with proper loading strategies

## 🚀 Quick Start

### Prerequisites

- Modern web browser with ES6+ support
- Local web server (for proper CORS handling of JSON resources)

### Installation

1. **Clone the repository**
```bash
git clone [repository-url]
cd helestein
```

2. **Serve locally**
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. **Open in browser**
```
http://localhost:8000
```

### Development Workflow

1. **Start with the template**: Use `template.html` as a starting point for new pages
2. **Follow component patterns**: Use existing components from `components.css`
3. **Maintain design tokens**: Update `design-system.css` for theme changes
4. **Test accessibility**: Ensure WCAG 2.1 AA compliance
5. **Validate internationalization**: Test with both EN and RO languages

## 📋 File Structure

### Core Pages

- `home.html` - Homepage with hero section and CTAs
- `tourism.html` - Museums and cultural attractions
- `tourism-museums.html` - Workshop and artisan experiences
- `artists.html` - Local artisan profiles and galleries
- `events.html` - Cultural events and festivals
- `stories.html` - Village stories and testimonials
- `contacts.html` - Contact information and location
- `template.html` - Professional template demonstrating all components

### CSS Architecture

#### `design-system.css`
- Design tokens and CSS custom properties
- Utility classes for spacing, typography, and layout
- Responsive grid system and breakpoints
- Animation and transition definitions

#### `components.css`
- Site-specific component definitions
- Professional header and navigation
- Hero sections and content blocks
- Form components and interactive elements

### JavaScript Architecture

#### `app.js` (Modern Architecture)
- Modular application structure
- Navigation management
- Internationalization engine
- Accessibility enhancements
- Performance optimizations

## 🌐 Internationalization

### Supported Languages

- **English (EN)** - Primary language
- **Romanian (RO)** - Secondary language

### Translation Management

Translations are stored in JSON files under `assets/i18n/`:

```json
{
  "nav.home": "Home",
  "nav.tourism": "Tourism",
  "nav.events": "Events"
}
```

#### Adding New Translations

1. Add key-value pairs to `en.json` and `ro.json`
2. Use `data-i18n` attributes in HTML:
```html
<h1 data-i18n="page.title">Default Text</h1>
```

3. The application will automatically apply translations on load

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance

- **Semantic HTML**: Proper use of landmarks and heading structure
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: Minimum 4.5:1 contrast ratios
- **Focus Management**: Visible focus indicators and logical tab order
- **Alternative Text**: Descriptive alt text for all images

### Accessibility Testing

```bash
# Run accessibility audits
npm install -g @axe-core/cli
axe http://localhost:8000
```

## 🔧 Component Usage

### Buttons

```html
<!-- Primary button -->
<button class="btn btn--primary">Primary Action</button>

<!-- Secondary button -->
<button class="btn btn--secondary">Secondary Action</button>

<!-- Button sizes -->
<button class="btn btn--primary btn--large">Large Button</button>
<button class="btn btn--primary btn--small">Small Button</button>
```

### Feature Cards

```html
<article class="feature-card">
  <div class="feature-card__image">
    <img src="image.jpg" alt="Description" loading="lazy">
  </div>
  <div class="feature-card__content">
    <h3 class="feature-card__title">Card Title</h3>
    <p class="feature-card__description">Card description text.</p>
    <a href="#" class="feature-card__link">Learn More</a>
  </div>
</article>
```

### Hero Sections

```html
<section class="hero hero--fullscreen">
  <div class="hero__background" style="background-image: url('hero.jpg');"></div>
  <div class="hero__content">
    <h1 class="hero__title">Hero Title</h1>
    <p class="hero__subtitle">Hero description</p>
    <div class="hero__actions">
      <a href="#" class="btn btn--primary btn--large">Primary CTA</a>
      <a href="#" class="btn btn--secondary btn--large">Secondary CTA</a>
    </div>
  </div>
</section>
```

## 🎨 Design Tokens

### Color Palette

```css
/* Primary Colors */
--color-primary-50: #f0f9ff;
--color-primary-500: #0ea5e9;
--color-primary-900: #0c4a6e;

/* Neutral Colors */
--color-neutral-50: #fafafa;
--color-neutral-500: #737373;
--color-neutral-900: #171717;

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
```

### Typography Scale

```css
/* Font Families */
--font-primary: 'Inter', system-ui, sans-serif;
--font-display: 'Playfair Display', Georgia, serif;

/* Font Sizes */
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
--font-size-2xl: 1.5rem;
--font-size-3xl: 1.875rem;
--font-size-4xl: 2.25rem;
```

### Spacing System

```css
/* 8pt Grid System */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

## 🚀 Performance Optimizations

### Critical Resource Loading

- **Font Preloading**: Critical fonts loaded with `rel="preload"`
- **CSS Architecture**: Modular CSS reduces render-blocking resources
- **JavaScript Modules**: Modern ES6 modules with proper dependency management

### Image Optimization

- **Lazy Loading**: Native `loading="lazy"` for non-critical images
- **Responsive Images**: Proper `srcset` and `sizes` attributes
- **WebP Support**: Modern image formats when supported

### Bundle Optimization

- **CSS Splitting**: Separate design system and component files
- **JavaScript Modules**: Modular architecture prevents monolithic bundles
- **Resource Hints**: Proper use of `preconnect` and `dns-prefetch`

## 🧪 Browser Support

### Minimum Requirements

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+

### Progressive Enhancement

The application is built with progressive enhancement principles:

- **Core Functionality**: Works without JavaScript
- **Enhanced Experience**: Full interactivity with JavaScript enabled
- **Modern Features**: Advanced features for modern browsers

## 📱 Mobile Optimization

### Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Touch Interactions

- **Touch Targets**: Minimum 44px tap targets
- **Gesture Support**: Swipe navigation where appropriate
- **Hover Alternatives**: Touch-friendly alternatives for hover states

## 🔒 Security Considerations

- **Content Security Policy**: Implement CSP headers in production
- **HTTPS Only**: Serve all resources over HTTPS
- **Resource Integrity**: Use SRI for external resources
- **Input Validation**: Sanitize all user inputs

## 📈 Analytics and Monitoring

### Performance Monitoring

```javascript
// Core Web Vitals tracking
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    // Track CLS, FID, LCP
  }
}).observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
```

### Error Tracking

```javascript
window.addEventListener('error', (event) => {
  // Send error data to monitoring service
});
```

## 🤝 Contributing

### Development Standards

1. **Code Style**: Follow established patterns in existing components
2. **Accessibility**: Ensure WCAG 2.1 AA compliance
3. **Performance**: Test impact on Core Web Vitals
4. **Documentation**: Update README for new features
5. **Testing**: Test across supported browsers and devices

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-component

# Make changes and commit
git add .
git commit -m "feat: add new component with accessibility support"

# Push and create pull request
git push origin feature/new-component
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern design systems and component libraries
- **Accessibility Guidelines**: WCAG 2.1 and WAI-ARIA specifications
- **Performance Best Practices**: Web.dev and Core Web Vitals guidelines
- **Typography**: Inter and Playfair Display font families

---

**Built with ❤️ and 7+ years of professional web development experience**

For support or questions, please contact the development team or open an issue in the repository.
