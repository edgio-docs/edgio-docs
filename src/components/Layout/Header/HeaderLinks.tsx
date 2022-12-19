import styled from 'styled-components';

import {ExternalLink} from 'components/ExternalLink';

const headerLinks = [
  [
    'Fiddle',
    'https://fiddle.layer0.co/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
  ],
  ['Forums', 'https://forum.edg.io/?sgId=7bc47c45-c1d6-4189-b416-552581d86006'],
  [
    'Status',
    'https://status.edg.io/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
  ],
  [
    'Support',
    'https://app.layer0.co/help?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
  ],
];

const StyledHeaderLinks = styled.div`
  display: grid;
  text-align: right;
  font-size: calc(1rem - 2px);
  padding: 10px 24px;
  text-decoration: none;
  font-weight: 500;
  align-content: center;
  line-height: 0;
  background: var(--bg-secondary);

  li {
    display: inline-block;
    padding: 0 10px;
  }

  a {
    color: var(--text-primary);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function HeaderLinks() {
  return (
    <StyledHeaderLinks className="docs-header-links">
      <ul className="header-links">
        {headerLinks.map(([title, href]) => {
          return (
            <li className="header-link" key={href}>
              <ExternalLink title={title} href={href}>
                {title}
              </ExternalLink>
            </li>
          );
        })}
      </ul>
    </StyledHeaderLinks>
  );
}
