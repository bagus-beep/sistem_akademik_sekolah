import { createRelationalPage } from '../factories/relationalPageFactory.js';
import { teacherColumns } from '../config/columns.js';

export function initTeachers() {
  createRelationalPage({
    // =========================
    // BASE TABLE
    // =========================
    base: 'schedules',

    // =========================
    // RELATIONS (JOIN DECLARATIVE)
    // =========================
    relations: {
      teacher: {
        from: 'teacher_id',
        source: 'teachers',
        display: 'name'
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
    // COMPUTED + TRANSFORM
    // =========================
    transform(resolved, baseRow) {
      return {
        nip: baseRow.nip || '-',
        teacher: resolved.teacher,
        lesson: resolved.lesson,
        class: resolved.class,

        // 🔥 computed field
        summary: `${resolved.teacher} mengajar ${resolved.lesson} di ${resolved.class}`
      };
    },

    // =========================
    // TABLE
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
