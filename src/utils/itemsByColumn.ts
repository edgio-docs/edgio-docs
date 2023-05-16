import chunk from 'lodash/chunk';
import sortBy from 'lodash/sortBy';

import {IVersion} from './hooks/useConditioning';
import {ItemsByVersion, SimpleRouteItem} from './Types';

export default function itemsByColumn(
  items: ItemsByVersion,
  version: IVersion,
  sortByKey?: string,
  columnCount?: number
): SimpleRouteItem[][] {
  const itemsByVersion: SimpleRouteItem[] =
    items[version.selectedVersion] || items.default;

  let sortedItems = itemsByVersion;
  if (sortByKey) {
    sortedItems = sortBy(itemsByVersion, sortByKey);
  }

  return chunk(sortedItems, columnCount);
}
