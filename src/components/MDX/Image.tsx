import NextImage from 'next/image';
import styled from 'styled-components';

const StyledComp = styled.figure`
  position: relative;
  background-color: #1a1a1a;

  /* min is 75% of the --docs-area-width  */
  max-width: calc(min(calc(0.75 * var(--docs-area-width))));
`;

export default function Image({src, alt}: {src: string; alt: string}) {
  return (
    <StyledComp>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...{src, alt}} />
    </StyledComp>
  );
}
