/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        studiolight: {
          primary: "#2F52F5",
          "primary-content": "#FFFFFF",
          secondary: "#12172B",
          "secondary-content": "#FFFFFF",
          accent: "#FFB020",
          "accent-content": "#1A1400",
          neutral: "#12172B",
          "neutral-content": "#EEF1F8",
          "base-100": "#FFFFFF",
          "base-200": "#F3F5FA",
          "base-300": "#E1E6F0",
          "base-content": "#12172B",
          info: "#0EA5E9",
          success: "#16A34A",
          warning: "#D97706",
          error: "#DC2626",
          "--rounded-box": "0.9rem",
          "--rounded-btn": "0.6rem",
          "--rounded-badge": "9999px",
        },
      },
      {
        studiodark: {
          primary: "#6C86FF",
          "primary-content": "#0A0E24",
          secondary: "#1E2540",
          "secondary-content": "#EEF1F8",
          accent: "#FFB020",
          "accent-content": "#1A1400",
          neutral: "#1E2540",
          "neutral-content": "#EEF1F8",
          "base-100": "#0D1020",
          "base-200": "#131730",
          "base-300": "#232A4A",
          "base-content": "#E8EBF5",
          info: "#38BDF8",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
          "--rounded-box": "0.9rem",
          "--rounded-btn": "0.6rem",
          "--rounded-badge": "9999px",
        },
      },
    ],
  },
};
