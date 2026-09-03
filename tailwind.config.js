/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#111111',
        text: '#F5F3EE',
        muted: '#A5A5A5',
        dim: '#666666',
        border: 'rgba(245,243,238,.14)',
        accent: '#8FA8FF',
      },
      fontFamily: {
        zh: ['"Zen Old Mincho"', 'serif'],
        en: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
