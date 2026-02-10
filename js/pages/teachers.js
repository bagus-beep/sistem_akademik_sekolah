import { relationalPage } from '../factories/pagePresets.js';
import { teacherColumns } from '../config/columns.js';

export function initTeachers() {
  relationalPage({
    // =========================
    // BASE TABLE
    // =========================
    base: 'schedules',

    // =========================
    // RELATIONS
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
    // TRANSFORM (NORMALIZATION)
    // =========================
    transform(r) {
      return {
        ...r,
        nip: r.teacher_nip || '-'
      };
    },

    // =========================
    // TABLE CONFIG
    // =========================
    columns: teacherColumns
  }).init();
}
