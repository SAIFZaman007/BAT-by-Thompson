/** Client palette: blue, teal, white, small gold accents. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1B33",        // deep navy — headings, footer
        brand: {
          DEFAULT: "#173EA5",  // primary blue
          dark: "#10306F",
          soft: "#EAF0FB",
        },
        teal: { DEFAULT: "#0E9E8F", soft: "#E3F4F2" },
        gold: { DEFAULT: "#C9A24B", soft: "#F7F1E2" },
        surface: "#F5F8FB",
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "72rem" },
    },
  },
  plugins: [],
};
