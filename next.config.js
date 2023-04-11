const {join} = require('path');
const globby = require('globby').sync;
const {withEdgio, withServiceWorker} = require('@edgio/next/config');
const mdConstants = require('./constants');
const {remarkPlugins} = require('./plugins/markdownToHtml');

function getLatestVersion() {
  const files = globby('v*.config.js', {
    cwd: join(process.cwd(), 'src', 'config'),
  });

  const versions = files.map((file) => {
    const match = file.match(/v(\d+)\.config\.js/);
    return match ? parseInt(match[1]) : 0;
  });

  const latestVersion = Math.max(...versions).toString();

  return latestVersion;
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

    // Add our custom markdown loader in order to support frontmatter
    // and layout
    config.module.rules.push({
      test: /.mdx?$/, // load both .md and .mdx files
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins,
          },
        },
        // IMPORTANT: This is the page layouts loader
        // The tree is MyApp, AppShell, Page...
        // This is the starting point of the app. Makes sure all pages
        // 1. Are all .mdx files as oppose .ts or .tsx — it essentially reads
        // from the file-system without having to getStaticProps and co
        join(__dirname, './plugins/md-layout-loader'),

        // Replace template strings (eg. {{ PRODUCT_NAME }} ) in .md files
        {
          loader: 'string-replace-loader',
          options: {
            search: '{{\\s*(\\w+)\\s*}}',
            flags: 'gi',
            replace(match, p1, offset, string) {
              // return the matching constants value or the original match if not found
              return mdConstants[p1] || match;
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = (phase, config) => {
  process.env.NEXT_PUBLIC_LATEST_VERSION = getLatestVersion();

  return withEdgio(
    withServiceWorker({
      ..._preEdgioExport,
    })
  );
};
