/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        alegreya: ['var(--font-alegreya)', 'Alegreya', 'serif'],
        'rouge-script': ['var(--font-rouge-script)', 'Rouge Script', 'cursive'],
        beon: ['Beon', 'sans-serif'],
        orbitron: ['var(--font-orbitron)', 'Orbitron', 'sans-serif'],
        vt323: ['var(--font-vt323)', 'VT323', 'monospace'],
        'cedarville-cursive': ['var(--font-cedarville)', '"Cedarville Cursive"', 'cursive'],
        'edu-cursive': ['var(--font-edu-cursive)', '"Edu NSW ACT Cursive"', 'cursive'],
        'playfair-display': ['var(--font-playfair)', '"Playfair Display"', 'serif'],
        'roboto-mono': ['var(--font-roboto-mono)', '"Roboto Mono"', 'monospace'],
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      }
    },
  },
  plugins: [],
};
