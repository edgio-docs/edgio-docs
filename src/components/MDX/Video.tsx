import React from 'react';
import styled from 'styled-components';

interface VideoProps {
  url: string;
}

// https://css-tricks.com/responsive-iframes
// https://codepen.io/chriscoyier/pen/RXPjWp
const StyledVideo = styled.div`
  &[style*='--aspect-ratio'] > :first-child {
    width: 100%;
  }
  &[style*='--aspect-ratio'] > img {
    height: auto;
  }
  @supports (--custom: property) {
    &[style*='--aspect-ratio'] {
      position: relative;
    }
    &[style*='--aspect-ratio']::before {
      content: '';
      display: block;
      padding-bottom: calc(100% / (var(--aspect-ratio)));
    }
    &[style*='--aspect-ratio'] > :first-child {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }
  }
`;

function Video({url}: VideoProps) {
  var style = {'--aspect-ratio': '16/9'} as React.CSSProperties;

  return (
    <StyledVideo style={style}>
      <iframe
        src={url}
        width={516}
        height={315}
        frameBorder={0}
        allow="picture-in-picture"
        allowFullScreen></iframe>
    </StyledVideo>
  );
}

Video.displayName = 'Video';

export default Video;
