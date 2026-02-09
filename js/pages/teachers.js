import { createRelationalPage } from '../factories/relationalPageFactory.js';
import { teacherColumns } from '../config/columns.js';

export function initTeachers() {
  createRelationalPage({
    // =========================
    // BASE TABLE
    // =========================
    base: 'schedules',

    // =========================
    // RELATIONS (DECLARATIVE JOIN)
    // =========================
    relations: {
      teacher: {
        from: 'teacher_id',
        source: 'teachers',
        display: 'name'
      },
      teacher_nip: {
        from: 'teacher_id',
        source: 'teachers',
        display: 'nip'
      },
      lesson: {
        from: 'lessons_id',
        source: 'lessons',
        display: 'subject'
      },
      class: {
        from: 'class_id',
        source: 'classes',
        display: 'name'
      }
    },

    // =========================
    // TRANSFORM (NORMALIZATION ONLY)
    // =========================
    transform(resolved) {
      return {
        nip: resolved.teacher_nip || '-',
        teacher: resolved.teacher,
        lesson: resolved.lesson,
        class: resolved.class
      };
    },

    // =========================
    // TABLE CONFIG
    // =========================
    columns: teacherColumns,

    // =========================
    // DOM SELECTORS
    // =========================
    selectors: {
      tbody: '#tableBody',
      info: '#info',
      search: '#searchInput',
      next: '#nextBtn',
      prev: '#prevBtn'
    }
  }).init();
}
