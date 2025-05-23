import { apiUrl } from "./utils";

export async function signIn(email: string, password: string) {
  const res = await fetch(apiUrl("/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error("Failed to sign in", error);
    throw new Error("Failed to sign in. " + error?.detail);
  }
  return res.json();
}

export async function signUp(
  fullName: string,
  email: string,
  password: string
) {
  const res = await fetch(apiUrl("/signup"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      full_name: fullName,
      password_confirmation: password,
    }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error("Failed to sign up", error);
    throw new Error("Failed to sign up. " + error?.id);
  }
  return res.json();
}
