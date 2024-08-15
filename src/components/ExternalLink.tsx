import {AnchorHTMLAttributes} from 'react';

import {FaExternalLinkAlt} from 'react-icons/fa';
import styled from 'styled-components';

const ExternalLinkWrapper = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  color: #2993e0;

  // ::after {
  //   content: '';
  //   position: absolute;
  //   bottom: 0;
  //   height: 1px;
  //   left: 0;
  //   background: #2993e0;
  //   width: 0;
  //   transform: translateY(2px);
  //   transition: width 0.2s ease-in-out;
  // }

  // &:hover::after {
  //   width: 100%;
  // }
`;

const ExternalLinkIcon = styled.span`
  margin-left: 0.25rem;
  font-size: 8px;
`;

export function ExternalLink({
  href,
  target,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  // only show icon for "simple" links (eg. not for images, buttons, etc)
  const showIcon =
    Array.isArray(children) &&
    children.length === 1 &&
    typeof children[0] === 'string';

  return (
    <ExternalLinkWrapper
      href={href}
      target={target ?? '_blank'}
      rel="noopener noreferrer"
      {...props}>
      {children}
      {showIcon && (
        <ExternalLinkIcon>
          <FaExternalLinkAlt />
        </ExternalLinkIcon>
      )}
    </ExternalLinkWrapper>
  );
}

ExternalLink.displayName = 'ExternalLink';
