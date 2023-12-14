const {join} = require('path');
const {sync: globby} = require('globby');
const {withEdgio} = require('@edgio/next/config');

function getLatestVersion() {
  const files = globby('v*.config.js', {
    cwd: join(process.cwd(), 'src', 'config'),
  });

  const versions = files.map((file) => {
    const match = file.match(/v(\d+)\.config\.js/);
    return match ? parseInt(match[1]) : 0;
  });

  return Math.max(...versions).toString();
}

module.exports = (phase, config) => {
  process.env.NEXT_PUBLIC_LATEST_VERSION = getLatestVersion();

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
      return config;
    },
  });
};
