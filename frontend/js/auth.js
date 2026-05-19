// ── Shared auth helpers ──────────────────────────────────────

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'index.html';
}

function getToken() {
  return localStorage.getItem('token');
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}