module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "@kartagraph/eslint-config-custom/defaults",
    "plugin:react-hooks/recommended",
    "turbo",
    "prettier",
  ],
  plugins: ["react-refresh", "import", "unused-imports"],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/extensions":["off"],
    // ["error", "ignorePackages", { "js":"never","ts":"never","tsx":"never" }],
  },
};
