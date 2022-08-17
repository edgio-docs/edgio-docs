import NextImage from 'next/image';
import styled from 'styled-components';

const StyledComp = styled.figure`
  position: relative;
  /* min is 75% of the --docs-area-width  */
  max-width: calc(min(calc(0.75 * var(--docs-area-width))));

  img {
    margin: 0;
    display: flex;
  }
`;

export default function Image({src, alt}: {src: string; alt: string}) {
  // ??
  // The idea here is that we can pass a width and height as query params in the image src.
  // as in: https://example.com/image.png?width=500&height=500
  // or for relative urls: /image.png?width=500&height=500
  //
  // The srcUrl is the URL of the image to be displayed, prepended with a baseUrl.
  // because relative URLs can't be passed to the URL object and the images are
  // served with Edgio . see /guides/image_optimization.md
  //
  // The dimensions returns an object { "width": "", "height": "" } or {} if no width/height params
  const isAbsoluteUrl = src.startsWith('https://');
  const srcUrl = new URL(isAbsoluteUrl ? src : `https://docs.layer0.co${src}`);
  const dimensions = new URLSearchParams(srcUrl.search);
  const width = dimensions.get('width');
  const height = dimensions.get('height');

  const edgeSrc = `https://opt.moovweb.net?img=${srcUrl}`;

  if (width && height) {
    return (
      <div className="image">
        <NextImage {...{src: edgeSrc, alt, width, height}} />
      </div>
    );
  }

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
