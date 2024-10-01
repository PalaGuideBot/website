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
        'clicker-unlocked': 'var(--clicker-unlocked)',
      },
    },
    animation: {
      'blink': 'blink 1s step-end infinite',
      'job-progress': 'job-progress 2.5s',
      'spin': 'spin 1s linear infinite',
      'glow': 'glow 2s cubic-bezier(.05,.5,.95,.5) infinite',
      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
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
      'glow': {
        '0%': {
          textShadow: '0px 0px 0px hsl(var(--wg-primary))',
        },
        '60%': {
          textShadow: '0px 0px 4px hsl(var(--wg-primary))',
          filter:
            'var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)',
        },
        '100%': { textShadow: '0px 0px 0px hsl(var(--wg-primary))' },
      },
      'pulse': {
        '0%, 100%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0.5,
        },
      },
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    dropShadow: {
      glow: ['0px 0px 4px hsl(var(--wg-primary))'],
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
