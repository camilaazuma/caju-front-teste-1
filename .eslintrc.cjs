module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "plugin:react-hooks/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: {
        map: [
          ["~", "./src"],
          ["@components", "./src/components/index"],
          ["@pages", "./src/pages"],
          ["@hooks", "./src/hooks"],
          ["@router", "./src/router"],
          ["@helpers", "./src/helpers"],
          ["@types", "./src/types"],
          ["@context", "./src/context/index"],
          ["@colors", "./src/styles/colors"],
          ["@services", "./src/services/index"],
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-named-as-default": 0,
    "import/no-unresolved": ["error", { ignore: ["^@/"] }],
    "react/display-name": "off",
    "@typescript-eslint/ban-types": "off",
    "import/named": "off",
    "react-hooks/exhaustive-deps": "warn",
  },
};
