import { createRelationalPage } from '../core/relationalPageFactory.js';
import { teacherColumns } from '../config/columns.js';

export const initTeachers = createRelationalPage({
  columns: teacherColumns,

  buildRows({ teachers, schedules, lessons, classes }) {
    const lessonById = Object.fromEntries(
      lessons.map(l => [l.id, l.subject])
    );

    const classById = Object.fromEntries(
      classes.map(c => [c.id, c.name])
    );

    const rows = [];

    teachers.forEach(t => {
      schedules
        .filter(s => s.teacher_id === t.id)
        .forEach(s => {
          rows.push({
            nip: t.nip,
            teacher: t.name,
            lesson: lessonById[s.lessons_id] || '-',
            class: classById[s.class_id] || '-'
          });
        });
    });

    return rows;
  }
});
