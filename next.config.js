const { withLayer0, withServiceWorker } = require('@layer0/next/config')
const webpack = require('webpack')

module.exports = withLayer0(
  withServiceWorker({
    generateInDevMode: false,
    webpack: function(config, options) {
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

      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.__BUILD_ID__': JSON.stringify(options.buildId),
        }),
      )

      return config
    },
  }),
)
