import { fetchAll } from './fetcher.js';
import { renderTable } from './table.js';
import { createPaginator } from './paginator.js';
import { applySearch } from './search.js';

export function createRelationalPage({
  buildRows,
  columns
}) {
  let allData = [];
  let filtered = [];
  let pager;

  return async function initPage() {
    const tbody = document.getElementById('tableBody');
    const info  = document.getElementById('info');
    const searchInput = document.getElementById('searchInput');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (!tbody) return;

    const data = await fetchAll();

    allData = buildRows(data);
    filtered = [...allData];
    pager = createPaginator(filtered);

    function draw() {
      renderTable({
        data: pager.getPage(),
        columns,
        tbody
      });
      info.textContent = pager.info();
    }

    draw();

    searchInput.oninput = e => {
      filtered = applySearch(allData, e.target.value);
      pager = createPaginator(filtered);
      draw();
    };

    nextBtn.onclick = () => pager.canNext() && (pager.next(), draw());
    prevBtn.onclick = () => pager.canPrev() && (pager.prev(), draw());
  };
}
