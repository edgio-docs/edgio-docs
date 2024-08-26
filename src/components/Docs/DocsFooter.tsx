import styled from 'styled-components';

import {
  IconEdgioSquareLogo,
  IconEdgioSquareLogoDark,
} from 'components/Icon/IconEdgioSquareLogo';
import Link from 'components/MDX/Link';
import {ContextType, useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';

const StyledDocsFooter = styled.footer`
  padding-top: 20px;

  @media (max-width: 585px) {
    justify-content: center;
  }

  @media (max-width: 460px) {
    font-size: 12px;
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

  color: var(--docs-footer-color);
  // bottom: 0;
  // position: absolute;
  width: 100%;

  .footer-start {
    background-color: var(--docs-footer-bg);
    border-bottom: 2px solid var(--border-primary);
  }

  .footer-end {
    background-color: var(--docs-footer-bg);
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

// Applications resources (default)
const appResources = [
  {
    title: 'Video Tutorials',
    href: 'https://www.youtube.com/@Edgio/videos',
  },
  {
    title: 'Status',
    href: 'https://status.edg.io/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
  },
  {
    title: 'Support',
    href: 'https://edg.io/contact-support/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
  },
  {
    title: 'Applications v7 Release Notes',
    href: '/applications/v7/release_notes',
    versioned: false,
  },
  {
    title: 'Applications v7 NPM Package Changelog',
    href: '/applications/v7/changelog',
    versioned: false,
  },
];

// Delivery resources
const deliveryResources = [
  {
    title: 'Status',
    href: 'https://status.edg.io/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
  },
  {
    title: 'Support',
    href: 'https://edg.io/contact-support/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
  },
  {
    title: 'Control Change Log',
    href: '/delivery/control/support_tools/change_log',
  },
  {
    title: 'Delivery Change Log',
    href: '/delivery/delivery/change_log',
  },
  {
    title: 'IP Allow List',
    href: 'https://control.llnw.com/aportal/support/documentation/iprssfeed/v2',
    external: true,
  },
];

const secFooterLinks = [
  {
    name: 'About Edgio',
    href: 'https://edg.io/company/about-us/',
  },
  {
    name: 'Careers',
    href: 'https://edg.io/company/careers/',
  },
  {
    name: 'Support',
    href: 'https://edg.io/contact-support/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
  },
  {
    name: 'Investors',
    href: 'https://investors.edg.io/',
  },
  {
    name: 'Press Releases',
    href: 'https://investors.edg.io/news-and-events/press-releases',
  },
];

const pryFooterLinks = ({resources = appResources}) => ({
  resources,
  community: [
    {
      title: 'Forum',
      href: 'https://forum.edg.io/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Blog',
      href: 'https://edg.io/resources/blog/',
    },
    {
      title: 'JavaScript Jam',
      href: 'https://www.javascriptjam.com',
    },
    {
      title: 'Contributing',
      href: '/applications/v7/contributing',
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
      href: 'https://edg.io/media/delivery/',
    },
    {
      title: 'Streaming',
      href: 'https://edg.io/media/uplynk/',
    },
    {
      title: 'Performance',
      href: 'https://edg.io/app/performance/',
    },
    {
      title: 'Security',
      href: 'https://edg.io/app/security/',
    },
    {
      title: 'Sites',
      href: 'https://edg.io/app/sites/',
    },
  ],
});

export default function DocsFooter() {
  const {theme, themedValue} = useTheme();
  const {config, context} = useAppContext();
  const {PRODUCT} = config;

  // Resources links differ across products
  const resources = [];
  switch (context) {
    case ContextType.DELIVERY:
      resources.push(...deliveryResources);
      break;
    case ContextType.APPLICATIONS:
      resources.push(...appResources);
      break;
    case ContextType.HOME:
      resources.push(...appResources);
      break;
    default:
      console.warn('No context provided for footer resources. Using default.');
      break;
  }

  const footerLinks = pryFooterLinks({resources});
  return (
    <StyledDocsFooter>
      <div className="footer-start">
        <nav className="footer-start__nav">
          <div className="logo-wrap">
            <div className="logo">
              {themedValue(
                <IconEdgioSquareLogo />,
                <IconEdgioSquareLogoDark />
              )}
            </div>
          </div>
          <FooterNavItem title="Products" items={footerLinks.products} />
          <FooterNavItem title="Resources" items={footerLinks.resources} />
          <FooterNavItem title="Community" items={footerLinks.community} />
          <FooterNavItem title="Social" items={footerLinks.social} />
        </nav>
      </div>
      <div className="footer-end">
        <nav className="footer-end__nav">
          <p className="copy">
            Copyright &copy; {new Date().getFullYear()} {PRODUCT}. All rights
            reserved.
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
  items: Array<{title: string; href: string; versioned?: boolean}>;
}) {
  return (
    <nav className="footerNavItem">
      <h4 className="navItemTitle">{title}</h4>
      <ul className="navList">
        {items.map(({href, title, versioned = true}) => (
          <li className="navListItem" key={href}>
            <Link href={href} versioned={versioned}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
