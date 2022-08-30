import NextImage from 'next/image';
import styled from 'styled-components';

const StyledComp = styled.figure`
  img {
    margin: 0 auto;
    display: flex;
    max-width: calc(min(var(--docs-area-width), 100%));
  }

  &[data-inline-img='true'] {
    display: inline-flex;
  }
`;

export default function Image({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
}) {
  return (
    <StyledComp {...{...props}}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...{src, alt, loading: 'lazy'}} />
    </StyledComp>
  );
}

export function CustomImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <NextImage
      {...{
        src,
        alt,
        width,
        height,
      }}
    />
  );
}
