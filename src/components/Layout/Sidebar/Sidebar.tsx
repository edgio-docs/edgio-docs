import Link from 'next/link';
import styled from 'styled-components';
import SidebarMenuItems, {
  ISidebarMenuItem,
} from '../../../data/SidebarMenuItems';
import { IconChevron } from '../../Icon/IconChevron';

const StlyedSidebar = styled.div`
  color: black;
  font-size: 14px;
  font-weight: 500;

  .nav-item__box-inner {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .trigger-link {
    display: flex;
    align-items: center;
    column-gap: 10px;
    text-decoration: none;
    padding: 5px 20px;
    transition: 0.2s ease-in-out;
    color: inherit;
    text-decoration: none;

    :hover {
      background-color: #e5e5e5;
      font-weight: 600;
    }
  }

  .icon-box {
    display: flex;
    justify-content: center;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
  }

  .menu-item__title {
    flex: 1;
  }

  .routes {
    margin-left: calc(20px + 16px + 10px);
    position: relative;

    ::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: calc(100% - 20px);
      top: 0;
      transform: translateY(10px);
      border: 0.75px solid #e95495;
    }
  }

  .route {
    display: flex;
    padding: 0 20px 0 4px;

    a {
      flex: 1;
      padding-left: 12px;
      padding: 4px 0 4px 12px;
      color: black;
      text-decoration: none;

      transition: 0.2s ease-in-out;

      :hover {
        background-color: #e5e5e5;
        font-weight: 600;
      }
    }
  }
`;

// function ChildrenRoutes({
//   parentRoutePath,
//   routes,
// }: {
//   parentRoutePath: string;
//   routes: Array<{
//     title: string;
//     path: string;
//     icon?: JSX.IntrinsicElements['svg'];
//   }>;
// }) {
//   return (
//     <div className="routes">
//       {routes.map((route, i) => (
//         <div className="route" key={i}>
//           <Link href={`/${parentRoutePath}/${route.path}`}>{route.title}</Link>
//         </div>
//       ))}
//     </div>
//   );
// }

function ParentRoute({ menuItem }: { menuItem: ISidebarMenuItem }) {
  return (
    <div className="nav-item__box-inner">
      <Link href={`/${menuItem.path}`}>
        <a className="trigger-link">
          <div className="icon-box">{menuItem.icon}</div>
          <span className="menu-item__title">{menuItem.title}</span>
          {menuItem.routes && (
            <div className="icon-box">
              <IconChevron displayDirection="right" />
            </div>
          )}
        </a>
      </Link>
    </div>
  );
}

function NavItems() {
  return (
    <>
      {Object.keys(SidebarMenuItems).map((items) => {
        const itemsAsNumber = Number(items);
        const menuItem = SidebarMenuItems[itemsAsNumber];

        return (
          <div className="nav-item__box" key={itemsAsNumber}>
            <ParentRoute {...{ menuItem }} />
            {/* {menuItem.routes && (
              <ChildrenRoutes
                {...{
                  parentRoutePath: menuItem.path,
                  routes: menuItem.routes,
                }}
              />
            )} */}
          </div>
        );
      })}
    </>
  );
}

export function Sidebar() {
  return (
    <StlyedSidebar>
      <div className="nav-container">
        <div className="nav-items">
          <NavItems />
        </div>
      </div>
    </StlyedSidebar>
  );
}
