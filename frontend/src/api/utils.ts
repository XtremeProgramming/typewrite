// TODO: Update the API_BASE_URL of production when the backend is deployed
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8000"
    : "http://localhost:8000";

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}
