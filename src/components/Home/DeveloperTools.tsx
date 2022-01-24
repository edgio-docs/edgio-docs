import {IconCode} from '../Icon/IconCode';
import FeatureSection from './FeatureSection';
import SectionHeader from './SectionHeader';

export default function DeveloperTools() {
  const routesCol1: Array<{title: string; path: string}> = [
    {
      title: 'CLI',
      path: '/cdn/caching',
    },
    {
      title: 'Devtools',
      path: '/cdn/edgejs-routing',
    },
    {
      title: 'Logs',
      path: '/cdn/edgejs-routing',
    },
  ];

  const routes = [routesCol1];

  return (
    <div className="developer-tools">
      <FeatureSection {...{routes}}>
        <SectionHeader
          Icon={IconCode}
          title="Developer Tools"
          subtitle="Tools that help developer understand how their site interacts with Layer0."
        />
      </FeatureSection>
    </div>
  );
}
