import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import RecoverPassword from "./components/RecoverPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "recover", element: <RecoverPassword /> },
    ],
  },
]);
