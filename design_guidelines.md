# Smart Student Pick-Up App - Design Guidelines for DPS Dubai

## Authentication & User Management

**Authentication Required**: This app handles parent accounts, student safety, and school coordination.

- **Primary Auth Method**: Email/password with phone verification (Dubai parents expect traditional school registration)
- **Secondary Auth**: Apple Sign-In for iOS, Google Sign-In for Android
- **Onboarding Flow**:
  1. Welcome screen with DPS Dubai branding
  2. Parent profile setup (name, phone, email)
  3. Student information (name, grade, section)
  4. Vehicle assignment (School Bus 1, School Bus 2, or Private Vehicle)
  5. Emergency contact details
  6. QR code generation for student check-in
- **Profile Management**:
  - Parent profile with avatar (professional icons: briefcase, book, shield representing parent role)
  - Student profiles (up to 3 children per account)
  - Vehicle information clearly labeled as "School Bus #" not generic car models
  - Emergency contacts with quick-call buttons
  - Privacy-focused: no data sharing without explicit consent

## Navigation Architecture

**Root Navigation**: Tab Bar (4 tabs + Floating Action Button)

Tab structure:
1. **Home** (Dashboard) - Real-time overview
2. **Map** - Live Google Maps traffic view
3. **FAB Center** - Quick Pick-Up Request (floating button with safety-orange color)
4. **Schedule** - Pick-up times and calendar
5. **Profile** - Account and settings

**Additional Navigation**:
- Native modals for: QR scanner, notifications, traffic alerts
- Stack navigation within Map tab for route details
- Drawer not used (parents need quick access during busy school hours)

## Screen Specifications

### 1. Dashboard (Home Tab)
**Purpose**: At-a-glance view of pick-up status, traffic, and alerts

**Layout**:
- **Header**: Custom transparent header
  - Left: School logo/app icon
  - Center: "Good Morning, [Parent Name]"
  - Right: Notification bell with badge count
- **Main Content**: ScrollView with SafeAreaView
  - Top inset: headerHeight + Spacing.xl
  - Bottom inset: tabBarHeight + Spacing.xl

**Components**:
- Weather card (collapsible, Dubai real-time weather affecting traffic)
- School bus status cards (NOT "Toyota Camry" - use "School Bus 1", "School Bus 2")
  - Live bus location dot indicator (green = on route, yellow = delayed, red = stopped)
  - ETA countdown to pick-up point
- Traffic signal countdown (time until green/red at school roundabout)
- Quick action buttons: "Request Pick-Up", "View Live Map", "Contact Driver"
- Traffic congestion banner (dynamic: "Low/Medium/High Congestion" based on REAL Google Maps data)

### 2. Live Map Screen (Map Tab)
**Purpose**: Real-time traffic visualization centered on DPS Dubai

**Layout**:
- **Header**: Minimal transparent overlay
  - Right: Layer toggle (traffic/satellite/default)
- **Main Content**: Full-screen Google Maps component
  - Center coordinates: 25.039583, 55.121944 (DPS Dubai exact location)
  - Zoom level: 15 (shows Gardens area roundabout clearly)
  - No safe area padding (map fills screen)

**Map Elements**:
- User's live GPS location (blue pulsing dot)
- School buses (custom orange bus icons with numbers)
- DPS Dubai marker (custom school building icon)
- Traffic layer enabled by default (shows real congestion)
- Pedestrian crossings (zebra-stripe icons with countdown timers)
- Suggested routes (color-coded by traffic: green = clear, yellow = moderate, red = heavy)

**Floating Elements**:
- Bottom sheet (draggable):
  - Traffic summary for Gardens area
  - Merge warnings ("Irregular merge ahead - reduce speed")
  - Weather impact alert
  - Insets: bottom: tabBarHeight + Spacing.xl, horizontal: Spacing.lg

### 3. Pick-Up Request (FAB Modal)
**Purpose**: Quick coordination for immediate pick-up

**Layout**:
- **Header**: Modal header with close button
  - Title: "Request Pick-Up"
- **Main Content**: Form (non-scrollable, fits in viewport)
  - Submit button in header (top-right "Send")
  - Cancel via close button or swipe down

**Form Fields**:
- Student selector (dropdown showing enrolled children)
- Pick-up time (time picker with 15-min intervals)
- Location selector (School Gate 1, Gate 2, or Custom)
- Special instructions (optional text area)
- Submit triggers push notification to assigned bus/driver

### 4. Schedule Screen
**Purpose**: View and manage pick-up calendar

**Layout**:
- **Header**: Default navigation header
  - Title: "Pick-Up Schedule"
  - Right: "+ Add" button
- **Main Content**: ScrollView list
  - Top inset: Spacing.xl (non-transparent header)
  - Bottom inset: tabBarHeight + Spacing.xl

