import { wedgesTW } from '@lemonsqueezy/wedges'

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
    },
  },
  darkMode: 'class',
  plugins: [
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
