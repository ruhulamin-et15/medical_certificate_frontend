import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007B7F", // Teal (Primary color)
        "primary-hover": "#006065", // Darker teal for primary hover

        accent: "#FF6F61", // Coral (Accent color)
        "accent-hover": "#E65C50", // Slightly darker coral for accent hover

        button: "#006D5B", // Dark Green for button color
        "button-hover": "#004D3F", // Darker shade for button hover

        background: "#F4F4F4", // Light Gray for background color
        text: "#333333", // Charcoal Gray for text color
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      container: {
        center: true,
        screens: {
          "3xl": "1400px",
        },
        padding: {
          DEFAULT: "8px",
        },
      },
      screens: {
        "min-2000": "2000px", // Custom breakpoint at 2000px
      },
    },
  },
  plugins: [],
};
export default config;
