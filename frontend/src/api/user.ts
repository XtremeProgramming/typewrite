import { apiUrl } from "./utils";

export interface UserResponse {
  id: string;
  full_name: string;
  email: string;
  bio: string;
}

export interface UserRequest {
  fullName?: string;
  email?: string;
  bio?: string;
  password?: string;
  oldPassword?: string;
}

export async function getUser(): Promise<UserResponse> {
  const res = await fetch(apiUrl("/users"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${localStorage.getItem("access_token")}`,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error("Failed to fetch user", error);
    throw new Error("Failed to fetch user. " + error?.detail);
  }
  return res.json();
}

export async function editUser(data: UserRequest): Promise<UserResponse> {
  const res = await fetch(apiUrl("/users"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: `${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({
      email: data.email || undefined,
      password: data.password || undefined,
      old_password: data.oldPassword || undefined,
      full_name: data.fullName || undefined,
      bio: data.bio || undefined,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error("Failed to edit user", error);
    throw new Error("Failed to edit user. " + error?.id);
  }
  return res.json();
}
