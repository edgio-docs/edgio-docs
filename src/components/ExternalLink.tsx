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
  font-size: 0.8rem;
`;

export function ExternalLink({
  href,
  target,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <ExternalLinkWrapper
      href={href}
      target={target ?? '_blank'}
      rel="noopener noreferrer"
      {...props}>
      {children}
      <ExternalLinkIcon>
        <FaExternalLinkAlt />
      </ExternalLinkIcon>
    </ExternalLinkWrapper>
  );
}

ExternalLink.displayName = 'ExternalLink';
