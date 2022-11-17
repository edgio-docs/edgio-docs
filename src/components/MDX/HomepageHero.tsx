/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import styled from 'styled-components';

import Container, {StyledContainer} from '../Layout/Container';

import Link from './Link';

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
          <div id="dark-theme">
            <Image
              src="/images/home/l0-to-edgio-light.webp"
              alt="Layer0 is now Edgio Applications"
              width={286}
              height={230}
              priority={true}
              unoptimized
            />
          </div>
          <div id="light-theme">
            <Image
              src="/images/home/l0-to-edgio-dark.webp"
              alt="Layer0 is now Edgio Applications"
              width={286}
              height={230}
              priority={true}
              unoptimized
            />
          </div>
          <p>
            <Link href="https://investors.edg.io/news/press-releases/news-details/2022/Limelight-Completes-Acquisition-of-Yahoos-Edgecast-Combined-Company-Rebrands-as-Edgio-Creating-a-Global-Leader-in-Edge-Enabled-Solutions/default.aspx">
              Learn more.
            </Link>
          </p>
          <h1 className="subheadline">
            Edgio Applications is an Internet-scale platform that makes it easy
            for teams to build, release, protect, and accelerate their web apps
            and APIs.
          </h1>
        </div>
      </Container>
    </StyledHomepageHero>
  );
}

export default HomepageHero;
