module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "serif"],
      },
      colors: {
        primary: "#A026FF",
        secondary: "#F7EBFF",
        darkBg: "#1C1C1C",
        darkGray: "#13031F",
        bgColor: "#5C54AB",
        btnHover: "#FFAF66",
        success: "#4CAF50",
        warning: "#FFC107",
        danger: "#F44336",
        info: "#2196F3",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5C54AB",
          secondary: "#11142D",
          accent: "#FF7A00",
          neutral: "#333333",
          "base-100": "#FFFFFF",
          "base-200": "#F7F8FC",
          "base-300": "#E5E7EB",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
        mydarktheme: {
          primary: "#5C54AB",
          secondary: "#1F2937",
          accent: "#FFAF66",
          neutral: "#1E1E2F",
          "base-100": "#111827",
          "base-200": "#1F2937",
          "base-300": "#374151",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
    darkTheme: "mydarktheme", // Set the default dark theme
  },
  darkMode: "class", // Enable class-based dark mode
};
