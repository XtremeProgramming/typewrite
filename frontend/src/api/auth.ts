import axios from "axios";

// TODO: Update the API_BASE_URL of production when the backend is deployed
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8000"
    : "http://localhost:8000";

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

export async function signIn(email: string, password: string) {
  return axios.post(apiUrl("/login"), { email, password });
}

export async function signUp(
  fullName: string,
  email: string,
  password: string
) {
  console.log("🚀 ~ process.env.NODE_ENV:", process.env.NODE_ENV);
  console.log("🚀 ~ API_BASE_URL:", API_BASE_URL);
  return axios.post(apiUrl("/signup"), {
    email,
    password,
    full_name: fullName,
    password_confirmation: password,
  });
}
