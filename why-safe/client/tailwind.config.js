export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0EA5E9', // Ocean Blue (Buttons/Accents)
          secondary: '#3B82F6', // Blue (Gradients)
          accent: '#06B6D4', // Cyan (Highlights)
          success: '#10B981', // Emerald (Safe)
          warning: '#F59E0B', // Amber (Suspicious)
          danger: '#EF4444', // Red (Malicious)
          bg: '#020617', // Deep Navy/Black (Page Background)
          card: '#0F172A', // Dark Slate (Card Background)
          border: '#1E293B', // Slate 800 (Borders)
          hover: '#1E293B', // Darker Hover
          text: {
            primary: '#F8FAFC', // White/Slate 50
            secondary: '#94A3B8' // Slate 400
          }
        }
      }
    },
  },
  plugins: [],
};
