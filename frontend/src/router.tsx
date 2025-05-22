import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import RecoverPassword from "./components/RecoverPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDetails from "./components/UserDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <UserDetails /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "recover", element: <RecoverPassword /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "user", element: <UserDetails /> }],
      },
    ],
  },
]);
