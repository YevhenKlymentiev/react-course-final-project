export function removeAuthData() {
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('accessToken');
}

export function getFromStorage(key, fallback) {
  return JSON.parse(localStorage.getItem(key)) || fallback;
}

export function updateStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
