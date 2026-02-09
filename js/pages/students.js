import { createRelationalPage } from '../factories/relationalPageFactory.js';
import { studentColumns } from '../config/columns.js';

export function initStudents() {
  createRelationalPage({
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
    // TRANSFORM
    // =========================
    transform(resolved, baseRow) {
      return {
        nis: baseRow.nis,
        name: baseRow.name,
        class: resolved.class
      };
    },

    // =========================
    // TABLE CONFIG
    // =========================
    columns: studentColumns,

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
