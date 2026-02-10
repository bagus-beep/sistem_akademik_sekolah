import { relationalPage } from '../factories/pagePresets.js';
import { scheduleColumns } from '../config/columns.js';
import { formatTimeRange } from '../core/format.js';

export function initLessonSchedule() {
  relationalPage({
    base: 'schedules',

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

    transform(r) {
      return {
        ...r,
        time: formatTimeRange(r.time_start, r.time_end)
      };
    },

    columns: scheduleColumns
  }).init();
}
