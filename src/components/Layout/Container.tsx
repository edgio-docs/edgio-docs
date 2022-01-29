import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 1076px;
  margin: 0 auto;
  padding: 0 20px;
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
