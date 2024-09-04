module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // Use React 17+ automatic JSX runtime
      }
    ]
  ],
};