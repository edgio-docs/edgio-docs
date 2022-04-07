import styled from 'styled-components';

const StyledButtonLinksGroup = styled.div`
  display: flex;
  column-gap: 11px;
  row-gap: 22px;
  flex-wrap: wrap;
  align-items: center;
`;

export default function ButtonLinksGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledButtonLinksGroup>{children}</StyledButtonLinksGroup>;
}
