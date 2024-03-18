import styled from 'styled-components';

import Container from '../Layout/Container';

export const Content = styled.div`
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

export const HeroContainer = styled.div<{backgroundImage: string}>`
  background: ${({backgroundImage}) => backgroundImage};
  height: 250px;
  line-height: 1.3;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px;
`;
