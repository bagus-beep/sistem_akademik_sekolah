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
  thead.innerHTML = '';

  const tr = document.createElement('tr');

  columns.forEach(col => {
    const th = document.createElement('th');
    if (col.key === 'summary') {
      th.className =
        'p-3 max-w-md whitespace-normal text-slate-600';
    }
    th.textContent = col.label;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
}

