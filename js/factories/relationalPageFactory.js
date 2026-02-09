import { fetchAll } from '../core/fetcher.js';
import { renderTable } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';

/**
 * Relational Page Factory
 * ----------------------------------------
 * Membuat halaman tabel relasional (join)
 * berbasis konfigurasi deklaratif
 */
export function createRelationalPage(config) {
  // =========================
  // VALIDATION
  // =========================
  if (!config?.base) {
    throw new Error('[relationalPageFactory] "base" is required');
  }
  if (!config?.relations) {
    throw new Error('[relationalPageFactory] "relations" is required');
  }
  if (!config?.columns) {
    throw new Error('[relationalPageFactory] "columns" is required');
  }
  if (!config?.selectors) {
    throw new Error('[relationalPageFactory] "selectors" is required');
  }

  // =========================
  // INTERNAL STATE
  // =========================
  let allData = [];
  let filtered = [];
  let pager;

  // =========================
  // HELPERS
  // =========================
  function qs(selector) {
    return document.querySelector(selector);
  }

  function buildIndex(rows) {
    return Object.fromEntries(rows.map(r => [r.id, r]));
  }

  function resolveRelations(baseRow, indexes) {
    const row = {};

    for (const [key, rel] of Object.entries(config.relations)) {
      const {
        from,
        source,
        display,
        fallback = '-'
      } = rel;

      const refId = baseRow[from];
      const refRow = indexes[source]?.[refId];

      row[key] = refRow?.[display] ?? fallback;
    }

    return row;
  }

  // =========================
  // MAIN INIT
  // =========================
  async function init() {
    // ---- bind DOM
    const tbody  = qs(config.selectors.tbody);
    const info   = qs(config.selectors.info);
    const search = qs(config.selectors.search);
    const next   = qs(config.selectors.next);
    const prev   = qs(config.selectors.prev);

    if (!tbody) {
      console.warn('[relationalPageFactory] tbody not found');
      return;
    }

    // ---- fetch data
    const data = await fetchAll();

    const baseRows = data[config.base];
    if (!Array.isArray(baseRows)) {
      throw new Error(
        `[relationalPageFactory] base "${config.base}" not found in fetchAll()`
      );
    }

    // ---- build indexes
    const indexes = {};
    Object.values(config.relations).forEach(rel => {
      if (!indexes[rel.source]) {
        indexes[rel.source] = buildIndex(data[rel.source] || []);
      }
    });

    // ---- build flat rows
    allData = baseRows.map(baseRow => {
      const resolved = resolveRelations(baseRow, indexes);
      return config.transform
        ? config.transform(resolved, baseRow)
        : resolved;
    });

    if (config.filter) {
      allData = allData.filter(config.filter);
    }

    filtered = [...allData];
    pager = createPaginator(filtered, config.pageSize);

    // ---- draw
    function draw() {
      renderTable({
        data: pager.getPage(),
        columns: config.columns,
        tbody
      });
      if (info) info.textContent = pager.info();
    }

    draw();

    // ---- UI events
    if (search) {
      search.oninput = e => {
        filtered = applySearch(allData, e.target.value);
        pager = createPaginator(filtered, config.pageSize);
        draw();
      };
    }

    if (next) {
      next.onclick = () => pager.canNext() && (pager.next(), draw());
    }

    if (prev) {
      prev.onclick = () => pager.canPrev() && (pager.prev(), draw());
    }
  }

  // =========================
  // PUBLIC API
  // =========================
  return {
    init
  };
}
