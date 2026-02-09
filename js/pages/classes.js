import { createRelationalPage } from '../factories/relationalPageFactory.js';
import { classColumns } from '../config/columns.js';

export function initClasses() {
  createRelationalPage({
    // =========================
    // BASE TABLE
    // =========================
    base: 'schedules',

    // =========================
    // RELATIONS (DECLARATIVE JOIN)
    // =========================
    relations: {
      class: {
        from: 'class_id',
        source: 'classes',
        display: 'name'
      },
      lesson: {
        from: 'lessons_id',
        source: 'lessons',
        display: 'subject'
      },
      teacher: {
        from: 'teacher_id',
        source: 'teachers',
        display: 'name'
      }
    },

    // =========================
    // TRANSFORM (NORMALIZATION ONLY)
    // =========================
    transform(resolved) {
      return {
        class: resolved.class,
        lesson: resolved.lesson,
        teacher: resolved.teacher
      };
    },

    // =========================
    // TABLE CONFIG
    // =========================
    columns: classColumns,

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
