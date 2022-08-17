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
  // ??
  // The idea here is that we can pass a width and height as query params in the image src.
  // as in: https://example.com/image.png?width=500&height=500
  // or for relative urls: /image.png?width=500&height=500
  //
  // The srcUrl is the URL of the image to be displayed, prepended with `https://`.
  // because relative URLs can't be passed to the URL object
  //
  // The dimensions returns an object { "width": "", "height": "" } or {} if no width/height params
  const srcUrl = new URL(`https://${src}`);
  const dimensions = new URLSearchParams(srcUrl.search);
  const width = dimensions.get('width');
  const height = dimensions.get('height');

  if (width && height) {
    return (
      <div className="image">
        <NextImage {...{src, alt, width, height}} />
      </div>
    );
  }

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
