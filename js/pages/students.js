import { fetchAll } from '../core/fetcher.js';
import { renderTable } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';
import { studentColumns } from '../config/columns.js';

let allData = [];
let filtered = [];
let pager;

const tbody = document.getElementById('tableBody');
const info  = document.getElementById('info');

fetchAll().then(({ students, classes }) => {
  const classById = Object.fromEntries(classes.map(c => [c.id, c]));

  allData = students.map(s => ({
    nis: s.nis,
    name: s.name,
    class: classById[s.class_id]?.name || '-'
  }));

  filtered = [...allData];
  pager = createPaginator(filtered);
  draw();
});

function draw() {
  renderTable({
    data: pager.getPage(),
    columns: studentColumns,
    tbody
  });
  info.textContent = pager.info();
}

searchInput.oninput = e => {
  filtered = applySearch(allData, e.target.value);
  pager = createPaginator(filtered);
  draw();
};

nextBtn.onclick = () => pager.canNext() && (pager.next(), draw());
prevBtn.onclick = () => pager.canPrev() && (pager.prev(), draw());
