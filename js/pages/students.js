import { relationalPage } from '../factories/pagePresets.js';
import { studentColumns } from '../config/columns.js';

export function initStudents() {
  relationalPage({
    // =========================
    // BASE TABLE
    // =========================
    base: 'students',

    // =========================
    // RELATIONS
    // =========================
    relations: {
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
        // nis, name sudah dari base
        // class sudah resolved
      };
    },

    // =========================
    // TABLE CONFIG
    // =========================
    columns: studentColumns
  }).init();
}
