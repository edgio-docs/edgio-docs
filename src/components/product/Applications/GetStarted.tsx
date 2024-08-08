import Link from 'next/link';
import styled from 'styled-components';

import {IconPerformance} from 'components/Icon/IconAppPerformance';
import {IconSecurity} from 'components/Icon/IconAppSecurity';
import {IconSites} from 'components/Icon/IconAppSites';
import {IconArrow} from 'components/Icon/IconArrow';
import {useAppContext} from 'contexts/AppContext';
import useConditioning from 'utils/hooks/useConditioning';

const NextLink = Link;

interface IGetStartedCardProps {
  icon: any; //React.NamedExoticComponent<React.SVGProps<SVGSVGElement>>;
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
    <NextLink href={href} legacyBehavior>
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
    background: var(--home-card-bg);
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    padding: 17px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    text-decoration: none;
    transition: transform 0.1s;
    color: var(--home-card-font-color);

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
  const {
    version: {toVersionedPath, selectedVersion},
  } = useConditioning();
  const {config} = useAppContext();

  let performanceGettingStarted;
  let sitesGettingStarted;

  if (selectedVersion === '4') {
    performanceGettingStarted = `webapp_cdn_getting_started`;
    sitesGettingStarted = `jamstack_getting_started`;
  } else {
    performanceGettingStarted = `getting_started`;
    sitesGettingStarted = `sites_frameworks/getting_started`;
  }

  return (
    <StyledGetStarted>
      {children}

      <div className="cards">
        <GetStartedCard
          icon={IconPerformance}
          title={config.PRODUCT_EDGE}
          subtitle={`Deploy your web application and start seeing the performance benefits with the ${config.PRODUCT} ${config.PRODUCT_EDGE} network.`}
          href={toVersionedPath(`${performanceGettingStarted}`)}
          hrefText="Deploy now"
        />
        <GetStartedCard
          icon={IconSites}
          title={config.PRODUCT_PLATFORM}
          subtitle={`Deploy static and dynamic Jamstack sites that run on ${config.PRODUCT}'s serverless functions.`}
          href={toVersionedPath(`${sitesGettingStarted}`)}
          hrefText="View Supported Frameworks"
        />
        <GetStartedCard
          icon={IconSecurity}
          title={config.PRODUCT_SECURITY}
          subtitle={`${config.PRODUCT} ${config.PRODUCT_SECURITY} keeps your apps protected without sacrificing performance.`}
          href={toVersionedPath('security')}
          hrefText="Learn More"
        />
      </div>
    </StyledGetStarted>
  );
}
