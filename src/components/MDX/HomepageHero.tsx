import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import HeaderGraphics from '../../../public/images/HeaderGraphics.svg';

const StyledHomepageHero = styled.div`
  min-height: 446px;
  line-height: 1.3;
  font-family: Inter;

  background: linear-gradient(
    180.17deg,
    rgba(255, 255, 255, 0) 0.15%,
    rgba(121, 114, 252, 0.1) 99.84%,
    #fafdff 99.85%
  );

  .hero-inner__content {
    max-width: 1175px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    padding: 40px 20px 0;
    background-image: url('/images/HomepageHeroLightWaves.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;
  }

  .hero-inner__content,
  .copy {
    height: 100%;
  }

  .copy {
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: center;
    gap: 18px;
  }

  .headline {
    font-weight: 600;
    font-size: 28px;
    color: #1a1a1a;
  }

  .subheadline {
    font-size: 18px;
    color: #707070;
    padding-right: 160px;
  }

  .figure {
    img {
      max-width: 100%;
    }
  }
`;

function HomepageHero() {
  return (
    <StyledHomepageHero>
      <div className="hero-inner__content">
        <div className="copy">
          <h1 className="headline">Layer0 Documentation</h1>
          <p className="subheadline">
            The powerful CDN platform that integrates edge logic into your
            application code & extends the edge to the browser.
          </p>
        </div>
        <figure className="header-graphics">
          <Image src={HeaderGraphics as 'svg'} alt="Layer0 Documentation" />
        </figure>
      </div>
    </StyledHomepageHero>
  );
}

export default HomepageHero;
