import { createBrowserRouter } from "react-router";
import EditProfile from "./components/EditProfile";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import RecoverPassword from "./components/RecoverPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <UserProfile /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "recover", element: <RecoverPassword /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "user", element: <UserProfile /> },
          { path: "edit-profile", element: <EditProfile /> },
        ],
      },
    ],
  },
]);
