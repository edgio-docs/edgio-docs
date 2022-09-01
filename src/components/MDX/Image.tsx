import styled from 'styled-components';

const StyledComp = styled.figure`
  img {
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
  const srcArray = src.split('?');
  const srcSearchParams = srcArray[1] ? srcArray[1] : '';
  const url = new URLSearchParams(srcSearchParams);
  const width = url.get('width');

  return (
    <StyledComp {...{...props}}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...{
          src,
          alt,
          loading: 'lazy',
          ...(width && {
            width,
          }),
        }}
      />
    </StyledComp>
  );
}
