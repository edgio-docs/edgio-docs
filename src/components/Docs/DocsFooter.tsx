import styled from 'styled-components';

import {PRODUCT} from '../../../constants';

const StyledDocsFooter = styled.footer`
  @media (max-width: 585px) {
    justify-content: center;
  }

  @media (max-width: 460px) {
    font-size: 12px;
  }

  margin-top: 50px;
  background-color: var(--docs-footer-bg);
  padding: 16px 0;
  color: var(--docs-footer-color);

  .footer-nav {
    max-width: var(--docs-area-width);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }

  .links {
    padding: 0;
    display: grid;
    list-style: none;
    grid-template-columns: repeat(5, max-content);
    gap: 20px;

    a {
      color: var(--docs-footer-color);
      text-decoration: none;
      font-weight: 500;
    }
  }
`;

const links = [
  {
    name: 'About Edgio',
    href: 'https://edg.io/company/about-us',
  },
  {
    name: 'Careers',
    href: 'https://edg.io/company/careers',
  },
  {
    name: 'Support',
    href: 'https://edg.io/contact-support',
  },
  {
    name: 'Investors',
    href: 'https://investors.edg.io/corporate-profile/default.aspx',
  },
  {
    name: 'Newsroom',
    href: 'https://investors.edg.io/news/press-releases/default.aspx',
  },
];

export default function DocsFooter() {
  return (
    <StyledDocsFooter>
      <nav className="footer-nav">
        <ul className="links">
          {links.map(({name, href}) => (
            <li key={href}>
              <a href={href}>{name}</a>
            </li>
          ))}
        </ul>
        <p className="copy">
          Copyright &copy; {new Date().getFullYear()} {PRODUCT}. All rights
          reserved.
        </p>
      </nav>
    </StyledDocsFooter>
  );
}
