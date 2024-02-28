import {NamedExoticComponent} from 'react';

export interface HeaderNavConfig {
  [index: number]: NavSection;
}

export type HomepageConfig = {
  sections: HomepageSectionGroup[];
};

export type HomepageSectionGroup = {
  heading: string;
  subheading: string;
  className?: string;
  icon?: NamedExoticComponent<JSX.IntrinsicElements['svg']>;
  path?: string;
  sections: HomepageSection[];
};

export type ItemsByVersion = {
  [key: string]: SimpleRouteItem[] | undefined;
} & {
  default?: SimpleRouteItem[];
};

export interface MDHeading {
  rank: number;
  title: string;
  id: string;
}

export type MDHeadingsList = MDHeading[];

// Homepage sections
type HomepageSectionItem = {
  title: string;
  path: string;
};

type HomepageSection = {
  title: string;
  description?: string;
  path?: string;
  items: HomepageSectionItem[];
};

export interface Route {
  title?: string;
  icon?: string;
  path?: string;
  external?: boolean;
  routes?: Route[];
}

export type SimpleRouteItem = StringMap & {
  title: string;
  path: string;
};

// Header Menu
interface HeaderNavItem {
  name: string;
  url: string;
}

interface NavSection {
  title: string;
  items: HeaderNavItem[];
  url?: string;
}

export interface StringMap {
  [key: string]: any;
}
