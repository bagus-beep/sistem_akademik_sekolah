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

function getBasePath() {
  return window.location.pathname.includes('sistem_akademik_sekolah')
    ? '/sistem_akademik_sekolah'
    : '';
}

function getRelativeBase() {
  return window.location.pathname.includes('/pages/')
    ? '../'
    : '';
}

function generateNav() {
  const desktopNav = document.getElementById('desktopNav');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!desktopNav || !mobileMenu) return;

  const base = getRelativeBase();

  const menus = [
    { name: 'Dashboard', url: `${base}index.html` },
    { name: 'Guru', url: `${base}pages/teachers.html` },
    { name: 'Siswa', url: `${base}pages/students.html` },
    { name: 'Kelas', url: `${base}pages/classes.html` },
    { name: 'Pelajaran', url: `${base}pages/lessons.html` },
  ];

  const currentPath = window.location.pathname;

  menus.forEach(menu => {
    const isActive = currentPath.includes(menu.url.replace(base, ''));

    const desktopLink = document.createElement('a');
    desktopLink.href = menu.url;
    desktopLink.textContent = menu.name;
    desktopLink.className =
      `nav-link hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`;

    const mobileLink = document.createElement('a');
    mobileLink.href = menu.url;
    mobileLink.textContent = menu.name;
    mobileLink.className =
      `block mobile-link ${isActive ? 'text-blue-600 font-semibold' : ''}`;

    desktopNav.appendChild(desktopLink);
    mobileMenu.appendChild(mobileLink);
  });
}

function initMobileMenu() {
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
}

document.addEventListener('DOMContentLoaded', async () => {
  const basePath = getBasePath();

  await loadPartial('header', `${basePath}/partials/header.html`);
  await loadPartial('footer', `${basePath}/partials/footer.html`);

  generateNav();
  initMobileMenu();
});

