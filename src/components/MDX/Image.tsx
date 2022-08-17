import NextImage from 'next/image';
import styled from 'styled-components';

const StyledComp = styled.figure`
  position: relative;
  /* min is 75% of the --docs-area-width  */
  max-width: calc(min(calc(0.75 * var(--docs-area-width))));

  img {
    margin: 0;
    display: flex;
    background-color: #1a1a1a;
  }
`;

export default function Image({src, alt}: {src: string; alt: string}) {
  const edgeSrc = `https://opt.moovweb.net?quality=30&img=https://docs.layer0.co${src}`;

  return (
    <StyledComp>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...{src: edgeSrc, alt}} />
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
