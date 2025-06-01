import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router";

export default function UserProfile() {
  const { isPending, user } = useUser();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/user/edit-profile");
  };

  const handleChangePassword = () => {
    navigate("/user/change-password");
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
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="outline" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-col gap-4">
              <div>
                <h3 className="text-lg font-medium">{user.full_name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="mt-4 flex flex-col">
                  <p className="text-sm font-semibold">Bio</p>
                  <p className="text-sm  text-gray-500">{user.bio} </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
