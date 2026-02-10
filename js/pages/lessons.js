import { relationalPage } from '../factories/pagePresets.js';
import { lessonColumns } from '../config/columns.js';

export function initLessons() {
  relationalPage({
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
    // TRANSFORM (NORMALIZATION)
    // =========================
    transform(r) {
      return {
        ...r
        // lesson, teacher, class sudah resolved
      };
    },

    // =========================
    // TABLE CONFIG
    // =========================
    columns: lessonColumns
  }).init();
}
