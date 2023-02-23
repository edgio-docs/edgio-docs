import styled from 'styled-components';

const StyledComp = styled.figure`
  img {
    display: flex;
    max-width: calc(min(var(--docs-area-width), 100%));
  }

  &[data-inline-img='true'] {
    display: inline-flex;
    vertical-align: middle;
  }
`;

export default function Image({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  'data-inline-img'?: boolean;
}) {
  const srcArray = src.split('?');
  const srcSearchParams = srcArray[1] ? srcArray[1] : '';
  const url = new URLSearchParams(srcSearchParams);
  const width = url.get('width');

  if (props['data-inline-img']) {
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
  } else {
    return (
      <StyledComp {...{...props}}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href={src} target="_blank" rel="noopener noreferrer">
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
        </a>
      </StyledComp>
    );
  }
}
