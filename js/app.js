import './layout.js';
import { initPage } from './core/pageLoader.js';

document.addEventListener('DOMContentLoaded', async () => {
  const app = document.getElementById('app');
  if (!app) return;

  const page = app.dataset.page;

  // DASHBOARD → layout & logic sendiri
  if (page === 'dashboard') {
    const { initDashboard } = await import('./pages/dashboard.js');
    initDashboard();
    return;
  }

  // PAGE TABEL → pakai layout generic
  const title = app.dataset.title;
  const searchPlaceholder = app.dataset.search;

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

      <div class="flex justify-between items-center p-4 border-t text-sm">
        <span id="info" class="text-slate-600"></span>
        <div class="flex gap-2">
          <button id="prevBtn" class="btn">Prev</button>
          <button id="nextBtn" class="btn">Next</button>
        </div>
      </div>
    </div>
  `;

  initPage(page);
});
