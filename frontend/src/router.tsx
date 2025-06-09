import { Layout } from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import EditProfile from '@/pages/EditProfile';
import RecoverPassword from '@/pages/RecoverPassword';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import UserProfile from '@/pages/UserProfile';
import { createBrowserRouter } from 'react-router';
import ChangePassword from './pages/ChangePassword';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import PostList from './pages/PostList';

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
          {
            path: 'posts',
            children: [
              { path: '', element: <PostList /> },
              { path: 'create', element: <CreatePost /> },
              { path: ':postId', element: <PostDetail /> },
            ],
          },
        ],
      },
    ],
  },
]);
