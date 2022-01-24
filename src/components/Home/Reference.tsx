import SectionHeader from './SectionHeader';
import {IconStacks} from '../Icon/IconStacks';
import FeatureSection from './FeatureSection';

export default function Reference() {
  const routesCol1: Array<{title: string; path: string}> = [
    {
      title: 'Bots',
      path: '/cdn/caching',
    },
    {
      title: 'Changelog',
      path: '/cdn/edgejs-routing',
    },
    {
      title: 'Contributing',
      path: '',
    },
    {
      title: 'Cookies',
      path: '',
    },
    {
      title: 'Deploy to Layer0 Button',
      path: '',
    },
    {
      title: 'Install Node.js',
      path: '',
    },
  ];

  const routesCol2 = [
    {
      title: 'Layer0 for Traditional Sites',
      path: '/cdn/edgejs-routing',
    },
    {
      title: 'layer0.config.js',
      path: '/cdn/edgejs-routing',
    },
    {
      title: 'Limits',
      path: '',
    },
    {
      title: 'Request Headers',
      path: '',
    },
    {
      title: 'Response Headers',
      path: '',
    },
    {
      title: 'REST API',
      path: '',
    },
  ];

  const routesCol3 = [
    {
      title: 'Status Codes',
      path: '/cdn/edgejs-routing',
    },
    {
      title: 'v4 Migration Guide',
      path: '/cdn/edgejs-routing',
    },
  ];

  const routes = [routesCol1, routesCol2, routesCol3];

  return (
    <div className="reference">
      <FeatureSection {...{routes}}>
        <SectionHeader
          Icon={IconStacks}
          title="Reference"
          subtitle="Additional helpful information in regards to getting the most out of Layer0."
        />
      </FeatureSection>
    </div>
  );
}
