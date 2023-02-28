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

export interface StringMap {
  [key: string]: any;
}
