// eslint.config.mjs
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import jest from 'eslint-plugin-jest';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
   baseDirectory: __dirname,
   recommendedConfig: js.configs.recommended,
});

const eslintRules = [
   {
      ignores: ['**/node_modules/*', '**/out/*', '**/.next/*', '**/coverage', 'src/app/globals.css', 'next-env.d.ts'],
   },

   ...compat.extends(
      'next/core-web-vitals',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended'
   ),

   {
      plugins: {
         react,
         '@typescript-eslint': typescriptEslint,
      },

      languageOptions: {
         globals: {
            ...globals.browser,
            ...globals.node,
         },
         parser: tsParser,
         ecmaVersion: 'latest',
         sourceType: 'module',
         parserOptions: {
            ecmaFeatures: { jsx: true },
         },
      },

      settings: {
         react: { version: 'detect' },
      },

      rules: {
         'react/prop-types': 'off',
         'react/react-in-jsx-scope': 'off',
         '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
         '@typescript-eslint/no-explicit-any': 'warn',
         'no-console': ['warn', { allow: ['warn', 'error'] }],
      },
   },

   // Jest configuration for test files
   {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)', '**/jest.setup.[jt]s'],
      plugins: {
         jest,
      },
      languageOptions: {
         globals: {
            ...globals.jest,
         },
      },
      rules: {
         ...jest.configs.recommended.rules,
         'jest/expect-expect': 'warn',
         'jest/no-disabled-tests': 'warn',
         'jest/no-focused-tests': 'error',
         'jest/no-identical-title': 'error',
         'jest/valid-expect': 'error',
      },
   },
];

export default eslintRules;
