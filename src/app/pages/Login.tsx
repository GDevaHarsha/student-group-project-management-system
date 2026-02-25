import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useUser, UserRole } from '../context/UserContext';
import { GraduationCap, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    const mockUser = {
      id: role === 'teacher' ? 'teacher-1' : 'student-1',
      name: role === 'teacher' ? 'Dr. Sarah Johnson' : 'Alex Martinez',
      email: email || (role === 'teacher' ? 'sarah.johnson@university.edu' : 'alex.martinez@student.edu'),
      role,
      avatar: role === 'teacher' 
        ? 'https://images.unsplash.com/photo-1758685848426-fcff62c9fd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHRlYWNoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE5MjA2NjR8MA&ixlib=rb-4.1.0&q=80&w=200'
        : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    };
    
    setUser(mockUser);
    navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-white max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-12 h-12" />
            <h1 className="text-4xl">FSAD-PS35</h1>
          </div>
          <h2 className="text-5xl mb-6">Student Group Project Management</h2>
          <p className="text-xl text-blue-100 mb-8">
            Collaborate seamlessly, track progress effortlessly, and achieve academic excellence together.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1758270704025-0e1a1793e1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGdyb3VwfGVufDF8fHx8MTc3MTkyMDY2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Students collaborating"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl text-blue-600">FSAD-PS35</h1>
            </div>
            <h2 className="text-3xl mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Teacher
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <Card>
                <CardHeader>
                  <CardTitle>Student Login</CardTitle>
                  <CardDescription>Access your projects and collaborate with your team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => handleLogin('student')}>
                    Sign In as Student
                  </Button>
                  <div className="text-center text-sm text-gray-600">
                    Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teacher">
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Login</CardTitle>
                  <CardDescription>Manage projects and monitor student progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-email">Email</Label>
                    <Input
                      id="teacher-email"
                      type="email"
                      placeholder="teacher@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-password">Password</Label>
                    <Input
                      id="teacher-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => handleLogin('teacher')}>
                    Sign In as Teacher
                  </Button>
                  <div className="text-center text-sm text-gray-600">
                    Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
