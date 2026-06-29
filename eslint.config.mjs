import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  globalIgnores([
    ".next/**",
    "coverage/**",
    "docs/claude-design/**",
    "node_modules/**",
    "out/**",
    "next-env.d.ts"
  ])
]);

export default eslintConfig;
