module.exports = {
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "prettier",
    "plugin:node/recommended"
  ],
  env: {
    es6: true,
    mocha: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "script"
  },
  plugins: ["node", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "es5",
        bracketSpacing: true
      }
    ],
    "no-console": ["error", { allow: ["warn", "error"] }]
  }
};
