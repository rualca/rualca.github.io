import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // dist/ is build output, .astro/ holds generated types.
  globalIgnores(['dist', '.astro']),
  {
    files: ['**/*.{js,jsx}'],
    // eslint-plugin-react-hooks 7 nests its flat configs under configs.flat;
    // eslint-plugin-react-refresh 0.5 dropped configs.vite, so the plugin and
    // its rule are wired up here instead of being extended.
    extends: [js.configs.recommended, reactHooks.configs.flat['recommended-latest']],
    plugins: { 'react-refresh': reactRefresh },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])
