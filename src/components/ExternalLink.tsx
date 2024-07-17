import {AnchorHTMLAttributes} from 'react';

import {FaExternalLinkAlt} from 'react-icons/fa';
import styled from 'styled-components';

const ExternalLinkWrapper = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
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
