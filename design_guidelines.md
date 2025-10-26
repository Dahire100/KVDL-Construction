# KVDL Construction - Comprehensive Design Guidelines

## Design Approach
**Reference-Based Approach** drawing inspiration from Airbnb's visual storytelling, Notion's clean admin interfaces, and modern architecture portfolios. This construction company requires professional credibility combined with visual impact to showcase 20+ years of expertise.

## Typography System

**Font Families:**
- Primary: Inter (headings, UI elements, navigation)
- Secondary: Georgia (body text, descriptions for warmth and readability)

**Hierarchy:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold, tracking-tight
- Section Headlines: text-3xl md:text-4xl lg:text-5xl, font-bold
- Subsection Titles: text-2xl md:text-3xl, font-semibold
- Card Titles: text-xl md:text-2xl, font-semibold
- Body Large: text-lg, font-normal, leading-relaxed
- Body Regular: text-base, font-normal, leading-relaxed
- Body Small: text-sm, leading-normal
- Captions: text-xs, uppercase, tracking-wide, font-medium

## Layout System

**Spacing Primitives:**
Core spacing units: 2, 4, 8, 12, 16, 20, 24 (Tailwind units)
- Micro spacing (within components): p-2, gap-2, space-y-2
- Standard spacing (between elements): p-4, gap-4, m-4, space-y-4
- Section padding (desktop): py-20 to py-32
- Section padding (mobile): py-12 to py-16
- Container spacing: px-4 md:px-8 lg:px-12

**Grid System:**
- Homepage features: grid-cols-1 md:grid-cols-3, gap-8
- Project cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6
- Gallery: grid-cols-2 md:grid-cols-3 lg:grid-cols-4, gap-4
- Admin dashboard stats: grid-cols-1 md:grid-cols-2 lg:grid-cols-4, gap-4
- Contact page: grid-cols-1 lg:grid-cols-2, gap-12

**Container Max-widths:**
- Full sections: w-full with max-w-7xl mx-auto
- Content sections: max-w-6xl mx-auto
- Text content: max-w-4xl mx-auto
- Forms: max-w-2xl mx-auto

## Component Library

### Public Site Components

**Navigation:**
- Fixed header with backdrop-blur effect on scroll
- Logo left, navigation center, CTA button right
- Hamburger menu for mobile (slide-in drawer)
- Navigation links: text-base, font-medium, tracking-wide
- Mobile: Full-height drawer with large touch targets (min-h-12)

**Hero Section (Homepage):**
- Full viewport height (min-h-screen) with large hero image
- Overlay gradient for text readability
- Centered content with tagline "Building Dreams, Creating Infrastructure"
- Primary CTA: "Get Free Project Estimate" with blurred background, px-8 py-4, text-lg, font-semibold, rounded-lg
- Secondary CTA below with subtle styling
- Scroll indicator at bottom

**Service Highlights (Homepage):**
- Three-column grid on desktop, stacked on mobile
- Icon-title-description cards with subtle borders
- Icons: 64px, from Heroicons outline set
- Card padding: p-8, rounded-xl
- Hover: subtle lift effect (transform translate-y-1)

**Stats Section (Homepage):**
- Four-column grid showcasing: 20+ Years, Projects Completed, Certifications, Client Satisfaction
- Large numbers: text-4xl md:text-5xl, font-bold
- Labels below: text-sm, uppercase, tracking-wider

**Projects Grid:**
- Masonry-style layout with varied card heights
- Project card structure: Image (aspect-video), Title, Location, Status Badge, Progress Bar
- Status badges: px-3 py-1, rounded-full, text-xs, font-semibold, uppercase
- Progress bar: h-2, rounded-full, relative positioning for fill
- Card padding: p-6, rounded-2xl, border

**Project Detail Page:**
- Hero image with overlay containing: Title, Location, Status, Progress
- Two-column layout: Left (image gallery 60%), Right (details 40%)
- Image gallery: Main image + thumbnail strip below
- Details section: Description, Timeline, Location Map, CTA buttons
- Consultation request form: modal overlay with backdrop blur

