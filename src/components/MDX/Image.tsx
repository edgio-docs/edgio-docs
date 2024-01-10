/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';

interface StyledCompProps {
  inline?: boolean;
}

const StyledComp = styled.figure<StyledCompProps>`
  img {
    display: flex;
    max-width: calc(min(var(--docs-area-width), 98%));
  }
  ${({inline}) =>
    inline ? 'display: inline-flex; vertical-align: middle;' : ''}
`;

export default function Image({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  inline?: boolean;
}) {
  const urlSplit = src.split('?');
  const url = urlSplit[0] ? urlSplit[0] : src;

  return props.inline ? (
    <StyledComp {...props}>
      <img src={url} alt={alt} loading="lazy" />
    </StyledComp>
  ) : (
    <StyledComp {...props}>
      <a href={url} target="_blank" rel="noopener noreferrer" data-test="test3">
        <img src={src} alt={alt} loading="lazy" />
      </a>
    </StyledComp>
  );
}
