import { wedgesTW } from '@lemonsqueezy/wedges'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './inertia/**/*.{js,ts,jsx,tsx}',
    './resources/**/*.{edge}',
    'node_modules/@lemonsqueezy/wedges/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [wedgesTW()],
}
