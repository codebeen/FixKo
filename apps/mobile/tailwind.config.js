/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: '#001449', // Primary navy text/bg
            dark: '#07183B',    // Dark dropdown/card background
            deep: '#12357F',    // Main app background
            medium: '#0E2250',  // Input focus background
            light: '#15305B',   // Border/badge colors
            grad1: '#061D5F',
            grad2: '#12357F',
            grad3: '#2354B5',
            grad4: '#327CF0',
          },
          yellow: {
            DEFAULT: '#FACC15', // Highlight yellow (yellow-400)
            gold: '#DBA92E',    // Primary gold buttons/borders
            bright: '#F5C518',  // Yellow asymmetrical header
          },
          blue: {
            DEFAULT: '#7EB1F1', // Active buttons
            hover: '#5898E5',   // Hovered buttons
          },
          grey: {
            DEFAULT: '#A0A0A0', // Text gray
            light: '#CCC',      // Light text
            mid: '#BBB',        // Muted text
            dark: '#808080',    // Secondary labels
          },
        },
      },
    },
  },
  plugins: [],
};
