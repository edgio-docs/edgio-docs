import Link from 'next/link';
import {IconType} from 'react-icons';
import styled from 'styled-components';

import {IconEdgecast, IconLimelight, IconUplynk} from 'components/Icon';
import {IconArrow} from 'components/Icon/IconArrow';

const NextLink = Link;

interface IItemProps {
  icon: React.NamedExoticComponent<React.SVGProps<SVGSVGElement>> | IconType;
  title: string;
  subtitle: string;
  href: string;
  hrefText: string;
}

function DocTile({icon: Icon, title, subtitle, href, hrefText}: IItemProps) {
  return (
    <NextLink href={href}>
      <a className="card">
        <header className="card-header">
          <div className="card-icon__box">
            <Icon style={{width: 30, height: 30, color: '#687077'}} />
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
      </a>
    </NextLink>
  );
}

const StyledAddtlDocs = styled.div`
  line-height: 1.3;

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
`;

export default function AddtlDocs({children}: {children: React.ReactNode}) {
  return (
    <StyledAddtlDocs>
      {children}

      <div className="cards">
        <DocTile
          icon={IconUplynk}
          title="Uplynk"
          subtitle="Content delivery network service, used for delivery of digital media content and software."
          href="/guides/getting_started"
          hrefText="View Docs"
        />
        <DocTile
          icon={IconLimelight}
          title="Limelight"
          subtitle="Content delivery network service, used for delivery of digital media content and software."
          href="/guides/sites_frameworks/getting_started"
          hrefText="View Docs"
        />
        <DocTile
          icon={IconEdgecast}
          title="Edgecast"
          subtitle="Developer tools for quickly deploying edge-enabled solutions for web, events and streaming content."
          href="/guides/security"
          hrefText="View Docs"
        />
      </div>
    </StyledAddtlDocs>
  );
}
