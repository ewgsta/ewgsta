export interface Slice<T> {
  items: T[];
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export function slicePage<T>(items: T[], page: number, perPage: number): Slice<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  return {
    items: items.slice((safePage - 1) * perPage, safePage * perPage),
    page: safePage,
    totalPages,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
  };
}

export function totalPages(itemsLength: number, perPage: number): number {
  return Math.max(1, Math.ceil(itemsLength / perPage));
}