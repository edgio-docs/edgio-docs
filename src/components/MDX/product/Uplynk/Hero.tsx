import {Content, HeroContainer, StyledContainer} from 'components/Hero';
import SearchComponent from 'components/SearchComponent';

export function UplynkHero() {
  return (
    <HeroContainer backgroundImage="var(--uplynkhero-bg-image)">
      <StyledContainer>
        <Content>
          <h1>Something something Uplynk</h1>
        </Content>
        <SearchComponent />
      </StyledContainer>
    </HeroContainer>
  );
}
