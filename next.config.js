// This file was automatically added by layer0 init.
// You should commit this file to source control.
const { withLayer0, withServiceWorker } = require('@layer0/next/config');

const mdConstants = require('./constants');

/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

const path = require('path');
const { remarkPlugins } = require('./plugins/markdownToHtml');

const _preLayer0Export = {
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx', 'md'],
  experimental: {
    plugins: true,
    scrollRestoration: true,
  },
  webpack: (config, { dev, isServer, ...options }) => {
    // IMPORTANT: https://www.npmjs.com/package/webpack-bundle-analyzer
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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
        path.join(__dirname, './plugins/md-layout-loader'),

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

module.exports = (phase, config) =>
  withLayer0(
    withServiceWorker({
      // Output sourcemaps so that stack traces have original source filenames and line numbers when tailing
      // the logs in the Layer0 developer console.
      layer0SourceMaps: true,

      ..._preLayer0Export,
    })
  );
