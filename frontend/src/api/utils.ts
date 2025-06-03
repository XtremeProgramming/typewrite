const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}
