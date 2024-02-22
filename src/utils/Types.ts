export type HomepageConfig = {
  sections: HomepageSectionGroup[];
};

export type HomepageSectionGroup = {
  heading: string;
  subheading: string;
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

export interface Route {
  title?: string;
  icon?: string;
  path?: string;
  external?: boolean;
  routes?: Route[];
}

// Homepage sections
type HomepageSectionItem = {
  title: string;
  link: string;
};

type HomepageSection = {
  title: string;
  description?: string;
  link?: string;
  items: HomepageSectionItem[];
};

export type SimpleRouteItem = StringMap & {
  title: string;
  path: string;
};

export interface StringMap {
  [key: string]: any;
}
