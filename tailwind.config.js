/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
          colors: {
            customWhite: '#ffffff',
            customText: '#004b61',
            customButton: '#004b61',
            customButtonTextColor: '#ffffff',
            customInformationColor: '#96ceca',
          },
    // Define custom font sizes with line height and letter spacing
    // use text-{size} to apply the custom font size
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.5384" }], // Extra small font size
        sm: ["0.875rem", { lineHeight: "1.5715" }], // Small font size
        base: [
          "0.9375rem",
          { lineHeight: "1.5333", letterSpacing: "-0.0125em" }, // Base font size
        ],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.0125em" }], // Large font size
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.0125em" }], // Extra large font size
        "2xl": ["1.5rem", { lineHeight: "1.415", letterSpacing: "-0.0268em" }], // 2x extra large font size
        "3xl": [
          "1.75rem",
          { lineHeight: "1.3571", letterSpacing: "-0.0268em" }, // 3x extra large font size
        ],
        "4xl": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.0268em" }], // 4x extra large font size
        "5xl": ["3.5rem", { lineHeight: "1", letterSpacing: "-0.0268em" }], // 5x extra large font size
        "6xl": ["4rem", { lineHeight: "1", letterSpacing: "-0.0268em" }], // 6x extra large font size
        "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.0268em" }], // 7x extra large font size
      },
      fontFamily: {
        madera: ['Madera-Regular', 'sans-serif'],
      },
        },
      },
    plugins: [],
  };