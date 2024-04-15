import styled from 'styled-components';

import Link from 'components/MDX/Link';
import {headerImagePaths as imagePaths} from 'config/appConfig';
import {ContextType, useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';

import {NavMobile} from '../SidebarNav';

const MobileHeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--nav-header-bg);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  padding: 0 16px;
`;

const Spacer = styled.div`
  width: 18px; // Assuming the size of the placeholder or menu icon
  height: 18px; // Ensuring it takes up space but is invisible
`;

const LogoArea = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileHeader = () => {
  const {config, context, version} = useAppContext();
  const {APP_URL, UPLYNK_CMS_URL, DELIVERY_PORTAL_URL} = config;
  const {renderThemedElement} = useTheme();

  let darkLogo, lightLogo;

  switch (context) {
    case ContextType.APPLICATIONS:
      darkLogo = imagePaths.dark[`applications_${version}`];
      lightLogo = imagePaths.light[`applications_${version}`];
      break;
    // Additional cases for UPLYNK, DELIVERY, etc.
    default:
      darkLogo = imagePaths.dark.edgioDocs;
      lightLogo = imagePaths.light.edgioDocs;
      break;
  }

  return (
    <MobileHeaderContainer>
      <NavMobile />
      <LogoArea>
        <Link href="/">
          {context &&
            renderThemedElement(
              <img
                src={toMobilePath(darkLogo)}
                alt="Edgio"
                style={{height: '40px'}} // Ensuring logo height matches design spec
              />,
              <img
                src={toMobilePath(lightLogo)}
                alt="Edgio"
                style={{height: '40px'}} // Ensuring logo height matches design spec
              />
            )}
        </Link>
      </LogoArea>
      <Spacer /> {/* Right Spacer for balance */}
    </MobileHeaderContainer>
  );
};

export default MobileHeader;

function toMobilePath(src: string) {
  return src.replace('.png', '-mobile.png');
}
