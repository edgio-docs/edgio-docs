import {DocSearch} from '@docsearch/react';
// @ts-ignore
import {default as JSURL} from 'jsurl';

import {siteConfig} from 'config/appConfig';
import {
  ContextType,
  getLatestVersion,
  useAppContext,
} from 'contexts/AppContext';

import NoSSRWrapper from '../NoSSRWrapper';

const {
  appId: algoliaAppId,
  apiKey: algoliaApiKey,
  indexName,
} = siteConfig.algolia;

function transformItems(items: any) {
  const hierarchyOrder = ['lvl4', 'lvl3', 'lvl2', 'lvl1', 'lvl0'];

  return items.map((item: any) => {
    const {hierarchy, content} = item;
    const url = new URL(item.url);
    url.protocol = window.location.protocol;
    url.host = window.location.host;

    let matchedText = content;
    if (!matchedText) {
      for (const key of hierarchyOrder) {
        if (hierarchy[key]) {
          matchedText = hierarchy[key];
          break;
        }
      }
    }

    // only urls to `/applications/*` support the hash change
    if (matchedText && url.pathname.startsWith('/applications')) {
      url.hash = JSURL.stringify({q: matchedText});
    }

    return {
      ...item,
      url,
    };
  });
}

const AlgoliaSearch = () => {
  const {context, version} = useAppContext();

  const facetFilters = ['version:all'];

  if (context === ContextType.HOME) {
    const latestAppsVersion = getLatestVersion(ContextType.APPLICATIONS);
    facetFilters.push(`version:${latestAppsVersion}`);
  } else {
    facetFilters.push(`version:${version}`);
  }

  const searchParameters = {
    facetFilters: [facetFilters],
  };

  return (
    <NoSSRWrapper>
      <DocSearch
        appId={algoliaAppId}
        indexName={indexName}
        apiKey={algoliaApiKey}
        transformItems={transformItems}
        searchParameters={searchParameters}
      />
    </NoSSRWrapper>
  );
};

export default AlgoliaSearch;
