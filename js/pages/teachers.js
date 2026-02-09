import { fetchAll } from '../core/fetcher.js';
import { renderTable } from '../core/table.js';
import { createPaginator } from '../core/paginator.js';
import { applySearch } from '../core/search.js';
import { teacherColumns } from '../config/columns.js';

let allData = [];
let filtered = [];
let pager;

export async function initTeachers() {
  const tbody = document.getElementById('tableBody');
  const info  = document.getElementById('info');
  const searchInput = document.getElementById('searchInput');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (!tbody || !info) {
    console.error('Table layout belum siap');
    return;
  }

  const { teachers, schedules, lessons, classes } = await fetchAll();

  const lessonById = Object.fromEntries(lessons.map(l => [l.id, l]));
  const classById  = Object.fromEntries(classes.map(c => [c.id, c]));

  teachers.forEach(t => {
    schedules
      .filter(s => s.teacher_id === t.id)
      .forEach(s => {
        allData.push({
          nip: t.nip,
          teacher: t.name,
          lesson: lessonById[s.lessons_id]?.subject || '-',
          class: classById[s.class_id]?.name || '-'
        });
      });
  });

  filtered = [...allData];
  pager = createPaginator(filtered);

  function draw() {
    renderTable({
      data: pager.getPage(),
      columns: teacherColumns,
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
