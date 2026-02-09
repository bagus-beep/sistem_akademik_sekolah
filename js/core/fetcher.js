export async function fetchJSON(path) {
  const res = await fetch(path);
  return res.json();
}

export async function fetchAll() {
  const [
    teachers,
    students,
    classes,
    lessons,
    schedules
  ] = await Promise.all([
    fetchJSON('../data/teachers_rows.json'),
    fetchJSON('../data/students_rows.json'),
    fetchJSON('../data/classes_rows.json'),
    fetchJSON('../data/lessons_rows.json'),
    fetchJSON('../data/lesson_schedule_rows.json')
  ]);

  return { teachers, students, classes, lessons, schedules };
}
