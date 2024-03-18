import styled from 'styled-components';

import SearchComponent from 'components/Home/SearchComponent';

import Container from '../../Layout/Container';

const HeroContainer = styled.div`
  background: var(--homepagehero-bg-image);
  height: 250px;
  line-height: 1.3;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Align items to the bottom */
  margin-bottom: 20px;
  padding-bottom: 20px; /* Space from bottom to SearchComponent */
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px; /* Space between .content and SearchComponent */
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 0 20px;

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
`;

export default function HomeHero() {
  return (
    <HeroContainer>
      <StyledContainer>
        <Content className="content">
          <h1>Speed, Security, and Simplicity at the Edge</h1>
        </Content>
        <SearchComponent />
      </StyledContainer>
    </HeroContainer>
  );
}
