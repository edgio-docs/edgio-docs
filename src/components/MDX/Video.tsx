import {Vimeo} from 'mdx-embed';
import React from 'react';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';

import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

interface VideoProps {
  src: string;
  height: string;
  width: string;
}

// https://css-tricks.com/responsive-iframes
// https://codepen.io/chriscoyier/pen/RXPjWp
interface StyledVideoProps {
  width?: string;
  height?: string;
}

const StyledVideo = styled.div<StyledVideoProps>`
  background: #353535;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};

  &[style*='--aspect-ratio'] > :first-child {
    width: '100%';
  }
  &[style*='--aspect-ratio'] > img {
    height: 'auto';
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

  @media (min-width: 560px) {
    width: 560px;
  }
`;

const StyledWait = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

function Wait() {
  return (
    <StyledWait className="wait.">
      <h1>Loading...</h1>
    </StyledWait>
  );
}

const style = {'--aspect-ratio': '16/9'} as React.CSSProperties;

export default function Video({
  src,
  width = '100%',
  height = 'auto',
}: VideoProps) {
  const isLoaded = useHydrationIsLoaded();

  if (!isLoaded) {
    return <></>;
  }

  return (
    <StyledVideo style={style} width={width} height={height}>
      <ReactPlayer
        {...{
          fallback: <Wait />,
          url: src,
          controls: true,
          width: '100%',
          height: '100%',
        }}
      />
    </StyledVideo>
  );
}

export function VimeoMDXEmbed({id}: {id: string}) {
  return (
    <StyledVideo style={style}>
      <Vimeo vimeoId={id} />
    </StyledVideo>
  );
}
