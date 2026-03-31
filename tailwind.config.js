/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#F9BE00',
        'header-bg': '#1A1A1A',
        'screen-bg': '#F2F2F2',
        'card-bg': '#FFFFFF',
        'input-bg': '#F0F0F0',
        'text-primary': '#1A1A1A',
        'text-secondary': '#888888',
        'text-muted': '#AAAAAA',
        'status-online': '#4CAF50',
        'status-offline': '#F44336',
        'incentive': '#00BFA5',
        'error': '#F44336',
        'error-bg': '#FFEBEE',
        'toast-bg': '#333333',
        'floating-btn': '#1A1A1A',
        'badge-red': '#F44336',
        'certified': '#4CAF50',
        'help-center-bg': '#FFFDE7',
      },
    },
  },
  plugins: [],
};
