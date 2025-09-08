// Root ESLint flat config (monorepo)
// Delegates to frontend's ESLint config so IDEs opened at repo root work
import frontendConfig from './frontend/eslint.config.js'

export default [
  {
    name: 'root-ignores',
    ignores: [
      '**/node_modules/**',
      'backend/**',
      'frontend/dist/**'
    ]
  },
  ...frontendConfig
]



