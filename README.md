<div align="center">
  <img src="./assets/images/icon.png" alt="Delivery Panda Logo" width="120"/>
  
  <h1>🐼 Delivery Panda</h1>
  
  <p><strong>The ultimate mobile application for efficient, high-performance delivery riders.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="MIT License" />
  </p>
</div>

---

## 📖 Overview

> 🚀 **Delivery Panda** streamlines the delivery ecosystem, empowering riders with real-time mapping, seamless order management, and intuitive communication channels—all tightly woven into a highly polished, responsive native mobile experience.

---

## ✨ Key Features

| Feature | Description | Icon |
|---------|-------------|:---:|
| **Live Mapping** | Real-time GPS tracking, navigation, and route optimization. | 🗺️ |
| **Order Management** | Accept, decline, and manage active, historical, and queued deliveries. | 📦 |
| **In-App Messaging** | Instant communication between riders, customers, and dispatch hubs. | 💬 |
| **Rider Statistics** | Granular insights into earnings, delivery times, and overall performance. | 📊 |
| **Admin Dashboard** | High-level overviews to manage riders, protocols, and active dispatches. | 👑 |
| **Offline Awareness** | Graceful handling of network drops using advanced caching & state strategies. | 📴 |

---

## 📸 UI Showcase

<div align="center">
  <table>
    <tr>
      <th align="center">📱 Mobile View - Active Order</th>
      <th align="center">📱 Mobile View - Statistics</th>
    </tr>
    <tr>
      <td align="center"><img src="https://via.placeholder.com/300x600.png?text=Mobile+Active+Order&bg=f5f5f5" width="250" alt="Mobile Active Order"></td>
      <td align="center"><img src="https://via.placeholder.com/300x600.png?text=Mobile+Statistics&bg=f5f5f5" width="250" alt="Mobile Statistics"></td>
    </tr>
    <tr>
      <th align="center">🖥️ Tablet View - Map Navigation</th>
      <th align="center">🖥️ Tablet View - Admin Panel</th>
    </tr>
    <tr>
      <td align="center"><img src="https://via.placeholder.com/400x300.png?text=Tablet+Map&bg=f5f5f5" width="350" alt="Tablet Map"></td>
      <td align="center"><img src="https://via.placeholder.com/400x300.png?text=Tablet+Admin&bg=f5f5f5" width="350" alt="Tablet Admin"></td>
    </tr>
  </table>
</div>

---

## 🛠️ Tech Stack & Architecture

Built entirely on a modern React Native frontend stack, ensuring smooth 60fps performance and rapid developer workflows:

*   ⚛️ **React Native + Expo** - Core cross-platform native SDK.
*   📘 **TypeScript** - Strict end-to-end type safety.
*   🌊 **NativeWind (Tailwind CSS)** - Utility-first, responsive atomic CSS styling adapted for Native.
*   🐻 **Zustand** - Fast, bare-bones, and unopinionated local state management.
*   🔄 **TanStack React Query** - Powerful asynchronous server-state and cache management.
*   🛣️ **Expo Router** - File-based navigation system for React Native.

### 📁 Core Structure

```text
delivery-panda/
├── app/                  # Expo Router layouts and screens/views
│   ├── (admin)/          # Admin-specific routes and management screens
│   ├── (auth)/           # Authentication flows (login, register, forgot-pwd)
│   ├── (drawer)/         # Main app drawer navigation & user settings
│   └── (rider)/          # Core rider flows (plans, orders, messaging)
├── components/           # Reusable UI components
│   ├── layout/           # Base layout wrappers, headers, menus
│   ├── order/            # Complex order cards & elements
│   └── ui/               # Primitives (Buttons, Spinners, Inputs)
├── store/                # Zustand global stores (e.g. authStore.ts)
└── mock/                 # Stubbed data for local development
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v18+)
*   npm or yarn
*   Expo Go app installed on your physical device, or an iOS / Android local emulator.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/delivery-panda.git
    cd delivery-panda
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or: yarn install
    ```

3.  **Set up environment variables:**
    ```bash
    cp .env.example .env
    ```
    Then edit `.env` and add your Google Maps API key:
    ```
    GOOGLE_MAPS_API_KEY=your_actual_api_key_here
    ```

4.  **Run the application:**
    ```bash
    npm start
    # or: npx expo start --clear
    ```

### ⚙️ Environment Variables

Create a `.env` file in the root directory if you need to connect to a live backend. *Currently using mock providers for local logic.*

| Variable | Description | Required | Example |
|----------|-------------|:---:|---------|
| `EXPO_PUBLIC_API_URL` | Base URL for the backend API | No | `https://api.deliverypanda.com` |
| `EXPO_PUBLIC_MAP_KEY` | Map Integration API Key (Mapbox/Google) | No | `sk_test_12345abcdef` |

---

## 🗺️ Roadmap & Progress

**Overall MVP Progress:** `[█████████░] 90%`

| Phase | Task | Status |
|-------|------|:---:|
| **Phase 1** | App Shell, Auth Flow, Expo Router Navigation Setup | ✅ |
| **Phase 2** | UI Component Base built with NativeWind | ✅ |
| **Phase 3** | Order Management, Rider Statistics, & Mapping integration | ✅ |
| **Phase 4** | State Management (Zustand) & Mock Data bindings | ✅ |
| **Phase 5** | Live Backend Integration & Push Notifications | ⏳ |

---

<div align="center">
  <p>Made with ❤️ by the Delivery Panda Team</p>
</div>