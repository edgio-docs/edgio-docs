import Image from 'next/image';
import styled from 'styled-components';

import LayerEdgioDark from '../../../public/images/home/l0-to-edgio-dark.png';
import LayerEdgioLight from '../../../public/images/home/l0-to-edgio-light.png';
import Container, {StyledContainer} from '../Layout/Container';

const StyledHomepageHero = styled.div`
  background: var(--homepagehero-bg-image);
  min-height: 501px;
  line-height: 1.3;
  background-repeat: no-repeat;
  background-position: bottom right;
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
              src={LayerEdgioDark}
              width="285.38"
              height="129.74"
              alt="Layer0 is becoming Edgio"
            />
          </div>
          <div id="light-theme-switcher">
            <Image
              src={LayerEdgioLight}
              width="285.38"
              height="129.74"
              alt="Layer0 is becoming Edgio"
            />
          </div>
          <p>
            Learn more about the exciting changes{' '}
            <a href="https://investors.limelight.com/news/press-releases/news-details/2022/Limelight-to-Acquire-Yahoos-Edgecast-Creating-Global-Leader-in-Edge-Enabled-Software-Solutions/default.aspx">
              here.
            </a>
          </p>
          <p className="subheadline">
            Layer0 is a powerful web CDN platform that integrates edge logic
            into your application code & extends the edge to the browser.
          </p>
        </div>
      </Container>
    </StyledHomepageHero>
  );
}

export default HomepageHero;
