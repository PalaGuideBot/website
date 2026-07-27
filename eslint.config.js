import { configApp, RULES_LIST } from '@adonisjs/eslint-config'

export default configApp({
  name: 'Custom config for Inertia',
  files: ['inertia/**/*.ts', 'inertia/**/*.tsx'],
  rules: {
    ...RULES_LIST,
    "@adonisjs/prefer-adonisjs-inertia-link": "off",
    "@adonisjs/no-backend-import-in-frontend": [
      'error',
      {
        allowed: [
          '#stats/**',
          '#event/**',
          '#tools/**'
        ],
      },
    ],
  },
})