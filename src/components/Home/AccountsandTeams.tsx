
import SectionHeader from "components/Home/SectionHeader";
import { IconUser } from "components/Icon/IconUser";
import FeatureSection from "./FeatureSection";

export default function AccountsandTeams() {
	const routesCol1: Array<{ title: string, path: string }> = [
		{
			title: "Environments",
			path: "/cdn/caching",
		},
		{
			title: "Teams",
			path: "/cdn/edgejs-routing",
		},
	]


	const routes = [
		routesCol1,
	]


	return <div className="accounts-and-teams">
		<FeatureSection {...{ routes }}>
			<SectionHeader Icon={IconUser} title="Accounts & Teams" subtitle="Create production, staging, and other environments and share your project." />
		</FeatureSection>
	</div>
}