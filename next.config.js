const { withXDN, withServiceWorker } = require('@xdn/next/config')

module.exports = withXDN(
  withServiceWorker({
    generateInDevMode: true,
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
  }),
)
