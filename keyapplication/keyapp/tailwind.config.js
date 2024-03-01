/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "accentColour" : '#00c0ff',
        "optionBgColour" : "#fff0ab",
        "darkBackground" : "#22333B",
        "contentBackground" : "#F2F4F3",
        "notSoDarkBackground" : "#7D7C7A",
        "lightText" : "#F2F4F3",
        
        "gunmetal" : "#22333B",
        "whitesmoke" : "#F2F4F3",
        "beaver" : "#A9927D",
        "walnutbrown" : "#5E503F",

        "asparagus" : "#72A276",

        "cardBackground" : "#A9927D"
      }
    },
    
  },
  plugins: [],
};
