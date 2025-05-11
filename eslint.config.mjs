import eslintConfigPrettier from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    ...eslintConfigPrettier.rules,
  },
})
