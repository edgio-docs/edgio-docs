import styled from 'styled-components';

const StyledCustomPre = styled.div`
  .code-block__inner {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 3px;
    border: 1px solid currentColor;
    border-color: #356369;
    background: #242424;
    border: 2px solid #363636;
  }

  .code-block__header {
    height: 32px;
    background-color: #4a4a4a;
    padding: 6px 6px 6px 8px;
    font-size: 14px;
    color: white;
  }

  .code-block__pre {
    text-align: left;
    margin: 0;
    padding: 10px;
    width: 100%;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  /* reset */
  pre,
  code,
  kbd {
    white-space: pre-wrap;
    margin: 0;
    overflow-x: auto;
    text-align: left;
    /* REMOVE */
    color: white;
  }
`;

export default function CustomPre({children}: {children: React.ReactNode}) {
  return (
    <StyledCustomPre>
      <div className="code-block">
        <div className="code-block__inner">
          <header className="code-block__header">
            typescript/copy/paste/src/routes.ts
          </header>
          <main className="code-block__content">
            <pre className="code-block__pre">{children}</pre>
          </main>
        </div>
      </div>
    </StyledCustomPre>
  );
}
