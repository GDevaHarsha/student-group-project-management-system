import { Bell, Search, Settings } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router';

export function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Logo and Search */}
        <div className="flex items-center gap-6 flex-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <span>FS</span>
            </div>
            <span className="text-lg">FSAD-PS35</span>
          </div>
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects, tasks, or members..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <div className="text-sm">New project assigned</div>
                <div className="text-xs text-gray-500">Mobile App Development - Due March 15</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <div className="text-sm">Task completed</div>
                <div className="text-xs text-gray-500">Emma completed "UI Design Review"</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <div className="text-sm">Submission reviewed</div>
                <div className="text-xs text-gray-500">Your submission received feedback</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <Settings className="w-5 h-5" />
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <div className="text-sm">{user?.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/profile')}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
