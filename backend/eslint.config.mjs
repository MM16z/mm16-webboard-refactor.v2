import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nodePlugin from "eslint-plugin-node";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      globals: {
        ...globals.node, // Include Node.js globals here
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'simple-import-sort': simpleImportSort,
      'node': nodePlugin, // Add the Node plugin
    },
    rules: {
      ...tseslint.configs.recommended.rules, // Use the recommended rules from TypeScript ESLint plugin
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/order': 'off', // Avoid conflicts with `simple-import-sort`
      'sort-imports': 'off', // Avoid conflicts with `simple-import-sort`
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'], // Enforce using `type` instead of `interface`
      'node/no-missing-import': 'off', // Ensure all imports exist
      'node/no-unpublished-import': 'off', // Prevent importing unpublished files
      'node/no-unsupported-features/es-syntax': 'off', // Allow modern ES syntax in Node.js
    },
  },
];