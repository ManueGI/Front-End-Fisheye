import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        photographerTemplate: "readonly",
        displayPhotographerDetails: "readonly",
        displayErrorMessage: "readonly",
        getFirstName: "readonly",
        displayLightboxModal: "readonly",
        displayModal: "readonly",
        getData: "readonly",
      },
    },
  },
  {
    files: [".eslintrc.js", "scripts/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
];
