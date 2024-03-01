import styled from 'styled-components';

import Container from '../../Layout/Container';

import SearchComponent from 'components/Home/SearchComponent';

const HeroContainer = styled.div`
  background: var(--applicationshero-bg-image);
  height: 370px;
  line-height: 1.3;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px 20px;

    h1,
    h2 {
      text-align: center;
      margin: 0;
    }

    h1 {
      color: var(--text-primary);
      font-family: 'Mark Bold';
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
    }

    h2 {
      color: var(--text-secondary);
      font-family: 'Inter';
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
    }

    a {
      color: var(--colors-blue0);
      text-decoration: none;
    }
  }
`;

function ApplicationsHero() {
  return (
    <HeroContainer>
      <Container>
        <div className="content">
          <h1>Faster Performance. Smarter Security. Happier Teams.</h1>
        </div>
        <SearchComponent />
      </Container>
    </HeroContainer>
  );
}

export default ApplicationsHero;

// /* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
// import styled from 'styled-components';

// import Container, {StyledContainer} from '../../Layout/Container';
// import Link from '../Link';

// const StyledHero = styled.div`
//   background: var(--homepagehero-bg-image);
//   min-height: 501px;
//   line-height: 1.3;
//   background-repeat: no-repeat;
//   background-position: bottom right;
//   background-size: contain;
//   border-radius: 4px;

//   .section-container {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     position: relative;
//     padding: 40px 0 20px 0;

//     @media (max-width: 600px) {
//       grid-template-columns: 1fr;
//       row-gap: 100px;
//     }
//   }

//   .hero-inner__content,
//   .copy {
//     height: 100%;
//   }

//   .copy {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     gap: 18px;

//     a {
//       color: var(--colors-blue0);
//       text-decoration: none;
//     }
//   }

//   .subheadline {
//     font-size: 18px;
//   }

//   ${StyledContainer} {
//     max-width: 1228px;
//     margin: 0 auto;
//     height: 100%;

//     .section-container {
//       height: 100%;
//     }
//   }
// `;

// function ApplicationsHero() {
//   return (
//     <StyledHero>
//       <Container>
//         <div className="copy">
//           <div id="dark-theme">
//             <Image
//               src="/images/home/edgio-logo-light.png"
//               alt="Edgio Applications"
//               width={296}
//               height={142}
//               priority={true}
//               unoptimized
//             />
//           </div>
//           <div id="light-theme">
//             <Image
//               src="/images/home/edgio-logo-light.png"
//               alt="Edgio Applications"
//               width={296}
//               height={142}
//               priority={true}
//               unoptimized
//             />
//           </div>
//           <p>
//             <Link href="https://investors.edg.io/news/press-releases/news-details/2022/Limelight-Completes-Acquisition-of-Yahoos-Edgecast-Combined-Company-Rebrands-as-Edgio-Creating-a-Global-Leader-in-Edge-Enabled-Solutions/default.aspx">
//               Learn more.
//             </Link>
//           </p>
//           <p className="subheadline">
//             Edgio Applications is an Internet-scale platform that makes it easy
//             for teams to build, release, protect, and accelerate their web apps
//             and APIs.
//           </p>
//         </div>
//       </Container>
//     </StyledHero>
//   );
// }

// export default ApplicationsHero;
