import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';

import DarkLayer0Edgio from '../../../public/images/home/DarkLayer0Edgio.svg';
import LightLayer0Edgio from '../../../public/images/home/LightLayer0Edgio.svg';
import Container, {StyledContainer} from '../Layout/Container';

const StyledHomepageHero = styled.div`
  background: var(--homepagehero-bg-image);
  min-height: 501px;
  line-height: 1.3;
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
  color: var(--homepagehero-color);

  .section-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    padding: 40px 0 20px 0;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      row-gap: 100px;
    }
  }

  .hero-inner__content,
  .copy {
    height: 100%;
  }

  .copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 18px;

    a {
      color: var(--colors-blue0);
      text-decoration: none;
    }
  }

  .subheadline {
    font-size: 18px;
  }

  ${StyledContainer} {
    max-width: 1228px;
    margin: 0 auto;
    height: 100%;

    .section-container {
      height: 100%;
    }
  }
`;

function HomepageHero() {
  return (
    <StyledHomepageHero>
      <Container>
        <div className="copy">
          <div id="dark-theme-switcher">
            <Image
              src={LightLayer0Edgio}
              alt="Layer0 Documentation"
              unoptimized
            />
          </div>
          <div id="light-theme-switcher">
            <Image
              src={DarkLayer0Edgio}
              alt="Layer0 Documentation"
              unoptimized
            />
          </div>
          <p>
            Learn more about the exciting changes <Link href="/">here.</Link>
          </p>
          <p className="subheadline">
            Edgio is a powerful CDN platform that integrates edge logic into
            your application code & extends the edge to the browser.
          </p>
        </div>
      </Container>
    </StyledHomepageHero>
  );
}

export default HomepageHero;
