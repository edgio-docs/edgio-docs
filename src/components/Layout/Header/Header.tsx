import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import applicationsDarkLogo from '../../../../public/images/home/header/logo/dark/edgio-apps.svg';
import edgioDocsDarkLogo from '../../../../public/images/home/header/logo/dark/edgio-docs.svg';
import uplynkDarkLogo from '../../../../public/images/home/header/logo/dark/edgio-uplynk.svg';
import applicationsLightLogo from '../../../../public/images/home/header/logo/light/edgio-apps.svg';
import edgioDocsLightLogo from '../../../../public/images/home/header/logo/light/edgio-docs.svg';
import uplynkLightLogo from '../../../../public/images/home/header/logo/light/edgio-uplynk.svg';

import HeaderNav from './HeaderNav';
import ThemeSwitcher from './ThemeSwitcher';

import {ContextType, useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';

const HeaderContainer = styled.header`
  background: var(--nav-header-bg);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 2px;
  align-items: center;
  gap: 0px;
  padding: 0 32px;
  border-bottom: 1px solid var(--border-primary);
`;

const LogoArea = styled.div`
  grid-row: 1;
  grid-column: 1;
  display: flex;
  align-items: center;
  height: 100%; /* Ensure the logo area occupies the full height of the header */
  padding: 0 16px; /* Add padding to match the button group */

  img {
    height: 48px;
    max-height: 100%; /* Ensure the image does not exceed the height of its container */
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
`;

const ButtonGroup = styled.div`
  grid-row: 1;
  grid-column: 3;
  display: flex;
  gap: 16px;
  justify-self: end;
  height: 33px;
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

const Header = () => {
  const {config, context} = useAppContext();
  const {APP_URL} = config;
  const {themedValue} = useTheme();

  let darkLogo = edgioDocsDarkLogo,
    lightLogo = edgioDocsLightLogo;

  switch (context) {
    case ContextType.APPLICATIONS:
      darkLogo = applicationsDarkLogo;
      lightLogo = applicationsLightLogo;
      break;
    case ContextType.UPLYNK:
      darkLogo = uplynkDarkLogo;
      lightLogo = uplynkLightLogo;
      break;
  }

  return (
    <HeaderContainer>
      <LogoArea>
        <Link href="/">
          <a>
            <Image
              src={themedValue(darkLogo, lightLogo)}
              alt="Edgio"
              unoptimized
              priority
              height={48}
            />
          </a>
        </Link>
      </LogoArea>
      <NavigationArea>
        <ThemeSwitcher />
        <HeaderNav />
      </NavigationArea>
      <ButtonGroup>
        {(!context || context === ContextType.APPLICATIONS) && (
          <Link href={APP_URL} passHref>
            <a>
              <Button gradient="linear-gradient(90deg, #00BDA6 0%, #00A2E2 100%)">
                Edgio Console
              </Button>
            </a>
          </Link>
        )}
        {(!context || context === ContextType.UPLYNK) && (
          <Button gradient="linear-gradient(90deg, #6F1480 0%, #345FB4 53%, #003FE2 100%)">
            Uplynk CMS
          </Button>
        )}
      </ButtonGroup>
      <HorizontalLine />
    </HeaderContainer>
  );
};

export default Header;
