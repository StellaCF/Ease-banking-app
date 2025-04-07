import eslintPluginNode from 'eslint-plugin-n';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      node: eslintPluginNode,
    },
    rules: {
      ...eslintPluginNode.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
