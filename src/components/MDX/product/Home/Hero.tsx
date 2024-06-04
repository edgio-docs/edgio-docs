import {Content, HeroContainer, StyledContainer} from 'components/Hero';
import SearchComponent from 'components/SearchComponent';

export function HomeHero() {
  return (
    <HeroContainer backgroundImage="var(--homepagehero-bg-image)">
      <StyledContainer>
        <Content>
          <h1>Speed, Security, and Simplicity at the Edge</h1>
        </Content>
        <SearchComponent />
      </StyledContainer>
    </HeroContainer>
  );
}
