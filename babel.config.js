const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  "presets": [require.resolve('babel-preset-react-app')],
  "plugins": [
    isDev && require.resolve('react-refresh/babel'), // 配置react开发环境热替换
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // `style: true` 会加载 less 文件
      },
    ],
  ].filter(Boolean)
}
