import {Octokit} from '@octokit/core';
import _get from 'lodash/get';
import styled from 'styled-components';

import {PRODUCT} from '../../../constants';
import {markdownToHtml} from '../../../plugins/markdownToHtml';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import JSONRoutes from 'utils/jsonRoutes';

const SKIP_LABEL = 'skip-notes';
const PR_RE = /\(#(\d+)\)/;

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
});

const octokitDefaults = {
  owner: 'moovweb',
  repo: 'xdn',
  per_page: 1000,
};

let releases: any[], pullRequests: any;

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
    <Page routeTree={JSONRoutes}>
      <MarkdownPage meta={{title: 'Changelog'}}>
        <StyledChangelogContent dangerouslySetInnerHTML={{__html: content}} />
      </MarkdownPage>
    </Page>
  );
}

export async function getServerSideProps() {
  [releases, pullRequests] = [
    (
      await octokit.request(
        'GET /repos/{owner}/{repo}/releases',
        octokitDefaults
      )
    ).data.filter((v) => !v.draft),
    (
      await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        ...octokitDefaults,
        state: 'closed',
      })
    ).data.reduce((acc, pull) => ({...acc, [pull.number]: pull}), {}),
  ];

  // split the major release versions
  const [v4, v3] = splitByVersion(/^v4/, /^v3/);

  const content = await markdownToHtml(v3);

  return {props: {content}};
}

export default ChangelogPage;

/**
 * Checks if the supplied pull request ID contains the skip label
 * @param {String} pullId
 * @returns {Promise<boolean>} `true` if this PR should be skipped
 */
function hasSkipLabel(pullId: string) {
  const labels = _get(pullRequests, [pullId, 'labels'], []);

  return labels.some(
    (label: {name: string}) =>
      (label.name || '').trim().toLowerCase() === SKIP_LABEL
  );
}

function splitByVersion(...args: RegExp[]) {
  const ret = Array(args.length);

  args.forEach((v, i) => {
    ret[i] = releases
      .filter((release: {tag_name: string}) => release.tag_name.match(v))
      .map((release) => {
        const title = `**${PRODUCT} Packages** - `;
        const {tag_name, body, published_at} = release;

        return [
          `#### ${title}${tag_name} (${published_at.split('T')[0]})`,
          cleanReleaseNotes(body),
        ].join('\r\n');
      })
      .join('\r\n');
  });

  return ret;
}

function cleanReleaseNotes(notes: string) {
  notes = notes
    .split(/\r\n/)
    .map((v) => {
      // match a pull request id in this line entry
      const prMatch = PR_RE.exec(v);

      // Conditions for modifying the line contents
      v = v.replace(/## What\Ws Changed/, ''); // remove "What's Changed" heading
      v = v.replace(/\[(.+)\]\(\S+\)/g, '$1'); // remove any markdown links
      v = v.toLowerCase().indexOf(SKIP_LABEL) > -1 ? '' : v; // exclude if labeled to skip notes

      // check PR labels for skipping notes
      if (prMatch && hasSkipLabel(prMatch[1])) {
        return '';
      }

      // Returning an empty string excludes this line from the release notes
      return v.trim();
    })
    .filter(Boolean)
    .join('\r\n');

  // add something to the log output so it isn't empty release notes if all valuable
  // comments have been stripped
  if (!notes.length) {
    return '#### _No changelog information available_';
  }

  return notes;
}
