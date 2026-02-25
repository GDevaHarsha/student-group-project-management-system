import { Outlet, useLocation } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { useUser } from '../context/UserContext';

export function Root() {
  const location = useLocation();
  const { user } = useUser();
  const isLoginPage = location.pathname === '/';

  if (isLoginPage || !user) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 mt-16 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
