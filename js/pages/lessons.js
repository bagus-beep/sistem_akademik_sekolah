import { fetchAll } from '../core/fetcher.js';
import { renderTable } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';
import { lessonColumns } from '../config/columns.js';

let allData = [];
let filtered = [];
let pager;

const tbody = document.getElementById('tableBody');
const info  = document.getElementById('info');

fetchAll().then(({ lessons, schedules, teachers, classes }) => {
  const teacherById = Object.fromEntries(teachers.map(t => [t.id, t]));
  const classById   = Object.fromEntries(classes.map(c => [c.id, c]));

  lessons.forEach(l => {
    schedules
      .filter(s => s.lessons_id === l.id)
      .forEach(s => {
        allData.push({
          lesson: l.subject,
          teacher: teacherById[s.teacher_id]?.name || '-',
          class: classById[s.class_id]?.name || '-'
        });
      });
  });

  filtered = [...allData];
  pager = createPaginator(filtered);
  draw();
});

function draw() {
  renderTable({
    data: pager.getPage(),
    columns: lessonColumns,
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
