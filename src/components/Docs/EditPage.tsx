import {useRouter} from 'next/router';
import styled from 'styled-components';

import {IconExternalLink, IconGitHub} from 'components/Icon';

import {DOCS_REPO} from '../../../constants';

const StyledEditLink = styled.div`
  margin-top: 50px;

  a {
    width: 100%;
    display: flex;
    justify-content: center;
    border: 2px solid var(--hr-secondary);
    padding: 20px;
    border-radius: 4px;
    text-align: center;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    color: var(--colors-blue0);
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-decoration: none;
    gap: 8px;
    position: relative;
    transition: transform 0.1s;

    &:hover {
      transform: scale(1.01);
    }
  }
`;

const StyledEditIcon = styled.div`
  text-align: end;

  a {
    display: flex;
    justify-content: center;
    border: 2px solid var(--hr-secondary);
    padding: 8px;
    border-radius: 4px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    color: var(--colors-blue0);
    font-weight: 500;
    font-size: 24px;
    line-height: 26px;
    text-decoration: none;
    gap: 8px;
    position: relative;
    transition: transform 0.1s;

    &:hover {
      transform: scale(1.01);
    }

    svg {
      fill: var(--colors-blue0);
    }
  }
`;

const baseURL = `https://github.com/${DOCS_REPO}/edit/main/`;
const title = 'Edit this guide on GitHub';
const IGNORE_PAGES = ['/guides/changelog'];

export default function EditPage({
  as = 'link',
  source,
}: {
  as?: 'icon' | 'link';
  source?: string;
}) {
  const router = useRouter();
  const editHref = `${baseURL}${source}`;

  if (IGNORE_PAGES.includes(router.route) || !source) {
    return null;
  }

  if (as === 'icon') {
    return (
      <StyledEditIcon>
        <a target="_blank" href={editHref} rel="noreferrer" title={title}>
          <IconGitHub />
        </a>
      </StyledEditIcon>
    );
  }

  return (
    <StyledEditLink>
      <a target="_blank" href={editHref} rel="noreferrer">
        <IconExternalLink />
        {title}
      </a>
    </StyledEditLink>
  );
}
