import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

interface VideoProps {
  src: string;
}

// https://css-tricks.com/responsive-iframes
// https://codepen.io/chriscoyier/pen/RXPjWp
const StyledVideo = styled.div`
  background: #353535;

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

function Video({src}: VideoProps) {
  const isLoaded = useHydrationIsLoaded();

  if (!isLoaded) {
    return <></>;
  }

  const style = {'--aspect-ratio': '16/9'} as React.CSSProperties;
  return (
    <StyledVideo style={style}>
      <ReactPlayer
        {...{url: src, controls: true, width: '100%', height: '100%'}}
      />
    </StyledVideo>
  );
}

Video.displayName = 'Video';

export default Video;
