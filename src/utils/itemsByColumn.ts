import chunk from 'lodash/chunk';
import sortBy from 'lodash/sortBy';

import {IVersion} from './hooks/useConditioning';
import {ItemsByVersion, SimpleRouteItem} from './Types';

export default function itemsByColumn(
  items: ItemsByVersion,
  version: IVersion,
  sortByKey?: string | null,
  columnCount: number = 5
): SimpleRouteItem[][] {
  const defaultItems = items.default || [];
  const itemsByVersion: SimpleRouteItem[] =
    Object.entries(items).find(([key]) =>
      key.split(',').includes(version.selectedVersion)
    )?.[1] ?? defaultItems;

  let sortedItems = itemsByVersion;
  if (sortByKey) {
    sortedItems = sortBy(itemsByVersion, sortByKey);
  }

  return chunk(sortedItems, columnCount);
}
