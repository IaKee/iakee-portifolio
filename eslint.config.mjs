import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": typescriptPlugin
    },
    languageOptions: {
      parser: typescriptParser
    }
  },
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "**/*.config.js",
      "next-env.d.ts",
      "**/node_modules/**",
      "**/*.ts",
      "**/*tsx"
    ]
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      
      "react/display-name": "off",
      "react/jsx-key": "error",
      
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "error",
      
      "no-var": "error"
    }
  }
];