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
