import { fetchAll } from '../core/fetcher.js';
import { renderTable } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';
import { formatTime } from '../core/format.js';
import { scheduleColumns } from '../config/columns.js';

let allData = [];
let filtered = [];
let pager;

const tbody = document.getElementById('tableBody');
const info  = document.getElementById('info');

fetchAll().then(({ schedules, lessons, teachers, classes }) => {
  const lessonById  = Object.fromEntries(lessons.map(l => [l.id, l]));
  const teacherById = Object.fromEntries(teachers.map(t => [t.id, t]));
  const classById   = Object.fromEntries(classes.map(c => [c.id, c]));

  allData = schedules.map(s => ({
    day: s.day,
    time: `${formatTime(s.time_start)} – ${formatTime(s.time_end)}`,
    lesson: lessonById[s.lessons_id]?.subject || '-',
    teacher: teacherById[s.teacher_id]?.name || '-',
    class: classById[s.class_id]?.name || '-'
  }));

  filtered = [...allData];
  pager = createPaginator(filtered);
  draw();
});

function draw() {
  renderTable({
    data: pager.getPage(),
    columns: scheduleColumns,
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
