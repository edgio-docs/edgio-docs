const {join} = require('path');
const globby = require('globby').sync;
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

const _preEdgioExport = {
  images: {
    domains: ['opt.moovweb.net'],
  },
  experimental: {
    scrollRestoration: true,
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx', 'md'],
  webpack: (config, {dev, isServer, ...options}) => {
    // IMPORTANT: https://www.npmjs.com/package/webpack-bundle-analyzer
    if (process.env.ANALYZE) {
      const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: options.isServer
            ? '../analyze/server.html'
            : './analyze/client.html',
        })
      );
    }

    return config;
  },
};

module.exports = (phase, config) => {
  process.env.NEXT_PUBLIC_LATEST_VERSION = getLatestVersion();

  return withEdgio({
    ..._preEdgioExport,
  });
};
