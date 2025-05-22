import { apiUrl } from "./utils";

export interface User {
  id: string;
  name: string;
  email: string;
}

export async function getUser() {
  const res = await fetch(apiUrl("/users"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${localStorage.getItem("access_token")}`,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch user. " + error?.detail);
  }
  return res.json();
}
