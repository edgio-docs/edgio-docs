import {useRouter} from 'next/router';
import styled from 'styled-components';

import {IconExternalLink} from 'components/Icon/IconExternalLink';

const StyledEditPage = styled.div`
  margin-top: 50px;

  a {
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    color: var(--colors-blue0);
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    text-decoration: none;
    gap: 8px;
    position: relative;

    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 1px;
      left: 0;
      background: currentColor;
      width: 0;
      transform: translateY(2px);
      transition: width 0.2s ease-in-out;
    }

    &:hover ::after {
      width: 100%;
    }
  }
`;

const baseURL =
  'https://github.com/layer0-docs/layer0-docs/edit/main/src/pages';

export default function EditPage() {
  const router = useRouter();

  if (router.asPath === '/guides/changelog') {
    return null;
  }

  return (
    <StyledEditPage>
      <a
        target="_blank"
        href={`${baseURL}${router.asPath}.md`}
        rel="noreferrer">
        <IconExternalLink />
        edit this guide on github
      </a>
    </StyledEditPage>
  );
}
