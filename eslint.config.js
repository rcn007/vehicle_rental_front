import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },

  ...eslintPluginVue.configs['flat/recommended']
]
