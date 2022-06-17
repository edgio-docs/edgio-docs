import Link from 'next/link';
import styled from 'styled-components';

import {IconArrow} from 'components/Icon';
import {useRouteMeta} from 'components/Layout/useRouteMeta';

const StyledDocsPagination = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 50px;

  .pagination-link {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;
    border: 2px solid var(--hr-grey1);
    padding: 20px;
    border-radius: 4px;
    color: var(--colors-blue0);
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.1s;

    :hover {
      transform: scale(1.01);
    }

    .label {
      color: var(--docs-color);
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
  const {route, nextRoute, prevRoute} = useRouteMeta();

  if (!route) {
    return null;
  }

  return (
    <StyledDocsPagination>
      {prevRoute?.path ? (
        <Link href={prevRoute.path}>
          <a className="prev pagination-link">
            <IconArrow displayDirection="left" />
            <div className="content">
              <span className="label">Previous</span>
              <p className="title">{prevRoute.title}</p>
            </div>
          </a>
        </Link>
      ) : (
        <div />
      )}
      {nextRoute?.path ? (
        <Link href={nextRoute.path}>
          <a className="next pagination-link">
            <div className="content">
              <span className="label">Next</span>
              <p className="title">{nextRoute.title}</p>
            </div>
            <IconArrow displayDirection="right" />
          </a>
        </Link>
      ) : (
        <div />
      )}
    </StyledDocsPagination>
  );
}
