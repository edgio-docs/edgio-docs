import Link from 'next/link';
import styled from 'styled-components';

import {IconJamstack} from '../Icon/IconJamstack';
import {IconSecurity} from '../Icon/IconSecurity';
import {IconWebAppCDN} from '../Icon/IconWebAppCDN';

import {IconArrow} from 'components/Icon/IconArrow';
import {IconGraphQLCDN} from 'components/Icon/IconGraphQLCDN';

const NextLink = Link;

interface IGetStartedCardProps {
  icon: React.NamedExoticComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  href: string;
  hrefText: string;
}

function GetStartedCard({
  icon: Icon,
  title,
  subtitle,
  href,
  hrefText,
}: IGetStartedCardProps) {
  return (
    <NextLink href={href}>
      <a className="card">
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
      </a>
    </NextLink>
  );
}

const StyledGetStarted = styled.div`
  line-height: 1.3;
  margin-top: 50px;

  display: grid;
  row-gap: 20px;

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
  }

  @media screen and (min-width: 1200px) {
    .cards {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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

export default function GetStarted({children}: {children: React.ReactNode}) {
  return (
    <StyledGetStarted>
      {children}

      <div className="cards">
        <GetStartedCard
          icon={IconWebAppCDN}
          title="Web CDN"
          subtitle="Deploy your web application and start seeing the performance benefits with the Edgio App Edge Network."
          href="/guides/webapp_cdn_getting_started"
          hrefText="Deploy now"
        />
        <GetStartedCard
          icon={IconJamstack}
          title="Web Application Frameworks"
          subtitle="Deploy static and dynamic Jamstack sites that run on Edgio AppOps' severless functions."
          href="/guides/jamstack_getting_started"
          hrefText="View Supported Frameworks"
        />
        <GetStartedCard
          icon={IconGraphQLCDN}
          title="GraphQL CDN"
          subtitle="Scale and secure your GraphQL API using the App Edge global CDN and EdgeJS."
          href="/guides/graphql"
          hrefText="1-click Deploy"
        />
        <GetStartedCard
          icon={IconSecurity}
          title="App Security"
          subtitle="Edgio's App Security keeps your apps protected without sacrificing performance."
          href="/guides/security"
          hrefText="Learn More"
        />
      </div>
    </StyledGetStarted>
  );
}
