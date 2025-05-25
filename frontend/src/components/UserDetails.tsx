import { Button } from "./ui/button";
import { useUser } from "@/hooks/useUser";

export default function UserDetails() {
  const { isPending, user, logout } = useUser();

  if (isPending) return "Loading...";
  if (!user) return "User not found";

  return (
    <>
      <h1>{user.full_name}</h1>
      <h2>{user.email}</h2>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
