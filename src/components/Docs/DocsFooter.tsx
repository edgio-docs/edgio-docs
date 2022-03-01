import styled from 'styled-components';

const StyledDocsFooter = styled.footer`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  background-color: var(--docs-footer-bg, #000000);
  padding: 16px 64px;
  color: var(--docs-footer-color, #ffffff);
  align-items: center;

  .uptime-status {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  .status-halo {
    background: #c6fe4c;
    --size: 9px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }
`;

export default function DocsFooter() {
  return (
    <StyledDocsFooter>
      <div className="copy">
        Copyright &copy; {new Date().getFullYear()} Layer0. All rights reserved.
      </div>
      <div className="uptime-status">
        <div className="status-halo"></div>
        <p>All systems operational</p>
      </div>
    </StyledDocsFooter>
  );
}
