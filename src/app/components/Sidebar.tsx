import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  FolderKanban, 
  ListChecks, 
  MessageSquare, 
  FileCheck, 
  User,
  Plus
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export function Sidebar() {
  const location = useLocation();
  const { isTeacher } = useUser();

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: isTeacher ? '/teacher-dashboard' : '/student-dashboard',
    },
    {
      label: 'Projects',
      icon: FolderKanban,
      path: '/projects',
    },
    {
      label: 'Tasks',
      icon: ListChecks,
      path: '/tasks',
    },
    {
      label: 'Collaboration',
      icon: MessageSquare,
      path: '/collaboration',
    },
    {
      label: 'Submissions',
      icon: FileCheck,
      path: '/submissions',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/profile',
    },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-2">
        {isTeacher && (
          <Button className="w-full mb-4" size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        )}
        
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
                          (item.path.includes('dashboard') && location.pathname.includes('dashboard'));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
