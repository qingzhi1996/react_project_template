module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'eslint:recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    indent: ['warn', 2],
    "@typescript-eslint/no-explicit-any": ["off"], // type any
    'eol-last': 1, // 文末需要回车配置不报错设为0， 警告不中断程序为1，报错为2 
    'no-multiple-empty-lines': [1, { max: 2 }], // 空行最多不能超过2行
    '@typescript-eslint/no-var-requires': 0,
    'no-unused-vars': 1
  },
};
