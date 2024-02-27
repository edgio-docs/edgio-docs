import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import edgioDocsDarkLogo from '../../../../public/images/home/header/logo/dark/edgio-docs.png';
import edgioDocsLightLogo from '../../../../public/images/home/header/logo/light/edgio-docs.png';

import HeaderNav from './HeaderNav';
import ThemeSwitcher from './ThemeSwitcher';

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
  justify-content: center;
  gap: 8px;
`;

const ButtonGroup = styled.div`
  grid-row: 1;
  grid-column: 3;
  display: flex;
  gap: 16px;
  justify-self: end;
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
  const {themedValue} = useTheme();
  return (
    <HeaderContainer>
      <LogoArea>
        <Image
          src={themedValue(edgioDocsDarkLogo, edgioDocsLightLogo)}
          alt="Edgio"
          unoptimized
          priority
        />
      </LogoArea>
      <NavigationArea>
        <ThemeSwitcher />
        <HeaderNav />
      </NavigationArea>
      <ButtonGroup>
        <Button gradient="linear-gradient(90deg, #00BDA6 0%, #00A2E2 100%)">
          Edgio Console
        </Button>
        <Button gradient="linear-gradient(90deg, #6F1480 0%, #345FB4 53%, #003FE2 100%)">
          Uplynk CMS
        </Button>
      </ButtonGroup>
      <HorizontalLine />
    </HeaderContainer>
  );
};

export default Header;
