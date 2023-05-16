export type ItemsByVersion = StringMap & {
  '4'?: SimpleRouteItem[];
  '5'?: SimpleRouteItem[];
  '6'?: SimpleRouteItem[];
  '7'?: SimpleRouteItem[];
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

export type SimpleRouteItem = {
  title: string;
  path: string;
};

export interface StringMap {
  [key: string]: any;
}
