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
    inline
      ? `
    display: inline-flex;
    vertical-align: middle;
  `
      : ''}
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
  const srcArray = src.split('?');
  const srcSearchParams = srcArray[1] || '';
  const url = new URLSearchParams(srcSearchParams);
  const width = url.get('width');

  if (props.inline) {
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
        <a href={src} target="_blank" rel="noopener noreferrer">
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
        </a>
      </StyledComp>
    );
  }
}
