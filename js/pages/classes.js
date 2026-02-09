import { fetchAll } from '../core/fetcher.js';
import { renderTable } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';
import { classColumns } from '../config/columns.js';

let allData = [];
let filtered = [];
let pager;

const tbody = document.getElementById('tableBody');
const info  = document.getElementById('info');

fetchAll().then(({ classes, schedules, lessons, teachers }) => {
  const lessonById  = Object.fromEntries(lessons.map(l => [l.id, l]));
  const teacherById = Object.fromEntries(teachers.map(t => [t.id, t]));

  classes.forEach(c => {
    schedules
      .filter(s => s.class_id === c.id)
      .forEach(s => {
        allData.push({
          class: c.name,
          lesson: lessonById[s.lessons_id]?.subject || '-',
          teacher: teacherById[s.teacher_id]?.name || '-'
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
    columns: classColumns,
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
