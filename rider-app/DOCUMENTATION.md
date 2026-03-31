# Project Documentation

## 1. What This Project Is

Delivery Panda is a mobile app for food delivery riders to manage orders, view messages, and track their status. It runs on iOS and Android via Expo and includes an admin dashboard for managing riders and orders. This is MVP v1 with mock data only.

## 2. Tech Stack

- expo - Framework
- expo-router - Navigation
- nativewind - Styling
- tailwindcss - CSS
- zustand - State
- react-native-maps - Maps
- expo-location - GPS
- typescript - Language
- @expo/vector-icons - Icons

## 3. Project Structure

```
rider-app/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   └── forgot-password.tsx
│   ├── (rider)/
│   │   ├── _layout.tsx
│   │   ├── delivery-orders.tsx
│   │   ├── message.tsx
│   │   ├── plan.tsx
│   │   └── statistics.tsx
│   ├── (drawer)/
│   │   ├── _layout.tsx
│   │   ├── personal.tsx
│   │   ├── my-activity.tsx
│   │   ├── account.tsx
│   │   └── settings.tsx
│   └── (admin)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── riders.tsx
│       └── orders.tsx
├── components/
│   ├── ui/
│   │   ├── index.ts
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Toast.tsx
│   │   └── LoadingSpinner.tsx
│   ├── layout/
│   │   ├── index.ts
│   │   ├── DarkHeader.tsx
│   │   ├── OrderTabBar.tsx
│   │   ├── DrawerMenu.tsx
│   │   └── FloatingChatButton.tsx
│   ├── order/
│   │   ├── index.ts
│   │   └── OrderCard.tsx
│   └── home/
│       ├── index.ts
│       ├── OfflineView.tsx
│       └── OfflineView.web.tsx
├── store/
│   └── authStore.ts
├── mock/
│   ├── orders.ts
│   ├── messages.ts
│   └── rider.ts
├── constants/
│   └── colors.ts
├── package.json
├── app.json
├── tsconfig.json
└── tailwind.config.js
```

## 4. Navigation & Routing

The app uses Expo Router with file-based routing and an auth guard in the root layout. Unauthenticated users see the auth group screens. After login, riders are sent to the bottom tab navigator with four tabs: Delivery Orders, Message, Plan, and Statistics. Admins are redirected to the admin stack instead. The side drawer is accessible via the hamburger menu and contains Personal, My Activity, Account, and Settings screens.

## 5. Screens

**app/_layout.tsx**
The root layout that wraps all screens with an auth guard and handles role-based navigation.

**app/index.tsx**
A redirect screen that sends users to auth, rider, or admin routes based on authentication state.

**app/(auth)/_layout.tsx**
The stack navigator layout for authentication screens with no headers.

**app/(auth)/index.tsx**
The welcome screen showing the app logo and a single Login button.

**app/(auth)/login.tsx**
The login screen with a hardcoded UK dial code, phone input, password field, and forgot password link.

**app/(auth)/forgot-password.tsx**
The password reset screen with phone, verification code, and new password fields.

**app/(rider)/_layout.tsx**
The bottom tab navigator for riders with four tabs and a floating chat button, plus the New Terms modal.

**app/(rider)/delivery-orders.tsx**
The main screen showing a map when offline, an empty state when online with no orders, or a list of order cards.

**app/(rider)/message.tsx**
The message center with shortcut icons, help center link, and a scrollable chat list.

**app/(rider)/plan.tsx**
A placeholder screen indicating the schedule feature is coming in v2.

**app/(rider)/statistics.tsx**
A placeholder screen indicating the statistics feature is coming in v2.

**app/(drawer)/_layout.tsx**
The stack navigator layout for drawer screens with no headers.

**app/(drawer)/personal.tsx**
The rider profile screen showing avatar, name, vehicle type, certifications, and account details.

**app/(drawer)/my-activity.tsx**
A placeholder screen for rider activities and rewards.

