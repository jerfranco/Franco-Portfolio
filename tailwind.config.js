/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        '400': '400% 400%',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },     // brightest
          '50%': { opacity: '0.4' },        // dimmer
        },
      },
      animation: {
        drift: 'drift 120s linear infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
      },
      margin: {
        128: '32rem',
        144: '36rem',
        160: '40rem',
      },
      
      
      
    },
  },
  plugins: [],
}
