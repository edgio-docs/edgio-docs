import styled from 'styled-components';
import SectionHeader from './SectionHeader';
import Video from 'components/MDX/Video';
import ReactPlayer from 'react-player';

const StyledComp = styled.div`
  display: grid;
  row-gap: 42px;

  .videos {
    --minmax-width: minmax(400px, 1fr);
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--minmax-width));
    gap: 54px;

    /* Can't use CSS Variables in media queries — not yet. */
    /* @media (max-width: ${(props) => props.theme.breakpoints.small}) { */
    @media (max-width: 420px) {
      --minmax-width: minmax(300px, 1fr);
    }

    @media (max-width: 310px) {
      --minmax-width: minmax(250px, 1fr);
    }
  }

  .video {
    display: inherit;
    row-gap: 14px;

    .title {
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: var(--homepage-section-title-color);
    }
  }
`;

export default function VideosandTutorials() {
  const videos = [
    {
      title: 'Deploying a GitHub Project',
      url: 'https://vimeo.com/691593915',
    },
    {
      title: 'What are the Layer0 DevTools',
      url: 'https://vimeo.com/691580899',
    },
  ];

  return (
    <StyledComp>
      <SectionHeader title="Layer0 Videos and Tutorials" />

      <div className="videos">
        {videos.map((video, index) => (
          <div className="video" key={index}>
            <h1 className="title">{video.title}</h1>
            <Video url={video.url} />
          </div>
        ))}
      </div>
    </StyledComp>
  );
}
