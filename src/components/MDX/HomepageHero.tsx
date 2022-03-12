import Image from 'next/image';
import * as React from 'react';
import styled from 'styled-components';
import Container from '../Layout/Container';
import LightHeaderGraphics from '../../../public/images/home/LightHeaderGraphics.svg';
import DarkHeaderGraphics from '../../../public/images/home/DarkHeaderGraphics.svg';

const StyledHomepageHero = styled.div`
  min-height: 446px;
  line-height: 1.3;
  background: var(--homepage-hero-gradient-bg);

  .section-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    padding: 40px 0 20px 0;
    background-image: url('/images/home/HomepageHeroWaves.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;

    @media (max-width: 1086px) {
      grid-template-columns: 1fr;
      row-gap: 50px;
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
  }

  .header-graphics {
    display: flex;
    justify-content: flex-end;
  }

  .headline {
    font-size: 32px;
    color: var(--black1);
    letter-spacing: -0.663px;
    font-weight: bold;
  }

  .subheadline {
    font-size: 18px;
    color: var(--get-started-card-sub-bg);
  }

  .figure {
    img {
      max-width: 100%;
    }
  }

  .container {
    max-width: 1228px;
    margin: 0 auto;
  }
`;

function HomepageHero() {
  return (
    <StyledHomepageHero>
      <Container>
        <div className="copy">
          <h1 className="headline">Layer0 Documentation</h1>
          <p className="subheadline">
            The powerful CDN platform that integrates edge logic into your
            application code & extends the edge to the browser.
          </p>
        </div>
        <figure className="header-graphics">
          <div id="dark-theme-switcher">
            <Image src={LightHeaderGraphics} alt="Layer0 Documentation" />
          </div>
          <div id="light-theme-switcher">
            <Image src={DarkHeaderGraphics} alt="Layer0 Documentation" />
          </div>
        </figure>
      </Container>
    </StyledHomepageHero>
  );
}

export default HomepageHero;
