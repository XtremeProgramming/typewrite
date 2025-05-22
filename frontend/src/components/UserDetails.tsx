import { getUser } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function UserDetails() {
  const { isPending, data: user } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("🚀 ~ handleLogout ~ handleLogout:");
    localStorage.removeItem("access_token");
    navigate("/signin");
  };

  if (isPending) return "Loading...";

  return (
    <>
      <h1>{user.full_name}</h1>
      <h2>{user.email}</h2>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}
