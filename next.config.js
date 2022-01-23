/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

const path = require('path');
const {remarkPlugins} = require('./plugins/markdownToHtml');

module.exports = {
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx', 'md'],
  experimental: {
    plugins: true,
    scrollRestoration: true,
  },
  webpack: (config, {dev, isServer, ...options}) => {
    // IMPORTANT: https://www.npmjs.com/package/webpack-bundle-analyzer
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
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
      ],
    });

    return config;
  },
};
