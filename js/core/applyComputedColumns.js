export function applyComputedColumns(row, columns) {
  const result = { ...row };

  columns.forEach(col => {
    if (typeof col.compute === 'function') {
      result[col.key] = col.compute(row);
    }
  });

  return result;
}
