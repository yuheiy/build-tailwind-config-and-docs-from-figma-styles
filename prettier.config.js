/**
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 */
export default {
  plugins: [
    'prettier-plugin-css-order',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss', // MUST come last
  ],
  printWidth: 100,
  singleQuote: true,

  // prettier-plugin-organize-imports
  organizeImportsSkipDestructiveCodeActions: true,

  // prettier-plugin-tailwindcss
  tailwindStylesheet: './apps/docs/.storybook/index.css',
  tailwindFunctions: ['twMerge'],
};
