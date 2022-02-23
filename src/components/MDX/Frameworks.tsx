import Link from 'next/link';
import styled from 'styled-components';
import {getChildrenRoutesFromSidebarMenuItems} from '../../utils/getChildrenRoutesFromSidebarMenuItems';

const StyledFrameworks = styled.div`
  .framework-lists {
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .framework-list__item {
    .framework-link {
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid var(--hr-grey1);
      padding: 8px;
      border-radius: 4px;
      text-decoration: none;
      color: inherit;
    }
  }
`;

export default function Frameworks() {
  const parentPath = 'framework-guides';
  const allRoutes = getChildrenRoutesFromSidebarMenuItems(parentPath);

  return (
    <StyledFrameworks>
      <ul className="framework-lists">
        {allRoutes.map((route) => (
          <li key={route.path} className="framework-list__item">
            <Link href={route.path} passHref>
              <a className="framework-link">
                <div className="icon">{route.icon ? route.icon : null}</div>
                <span className="link-text">{route.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </StyledFrameworks>
  );
}
