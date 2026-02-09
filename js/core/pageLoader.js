import { teachersPage } from '../pages/teachers.js';
import { studentsPage } from '../pages/students.js';
import { classesPage } from '../pages/classes.js';
import { lessonsPage } from '../pages/lessons.js';
import { schedulePage } from '../pages/lesson_schedule.js';

const pages = {
  teachers: teachersPage,
  students: studentsPage,
  classes: classesPage,
  lessons: lessonsPage,
  lesson_schedule: schedulePage
};

export function initPage(pageName) {
  const page = pages[pageName];
  if (!page) {
    console.warn(`Page "${pageName}" not registered`);
    return;
  }
  page();
}
