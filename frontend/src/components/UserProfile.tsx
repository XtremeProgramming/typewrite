import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function UserProfile() {
  const { isPending, user } = useUser();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  if (isPending) return "Loading...";
  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-2xl">Profile</CardTitle>
              <Button variant="outline" onClick={handleEdit}>
                Edit
              </Button>
            </CardHeader>
            <CardContent className="flex-col gap-4">
              <div>
                <h3 className="text-lg font-medium">{user.full_name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="mt-4 flex flex-col">
                  <p className="text-sm font-semibold">Bio</p>
                  <p className="text-sm  text-gray-500">
                    {user.bio ||
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga alias nihil tempora exercitationem! Eligendi, doloribus tempore? Aliquam voluptates, qui cum aperiam corrupti, harum repellat deleniti ratione perspiciatis fugiat dolor iure"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
