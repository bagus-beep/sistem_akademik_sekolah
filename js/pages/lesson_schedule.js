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
        day: r.day,
        time: formatTimeRange(r.start_time, r.end_time),
        lesson: r.lesson,
        teacher: r.teacher,
        class: r.class
      };
    },

    columns: scheduleColumns
  }).init();
}

