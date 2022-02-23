import Link from 'next/link';
import styled from 'styled-components';
import {IconJamstack} from '../Icon/IconJamstack';
import {IconWebAppCDN} from '../Icon/IconWebAppCDN';

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
    <div className="card">
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
        <NextLink href={href} passHref>
          <a className="card-footer__link">
            <span>{hrefText}</span>
          </a>
        </NextLink>
      </footer>
    </div>
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

  .card {
    background: var(--get-started-card-bg);
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    padding: 17px;
    display: grid;
    grid-template-rows: auto 1fr auto;
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
    color: var(--black1);
  }

  .card-subtitle {
    color: var(--get-started-card-sub-bg);
    margin: 10px 0 12px;
    font-size: 16px;
  }

  .card {
    .card-footer__link {
      color: var(--pink);
    }

    :nth-child(even) {
      .card-footer__link {
        color: #7972fc;
      }
    }
  }
`;

export default function GetStarted({children}: {children: React.ReactNode}) {
  return (
    <StyledGetStarted>
      {children}

      <div className="cards">
        <GetStartedCard
          icon={IconWebAppCDN}
          title="WebApp CDN"
          subtitle="Deploy your web application and start seeing the performance benefits with the Layer0 Edge Network."
          href="/"
          hrefText="Deploy now"
        />
        <GetStartedCard
          icon={IconJamstack}
          title="Jamstack"
          subtitle="Deploy static and dynamic Jamstack sites that run on Layer0’s severless functions."
          href="/"
          hrefText="View Supported Frameworks"
        />
        <GetStartedCard
          icon={IconWebAppCDN}
          title="GraphQL CDN"
          subtitle="Scale and secure your GraphQL API using the Layer0 global CDN and Edge JS."
          href="/"
          hrefText="1-click Deploy"
        />
      </div>
    </StyledGetStarted>
  );
}
