type Version = '4' | '5' | '6' | '7';

export type ItemsByVersion = {
  [key: string]: SimpleRouteItem[];
} & {
  default: SimpleRouteItem[];
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

export type SimpleRouteItem = StringMap & {
  title: string;
  path: string;
};

export interface StringMap {
  [key: string]: any;
}
