# Planning Guide

A personalized discovery app for first-time visitors to Sevilla, helping travelers explore the city's most iconic sites with curated information and visit tracking.

**Experience Qualities**:
1. **Inviting** - Warm Mediterranean aesthetic that evokes the spirit and energy of Sevilla, encouraging exploration
2. **Informative** - Clear, scannable information that helps make quick decisions about what to visit next
3. **Personal** - Tracking visited locations creates a sense of journey and accomplishment throughout the trip

**Complexity Level**: Light Application (multiple features with basic state)
This app combines content showcase with interactive state management for visit tracking, making it more than a simple content display but not requiring advanced functionality like accounts or complex data flows.

## Essential Features

### Site Discovery Grid/List
- **Functionality**: Display curated list of Sevilla's must-visit sites with rich metadata (visit duration, crowd levels, ratings, popularity tier, must-see status)
- **Purpose**: Help travelers make informed decisions about where to go based on available time, preferences, and crowd tolerance
- **Trigger**: Default view on app load
- **Progression**: App loads → Sites display in grid/card layout → User scans metadata → Decides which site to visit
- **Success criteria**: All sites visible with clear metadata hierarchy; users can quickly distinguish between must-see vs optional sites

### Visit Tracking
- **Functionality**: Toggle visited/unvisited status for each site with visual distinction
- **Purpose**: Track progress through Sevilla's attractions and maintain a personal record of the trip
- **Trigger**: User clicks/taps checkbox or button on site card
- **Progression**: User visits site → Opens app → Marks as visited → Visual state changes (badge, checkmark, or card styling updates) → State persists across sessions
- **Success criteria**: Visit status persists on reload; clear visual distinction between visited and unvisited sites; satisfying interaction feedback

### Site Detail Information
- **Functionality**: Each card displays essential planning information in a scannable format
- **Purpose**: Quick decision-making without overwhelming detail
- **Trigger**: Information visible on card itself
- **Progression**: User scans card → Reads time estimate → Checks crowd level → Views rating → Makes decision
- **Success criteria**: Metadata is immediately readable; icons and labels are intuitive; hierarchy guides eye to most important info first

## Edge Case Handling

- **No visited sites yet**: Welcome state shows all sites as opportunities to explore with encouraging messaging
- **All sites visited**: Celebration state or encouraging message to revisit favorites or explore more
- **Long site names**: Text truncation with proper ellipsis handling to maintain card layout integrity
- **Mobile viewport**: Grid adapts from multi-column to single column; touch targets remain generous

## Design Direction

The design should feel professional, trustworthy, and clean - reflecting AXA's corporate brand guidelines with a blue and white color scheme. The interface should maintain elegance and minimalism, letting the site imagery and information breathe, while conveying reliability and professionalism appropriate for a corporate event. The design balances AXA's brand identity with the context of discovering Sevilla, providing a sophisticated experience for summit attendees.

## Color Selection

**AXA Brand Colors**: Professional blue and white palette that conveys trustworthiness, reliability, and a clean, minimalist aesthetic suitable for a corporate event.

- **Primary Color**: AXA Professional Blue `oklch(0.45 0.15 250)` - Conveys professionalism, trust, and corporate identity alignment with AXA brand guidelines
- **Secondary Colors**: 
  - Clean White with subtle blue tint `oklch(0.98 0.005 240)` for backgrounds - professional, clean foundation
  - Light Blue-Gray `oklch(0.92 0.02 240)` for secondary elements - maintains visual hierarchy
- **Accent Color**: Bright Blue `oklch(0.55 0.18 240)` for CTAs and interactive elements - maintains brand consistency while providing visual interest
- **Foreground/Background Pairings**:
  - Background (Clean White): Deep Blue-Gray `oklch(0.25 0.02 240)` - High contrast for readability ✓
  - Card (Pure White): Deep Blue-Gray `oklch(0.25 0.02 240)` - Excellent contrast ✓
  - Primary (AXA Blue): White `oklch(1 0 0)` - Strong contrast for interactive elements ✓
  - Secondary (Light Blue-Gray): Deep Blue-Gray `oklch(0.25 0.02 240)` - Accessible contrast ✓
  - Accent (Bright Blue): White `oklch(1 0 0)` - Clear, accessible contrast ✓
  - Muted (Very Light Blue-Gray): Medium Gray `oklch(0.50 0.02 240)` - Adequate contrast ✓

## Font Selection

Typography should feel sophisticated yet accessible - Playfair Display for headers captures Spanish elegance and historical gravitas, while Inter provides modern clarity for metadata and body content.

- **Typographic Hierarchy**:
  - H1 (App Title): Playfair Display Bold/36px/tight tracking - establishes elegance
  - H2 (Site Names): Inter SemiBold/18px/normal tracking - scannable and clear
  - Body (Metadata): Inter Regular/14px/relaxed spacing - readable at a glance
  - Caption (Labels): Inter Medium/12px/uppercase/wide tracking - distinct metadata categories

## Animations

Subtle and purposeful, with gentle transitions that feel relaxed like a Spanish afternoon - nothing rushed or jarring. Interactions should feel satisfying but never delay the user.

- **Purposeful Meaning**: Smooth card hover lifts suggest interactivity; check animations provide satisfying feedback for marking sites visited; state changes feel organic rather than abrupt
- **Hierarchy of Movement**: Visit toggles receive the most animation attention (celebration-worthy); card hovers are subtle lifts; initial page load uses gentle fade-in for cards with stagger for visual interest

## Component Selection

- **Components**:
  - **Card**: Primary container for each site with hover states and subtle shadow lift
  - **Badge**: For must-see indicators, popularity tiers, and crowd levels with color coding
  - **Checkbox**: Visit tracking toggle with custom styling to match theme
  - **Avatar/AspectRatio**: Site imagery displayed consistently across cards
  - **Separator**: Subtle dividers between metadata sections
  - **Progress**: Optional progress indicator showing visited/total sites
  
- **Customizations**:
  - Custom gradient overlays on site images for better text contrast
  - Badge color variants for different metadata types (red for high crowds, gold for must-see, blue for ratings)
  - Card component enhanced with visited state styling (opacity reduction or checkmark overlay)
  
- **States**:
  - Cards: default, hover (subtle lift + shadow), visited (semi-transparent or marked)
  - Checkbox: unchecked, checked (with satisfying animation), hover
  - Badges: static but color-coded by type for instant recognition
  
- **Icon Selection**:
  - Clock (for visit duration)
  - Users/UsersFour (for crowd levels)
  - Star (for ratings)
  - Fire (for popularity)
  - Eye/Sparkle (for must-see status)
  - Check/CheckCircle (for visited status)
  
- **Spacing**: 
  - Page padding: p-6 md:p-8
  - Card grid gap: gap-6
  - Card internal padding: p-4
  - Metadata item spacing: gap-3
  - Section margins: mb-8
  
- **Mobile**: 
  - Grid: Single column on mobile (grid-cols-1), 2 columns on tablet (md:grid-cols-2), 3 columns on desktop (lg:grid-cols-3)
  - Touch targets: Minimum 44px for checkboxes and interactive elements
  - Text scales down slightly on mobile while maintaining readability
  - Header becomes more compact with reduced title size
