import { CardContainer } from '@/components/CardContainer';
import { FormCard } from '@/components/FormCard';
import { PageContainer } from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { Link, useNavigate } from 'react-router';

export default function UserProfile() {
  const { isPending, user } = useUser();
  const navigate = useNavigate();

  if (isPending) return 'Loading...';
  if (!user) {
    navigate('/signin');
    return null;
  }

  const headerActions = (
    <div className="flex gap-2">
      <Link to="/user/edit-profile">
        <Button variant="outline" asChild>
          <span>Edit</span>
        </Button>
      </Link>
      <Link to="/user/change-password">
        <Button variant="outline" asChild>
          <span>Change Password</span>
        </Button>
      </Link>
    </div>
  );

  return (
    <PageContainer>
      <CardContainer>
        <FormCard title="Profile" headerActions={headerActions}>
          <div>
            <h3 className="text-lg font-medium">{user.full_name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.bio && (
              <div className="mt-4 flex flex-col">
                <p className="text-sm font-semibold">Bio</p>
                <p className="text-sm text-gray-500">{user.bio}</p>
              </div>
            )}
          </div>
        </FormCard>
      </CardContainer>
    </PageContainer>
  );
}
