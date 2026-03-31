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
        'primary-dark': '#E0AA00', // Added for pressed states
        'header-bg': '#1A1A1A',
        'screen-bg': '#F9FAFB', // Lightened slightly for better contrast with cards
        'card-bg': '#FFFFFF',
        'input-bg': '#F3F4F6', // Modern softer input background
        'text-primary': '#111827', // Darker for readability
        'text-secondary': '#4B5563', // High enough contrast against white
        'text-muted': '#9CA3AF',
        'status-online': '#10B981', // Modern emerald green
        'status-offline': '#EF4444', // Modern red
        'incentive': '#0ea5e9', // Modern teal
        'error': '#EF4444',
        'error-bg': '#FEF2F2',
        'success-bg': '#ECFDF5', // Added for success backgrounds
        'toast-bg': '#1F2937',
        'floating-btn': '#111827',
        'badge-red': '#EF4444',
        'certified': '#10B981',
        'help-center-bg': '#FEF9C3', // Modern yellow tint
        'border-soft': '#E5E7EB', // Added for subtle borders
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
