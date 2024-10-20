/// <reference path="../../adonisrc.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { ThemeProvider } from '~/components/theme_provider'

const appName = import.meta.env.VITE_APP_NAME || 'PalaGuideBot'

createInertiaApp({
  progress: { color: 'hsl(var(--wg-primary))' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <ThemeProvider defaultTheme="dark">
        <App {...props} />
      </ThemeProvider>
    )
  },
})