**Components**:
- Weekly calendar view (horizontal scroll)
- Recurring pick-up cards (Morning 7:30 AM, Afternoon 2:45 PM)
- One-time pick-up requests (highlighted differently)
- Cancel/Edit actions (swipe gesture on cards)

### 5. Profile Screen
**Purpose**: Account management and app settings

**Layout**:
- **Header**: Custom header
  - Avatar (large, centered)
  - Parent name below
- **Main Content**: ScrollView form
  - Top inset: Spacing.xl
  - Bottom inset: tabBarHeight + Spacing.xl

**Sections**:
- My Children (cards with photos, grade, section)
- Vehicle Assignment (clearly shows "School Bus 3" not car model)
- Emergency Contacts (quick-dial cards)
- Notifications Settings
- Language (English/Arabic toggle)
- Account Actions: Log Out, Delete Account (nested under Settings > Account > Delete)

### 6. Notifications Screen (Modal)
**Purpose**: View traffic alerts, bus updates, and school announcements

**Layout**:
- **Header**: Modal with title "Notifications"
- **Main Content**: FlatList
  - Categorized: Urgent (red), Traffic (amber), Updates (blue)
  - Tap to view details, swipe to dismiss

## Design System

### Color Palette
**Primary**: Safety Orange (#FF6B35) - Pick-up actions, urgency, school buses
**Secondary**: Deep Blue (#1E3A8A) - DPS Dubai school colors, trust, stability
**Accent**: Emerald Green (#10B981) - On-time status, clear routes
**Warnings**: Amber (#F59E0B) - Traffic delays, moderate alerts
**Critical**: Red (#EF4444) - High congestion, emergencies
**Neutral**: Gray scale (#F9FAFB to #111827)
**Background**: White (#FFFFFF) with light gray sections (#F3F4F6)

### Typography
- **Headers**: SF Pro Display (iOS) / Roboto (Android), Bold, 24-28pt
- **Body**: SF Pro Text (iOS) / Roboto (Android), Regular, 16pt
- **Captions**: SF Pro Text (iOS) / Roboto (Android), Medium, 14pt
- **Numbers** (ETA, countdowns): Tabular figures, 20pt Bold

### Visual Design
- **Icons**: Feather icons for navigation, standard system icons for common actions
- **Bus Icons**: Custom numbered bus icons (orange silhouettes with white numbers)
- **Map Markers**: Custom school building icon, pedestrian crossing icons
- **Weather Icons**: Animated Lottie icons for weather conditions
- **NO EMOJIS**: Use professional iconography only

### Interaction Design
- **Touchable Feedback**: All buttons show subtle scale down (0.95) on press
- **Floating Action Button**: 
  - Size: 64x64pt
  - Shadow: shadowOffset {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2
  - Color: Safety Orange with white icon
- **Cards**: No drop shadow for regular cards, use border (1px, #E5E7EB)
- **Traffic Alerts**: Slide in from top with haptic feedback
- **Pull to Refresh**: Enabled on Dashboard and Map screens

### Accessibility
- **Minimum Touch Targets**: 44x44pt (HIG compliant)
- **Color Contrast**: WCAG AA compliant (4.5:1 for text)
- **VoiceOver**: All interactive elements labeled (critical for driving safety)
- **Large Text Support**: Dynamic type scaling up to 200%
- **Bilingual**: Full RTL support for Arabic (Dubai requirement)
- **Emergency Mode**: High-contrast mode with larger fonts for urgent situations

### Critical Assets
1. **DPS Dubai School Logo**: Official school branding
2. **Numbered Bus Icons**: School Bus 1-10 (orange buses with white numbers)
3. **Custom Map Markers**: School building, pick-up zones, pedestrian crossings
4. **Parent Avatar Presets**: Professional icons representing parental roles (6 options)
5. **Weather Condition Icons**: Sun, cloud, sandstorm (Dubai-specific)
6. **Traffic Signal Icons**: Countdown timer graphics (green/yellow/red)

### Push Notifications
- **Bus Arrival**: "School Bus 3 arriving in 5 minutes"
- **Traffic Alerts**: "Heavy congestion on Al Wasl Road - expect 10 min delay"
- **Weather Warnings**: "Sandstorm alert - reduced visibility near school"
- **Signal Timing**: "Traffic light turning green in 30 seconds"
- All notifications include quick actions (View Map, Contact Driver)

### Platform-Specific Notes
- **iOS**: Use native map component with Apple Maps fallback
- **Android**: Google Maps native integration (required for Traffic Layer)
- **Location Permissions**: Request "Always Allow" for background bus tracking
- **Background Location**: Show blue pill indicator on iOS when tracking active