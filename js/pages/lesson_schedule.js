import { fetchAll } from '../core/fetcher.js';
import { renderTable } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';
import { scheduleColumns } from '../config/columns.js';

let allData = [];
let filtered = [];
let pager;

export async function initLessonSchedule() {
  const tbody = document.getElementById('tableBody');
  const info  = document.getElementById('info');
  const searchInput = document.getElementById('searchInput');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (!tbody) return;

  const {
    schedules,
    teachers,
    lessons,
    classes
  } = await fetchAll();

  const teacherById = Object.fromEntries(
    teachers.map(t => [t.id, t.name])
  );

  const lessonById = Object.fromEntries(
    lessons.map(l => [l.id, l.subject])
  );

  const classById = Object.fromEntries(
    classes.map(c => [c.id, c.name])
  );

  allData = schedules.map(s => ({
    day: s.day,
    time: formatTimeRange(s.start_time, s.end_time),
    lesson: lessonById[s.lessons_id] || '-',
    teacher: teacherById[s.teacher_id] || '-',
    class: classById[s.class_id] || '-'
  }));

  filtered = [...allData];
  pager = createPaginator(filtered);

  function draw() {
    renderTable({
      data: pager.getPage(),
      columns: scheduleColumns,
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

/* ===============================
   UTIL
================================ */
function formatTimeRange(start, end) {
  return `${start} – ${end}`;
}
