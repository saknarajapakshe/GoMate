# GoMate - Travel & Transport App Structure

## Overview
Complete mobile app UI for a Sri Lankan travel and transport application with 11 screens.

## Color Palette (Sri Lankan Flag Colors)
- **Primary (Blood Red)**: #8D153A
- **Secondary (Golden Yellow)**: #FDB913
- **Accent Green**: #00534E
- **Accent Orange**: #E57200

## Screen Flow

### 1. Splash Screen
- Auto-displays for 2 seconds
- Features app logo with gradient background
- Automatically transitions to Onboarding

### 2. Onboarding (3 Slides)
- Slide 1: Explore Public Transport
- Slide 2: Find Routes & Schedules
- Slide 3: Save Favorites & Plan Trips
- Can skip or navigate through slides
- Transitions to Login screen

### 3. Login Screen
- Email and password fields with validation
- Link to Register screen
- Hero illustration with Sri Lankan theme

### 4. Register Screen
- Name, Email, Password, Confirm Password fields
- Form validation
- Link back to Login screen

### 5. Home Screen (Main)
- Welcome header with username
- 3 tabs: Buses | Trains | Destinations
- Card list with images and tags (Active, Popular, Upcoming)
- Floating action button (yellow)
- Bottom navigation bar (Home, Search, Favourites, Profile)

### 6. Details Screen
- Large hero image
- Full route description
- Stop list / timetable (for buses & trains)
- Status badges
- Add to Favourites button

### 7. Favourites Screen
- Grid/list of saved items
- Remove favourite option
- Empty state with illustration
- Back to Home

### 8. Search Screen
- Search bar
- Filter chips (All, Popular, Nearby, Timetables)
- Quick search results list
- Map preview card
- Navigate to Map screen

### 9. Map Screen
- Full-screen map view (Google Maps style)
- Marker pins for stops and stations
- Zoom controls
- Location button
- Bottom sheet for selected place details
- Color-coded markers by type

### 10. Profile Screen
- User avatar and info
- Edit Profile button
- Dark Mode toggle
- Settings button
- Logout button
- Activity stats (Trips, Routes, Favorites)

### 11. Settings Screen
- Dark mode switch
- Notification preferences (All, Push, Email)
- Language selection (English, Sinhala, Tamil)
- About section (Terms, Privacy, Version)

## Design Features
- ✅ Rounded components (12px radius)
- ✅ Feather icons (lucide-react)
- ✅ Clean, minimal shadows
- ✅ Consistent spacing
- ✅ Responsive layout
- ✅ Mobile-first design (max-width: 28rem)
- ✅ Sri Lankan flag color palette throughout
- ✅ Smooth transitions and animations
- ✅ Form validation with error messages
- ✅ Empty states with illustrations

## Navigation Structure
```
Splash (auto) → Onboarding → Login/Register → Home
                                                 ├─ Details
                                                 ├─ Search → Map
                                                 ├─ Favourites → Details
                                                 └─ Profile → Settings
```

## Technologies
- React with TypeScript
- Tailwind CSS v4.0
- Lucide React (Feather icons)
- ShadCN UI components
- Custom Sri Lankan color theme