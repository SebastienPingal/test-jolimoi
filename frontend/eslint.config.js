// ESLint flat config for Vue 3 + TS + Prettier
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import vue from 'eslint-plugin-vue'

export default [
  // Base JS recommended
  js.configs.recommended,

  // Global variables available in browser environments
  {
    name: 'globals',
    languageOptions: {
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly'
      }
    }
  },

  // Vue SFC support (flat config provided by plugin-vue)
  ...vue.configs['flat/essential'],

  // TypeScript linting for TS files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      // Minimal sane TS rules to avoid needing extends presets
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  },

  // Let Vue SFCs use TS parser for <script lang="ts">
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },

  // Prettier as an ESLint rule to report formatting issues
  {
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
      semi: 'off'
    }
  }
]
