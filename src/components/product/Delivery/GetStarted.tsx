import Link from 'next/link';
import styled from 'styled-components';

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

  let Delivery;
  let sitesGettingStarted;

  return (
    <StyledGetStarted>
      {children}

      <div className="cards">
        <GetStartedCard
          title={config.DELIVERY}
          subtitle={`Power your streaming media and large file downloads on one of the world’s largest, most advanced global CDNs.
          `}
          href={toVersionedPath(`delivery`)}
          hrefText="Get Started"
        />
        <GetStartedCard
          title={config.STORAGE}
          subtitle={`A comprehensive object storage platform, built from the ground up to be your global media origin.`}
          href={toVersionedPath(`storage`)}
          hrefText="Learn More"
        />
        <GetStartedCard
          title={config.ANALYTICS}
          subtitle={`Intelligent analytics can help you build consumer loyalty and boost revenue. Get the insights you need, whatever your workflow.
          `}
          href={toVersionedPath('control/reports')}
          hrefText="View Reports"
        />
      </div>
    </StyledGetStarted>
  );
}
