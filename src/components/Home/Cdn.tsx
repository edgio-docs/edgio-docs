import {IconServer} from '../Icon/IconServer';
import FeatureSection from './FeatureSection';
import SectionHeader from './SectionHeader';

export default function Cdn() {
  const routesCol1: Array<{title: string; path: string}> = [
    {
      title: 'Caching',
      path: 'caching',
    },
    {
      title: 'Common Routing Patterns',
      path: 'edgejs-routing',
    },
    {
      title: 'Connectors',
      path: '',
    },
    {
      title: 'Core Web Vitals',
      path: '',
    },
    {
      title: 'Custom Domains & SSL',
      path: '',
    },
    {
      title: 'Edge Network',
      path: '',
    },
  ];

  const routesCol2 = [
    {
      title: 'EdgeJS Routing',
      path: 'edgejs-routing',
    },
    {
      title: 'Image Optimization',
      path: 'edgejs-routing',
    },
    {
      title: 'Incremental Static (Re)generation',
      path: '',
    },
    {
      title: 'Performance',
      path: '',
    },
    {
      title: 'Prefetching',
      path: '',
    },
    {
      title: 'Purging',
      path: '',
    },
  ];

  const routesCol3 = [
    {
      title: 'Security',
      path: 'edgejs-routing',
    },
    {
      title: 'Split Testing',
      path: 'edgejs-routing',
    },
    {
      title: 'Static Prerendering',
      path: '',
    },
    {
      title: 'Third Party CDNs',
      path: '',
    },
    {
      title: 'Traditional Sites',
      path: '',
    },
    {
      title: 'Troubleshooting',
      path: '',
    },
  ];

  const routes = [routesCol1, routesCol2, routesCol3];

  return (
    <div className="cdn">
      <FeatureSection {...{routes}}>
        <SectionHeader
          Icon={IconServer}
          title="CDN"
          subtitle="Accelerate and secure your app using the Layer0 global CDN and EdgeJS."
        />
      </FeatureSection>
    </div>
  );
}
