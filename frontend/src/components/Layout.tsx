import { useUser } from '@/hooks/useUser';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Link, Outlet, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { LogOutIcon } from './ui/icons/LogOutIcon';
import { UserIcon } from './ui/icons/UserIcon';

export const Layout = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full border-b shadow-sm bg-white">
        <nav className="px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold hover:opacity-80">
            Typewrite
          </Link>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-transparent hover:opacity-100"
                >
                  <Avatar className="h-9 w-9 bg-gray-200 text-gray-800 font-medium rounded-full flex items-center justify-center">
                    <AvatarFallback className="text-sm">
                      {getInitials(user.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.full_name}</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-45 bg-white border border-gray-200 shadow-lg p-0"
              >
                <DropdownMenuItem
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/user')}
                >
                  <UserIcon className="h-4 w-4" /> <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={logout}
                >
                  <LogOutIcon className="h-4 w-4" /> <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </header>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
