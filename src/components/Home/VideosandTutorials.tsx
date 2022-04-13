import styled from 'styled-components';
import SectionHeader from './SectionHeader';
import Video from 'components/MDX/Video';
import ReactPlayer from 'react-player';

const StyledComp = styled.div`
  display: grid;
  row-gap: 42px;

  .video-categories {
    display: grid;
    gap: 54px;
  }

  .video-category {
    box-shadow: inset 0px -1px var(--hr-grey1);
    padding-bottom: 54px;

    .video-category__title {
      margin-bottom: 20px;
    }
  }

  .videos {
    --minmax-width: minmax(400px, 1fr);
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--minmax-width));
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
      font-size: 16px;
      line-height: 21px;
      color: var(--homepage-section-title-color);
    }
  }
`;

export default function VideosandTutorials() {
  const categorisedVidoes = [
    {
      title: 'CDN',
      slug: 'cdn',
      videos: [
        {
          title: 'Serving Static Sites',
          url: 'https://player.vimeo.com/video/691615425?h=afae4ea9fe',
        },
        {
          title: 'JavaScript-Configurable CDN',
          url: 'https://player.vimeo.com/video/691580288?h=75c3be1062',
        },
      ],
    },
    {
      title: 'Developer Tools',
      slug: 'developer-tools',
      videos: [
        {
          title: 'Developer Intro',
          url: 'https://player.vimeo.com/video/691580230?h=d895984d78',
        },
        {
          title: 'What are the Layer0 DevTools',
          url: 'https://vimeo.com/691580899',
        },
        {
          title: 'Deep Request Inspection',
          url: 'https://player.vimeo.com/video/691615206?h=7c939ea661',
        },
      ],
    },
    {
      title: 'Performance and Caching',
      slug: 'performance-and-caching',
      videos: [
        {
          title: 'Measuring Core Web Vitals',
          url: 'https://player.vimeo.com/video/691615391?h=abe5b3c505',
        },
        {
          title: 'Performance & Core Web Vitals',
          url: 'https://player.vimeo.com/video/691580370?h=73d8a65b9a',
        },
        {
          title: 'Getting Started with GraphQL',
          url: 'https://player.vimeo.com/video/691615246?h=f0a9b2a5e7',
        },
        {
          title: 'Sub-Second Performance',
          url: 'https://player.vimeo.com/video/691580446?h=b9ca883f12',
        },
        {
          title: 'Caching Cockpit',
          url: 'https://player.vimeo.com/video/691580407?h=eefaaabf12',
        },
      ],
    },
    {
      title: 'Security',
      slug: 'security',
      videos: [
        {
          title: 'Security Suite',
          url: 'https://player.vimeo.com/video/691580518?h=ec5e0f1370',
        },
      ],
    },
    {
      title: 'Deploying',
      slug: 'deploying',
      videos: [
        {
          title: 'Deploy GitHub Project to Layer0',
          url: 'https://vimeo.com/691593915',
        },
        {
          title: 'Deploy Fearlessly',
          url: 'https://player.vimeo.com/video/691580568?h=b2f1b825c1',
        },
        {
          title: 'Deploy and Debug',
          url: 'https://player.vimeo.com/video/691580336?h=93f2c0511a',
        },
        {
          title: 'Deploying via the CLI',
          url: 'https://player.vimeo.com/video/691580254?h=8eb4753b30',
        },
      ],
    },
  ];

  return (
    <StyledComp>
      <SectionHeader title="Layer0 Videos and Tutorials" />

      <div className="video-categories">
        {categorisedVidoes.map((video, index) => {
          return (
            <div className="video-category" key={video.slug}>
              <h1 className="video-category__title">{video.title}</h1>
              <div className="videos">
                {video.videos.map((item) => (
                  <div className="video" key={index}>
                    <Video src={item.url} />
                    <h1 className="title">{item.title}</h1>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </StyledComp>
  );
}
