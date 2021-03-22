const { withXDN, withServiceWorker } = require('@layer0/next/config')

module.exports = withXDN(
  withServiceWorker({
    generateInDevMode: false,
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
