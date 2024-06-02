import { wedgesTW } from '@lemonsqueezy/wedges'
import tailwindCssAnimate from 'tailwindcss-animate'

/** @type {import('@lemonsqueezy/wedges').ThemableColorScale} */
const primaryColor = {
  100: '#FFF6CC',
  200: '#FFEB99',
  300: '#FFDC67',
  400: '#FFCE41',
  500: '#FFB702',
  600: '#DB9601',
  700: '#B77801',
  800: '#935D00',
  900: '#7A4900',
  DEFAULT: '#FFB702',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './inertia/**/*.{js,ts,jsx,tsx}',
    './resources/**/*.edge',
    'node_modules/@lemonsqueezy/wedges/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'pixel': ['Pixel Nes'],
        'mc-dungueons': ['Minecraft Dungeons'],
      },
      colors: {
        'job-alchemist': 'var(--job-alchemist)',
        'job-farmer': 'var(--job-farmer)',
        'job-hunter': 'var(--job-hunter)',
        'job-miner': 'var(--job-miner)',
      },
    },
    animation: {
      'blink': 'blink 1s step-end infinite',
      'job-progress': 'job-progress 2.5s',
      'spin': 'spin 1s linear infinite',
    },
    keyframes: {
      'blink': {
        '0%, 100%': { color: 'inherit' },
        '50%': { color: 'hsl(var(--wg-destructive))' },
      },
      'job-progress': {
        from: { 'stroke-dashoffset': '2150' },
      },
      'spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    tailwindCssAnimate,
    wedgesTW({
      themes: {
        light: {
          colors: {
            primary: { ...primaryColor },
          },
        },
        dark: {
          colors: {
            primary: { ...primaryColor },
          },
        },
      },
    }),
  ],
}
