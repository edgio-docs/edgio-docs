import Link from 'next/link';
import styled from 'styled-components';

import {
  IconNextJS,
  IconNextJSDark,
  IconNuxt,
  IconReact,
  IconVue,
} from 'components/Icon';
import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

const StyledFrameworks = styled.div`
  .framework-lists {
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(174px, 1fr));
    gap: 20px;
  }

  .icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .framework-list__item {
    .framework-link {
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid var(--hr-secondary);
      padding: 8px;
      border-radius: 4px;
      text-decoration: none;
      color: inherit;
    }
  }
`;

const items = {
  default: [
    {
      title: 'Next.js',
      path: '/guides/sites_frameworks/getting_started/next',
      icon: <IconNextJS />,
      iconDark: <IconNextJSDark />,
    },
    {
      title: 'Nuxt3',
      path: '/guides/sites_frameworks/getting_started/nuxt3',
      icon: <IconNuxt />,
      iconDark: <IconNuxt />,
    },
    {
      title: 'Nuxt.js',
      path: '/guides/sites_frameworks/getting_started/nuxt',
      icon: <IconNuxt />,
      iconDark: <IconNuxt />,
    },
    {
      title: 'React',
      path: '/guides/sites_frameworks/getting_started/react',
      icon: <IconReact />,
      iconDark: <IconReact />,
    },
    {
      title: 'Vue.js',
      path: '/guides/sites_frameworks/getting_started/vue',
      icon: <IconVue />,
      iconDark: <IconVue />,
    },
  ],
};

export default function PopularFrameworks() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();

  const routesByColumns = itemsByColumn(items, version, 'title').flat();

  return (
    <StyledFrameworks>
      <ul className="framework-lists">
        {routesByColumns.map((route) => (
          <li key={route.path} className="framework-list__item">
            <Link href={version.toVersionedPath(route.path)} passHref>
              <a className="framework-link">
                <div className="icon" id="light-theme">
                  {/* @ts-ignore */}
                  {route.icon ? route.icon : null}
                </div>
                <div className="icon" id="dark-theme">
                  {/* @ts-ignore */}
                  {route.iconDark ? route.iconDark : null}
                </div>
                <span className="link-text">{route.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </StyledFrameworks>
  );
}
