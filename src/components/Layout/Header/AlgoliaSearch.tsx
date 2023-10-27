import {DocSearch} from '@docsearch/react';
// @ts-ignore
import {default as JSURL} from 'jsurl';

import NoSSRWrapper from '../NoSSRWrapper';

import {siteConfig} from 'config/appConfig';
import useConditioning from 'utils/hooks/useConditioning';

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

    // only urls to `/guides/*` support the hash change
    if (matchedText && url.pathname.startsWith('/guides')) {
      url.hash = JSURL.stringify({q: matchedText});
    }

    return {
      ...item,
      url,
    };
  });
}

const AlgoliaSearch = () => {
  const {version} = useConditioning();

  const searchParameters = {
    facetFilters: [['version:all', `version:${version.selectedVersionText}`]],
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
