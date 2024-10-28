module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends:  "eslint:recommended",
  overrides: [
    {
      files: [".eslintrc.js"],
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
    },
  scripts: {
    dev: "http-server",
    lint: "eslint *.js",
  },

};
