import NextImage from 'next/image';
import styled from 'styled-components';

const StyledComp = styled.figure`
  img {
    margin: 0 auto;
    display: flex;
    max-width: calc(min(var(--docs-area-width), 100%));
  }
`;

export default function Image({src, alt}: {src: string; alt: string}) {
  return (
    <StyledComp>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...{src, alt}} />
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
