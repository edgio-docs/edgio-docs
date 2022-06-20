import styled from 'styled-components';

export const StyledContainer = styled.div`
  max-width: var(--container-max-width);
  padding: var(--container-padding);
  margin: 0 auto;
`;

interface IContainerProps {
  size?: 'default' | 'small' | 'large';
  children: React.ReactNode;
}

export default function Container({
  size = 'default',
  children,
}: IContainerProps) {
  return (
    <StyledContainer className={`container-${size}`}>
      <div className="section-container">{children}</div>
    </StyledContainer>
  );
}
