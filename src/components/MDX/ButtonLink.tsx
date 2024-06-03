import {UrlObject} from 'url';

import Link from 'next/link';
import styled, {css} from 'styled-components';

import {IconDeploy, IconGitHub, IconGitHubDark} from 'components/Icon';
import {useTheme} from 'contexts/ThemeContext';

const IconLayer0 = () => {
  return (
    <svg viewBox="0 0 77 68.96" width="25">
      <path
        fill="#e95495"
        d="M71.42 47.54L38.5 63.7 5.58 47.54 38.5 31.38l32.92 16.16z"></path>
      <path d="M38.5 65.2a1.52 1.52 0 01-.66-.15L4.92 48.89a1.5 1.5 0 010-2.7L37.84 30a1.53 1.53 0 011.32 0l32.92 16.19a1.5 1.5 0 010 2.7L39.16 65.05a1.52 1.52 0 01-.66.15zM9 47.54L38.5 62 68 47.54 38.5 33.05z"></path>
      <path
        fill="#ffffff"
        d="M71.42 38.6L38.5 54.76 5.58 38.6 38.5 22.44 71.42 38.6z"
        opacity="0.38"></path>
      <path d="M38.5 56.26a1.52 1.52 0 01-.66-.15L4.92 40a1.5 1.5 0 010-2.69L37.84 21.1a1.46 1.46 0 011.32 0l32.92 16.16a1.5 1.5 0 010 2.69L39.16 56.11a1.52 1.52 0 01-.66.15zM9 38.6l29.5 14.49L68 38.6 38.5 24.11z"></path>
      <path
        fill="#ffffff"
        d="M71.42 29.67L38.5 45.83 5.58 29.67 38.5 13.51l32.92 16.16z"
        opacity="0.38"></path>
      <path d="M38.5 47.33a1.4 1.4 0 01-.66-.16L4.92 31a1.5 1.5 0 010-2.69l32.92-16.15a1.53 1.53 0 011.32 0l32.92 16.16a1.5 1.5 0 010 2.69L39.16 47.17a1.4 1.4 0 01-.66.16zM9 29.67l29.5 14.49L68 29.67 38.5 15.18z"></path>
    </svg>
  );
};

interface IStyledButtonLinkProps {
  type: 'default' | 'code' | 'deploy';
  variant: 'fill' | 'stroke';
}

const StyledButtonLink = styled.div.attrs<IStyledButtonLinkProps>((props) => ({
  type: props.type || 'default',
  variant: props.variant || 'fill',
}))<IStyledButtonLinkProps>`
  max-width: fit-content;

  > a {
    padding: ${(props) => (props.type === 'deploy' ? '0' : '6px 16px')};
    border-radius: 4px;
    text-decoration: none;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    display: grid;
    grid-template-columns: ${(props) =>
      props.type === 'deploy' ? 'auto' : 'auto 1fr'};
    column-gap: ${(props) => (props.type === 'default' ? '0' : '8px')};

    /* type=default */
    ${(props) =>
      props.variant === 'fill' &&
      css`
        color: #fff;
        background-color: var(--colors-blue0);
      `}

    ${(props) =>
      props.variant === 'stroke' &&
      css`
        color: inherit;
        border: 1px solid var(--colors-blue0);
      `}
  }
`;

export default function ButtonLink({
  variant,
  type = 'default',
  children = false,
  href,
  withIcon,
}: {
  variant: 'fill' | 'stroke';
  type: 'default' | 'code' | 'deploy';
  children?: React.ReactNode;
  href: string | UrlObject;
  withIcon: boolean;
}) {
  const {themedValue} = useTheme();
  return (
    <StyledButtonLink {...{type, variant}}>
      <Link href={href} passHref legacyBehavior>
        <a target="_blank">
          {withIcon && (
            <div className="icon-wrap">
              {type === 'default' ? (
                'ℹ️'
              ) : type === 'code' ? (
                themedValue(<IconGitHub />, <IconGitHubDark />)
              ) : type === 'deploy' ? (
                <IconDeploy />
              ) : (
                <IconLayer0 />
              )}
            </div>
          )}
          {children}
        </a>
      </Link>
    </StyledButtonLink>
  );
}
