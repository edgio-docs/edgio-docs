/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {useRouter} from 'next/router';
import * as React from 'react';

/**
 * While Next.js provides file-based routing, we still need to construct
 * a sidebar for navigation and provide each markdown page
 * previous/next links and titles. To do this, we construct a nested
 * route object that is infinitely nestable.
 */

export interface RouteItem {
  /** Page title (for the sidebar) */
  title: string;
  /** List of sub-routes */
  routes?: RouteItem[];

  /** Path to page */
  path?: string;
}

export interface RouteMeta {
  /** The previous route */
  prevRoute?: RouteItem;
  /** The next route */
  nextRoute?: RouteItem;
  /** The current route */
  route?: RouteItem;
  /** Trail of parent routes */
  breadcrumbs?: RouteItem[];
}

export type RouteTag =
  | 'foundation'
  | 'intermediate'
  | 'advanced'
  | 'experimental'
  | 'deprecated';

/** Routing metadata about a given route and it's siblings and parent */
export interface Routes {
  /** List of routes */
  routes: RouteItem[];
}

export const SidebarContext = React.createContext<RouteItem>({title: 'root'});

export function useRouteMeta(rootRoute?: RouteItem) {
  const sidebarContext = React.useContext(SidebarContext);
  const routeTree = rootRoute || sidebarContext;
  const router = useRouter();
  const cleanedPath = router.pathname;
  if (cleanedPath === '/404') {
    return {
      breadcrumbs: [],
    };
  }
  const breadcrumbs = getBreadcrumbs(cleanedPath, routeTree);
  return {
    ...getRouteMeta(cleanedPath, routeTree),
    breadcrumbs: breadcrumbs.length > 0 ? breadcrumbs : [routeTree],
  };
}

// Performs a depth-first search to find the current route and its previous/next route
function getRouteMeta(
  searchPath: string,
  currentRoute: RouteItem,
  ctx: RouteMeta = {}
): RouteMeta {
  const {routes} = currentRoute;

  if (ctx.route && !ctx.nextRoute) {
    ctx.nextRoute = currentRoute;
  }

  if (currentRoute.path === searchPath) {
    ctx.route = currentRoute;
  }

  if (!ctx.route) {
    ctx.prevRoute = currentRoute;
  }

  if (!routes) {
    return ctx;
  }

  for (const route of routes) {
    getRouteMeta(searchPath, route, ctx);
  }

  return ctx;
}

// iterates the route tree from the current route to find its ancestors for breadcrumbs
function getBreadcrumbs(
  path: string,
  currentRoute: RouteItem,
  breadcrumbs: RouteItem[] = []
): RouteItem[] {
  if (currentRoute.path === path) {
    return breadcrumbs;
  }

  if (!currentRoute.routes) {
    return [];
  }

  for (const route of currentRoute.routes) {
    const childRoute = getBreadcrumbs(path, route, [
      ...breadcrumbs,
      currentRoute,
    ]);
    if (childRoute?.length) {
      return childRoute;
    }
  }

  return [];
}
