module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: 'auto',
      useBuiltIns: 'usage',
      debug: true,
      corejs: 3
    }]
  ],
  plugins: []
}
