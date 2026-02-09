import { createRelationalPage } from '../factories/relationalPageFactory.js';
import { lessonColumns } from '../config/columns.js';

export function initLessons() {
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
    transform(resolved) {
      return {
        lesson: resolved.lesson,
        teacher: resolved.teacher,
        class: resolved.class
      };
    },

    // =========================
    // TABLE CONFIG
    // =========================
    columns: lessonColumns,

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
