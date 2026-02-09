import { fetchMultiple } from '../core/dataLoader.js';

const DATA_SOURCES = {
  teachers: 'data/teachers_rows.json',
  students: 'data/students_rows.json',
  classes: 'data/classes_rows.json',
  lessons: 'data/lessons_rows.json',
  schedules: 'data/lesson_schedule_rows.json'
};

function renderStats(data) {
  Object.entries(data).forEach(([key, rows]) => {
    const el = document.getElementById(key);
    if (el) el.textContent = rows.length;
  });

  const stats = document.getElementById('stats');
  if (stats) stats.classList.remove('opacity-60');
}

export async function initDashboard() {
  try {
    const data = await fetchMultiple(DATA_SOURCES);
    renderStats(data);
  } catch (err) {
    console.error('Gagal memuat dashboard:', err);
    alert('Data dashboard gagal dimuat');
  }
}
