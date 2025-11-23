/// <reference path="../../adonisrc.ts" />

import '../css/app.css'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { hydrateRoot } from 'react-dom/client'
import { Providers } from '~/components/shared/providers'

const appName = import.meta.env.VITE_APP_NAME || 'PalaGuideBot'

createInertiaApp({
  progress: { color: 'var(--primary)' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <Providers>
        <App {...props} />
      </Providers>
    )
  },
})
