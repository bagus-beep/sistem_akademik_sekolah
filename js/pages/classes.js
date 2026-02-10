import { relationalPage } from '../factories/pagePresets.js';
import { classColumns } from '../config/columns.js';

export function initClasses() {
  relationalPage({
    // =========================
    // BASE TABLE
    // =========================
    base: 'schedules',

    // =========================
    // RELATIONS
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
    // TRANSFORM (NORMALIZATION)
    // =========================
    transform(r) {
      return {
        ...r
        // class, lesson, teacher sudah resolved
      };
    },

    // =========================
    // TABLE CONFIG
    // =========================
    columns: classColumns
  }).init();
}
