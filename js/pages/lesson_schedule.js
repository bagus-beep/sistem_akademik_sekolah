import { createRelationalPage } from '../factories/relationalPageFactory.js';
import { scheduleColumns } from '../config/columns.js';

export function initLessonSchedule() {
  createRelationalPage({
    // =========================
    // BASE TABLE
    // =========================
    base: 'schedules',

    // =========================
    // RELATIONS
    // =========================
    relations: {
      lesson: {
        from: 'lessons_id',
        source: 'lessons',
        display: 'subject'
      },
      teacher: {
        from: 'teacher_id',
        source: 'teachers',
        display: 'name'
      },
      class: {
        from: 'class_id',
        source: 'classes',
        display: 'name'
      }
    },

    // =========================
    // TRANSFORM
    // =========================
    transform(resolved, baseRow) {
      return {
        day: baseRow.day,
        time: `${baseRow.start_time} – ${baseRow.end_time}`,
        lesson: resolved.lesson,
        teacher: resolved.teacher,
        class: resolved.class
      };
    },

    // =========================
    // TABLE CONFIG
    // =========================
    columns: scheduleColumns,

    // =========================
    // DOM SELECTORS
    // =========================
    selectors: {
      thead: '#tableHead',
      tbody: '#tableBody',
      info: '#info',
      search: '#searchInput',
      next: '#nextBtn',
      prev: '#prevBtn'
    }
  }).init();
}
