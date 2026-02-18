async function loadPartial(id, file) {
  const target = document.getElementById(id);
  if (!target) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    target.innerHTML = await res.text();
  } catch (err) {
    console.error(`Gagal load ${file}`, err);
  }
}

// const basePath = window.location.pathname.includes('sistem_akademik_sekolah')
//   ? '/sistem_akademik_sekolah'
//   : '';

document.addEventListener('DOMContentLoaded', () => {
  // loadPartial('header', `${basePath}/partials/header.html`);
  // loadPartial('footer', `${basePath}/partials/footer.html`);
  loadPartial('header', 'partials/header.html');
  loadPartial('footer', 'partials/footer.html');
});

document.addEventListener('click', (e) => {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');

  if (!btn || !menu) return;

  if (btn.contains(e.target)) {
    menu.classList.toggle('hidden');
  } else if (!menu.contains(e.target)) {
    menu.classList.add('hidden');
  }
});


