import styled from 'styled-components';

import SearchComponent from 'components/Home/SearchComponent';

import Container from '../../Layout/Container';

const HeroContainer = styled.div`
  background: var(--applicationshero-bg-image);
  height: 250px;
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
      font-family: 'Inter';
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
          <h1>Modern CDN for Applications</h1>
        </div>
        <SearchComponent />
      </Container>
    </HeroContainer>
  );
}

export default ApplicationsHero;
