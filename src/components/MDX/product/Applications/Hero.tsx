import {Content, HeroContainer, StyledContainer} from 'components/Hero';
import SearchComponent from 'components/SearchComponent';

export function ApplicationsHero() {
  return (
    <HeroContainer backgroundImage="var(--applicationshero-bg-image)">
      <StyledContainer>
        <Content>
          <h1>Modern CDN for Applications</h1>
        </Content>
        <SearchComponent />
      </StyledContainer>
    </HeroContainer>
  );
}