**app/(drawer)/account.tsx**
A placeholder screen for payment methods and bank details.

**app/(drawer)/settings.tsx**
The settings screen with toggles, volume slider, selectors, and a logout button.

**app/(admin)/_layout.tsx**
The protected admin layout that redirects non-admin users away.

**app/(admin)/index.tsx**
The admin dashboard showing stat cards for online riders, active deliveries, and orders today.

**app/(admin)/riders.tsx**
The rider management screen with an expandable list showing rider details, offload, and deactivate buttons.

**app/(admin)/orders.tsx**
The order management screen with filter tabs and a table of orders with reassign functionality.

## 6. Components

**components/ui/index.ts**
The barrel export file for all UI components.

**components/ui/Button.tsx**
A full-width button supporting primary, outlined, and text variants with loading state.

**components/ui/Input.tsx**
A text input with optional label, error state, clear button, password toggle, and slot areas.

**components/ui/Toast.tsx**
An animated dark pill notification that appears at the bottom and auto-dismisses.

**components/ui/LoadingSpinner.tsx**
A full-screen overlay with a centered spinner and optional message.

**components/layout/index.ts**
The barrel export file for all layout components.

**components/layout/DarkHeader.tsx**
The black header bar with hamburger menu, online/offline status toggle, and configurable right icons.

**components/layout/OrderTabBar.tsx**
The three-tab switcher for New Order, Pick Up, and Delivering states.

**components/layout/DrawerMenu.tsx**
The side drawer content showing rider info, promotion banner, and navigation menu items.

**components/layout/FloatingChatButton.tsx**
A fixed black circular button with three dots that appears on all rider screens.

**components/order/index.ts**
The barrel export file for order components.

**components/order/OrderCard.tsx**
A white card displaying order details, incentive badges, and an animated grab button.

**components/home/index.ts**
The barrel export file for home components with platform-specific resolution.

**components/home/OfflineView.tsx**
The native offline screen showing a map with the rider's GPS location and a Go Online button.

**components/home/OfflineView.web.tsx**
The web fallback showing a placeholder message instead of the map.

## 7. State Management

The app uses a single Zustand store called authStore that holds authentication state, user role, online status, and a flag for whether the user has seen the new terms modal. Components read from the store using the useAuthStore hook and call actions like login, logout, setIsOnline, and setHasSeenNewTerms to update state.

## 8. Mock Data

**mock/orders.ts**
Contains sample delivery orders for the New Order, Pick Up, and Delivering tabs on the delivery orders screen.

**mock/messages.ts**
Contains sample chat messages and a notice count badge for the message center screen.

**mock/rider.ts**
Contains the rider profile data, app settings defaults, and app version string used across drawer screens.

## 9. Constants

**constants/colors.ts**
Defines all color tokens used throughout the app including primary yellow, header black, status colors, and UI element colors.

## 10. Configuration Files

**package.json**
Defines the project dependencies, scripts, and metadata for the Expo app.

**app.json**
Configures the Expo app name, icons, splash screen, and platform-specific settings.

**tsconfig.json**
Sets up TypeScript with strict mode and path aliases for clean imports.

**tailwind.config.js**
Extends Tailwind with the NativeWind preset and custom color definitions matching the design system.

## 11. Role-Based Access

The app supports two roles stored in the Zustand auth store: rider and admin. When a user logs in, their role determines which routes they can access. Riders see the bottom tab navigator and drawer screens. Admins see the admin dashboard, rider management, and order management screens. The admin layout includes an additional protection check that redirects non-admin users.

## 12. Excluded Features

- Language selector
- Register as a Rider
- Country selection on login
- Heatmap map view
- Earnings display on order cards
- Map Notes drawer screen
- Order History drawer screen
- Protocol management drawer screen

## 13. What Is Not Built Yet

- Real API integration
- Live GPS tracking
- Push notifications
- Socket-based real-time updates
- Plan screen content
- Statistics screen content
- Chat functionality behind the floating button
