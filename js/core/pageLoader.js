import { initDashboard } from '../pages/dashboard.js';
import { initTeachers } from '../pages/teachers.js';
// import { initStudents } from '../pages/students.js';
// import { initClasses } from '../pages/classes.js';
// import { initLessons } from '../pages/lessons.js';
// import { initSchedule } from '../pages/lesson_schedule.js';

const pages = {
  dashboard: initDashboard,
  teachers: initTeachers,
  // students: initStudents,
  // classes: initClasses,
  // lessons: initLessons,
  // lesson_schedule: initSchedule
};

export function initPage(page) {
  if (!pages[page]) {
    console.warn(`Page "${page}" not registered`);
    return;
  }
  pages[page]();
}
