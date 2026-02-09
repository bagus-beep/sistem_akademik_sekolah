import { fetchAll } from '../core/fetcher.js';
import { renderTable } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';
import { studentColumns } from '../config/columns.js';

let allData = [];
let filtered = [];
let pager;

export async function initStudents() {
  const tbody = document.getElementById('tableBody');
  const info  = document.getElementById('info');
  const searchInput = document.getElementById('searchInput');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (!tbody) return;

  const { students, classes } = await fetchAll();

  const classById = Object.fromEntries(classes.map(c => [c.id, c.name]));

  allData = students.map(s => ({
    nis: s.nis,
    name: s.name,
    class: classById[s.class_id] || '-'
  }));

  filtered = [...allData];
  pager = createPaginator(filtered);

  function draw() {
    renderTable({
      data: pager.getPage(),
      columns: studentColumns,
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
