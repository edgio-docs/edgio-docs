import styled from 'styled-components';

import {PRODUCT} from '../../../constants';

const StyledDocsFooter = styled.footer`
  @media (max-width: 585px) {
    justify-content: center;
  }

  @media (max-width: 460px) {
    font-size: 12px;
  }

  margin-top: 50px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: var(--docs-footer-bg);
  padding: 16px 20px;
  color: var(--docs-footer-color);
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
      <p className="copy">
        Copyright &copy; {new Date().getFullYear()} {PRODUCT}. All rights
        reserved.
      </p>
      {/* <div className="uptime-status">
        <div className="status-halo"></div>
        <p>All systems operational</p>
      </div> */}
    </StyledDocsFooter>
  );
}
