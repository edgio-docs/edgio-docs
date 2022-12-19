import styled from 'styled-components';

import {PRODUCT} from '../../../../constants';

const StyledBanner = styled.div`
  display: block;
  text-align: center;
  color: #fff;
  background: var(--lg-primary);
  font-size: calc(1rem - 2px);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;

  a {
    color: #fff;
    text-decoration: underline;
  }
`;

export default function Banner() {
  return (
    <StyledBanner>
      <p>
        🎉 Introducing {PRODUCT} v6 which supports Node.js v16.{' '}
        <a href="/guides/reference/v6_migration">Learn how to upgrade.</a> 🎉
      </p>
    </StyledBanner>
  );
}
