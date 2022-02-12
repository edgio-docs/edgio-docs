import * as React from 'react';
import cn from 'classnames';
import styled from 'styled-components';

const StyledCode = styled.code`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  text-decoration: none;
  padding: 0 4px;
  border-radius: 4px;
  background: #f6f6f7;
  border: 1px solid #d2d5d8;
  overflow-wrap: break-word;
  font-variant-ligatures: none;
  margin: 0;
  overflow-x: auto;
  text-align: left;
  display: inline;

  .isLink {
    /*  */
  }
`;

interface InlineCodeProps {
  isLink: boolean;
}
function InlineCode({
  isLink,
  ...props
}: JSX.IntrinsicElements['code'] & InlineCodeProps) {
  return <StyledCode {...props} />;
}

InlineCode.displayName = 'InlineCode';

export default InlineCode;
