import { fetchAll } from '../core/fetcher.js';
import { renderTable } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';
import { lessonColumns } from '../config/columns.js';

let allData = [];
let filtered = [];
let pager;

export async function initLessons() {
  const tbody = document.getElementById('tableBody');
  const info  = document.getElementById('info');
  const searchInput = document.getElementById('searchInput');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (!tbody) return;

  const { lessons } = await fetchAll();

  allData = lessons.map(l => ({
    code: l.code,
    subject: l.subject,
    hours: l.hours
  }));

  filtered = [...allData];
  pager = createPaginator(filtered);

  function draw() {
    renderTable({
      data: pager.getPage(),
      columns: lessonColumns,
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
}
