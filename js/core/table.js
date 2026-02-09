export function renderTable({ data, columns, tbody }) {
  tbody.innerHTML = '';

  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50';

    columns.forEach(col => {
      const td = document.createElement('td');
      td.className = 'p-3 whitespace-nowrap';
      td.textContent = row[col.key] ?? '-';
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

export function renderTableHeader({ columns, thead }) {
  if (!thead) return;

  thead.innerHTML = '';

  const tr = document.createElement('tr');

  columns.forEach(col => {
    const th = document.createElement('th');
    th.className =
      'p-3 text-left font-semibold text-slate-700 bg-slate-100 whitespace-nowrap';
    th.textContent = col.label;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
}
