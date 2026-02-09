import { fetchAll } from '../core/fetcher.js';
import { renderTable, renderTableHeader } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';
import { applyComputedColumns } from '../core/applyComputedColumns.js';

/**
 * Relational Page Factory
 * ----------------------------------------
 * Declarative relational table (frontend ORM-lite)
 */
export function createRelationalPage(config) {
  // =========================
  // VALIDATION
  // =========================
  const required = ['base', 'relations', 'columns', 'selectors'];
  required.forEach(key => {
    if (!config?.[key]) {
      throw new Error(`[relationalPageFactory] "${key}" is required`);
    }
  });

  const requiredSelectors = ['thead', 'tbody'];
  requiredSelectors.forEach(key => {
    if (!config.selectors[key]) {
      throw new Error(
        `[relationalPageFactory] selectors.${key} is required`
      );
    }
  });

  // =========================
  // INTERNAL STATE
  // =========================
  let allData = [];
  let filtered = [];
  let pager;

  // =========================
  // HELPERS
  // =========================
  const qs = selector => document.querySelector(selector);

  const buildIndex = rows =>
    Object.fromEntries(rows.map(r => [r.id, r]));

  function resolveRelations(baseRow, indexes) {
    // ✅ BASE ROW TETAP ADA
    const row = { ...baseRow };

    for (const [key, rel] of Object.entries(config.relations)) {
      const { from, source, display, fallback = '-' } = rel;
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
    const thead  = qs(config.selectors.thead);
    const tbody  = qs(config.selectors.tbody);
    const info   = qs(config.selectors.info);
    const search = qs(config.selectors.search);
    const next   = qs(config.selectors.next);
    const prev   = qs(config.selectors.prev);

    if (!thead || !tbody) {
      console.warn('[relationalPageFactory] table elements not found');
      return;
    }

    try {
      // ---- fetch data
      const data = await fetchAll();
      const baseRows = data[config.base];

      if (!Array.isArray(baseRows)) {
        throw new Error(
          `[relationalPageFactory] base "${config.base}" not found`
        );
      }

      // ---- build indexes
      const indexes = {};
      Object.values(config.relations).forEach(rel => {
        if (!indexes[rel.source]) {
          indexes[rel.source] = buildIndex(data[rel.source] || []);
        }
      });

      // ---- build rows (PIPELINE BERSIH)
      allData = baseRows.map(baseRow => {
        const resolved = resolveRelations(baseRow, indexes);

        const transformed = config.transform
          ? config.transform(resolved) // ✅ SINGLE SOURCE
          : resolved;

        return applyComputedColumns(transformed, config.columns);
      });

      if (typeof config.filter === 'function') {
        allData = allData.filter(config.filter);
      }

      filtered = [...allData];
      pager = createPaginator(filtered, config.pageSize);

      // ---- render header ONCE
      renderTableHeader({
        columns: config.columns,
        thead
      });

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

    } catch (err) {
      console.error('[relationalPageFactory]', err);
    }
  }

  return { init };
}
