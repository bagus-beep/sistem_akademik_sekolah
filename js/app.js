import { initPage } from './core/pageLoader.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  const page = app.dataset.page;
  const title = app.dataset.title;
  const searchPlaceholder = app.dataset.search;

  // Render base UI
  app.innerHTML = `
    <h2 class="text-lg font-semibold mb-4">${title}</h2>

    <div class="mb-4">
      <input
        id="searchInput"
        type="text"
        placeholder="${searchPlaceholder}"
        class="w-full sm:max-w-sm px-4 py-2 rounded-lg border border-slate-300
               focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
      />
    </div>

    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-slate-200 text-slate-700">
            <tr id="tableHead"></tr>
          </thead>
          <tbody id="tableBody" class="divide-y"></tbody>
        </table>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between
                  gap-3 p-4 border-t text-sm">
        <span id="info" class="text-slate-600"></span>

        <div class="flex gap-2 self-end sm:self-auto">
          <button id="prevBtn"
            class="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
            Prev
          </button>
          <button id="nextBtn"
            class="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  `;

  // Load page-specific logic
  initPage(page);
});
