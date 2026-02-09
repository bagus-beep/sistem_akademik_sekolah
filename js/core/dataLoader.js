export async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Gagal fetch ${path}`);
  return res.json();
}

export async function fetchMultiple(map) {
  const entries = await Promise.all(
    Object.entries(map).map(async ([key, path]) => {
      const data = await fetchJSON(path);
      return [key, data];
    })
  );

  return Object.fromEntries(entries);
}
