import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Enforce function declarations for components
      'func-style': ['error', 'declaration'],
      // Require explicit return types
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      // Enforce named exports instead of default exports
      'import/no-default-export': 'error',
    },
  },
  // Exception for vite.config.ts to allow default exports
  {
    files: ['**/vite.config.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
])