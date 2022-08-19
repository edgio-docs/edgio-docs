import {Vimeo} from 'mdx-embed';
import styled from 'styled-components';

import {PRODUCT} from '../../../constants';

import SectionHeader from './SectionHeader';

const StyledComp = styled.div`
  display: grid;
  row-gap: 42px;

  .video-categories {
    display: grid;
    gap: 54px;
  }

  .video-category {
    padding-bottom: 54px;

    :not(:last-child) {
      box-shadow: inset 0px -1px var(--hr-secondary);
    }

    .video-category__title {
      margin-bottom: 20px;
      color: var(--homepage-section-title-color);
    }
  }

  .videos {
    --minmax-width: minmax(400px, 1fr);
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--minmax-width));
    gap: 54px;

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

    > .mdx-embed {
      background-color: var(--bg-secondary);
    }

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
          id: '691615425',
        },
        {
          title: 'JavaScript-Configurable CDN',
          url: 'https://player.vimeo.com/video/691580288?h=75c3be1062',
          id: '691580288',
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
          id: '691580230',
        },
        {
          title: `What are the ${PRODUCT} DevTools`,
          url: 'https://player.vimeo.com/video/691580899',
          id: '691580899',
        },
        {
          title: 'Deep Request Inspection',
          url: 'https://player.vimeo.com/video/691615206?h=7c939ea661',
          id: '691615206',
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
          id: '691615391',
        },
        {
          title: 'Performance & Core Web Vitals',
          url: 'https://player.vimeo.com/video/691580370?h=73d8a65b9a',
          id: '691580370',
        },
        {
          title: 'Getting Started with GraphQL',
          url: 'https://player.vimeo.com/video/691615246?h=f0a9b2a5e7',
          id: '691615246',
        },
        {
          title: 'Sub-Second Performance',
          url: 'https://player.vimeo.com/video/691580446?h=b9ca883f12',
          id: '691580446',
        },
        {
          title: 'Caching Cockpit',
          url: 'https://player.vimeo.com/video/691580407?h=eefaaabf12',
          id: '691580407',
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
          id: '691580518',
        },
      ],
    },
    {
      title: 'Deploying',
      slug: 'deploying',
      videos: [
        {
          title: `Deploy GitHub Project to ${PRODUCT}`,
          url: 'https://player.vimeo.com/video/691593915',
          id: '691593915',
        },
        {
          title: 'Deploy Fearlessly',
          url: 'https://player.vimeo.com/video/691580568?h=b2f1b825c1',
          id: '691580568',
        },
        {
          title: 'Deploy and Debug',
          url: 'https://player.vimeo.com/video/691580336?h=93f2c0511a',
          id: '691580336',
        },
        {
          title: 'Deploying via the CLI',
          url: 'https://player.vimeo.com/video/691580254?h=8eb4753b30',
          id: '691580254',
        },
      ],
    },
  ];

  return (
    <StyledComp>
      <SectionHeader title={`${PRODUCT} Videos and Tutorials`} />

      <div className="video-categories">
        {categorisedVidoes.map((video, index) => {
          return (
            <div className="video-category" key={video.slug}>
              <h3 className="video-category__title">{video.title}</h3>
              <div className="videos">
                {video.videos.map((item, vidIndex) => (
                  <div className="video" key={`${index}-${vidIndex}`}>
                    <Vimeo vimeoId={item.id} />
                    <h4 className="title">{item.title}</h4>
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
