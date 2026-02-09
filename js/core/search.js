export function applySearch(data, keyword) {
  const q = keyword.toLowerCase();
  return data.filter(row =>
    Object.values(row).some(v =>
      String(v).toLowerCase().includes(q)
    )
  );
}
