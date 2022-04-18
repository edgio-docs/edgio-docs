import {UrlObject} from 'url';

import Link from 'next/link';
import styled, {css} from 'styled-components';

const IconCode = () => {
  return (
    <svg viewBox="0 0 1024 1024" fill="white" width="20">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28 43.52 0 87.04 5.76 128 17.28 97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0z"
        fill="#1B1F23"></path>
    </svg>
  );
};

const IconLayer0 = () => {
  return (
    <svg viewBox="0 0 77 68.96" width="25">
      <path
        fill="#e95495"
        d="M71.42 47.54L38.5 63.7 5.58 47.54 38.5 31.38l32.92 16.16z"></path>
      <path d="M38.5 65.2a1.52 1.52 0 01-.66-.15L4.92 48.89a1.5 1.5 0 010-2.7L37.84 30a1.53 1.53 0 011.32 0l32.92 16.19a1.5 1.5 0 010 2.7L39.16 65.05a1.52 1.52 0 01-.66.15zM9 47.54L38.5 62 68 47.54 38.5 33.05z"></path>
      <path
        fill="#fff"
        d="M71.42 38.6L38.5 54.76 5.58 38.6 38.5 22.44 71.42 38.6z"
        opacity="0.38"></path>
      <path d="M38.5 56.26a1.52 1.52 0 01-.66-.15L4.92 40a1.5 1.5 0 010-2.69L37.84 21.1a1.46 1.46 0 011.32 0l32.92 16.16a1.5 1.5 0 010 2.69L39.16 56.11a1.52 1.52 0 01-.66.15zM9 38.6l29.5 14.49L68 38.6 38.5 24.11z"></path>
      <path
        fill="#fff"
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
    padding: 6px 16px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: ${(props) => (props.type === 'default' ? '0' : '8px')};

    /* type=default */
    ${(props) =>
      props.variant === 'fill' &&
      css`
        color: #fff;
        background-color: #e91e63;
      `}

    ${(props) =>
      props.variant === 'stroke' &&
      css`
        color: inherit;
        border: 1px solid #e91e63;
      `}
  }
`;

export default function ButtonLink({
  variant,
  type = 'default',
  children,
  href,
  withIcon,
}: {
  variant: 'fill' | 'stroke';
  type: 'default' | 'code' | 'deploy';
  children: React.ReactNode;
  href: string | UrlObject;
  withIcon: boolean;
}) {
  return (
    <StyledButtonLink {...{type, variant}}>
      <Link href={href} passHref>
        <a target="_blank">
          {withIcon && (
            <div className="icon-wrap">
              {type === 'default' ? (
                'ℹ️'
              ) : type === 'code' ? (
                <IconCode />
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
