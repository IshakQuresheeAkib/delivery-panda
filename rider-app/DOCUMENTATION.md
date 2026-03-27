# 🛵 Delivery Panda — Project Documentation

## What Was Built

A complete React Native Expo application for food delivery riders, featuring:

### ✅ Project Structure
- TypeScript throughout
- Expo Router file-based navigation
- NativeWind + Tailwind CSS for styling
- Zustand for state management
- Mock data layer (no API calls)

### ✅ Route Groups Implemented

#### (auth) - Authentication Flow
- `index.tsx` - Welcome screen with language selector
- `login.tsx` - Login with phone/password and toast errors
- `register.tsx` - Registration with validation and checkboxes
- `forgot-password.tsx` - Password reset with verification code

#### (rider) - Main Rider Experience  
- `delivery-orders.tsx` - Three states: Offline (map view), Online empty, Online with orders
- `message.tsx` - Message center with chat list and shortcuts
- `plan.tsx` - Placeholder for schedule (v2)
- `statistics.tsx` - Placeholder for earnings charts (v2)

#### (drawer) - Side Menu Screens
- `personal.tsx` - Profile with certification status
- `settings.tsx` - All toggles, volume slider, logout
- `my-activity.tsx`, `map-notes.tsx`, `account.tsx`, `order-history.tsx`, `protocol.tsx`

#### (admin) - Admin Dashboard
- Placeholder screen for admin role (accessible by setting role='admin' in Zustand)

### ✅ Reusable Components

| Component | Purpose |
|-----------|---------|
| `LoadingSpinner` | Full-screen overlay with ActivityIndicator |
| `Toast` | Dark pill toast, bottom-center, auto-dismiss |
| `Button` | Primary (yellow) and outlined variants |
| `Input` | Grey background with password toggle, clear button |
| `CountryPicker` | Bottom sheet country selector |
| `DarkHeader` | Black header with hamburger, status toggle, action icons |
| `OrderTabBar` | New Order / Pick Up / Delivering switcher |
| `OrderCard` | Order details with animated grab button |
| `FloatingChatButton` | Persistent black circle '...' button |
| `OfflineView` | Map placeholder with "Go Online" button |
| `DrawerMenu` | Side drawer with rider info and menu items |

### ✅ Design System Applied

Based on reference images:
- Primary Yellow: `#F9BE00`
- Dark Header: `#1A1A1A`
- Screen Background: `#F2F2F2`
- Online/Offline status indicators
- Incentive badges (teal and red variants)
- Consistent typography and spacing

## Why These Decisions

1. **NativeWind over StyleSheet** - Rapid UI development with Tailwind classes
2. **Zustand over Context** - Simpler API, better TypeScript support, persist middleware ready
3. **File-based routing** - Intuitive navigation matching folder structure
4. **Mock data files** - Easy to replace with API calls in v2
5. **Component separation** - UI components are generic; layout components are app-specific

## Expo Go Connection Guide

### Prerequisites
1. Install Expo Go on your mobile device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Setup Steps

1. **Install dependencies:**
   ```bash
   cd rider-app
   npm install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Connect your device:**
   - **Same WiFi Network:** Scan the QR code shown in terminal
   - **iOS:** Use Camera app to scan QR → opens Expo Go
   - **Android:** Open Expo Go app → Scan QR code

4. **Alternative connection (if QR doesn't work):**
   ```bash
   npx expo start --tunnel
   ```
   This creates a tunnel URL that works across networks.

### Troubleshooting

| Issue | Solution |
|-------|----------|
| QR code not scanning | Use `--tunnel` mode |
| Metro bundler stuck | Delete `.expo` folder, restart |
| Module not found | Run `npm install` again |
| Slow reload | Check you're on same WiFi |

## File Structure Summary

```
rider-app/
├── app/
│   ├── (auth)/          # 4 screens
│   ├── (rider)/         # 4 screens + tab layout
│   ├── (drawer)/        # 7 screens
│   ├── (admin)/         # 1 screen + layout
│   ├── _layout.tsx      # Root with auth guard
│   └── index.tsx        # Entry redirectrmdir /s /q node_modules
del package-lock.json
npm install
npx expo startrmdir /s /q node_modules
del package-lock.json
npm install
npx expo startrmdir /s /q node_modules
del package-lock.json
npm install
npx expo start
├── components/
│   ├── ui/              # 5 components
│   ├── layout/          # 4 components
│   ├── order/           # 1 component
│   └── home/            # 1 component
├── mock/                # 3 data files
├── store/               # Zustand auth store
├── constants/           # Colors + countries
└── config files         # package.json, tsconfig, tailwind, etc.
```

## Next Steps (v2 Roadmap)

- [ ] Backend API integration
- [ ] Real-time GPS tracking
- [ ] Socket.IO for live orders
- [ ] Push notifications
- [ ] Complete Plan and Statistics screens
- [ ] Admin dashboard with metrics
