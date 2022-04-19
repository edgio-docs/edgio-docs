import fetch from 'cross-fetch';
import styled from 'styled-components';

import {DOCS_PAGES_REPO_URL} from '../../../constants';
import {markdownToHtml} from '../../../plugins/markdownToHtml';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';

const StyledChangelogContent = styled.div`
  display: contents;

  a {
    color: #2993e0;
    text-decoration: none;
    position: relative;
    font-weight: 600;

    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 1px;
      left: 0;
      background: #2993e0;
      width: 0;
      transform: translateY(2px);
      transition: width 0.2s ease-in-out;
    }

    &:hover ::after {
      width: 100%;
    }
  }

  ul {
    padding-left: 35px;
    display: grid;
    row-gap: 8px;
    list-style: square;
  }

  hr {
    box-shadow: inset 0px -1px var(--hr-grey1);
    border: none;
    height: 3px;
  }
`;

function ChangelogPage({content}: {content: string}) {
  return (
    <Page>
      <MarkdownPage meta={{title: 'Changelog'}}>
        <StyledChangelogContent dangerouslySetInnerHTML={{__html: content}} />
      </MarkdownPage>
    </Page>
  );
}

export async function getServerSideProps() {
  const resp = await fetch(
    `${DOCS_PAGES_REPO_URL}/current/guides/changelog.md`
  ).then((resp) => (resp.ok ? resp.text() : 'Unable to retrieve changelog'));

  const content = await markdownToHtml(resp || '');

  return {props: {content}};
}

export default ChangelogPage;
