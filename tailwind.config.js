/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "@/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['var(--font-vazir)']
      },
      fontWeight: {
        'vazir-thin': '100',
        'vazir-light': '300',
        'vazir-normal': '400',
        'vazir-medium': '500',
        'vazir-bold': '700',
      },
      colors: {
        ground : "#F7F8F8",
        main: "#F21055",
        white: "#FFFF",
        second: "#F2F2F2",
        black:"#282828",
        delete: "#E31215",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
