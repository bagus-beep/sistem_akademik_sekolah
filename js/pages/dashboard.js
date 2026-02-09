export async function initDashboard() {
  try {
    const data = await fetchDashboardData();
    renderStats(data);
  } catch (error) {
    console.error('Gagal memuat dashboard:', error);
    alert('Data gagal dimuat');
  }
}
