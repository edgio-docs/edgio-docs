import {BiGlobe} from 'react-icons/bi';
import {BsPlayCircle} from 'react-icons/bs';
import {BsArrowsFullscreen} from 'react-icons/bs';
import {IconType} from 'react-icons/lib';
import styled from 'styled-components';

import {ExternalLink} from 'components/ExternalLink';
import {IconArrow} from 'components/Icon/IconArrow';

interface IResourceCardProps {
  icon: React.NamedExoticComponent<React.SVGProps<SVGSVGElement>> | IconType;
  title: string;
  subtitle: string;
  href: string;
  hrefText: string;
}

function ResourceCard({
  icon: Icon,
  title,
  subtitle,
  href,
  hrefText,
}: IResourceCardProps) {
  return (
    <ExternalLink href={href} className="card">
      <header className="card-header">
        <div className="card-icon__box">
          <Icon />
        </div>
        <h3 className="card-title">{title}</h3>
      </header>
      <div className="card-content">
        <p className="card-subtitle">{subtitle}</p>
      </div>
      <footer className="card-footer">
        <span>{hrefText}</span>
        <IconArrow displayDirection="right" />
      </footer>
    </ExternalLink>
  );
}

const StyledResources = styled.div`
  line-height: 1.3;
  /*margin-top: 50px;*/

  display: grid;
  row-gap: 20px;

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
  }

  @media screen and (min-width: 1200px) {
    .cards {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }

  .card {
    background: var(--get-started-card-bg);
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    padding: 17px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    text-decoration: none;
    transition: transform 0.1s;
    color: var(--text-primary);

    :hover {
      transform: scale(1.01);
    }
  }

  .card-header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 10px;
  }

  .card-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
  }

  .card-subtitle {
    color: var(--text-secondary);
    margin: 10px 0 12px;
    font-size: 16px;
  }

  .card-footer {
    display: flex;
    column-gap: 7px;
  }

  .card-icon__box svg {
    width: 22px;
    height: 22px;
  }
`;

export default function DocsResources({children}: {children: React.ReactNode}) {
  return (
    <StyledResources>
      {children}

      <div className="cards">
        <ResourceCard
          icon={BsPlayCircle}
          title="Uplynk"
          subtitle="Broadcast a live linear feed, a live event, or video on-demand (VOD)."
          href="https://docs.edgecast.com/video?sgId=7bc47c45-c1d6-4189-b416-552581d86006"
          hrefText="View Docs"
        />
        <ResourceCard
          icon={BiGlobe}
          title="Limelight Delivery"
          subtitle="Content delivery network service, used for delivery of digital media content and software."
          href="https://support.limelight.com/public/en/Default.htm?sgId=7bc47c45-c1d6-4189-b416-552581d86006"
          hrefText="View Docs"
        />
        <ResourceCard
          icon={BsArrowsFullscreen}
          title="Edgecast Delivery"
          subtitle="Developer tools for quickly deploying edge-enabled solutions for web, events and streaming content. "
          href="https://docs.edgecast.com/cdn?sgId=7bc47c45-c1d6-4189-b416-552581d86006"
          hrefText="View Docs"
        />
      </div>
    </StyledResources>
  );
}
