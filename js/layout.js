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

document.addEventListener('DOMContentLoaded', () => {
  loadPartial('header', '/partials/header.html');
  loadPartial('footer', '/partials/footer.html');
});
