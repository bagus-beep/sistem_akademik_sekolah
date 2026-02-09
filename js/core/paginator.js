export function createPaginator(data, rowsPerPage = 5) {
  let page = 1;

  return {
    getPage() {
      const start = (page - 1) * rowsPerPage;
      return data.slice(start, start + rowsPerPage);
    },
    next() { page++; },
    prev() { page--; },
    reset() { page = 1; },
    canNext() { return page < Math.ceil(data.length / rowsPerPage); },
    canPrev() { return page > 1; },
    info() {
      return `Halaman ${page} dari ${Math.max(1, Math.ceil(data.length / rowsPerPage))}`;
    }
  };
}
