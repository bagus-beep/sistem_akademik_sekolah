import { createRelationalPage } from './relationalPageFactory.js';

/* ===============================
   DEFAULT SELECTORS (GLOBAL)
================================ */
const defaultSelectors = {
  thead: '#tableHead',
  tbody: '#tableBody',
  info: '#info',
  search: '#searchInput',
  next: '#nextBtn',
  prev: '#prevBtn'
};

/* ===============================
   SIMPLE TABLE PRESET
   (single table, no relations)
================================ */
export function simplePage({
  source,        // 'lessons', 'students', etc
  columns,
  map,           // row mapper
  selectors = {}
}) {
  return createRelationalPage({
    base: source,
    columns,
    selectors: { ...defaultSelectors, ...selectors },

    transform(row) {
      return map(row);
    }
  });
}

/* ===============================
   RELATIONAL TABLE PRESET
================================ */
export function relationalPage({
  base,
  relations,
  columns,
  transform,
  selectors = {}
}) {
  return createRelationalPage({
    base,
    relations,
    columns,
    transform,
    selectors: { ...defaultSelectors, ...selectors }
  });
}
