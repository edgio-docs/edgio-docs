const path = require('path');
const {withEdgio} = require('@edgio/next/config');

module.exports = (phase, config) => {
  return withEdgio({
    experimental: {
      scrollRestoration: true,
    },
    compiler: {
      styledComponents: true, // ssr and displayName are configured by default
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx', 'md'],
    webpack: (config, {isServer, ...options}) => {
      if (process.env.ANALYZE) {
        const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: isServer
              ? '../analyze/server.html'
              : './analyze/client.html',
          })
        );
      }

      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
        include: [path.resolve(__dirname, 'src/templates/announcements')],
      });

      return config;
    },
  });
};
