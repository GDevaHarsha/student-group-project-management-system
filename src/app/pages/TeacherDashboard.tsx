import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FolderKanban, Users, Clock, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

const statsData = [
  { name: 'Total Projects', value: 12, icon: FolderKanban, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { name: 'Active Groups', value: 8, icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
  { name: 'Pending Reviews', value: 5, icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  { name: 'Completed', value: 4, icon: CheckCircle2, color: 'text-purple-600', bgColor: 'bg-purple-50' },
];

const progressData = [
  { project: 'Mobile App', progress: 85 },
  { project: 'Web Design', progress: 60 },
  { project: 'Data Analysis', progress: 45 },
  { project: 'ML Model', progress: 30 },
];

const submissionData = [
  { name: 'On Time', value: 65, color: '#10b981' },
  { name: 'Late', value: 20, color: '#f59e0b' },
  { name: 'Pending', value: 15, color: '#6366f1' },
];

const recentSubmissions = [
  { id: 1, project: 'Mobile App Development', group: 'Team Alpha', student: 'Alex Martinez', status: 'pending', date: '2026-02-24', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: 2, project: 'Web Design Project', group: 'Team Beta', student: 'Emma Wilson', status: 'reviewed', date: '2026-02-23', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { id: 3, project: 'Data Analysis Report', group: 'Team Gamma', student: 'James Chen', status: 'pending', date: '2026-02-24', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 4, project: 'Machine Learning Model', group: 'Team Delta', student: 'Sofia Rodriguez', status: 'approved', date: '2026-02-22', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia' },
];

export function TeacherDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">Monitor projects, review submissions, and track student progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                    <p className="text-3xl">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Progress Overview</CardTitle>
            <CardDescription>Completion status across all active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="project" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Submission Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Status</CardTitle>
            <CardDescription>Distribution of all submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={submissionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {submissionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {submissionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Latest project submissions awaiting review</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar>
                    <AvatarImage src={submission.avatar} />
                    <AvatarFallback>{submission.student.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="mb-1">{submission.project}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {submission.group}
                      </span>
                      <span>by {submission.student}</span>
                      <span>{submission.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={
                    submission.status === 'approved' ? 'default' :
                    submission.status === 'pending' ? 'secondary' :
                    'outline'
                  }>
                    {submission.status}
                  </Badge>
                  <Button size="sm">Review</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-2">Create New Project</h3>
            <p className="text-sm text-gray-600">Assign a new group project to students</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="mb-2">Manage Groups</h3>
            <p className="text-sm text-gray-600">Create and organize student groups</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mb-2">View Analytics</h3>
            <p className="text-sm text-gray-600">Detailed performance insights</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
