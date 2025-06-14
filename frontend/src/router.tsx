import { Layout } from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import EditProfile from '@/pages/EditProfile';
import RecoverPassword from '@/pages/RecoverPassword';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import UserProfile from '@/pages/UserProfile';
import { createBrowserRouter } from 'react-router';
import ChangePassword from './pages/ChangePassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <UserProfile /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'recover', element: <RecoverPassword /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'user',
            children: [
              { path: '', element: <UserProfile /> },
              { path: 'edit-profile', element: <EditProfile /> },
              { path: 'change-password', element: <ChangePassword /> },
            ],
          },
        ],
      },
    ],
  },
]);
