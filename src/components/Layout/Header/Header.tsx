import Image from 'next/image';
import styled from 'styled-components';

import Link from 'components/MDX/Link';
import {headerImagePaths} from 'config/appConfig';
import {ContextType, useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';

import AlgoliaSearch from './AlgoliaSearch';
import HeaderNav from './HeaderNav';
import ThemeSwitcher from './ThemeSwitcher';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--nav-header-bg);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto;
  align-items: center;
  gap: 0px;
  padding: 12px 32px;
  border-bottom: 1px solid var(--border-primary);
  height: 72px;
`;

const LogoArea = styled.div`
  grid-row: 1;
  grid-column: 1;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 100%;
  padding: 0;
  justify-content: center;

  .themed-element div {
    display: flex;
    align-items: center;
  }
`;

const HorizontalLine = styled.div`
  background: #17232e;
  grid-row: 2 / span 1;
  grid-column: 1 / -1;
`;

const NavigationArea = styled.nav`
  grid-row: 1;
  grid-column: 2;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-right: 16px;
  min-width: 0;
  overflow: hidden;
  align-items: center;
`;

const ButtonGroup = styled.div`
  grid-row: 1;
  grid-column: 3;
  display: flex;
  gap: 16px;
  justify-self: end;
  height: 32px;
  line-height: 1em;

  a {
    text-decoration: none;
  }
`;

const Button = styled.div<{gradient: string}>`
  padding: 8px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--colors-white0);
  background: ${(props) => props.gradient};
`;

const imagePaths = headerImagePaths;

const Header = () => {
  const {context, version} = useAppContext();
  const {renderThemedElement} = useTheme();

  // all header images must be the same size
  const logoWidth = 337;
  const logoHeight = 48;

  let darkLogo, lightLogo;

  switch (context) {
    case ContextType.APPLICATIONS:
      darkLogo =
        imagePaths.dark[
          `applications_${version}` as keyof typeof imagePaths.dark
        ];
      lightLogo =
        imagePaths.light[
          `applications_${version}` as keyof typeof imagePaths.light
        ];
      break;
    case ContextType.UPLYNK:
      darkLogo = imagePaths.dark.uplynk;
      lightLogo = imagePaths.light.uplynk;
      break;
    case ContextType.DELIVERY:
      darkLogo = imagePaths.dark.delivery;
      lightLogo = imagePaths.light.delivery;
      break;
    default:
      darkLogo = imagePaths.dark.edgioDocs;
      lightLogo = imagePaths.light.edgioDocs;
      break;
  }

  return (
    <HeaderContainer>
      <LogoArea>
        <Link href="/">
          {context &&
            renderThemedElement(
              <Image
                src={darkLogo}
                alt="Edgio"
                priority
                height={logoHeight}
                width={logoWidth}
                unoptimized
              />,
              <Image
                src={lightLogo}
                alt="Edgio"
                priority
                height={logoHeight}
                width={logoWidth}
                unoptimized
              />
            )}
        </Link>
      </LogoArea>
      <NavigationArea>
        <AlgoliaSearch />
        <ThemeSwitcher />
        <HeaderNav />
      </NavigationArea>
      <HeaderButtons />
      <HorizontalLine />
    </HeaderContainer>
  );
};

export default Header;

export const HeaderButtons = () => {
  const {config, context} = useAppContext();
  const {APP_URL, UPLYNK_CMS_URL, DELIVERY_PORTAL_URL} = config;

  let showConsoleButton = false,
    showUplynkButton = false,
    showDeliveryButton = false;

  switch (context) {
    case ContextType.APPLICATIONS:
      showConsoleButton = true;
      break;
    case ContextType.UPLYNK:
      showUplynkButton = true;
      break;
    case ContextType.DELIVERY:
      showDeliveryButton = true;
      break;
    default:
      showConsoleButton = true;
      showUplynkButton = true;
      showDeliveryButton = true;
      break;
  }

  return (
    <ButtonGroup>
      {showConsoleButton && (
        <Link href={APP_URL}>
          <Button gradient="linear-gradient(90deg, #00BDA6 0%, #00A2E2 100%)">
            Edgio Console
          </Button>
        </Link>
      )}
      {showUplynkButton && (
        <Link href={UPLYNK_CMS_URL}>
          <Button gradient="linear-gradient(90deg, #6F1480 0%, #345FB4 53%, #003FE2 100%)">
            Uplynk CMS
          </Button>
        </Link>
      )}
      {showDeliveryButton && (
        <Link href={DELIVERY_PORTAL_URL}>
          <Button gradient="linear-gradient(90deg, #019F7F 0%, #5ACCB5 100%)">
            Control Portal
          </Button>
        </Link>
      )}
    </ButtonGroup>
  );
};