**Gallery Page:**
- Justified grid layout (no gaps between images)
- Lightbox with navigation arrows, close button, caption overlay
- Filter tags above grid: px-4 py-2, rounded-full, text-sm

**Contact Page:**
- Split layout: Form (left 50%), Map + Info (right 50%)
- Form fields: Full-width inputs, rounded-lg, p-4, border, focus states
- Field spacing: space-y-6
- Map: Embedded Google Maps, min-h-96, rounded-xl
- Contact info cards: p-6, rounded-xl, border, space-y-2
- Emergency contact badge: prominent styling, larger text

**Footer:**
- Four-column layout on desktop: About, Quick Links, Projects, Contact
- Social media icons: 40px touch targets, gap-4
- Newsletter signup: inline form with input + button
- Bottom bar: Copyright, Privacy Policy, Terms links
- Padding: pt-16 pb-8

### Admin Dashboard Components

**Dashboard Layout:**
- Sidebar navigation (fixed, w-64): Logo top, nav items with icons, logout bottom
- Main content area: p-8, overflow-y-auto
- Top bar: Breadcrumbs, search, admin profile dropdown

**Stats Cards:**
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Card structure: p-6, rounded-xl, border
- Icon (48px), Value (text-3xl, font-bold), Label (text-sm), Change indicator

**Quick Actions:**
- Button grid: grid-cols-1 md:grid-cols-3, gap-4
- Large buttons: p-6, rounded-xl, min-h-32, icon + label vertically centered

**Data Tables:**
- Striped rows for readability
- Column headers: py-3, px-6, text-xs, uppercase, font-semibold
- Data cells: py-4, px-6, text-sm
- Action buttons: icon buttons, 40px square, rounded-lg
- Pagination: centered, gap-2, buttons with min-w-10

**Forms (Admin):**
- Label-input pairs: space-y-2
- Input styling: w-full, p-3, rounded-lg, border
- Section grouping: p-6, rounded-xl, border, space-y-6
- File upload: Dashed border, p-8, rounded-xl, drag-and-drop area
- Submit buttons: Right-aligned, px-6 py-3

**WYSIWYG Editor:**
- Toolbar: fixed top, p-2, border-b, button group with gap-1
- Editor area: min-h-96, p-6, border
- Preview toggle: tab interface

**Modals:**
- Backdrop: fixed inset-0, backdrop-blur
- Modal container: max-w-2xl, mx-auto, my-8, rounded-2xl, p-8
- Header: border-b, pb-4, mb-6
- Actions: flex justify-end, gap-3, pt-6

## Images

**Hero Image (Homepage):**
Large, high-quality construction site or completed building image. Should convey scale, professionalism, and craftsmanship. Suggested: Crane silhouette at sunset, modern building under construction, or completed infrastructure project. Dimensions: minimum 1920x1080, aspect-16/9.

**Project Images:**
Professional photography of completed work and construction progress. Each project should have 4-8 images minimum. Aspect ratio: 16/9 for consistency.

**About Page:**
Team photo (optional), certification badges, company building exterior. Awards and achievements displayed as image badges.

**Gallery:**
Varied aspect ratios allowed (maintain authenticity), but primarily landscape orientation for construction work.

## Animations

**Conservative Approach - Use Sparingly:**
- Page transitions: Simple fade-in on route changes (200ms)
- Card hovers: Subtle lift (transform translateY(-4px), 200ms ease)
- Button interactions: Native browser states only
- Image loading: Blur-up placeholder technique
- NO scroll-triggered animations
- NO parallax effects
- NO complex page transitions

## Accessibility Standards

- All interactive elements: min-h-12 or min-w-12 for touch targets
- Form inputs: Labels always visible, placeholder as secondary hint
- Focus states: 2px offset ring on all interactive elements
- Semantic HTML throughout
- Alt text for all images
- ARIA labels for icon-only buttons
- Keyboard navigation support for modals, dropdowns, galleries

## Responsive Breakpoints

- Mobile: base (< 768px)
- Tablet: md (768px - 1024px)
- Desktop: lg (1024px+)
- Wide: xl (1280px+)