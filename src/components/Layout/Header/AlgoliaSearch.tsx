import {useCallback, useRef, useState} from 'react';

import {
  DocSearchButton,
  DocSearchModal,
  useDocSearchKeyboardEvents,
} from '@docsearch/react';
import {default as JSURL} from 'jsurl';
import {createPortal} from 'react-dom';
// @ts-ignore
import styled from 'styled-components';

import {siteConfig} from 'config/appConfig';
import {ContextType, useAppContext} from 'contexts/AppContext';
import {useOpenEdgioModal} from 'contexts/EdgioAnswersContext';

const StyledSearchWrapper = styled.div`
  --dimension: 32px;
  width: var(--dimension);
  height: var(--dimension);

  .DocSearch-Button-Placeholder {
    display: none;
  }
`;

const StyledFooter = styled.div`
  color: var(--text-primary);
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;

  strong {
    color: var(--text-link);
  }
`;

const {
  appId: algoliaAppId,
  apiKey: algoliaApiKey,
  indexName,
} = siteConfig.algolia;

interface AlgoliaSearchProps {
  onSearchOpen?: () => void;
  onSearchClose?: () => void;
}

const AlgoliaSearch = ({onSearchOpen, onSearchClose}: AlgoliaSearchProps) => {
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const {context, version} = useAppContext();
  const openModal = useOpenEdgioModal();

  const facetFilters = [];

  // Home context should search all products + versions
  // Other products should search the current version or default
  if (context !== ContextType.HOME) {
    facetFilters.push(`version:${context}-${version}`);
  } else {
    facetFilters.push(`version:${ContextType.APPLICATIONS}-v7`);
    facetFilters.push(`version:${ContextType.DELIVERY}-default`);
  }

  const searchParameters = {
    facetFilters: [facetFilters],
  };

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

  const onOpen = useCallback(() => {
    setIsOpen(true);

    if (onSearchOpen) {
      onSearchOpen();
    }
  }, [onSearchOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);

    if (onSearchClose) {
      onSearchClose();
    }
  }, [onSearchClose]);

  const onClickEdgioAnswers = (query: string) => {
    onClose();
    openModal(query);
  };

  const onInput = useCallback((event) => {
    console.log('onInput', event.key);
    setIsOpen(true);
    setInitialQuery(event.key);
  }, []);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <StyledSearchWrapper>
      <DocSearchButton ref={searchButtonRef} onClick={onOpen} />
      {isOpen &&
        createPortal(
          <DocSearchModal
            appId={algoliaAppId}
            indexName={indexName}
            apiKey={algoliaApiKey}
            onClose={onClose}
            initialScrollY={window.scrollY}
            searchParameters={searchParameters}
            transformItems={transformItems}
            resultsFooterComponent={({state}) => {
              return (
                <StyledFooter onClick={() => onClickEdgioAnswers(state.query)}>
                  Looking for something else? <br />
                  Try asking <strong>Edgio Answers</strong>.
                </StyledFooter>
              );
            }}
          />,
          document.body
        )}
    </StyledSearchWrapper>
  );
};

export default AlgoliaSearch;
