import Link from 'next/link';
import styled from 'styled-components';

import {IconArrow} from 'components/Icon';

const StyledDocsPagination = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 50px;

  .pagination-link {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;
    border: 2px solid #363636;
    padding: 20px;
    border-radius: 4px;
    color: #2993e0;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s;

    :hover {
      background-color: #222222;
      transform: scale(1.02);
    }

    .label {
      color: white;
      display: flex;
      gap: 10px;
    }
  }

  .next {
    display: flex;
    justify-content: flex-end;

    .label {
      justify-content: end;
    }
  }
`;

export default function DocsPagination() {
  return (
    <StyledDocsPagination>
      <Link href="#">
        <a className="prev pagination-link">
          <IconArrow displayDirection="left" />
          <div className="content">
            <span className="label">Previous</span>
            <p className="title">Introduction</p>
          </div>
        </a>
      </Link>
      <Link href="#">
        <a className="next pagination-link">
          <div className="content">
            <span className="label">Next</span>
            <p className="title">Welcome to Introduction</p>
          </div>
          <IconArrow displayDirection="right" />
        </a>
      </Link>
    </StyledDocsPagination>
  );
}
