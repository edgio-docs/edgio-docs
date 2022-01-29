import styled from 'styled-components';
import SectionHeader from './SectionHeader';

const StyledComp = styled.div`
  display: grid;
  row-gap: 42px;

  .videos {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 54px;
  }

  .video {
    display: inherit;
    row-gap: 14px;

    .title {
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: #1a1a1a;
    }
  }

  .video-embed__box {
    height: 259px;
    background-color: black;
  }
`;

export default function DeveloperTools() {
  const videos = [
    { title: 'What & Why' },
    { title: 'Deploying a GitHub Project' },
    { title: 'How to Prefetch' },
    { title: 'What are the Layer0 DevTools' },
  ];

  return (
    <StyledComp>
      <SectionHeader title="Layer0 Videos and Tutorials" />

      <div className="videos">
        {videos.map((video, index) => (
          <div className="video" key={index}>
            <h1 className="title">{video.title}</h1>
            <div className="video-embed__box">
              <figure>
                <div className="replace-this-with-iframe" />
              </figure>
            </div>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}
