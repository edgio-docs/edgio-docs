import { IconBulb } from 'components/Icon/IconBulb';
import { IconCodePlain } from 'components/Icon/IconCodePlain';
import { IconFolder } from 'components/Icon/IconFolder';
import { IconServerSmall } from 'components/Icon/IconServerSmall';
import { IconSparkPlain } from 'components/Icon/IconSparkPlain';
import { IconStacksPlain } from 'components/Icon/IconStacksPlain';
import { IconUserPlain } from 'components/Icon/IconUserPlain';
import { IconVideos } from 'components/Icon/IconVideos';
import { IconBookPlain } from '../components/Icon/IconBookPlain';
import { IconLogo } from '../components/Icon/IconLogo';


const SidebarMenuItems = [
	{
		title: 	'Platform Overview',
		icon: <IconLogo />,
		path: '/',
	},
	{
		title: 'Getting Started',
		icon: <IconSparkPlain />,
		path: '/',
		routes: [
			{
				title: 'WebApp CDN',
				path: '',
			},
			{
				title: 'Jamstack',
				path: '',
			},
			{
				title: 'GraphQL CDN',
				path: '',
			},
			{
				title: 'Deploying',
				path: '',
			},
			{
				title: 'System Overview',
				path: '',
			},
		],
	},
	{
		title: 'CDN',
		icon: <IconServerSmall/>,
		path: '/',
		routes: [
			{
				title: "Caching",
				path: '',
			},
			{
				title: "Common Routing Patterns",
				path: '',
			},
			{
				title: "Connectors",
				path: '',
			},
			{
				title: "Core Web Vitals",
				path: '',
			},
			{
				title: "Custom Domans & SSL",
				path: '',
			},
			{
				title: "Edge Network",
				path: '',
			},
			{
				title: "EdgeJS Routing",
				path: '',
			},
			{
				title: "Image Optimization",
				path: '',
			},
			{
				title: "Incremental Static (Re)generation",
				path: '',
			},
			{
				title: "Performance",
				path: '',
			},
			{
				title: "Prefetching",
				path: '',
			},
			{
				title: "Purging",
				path: '',
			},
			{
				title: "Security",
				path: '',
			},
			{
				title: "Split Testing",
				path: '',
			},
			{
				title: "Static Prerendering",
				path: '',
			},
			{
				title: "Third Party CDNs",
				path: '',
			},
			{
				title: "Traditional Sites",
				path: '',
			},
			{
				title: "Troubleshooting",
				path: '',
			}
		]
	},
	{
		title: 'Developer Tools',
		icon: <IconCodePlain />,
		path: '/',
	},
	{
		title: 'Accounts & Teams',
		icon: <IconUserPlain />,
		path: '/',
	},
	{
		title: 'Framework Guides',
		icon: <IconBookPlain/>,
		path: '/',
	},
	{
		title: 'Reference',
		icon: <IconStacksPlain />,
		path: '/',
	},
	{
		title: 'Videos',
		icon: <IconVideos />,
		path: '/',
	},
	{
		title: 'Package APIs',
		icon: <IconFolder />,
		path: '/',
	},
	{
		title: 'Learning Resources',
		icon: <IconBulb />,
		path: '/',
	},
];

export default SidebarMenuItems;
