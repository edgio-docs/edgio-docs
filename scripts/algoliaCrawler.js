new Crawler({
  rateLimit: 8,
  startUrls: ['https://docs.edg.io'],
  renderJavaScript: false,
  sitemaps: [],
  ignoreCanonicalTo: false,
  ignoreRobotsTxtRules: true,
  discoveryPatterns: ['https://docs.edg.io'],
  schedule: 'at 1:15 PM on Tuesday',
  actions: [
    {
      indexName: 'layer0',
      pathsToMatch: [
        'https://docs.edg.io/',
        'https://docs.edg.io/applications/**',
        'https://docs.edg.io/devlivery/**',
      ],
      recordExtractor: ({url, $, helpers}) => {
        /**
         * @param {string | string[]} selectors
         */
        function article(selectors) {
          const prefix = 'article.docs-article ';
          if (typeof selectors === 'string') {
            selectors = [selectors];
          }

          return selectors.map((selector) =>
            selector
              .split(',')
              .map((s) => prefix + s.trim())
              .join(',')
          );
        }

        // guide version
        const productType = $('meta[name="app:product]').attr('content');
        const productVersion = $('meta[name="app:product-version]').attr(
          'content'
        );
        // todo product name and version will be the facet
        // const version = `${productType}-${productVersion}`;

        // legacy - remove after delivery released
        const version =
          $('meta[name="app:guide-version"]').attr('content') || 'v7';

        // remove content from guides to not be indexed
        $(
          article(['div.callout', 'div.code-block', 'details']).join()
        ).remove();

        return helpers
          .docsearch({
            recordProps: {
              lvl0: {
                selectors: '',
                defaultValue: 'Guides',
              },
              lvl1: article('h1'),
              lvl2: article('h2'),
              lvl3: article('h3'),
              lvl4: article('h4'),
              lvl5: article('h5'),
              lvl6: article('h6'),

              content: article([
                '.article-text strong',
                '.article-text',
                'ul li',
                'table td',
              ]),
            },
            aggregateContent: false,
            recordVersion: 'v3',
          })
          .map((record) => {
            return {
              ...record,
              weight: {...record.weight, guideRank: 1}, // custom rank to show guides before API docs
              version,
            };
          });
      },
    },
    {
      indexName: 'layer0',
      pathsToMatch: ['https://docs.edg.io/docs/**'],
      recordExtractor: ({$, helpers}) => {
        const docsVersion =
          $('meta[name="app:docs-version"]')
            .attr('content')
            .match(/(v\d+)/)[1] || 'v7';
        const version = `applications-${docsVersion}`;

        const packagePath = $('header .title')
          .text()
          .replace(/[\s-]+v[\d.]+$/, '')
          .trim();

        $('div.col-menu').remove();

        return helpers
          .docsearch({
            recordProps: {
              lvl0: {
                selectors: '',
                defaultValue: `API | ${packagePath}`,
              },
              lvl1: ['div.tsd-page-title h1'],
              lvl2: ['h2', 'section.tsd-index-section h3'],
              lvl3: [
                'h3 span',
                'section.tsd-index-section .tsd-index-list a span',
              ],
              content: ['div.tsd-comment p:not(:has(> strong))'],
            },
            aggregateContent: true,
            recordVersion: 'v3',
          })
          .map((record) => ({
            ...record,
            weight: {...record.weight, guideRank: 2}, // custom rank to show guides before API docs
            version,
          }));
      },
    },
    {
      indexName: 'layer0',
      pathsToMatch: ['https://docs.edg.io/rest_api/'],
      recordExtractor: ({$, helpers}) => {
        return helpers
          .docsearch({
            recordProps: {
              lvl0: {
                selectors: '',
                defaultValue: `REST API`,
              },
              lvl1: ['h1'],
              lvl2: ['h2'],
              lvl3: ['h3'],
              content: ['div.redoc-markdown', 'div p'],
            },
            aggregateContent: true,
            recordVersion: 'v3',
          })
          .map((record) => ({
            ...record,
            weight: {...record.weight, guideRank: 1}, // custom rank to show guides before REST API docs
            version: 'applications-v7',
          }));
      },
    },
  ],
  initialIndexSettings: {
    layer0_v4: {
      attributesForFaceting: ['type', 'lang', 'version'],
      attributesToRetrieve: [
        'hierarchy',
        'content',
        'anchor',
        'url',
        'url_without_anchor',
        'type',
        'version',
      ],
      attributesToHighlight: ['hierarchy', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'content'],
      searchableAttributes: [
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy.lvl4)',
        'content',
        'version',
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: [
        'asc(weight.guideRank)',
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      ranking: [
        'exact',
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'custom',
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
    },
  },
  appId: 'XXXXXXXXXX',
  apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
});
