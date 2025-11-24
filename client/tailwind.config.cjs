module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        olu: {
          green: "#2E8B57",
          green700: "#276A45",
          seafoam: "#3B9E68",
          beige: "#F5F1E8",
          sand: "#F7EFE2",
          cream: "#FBF7F0",
          gold: "#C9A26A",
          ink: "#2F2F2F",
          body: "#555555"
        }
      },
      fontFamily: {
        serifDisplay: ['"Playfair Display"', "Georgia", '"Times New Roman"', "serif"],
        sansBody: ['"Open Sans"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"]
      },
      maxWidth: { container: "1200px" },
      boxShadow: {
        soft: "0 12px 35px -18px rgba(46, 139, 87, 0.45)"
      }
    }
  },
  plugins: []
};

