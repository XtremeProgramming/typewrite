import { getUser } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function useUser() {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryKey: ['getUser', token],
    queryFn: getUser,
  });

  useEffect(() => {
    if (error) {
      localStorage.removeItem('access_token');
      navigate('/signin');
    }
  }, [error, navigate]);

  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/signin');
  };

  return { user, isLoading: isPending, logout };
}
