import styled from 'styled-components';

import {PRODUCT} from '../../../constants';

import {IconEdgioSquareLogo} from 'components/Icon/IconEdgioSquareLogo';
import Link from 'components/MDX/Link';

const StyledDocsFooter = styled.footer`
  @media (max-width: 585px) {
    justify-content: center;
  }

  @media (max-width: 460px) {
    font-size: 12px;

    .links {
      /* grid-template-columns: 1fr; */
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a {
    transition: color 0.3s;
    color: var(--toc-text-link);
    text-decoration: none;
    display: flex;

    :hover {
      color: var(--text-link);
    }
  }

  /* margin-top: 50px; */
  color: var(--docs-footer-color);
  bottom: 0;
  position: absolute;
  width: 100%;

  .footer-start {
    background-color: var(--bg-primary);
  }

  .footer-end {
    background-color: var(--docs-footer-bg);
  }

  .footer-start,
  .footer-end {
    box-shadow: inset 0px 2px var(--hr-secondary);
  }

  .footer-start__nav {
    padding: 60px 20px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;

    .navList {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
    }

    .logo-wrap {
      --size: 64px;
      width: var(--size);
      height: var(--size);

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .footer-end__nav {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-start__nav,
  .footer-end__nav {
    max-width: var(--docs-area-width);
    margin: 0 auto;
  }

  .links {
    padding: 0;
    display: grid;
    list-style: none;
    grid-template-columns: repeat(5, max-content);
    gap: 20px;

    a {
      font-weight: 500;
    }
  }

  @media (max-width: 1140px) {
    .footer-end__nav {
      flex-direction: column;
    }

    .links {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      justify-content: center;
    }

    .copy {
      text-align: center;
      order: 99;
    }
  }

  @media (max-width: 630px) {
    .footer-start__nav {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;

      .logo-wrap {
        display: none;
      }
    }
  }
`;

const secFooterLinks = [
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

const pryFooterLinks = {
  resources: [
    {
      title: 'Video Tutorials',
      href: 'https://vimeo.com/user/776463/folder/9270726',
    },
    {
      title: 'Fiddle',
      href: 'https://fiddle.layer0.co/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Status',
      href: 'https://status.layer0.co/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Support',
      href: 'https://app.layer0.co/help?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'How-to guides',
      href: '/guides/how-to',
    },
    {
      title: 'Changelog',
      href: '/guides/changelog',
    },
  ],
  community: [
    {
      title: 'Forum',
      href: 'https://forum.layer0.co/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Blog',
      href: 'https://edg.io/resources/blog',
    },
    {
      title: 'JavaScript Jam',
      href: 'https://javascriptjam.com',
    },
    {
      title: 'Learning resources',
      href: '/guides/learning',
    },
    // {
    //   title: 'Glossary',
    //   href: '/guides/glossary',
    // },
    {
      title: 'Contributing',
      href: '/guides/contributing',
    },
  ],
  social: [
    {
      title: 'Twitter',
      href: 'https://twitter.com/edgioinc',
    },
    {
      title: 'YouTube',
      href: 'https://www.youtube.com/channel/UCGZ-3KnrSQVUs8ijRtDLQZw',
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/company/edgio',
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/edgioinc',
    },
  ],
  products: [
    {
      title: 'Delivery',
      href: 'https://edg.io/delivery',
    },
    {
      title: 'Streaming',
      href: 'https://edg.io/streaming',
    },
    {
      title: 'App Edge',
      href: 'https://edg.io/appops/app-edge',
    },
    {
      title: 'App Security',
      href: 'https://edg.io/appops/app-security',
    },
    {
      title: 'App Platform',
      href: 'https://edg.io/appops/app-platform',
    },
  ],
};

export default function DocsFooter() {
  return (
    <StyledDocsFooter>
      <div className="footer-start">
        <nav className="footer-start__nav">
          <div className="logo-wrap">
            <div className="logo"></div>
            <IconEdgioSquareLogo />
          </div>
          <FooterNavItem title="Products" items={pryFooterLinks.products} />
          <FooterNavItem title="Resources" items={pryFooterLinks.resources} />
          <FooterNavItem title="Community" items={pryFooterLinks.community} />
          <FooterNavItem title="Social" items={pryFooterLinks.social} />
        </nav>
      </div>
      <div className="footer-end">
        <nav className="footer-end__nav">
          <p className="copy">
            Copyright &copy; {new Date().getFullYear()} {PRODUCT} Inc. All
            rights reserved.
          </p>
          <ul className="links">
            {secFooterLinks.map(({name, href}) => (
              <li key={href}>
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </StyledDocsFooter>
  );
}

function FooterNavItem({
  title,
  items,
}: {
  title: string;
  items: Array<{title: string; href: string}>;
}) {
  return (
    <nav className="footerNavItem">
      <h4 className="navItemTitle">{title}</h4>
      <ul className="navList">
        {items.map(({href, title}) => (
          <li className="navListItem" key={href}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
