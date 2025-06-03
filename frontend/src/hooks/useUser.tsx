import { getUser } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useUser = () => {
  const token = localStorage.getItem('access_token');

  const { isPending, data: user } = useQuery({
    queryKey: ['getUser', token],
    queryFn: getUser,
  });

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/signin');
  };

  return { user, isPending, logout };
};
