// ==========================
// TEACHERS
// ==========================
export const teacherColumns = [
  { key: 'nip', label: 'NIP' },
  { key: 'teacher', label: 'Nama Guru' },
  { key: 'lesson', label: 'Mata Pelajaran' },
  { key: 'class', label: 'Kelas' },

  {
    key: 'summary',
    label: 'Ringkasan',
    compute: row =>
      `${row.teacher} mengajar ${row.lesson} di ${row.class}`
  }
];

// ==========================
// STUDENTS
// ==========================
export const studentColumns = [
  { key: 'nis', label: 'NIS' },
  { key: 'name', label: 'Nama Siswa' },
  { key: 'class', label: 'Kelas' },

  {
    key: 'summary',
    label: 'Ringkasan',
    compute: row =>
      `${row.name} terdaftar di kelas ${row.class}`
  }
];

// ==========================
// CLASSES
// ==========================
export const classColumns = [
  { key: 'class', label: 'Kelas' },
  { key: 'lesson', label: 'Mata Pelajaran' },
  { key: 'teacher', label: 'Guru' },

  {
    key: 'summary',
    label: 'Ringkasan',
    compute: row =>
      `Kelas ${row.class} diajar ${row.teacher} untuk ${row.lesson}`
  }
];

// ==========================
// LESSONS
// ==========================
export const lessonColumns = [
  { key: 'lesson', label: 'Mata Pelajaran' },
  { key: 'teacher', label: 'Guru' },
  { key: 'class', label: 'Kelas' },

  {
    key: 'summary',
    label: 'Ringkasan',
    compute: row =>
      `${row.lesson} diajarkan oleh ${row.teacher} di kelas ${row.class}`
  }
];

// ==========================
// SCHEDULE
// ==========================
export const scheduleColumns = [
  {
    key: 'day',
    label: 'Hari'
  },
  {
    key: 'time',
    label: 'Jam'
  },
  {
    key: 'lesson',
    label: 'Mata Pelajaran'
  },
  {
    key: 'teacher',
    label: 'Guru'
  },
  {
    key: 'class',
    label: 'Kelas'
  },

  // =========================
  // COMPUTED COLUMN
  // =========================
  {
    key: 'summary',
    label: 'Ringkasan',
    className: 'max-w-md whitespace-normal text-slate-700',
    compute: row => {
      const day  = row.day ?? '-';
      const time = row.time && row.time !== '- – -'
        ? row.time
        : 'jam belum ditentukan';

      return `${row.lesson} (${row.class}) oleh ${row.teacher} pada ${day}, ${time}`;
    }
  }
];
