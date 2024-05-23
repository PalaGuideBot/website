/// <reference path="../../adonisrc.ts" />

import '../css/app.css'
import '@fontsource/inter/100.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'
import { createRoot } from 'react-dom/client'
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
    const root = createRoot(el)
    root.render(
      <ThemeProvider>
        <App {...props} />
      </ThemeProvider>
    )
  },
})
