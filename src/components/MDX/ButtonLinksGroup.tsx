import styled from 'styled-components';

const StyledButtonLinksGroup = styled.div`
  display: flex;
  gap: 11px;
  flex-wrap: wrap;
`;

export default function ButtonLinksGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledButtonLinksGroup>{children}</StyledButtonLinksGroup>;
}
