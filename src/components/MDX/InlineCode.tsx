import * as React from 'react';
import styled from 'styled-components';

interface InlineCodeProps {
  isLink: boolean;
}

const StyledCodeWrap = styled.code`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  text-decoration: none;
  padding: 0 4px;
  border-radius: 4px;
  background: var(--inline-code-bg);
  border: 1px solid #d2d5d8;
  font-variant-ligatures: none;
  margin: 0;
  text-align: left;
  -webkit-box-decoration-break: clone;

  &.link {
    color: #2993e0;
  }
`;

function InlineCode({
  isLink,
  children,
}: JSX.IntrinsicElements['code'] & InlineCodeProps) {
  return (
    <StyledCodeWrap className={isLink ? 'link' : ''}>{children}</StyledCodeWrap>
  );
}

InlineCode.displayName = 'InlineCode';

export default InlineCode;
