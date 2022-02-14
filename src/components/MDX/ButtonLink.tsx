import styled, {css} from 'styled-components';
import Link from 'next/link';
import {UrlObject} from 'url';

interface IStyledButtonLinkProps {
  type: 'default' | 'code' | 'deploy';
  variant: 'fill' | 'stroke';
}

const StyledButtonLink = styled.div.attrs<IStyledButtonLinkProps>((props) => ({
  type: props.type || 'default',
  variant: props.variant || 'fill',
}))<IStyledButtonLinkProps>`
  > a {
    padding: 6px 16px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;

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
        color: #e91e63;
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
        <a>
          {withIcon && (
            <div className="icon-wrap">
              {type === 'default' ? 'ℹ️' : type === 'code' ? '⚠️' : '⛔️'}
            </div>
          )}
          {children}
        </a>
      </Link>
    </StyledButtonLink>
  );
}
