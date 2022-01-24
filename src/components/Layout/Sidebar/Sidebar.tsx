import { IconChevron } from "components/Icon/IconChevron";
import { IconStacks } from "components/Icon/IconStacks";
import Link from "next/link";
import styled from "styled-components";
import SidebarMenuItems from "../../../data/SidebarMenuItems";


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
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: calc(100% - 20px);
        top: 0;
        transform: translateY(10px);
        border: 0.75px solid #E95495;

      }
    }

    .route {
      display: flex;
      padding: 0 20px 0 4px;
      /* padding: 5px 30px 5px 4px; */

      a {
        flex: 1;
        padding-left: 12px;
        padding: 4px 0 4px 12px;

         transition: 0.2s ease-in-out;

:hover {
  background-color: #e5e5e5;
  font-weight: 600;
      }
    }
`

export default function Sidebar() {
  return <StlyedSidebar>
    <div className="nav-container">
      <div className="nav-items">
        <NavItems />
      </div>
    </div>
  </StlyedSidebar>
}


function NavItems() {
  return <>
    {
      Object.keys(SidebarMenuItems).map((item, index) => {
        const menuItems = SidebarMenuItems[item];
        return <div className="nav-item__box" key={index}>
          <div className="nav-item__box-inner">
            <Link href="/">
              <a className='trigger-link'>
                <div className="icon-box">
                  {menuItems.icon}
                </div>
                <span className="menu-item__title">{menuItems.title}</span>
                {
                  menuItems.routes && <NavItemsTriggerButton />
                }
              </a>
            </Link>
          </div>
          {
            menuItems.routes && <div className="routes">
              {
                menuItems.routes.map((route, i) => <div className="route" key={i}>
                  <Link href={route.path}>
                    {route.title}
                  </Link>
                </div>)
              }
            </div>
          }
        </div>
      })
    }
  </>
}

function NavItemsTriggerButton() {
  return <button type="button" className="trigger-button__box trigger-button" >
    <div className="trigger-button__icon hide">
      <IconChevron displayDirection="right" />
    </div>
  </button>
}

