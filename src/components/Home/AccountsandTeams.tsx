import {IconUser} from '../Icon/IconUser';
import SectionHeader from './SectionHeader';
import FeatureSection from './FeatureSection';

export default function AccountsandTeams() {
  const routesCol1: Array<{title: string; path: string}> = [
    {
      title: 'Environments',
      path: 'caching',
    },
    {
      title: 'Teams',
      path: 'edgejs-routing',
    },
  ];

  const routes = [routesCol1];

  return (
    <div className="accounts-and-teams">
      <FeatureSection {...{routes}}>
        <SectionHeader
          Icon={IconUser}
          title="Accounts & Teams"
          subtitle="Create production, staging, and other environments and share your project."
        />
      </FeatureSection>
    </div>
  );
}
