const { withServiceWorker } = require('@xdn/next/sw')

module.exports = withServiceWorker({
  target: 'serverless',
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    config.module.rules.push({
      test: /\.(jpg|png)$/,
      loader: 'url-loader',
    })
    return config
  },
})
