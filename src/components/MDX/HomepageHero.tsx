import Image from 'next/image';
import styled from 'styled-components';

import Container from '../Layout/Container';

import SearchComponent from 'components/Home/SearchComponent';

const HeroContainer = styled.div`
  background: var(--homepagehero-bg-image);
  min-height: 501px;
  line-height: 1.3;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

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

function HomepageHero() {
  return (
    <HeroContainer>
      <Container>
        <div className="content">
          <h1>Speed, Security, and Simplicity at the Edge</h1>
          <h2>Technical Documentation</h2>
        </div>
        <SearchComponent />
      </Container>
    </HeroContainer>
  );
}

export default HomepageHero;
