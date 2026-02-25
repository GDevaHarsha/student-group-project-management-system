import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { FolderKanban, Calendar, CheckCircle2, Clock, Users, MessageSquare, AlertCircle } from 'lucide-react';

const myProjects = [
  { 
    id: 1, 
    title: 'Mobile App Development', 
    group: 'Team Alpha', 
    progress: 75, 
    deadline: '2026-03-15', 
    status: 'in-progress',
    members: 4,
    tasksCompleted: 12,
    tasksTotal: 16
  },
  { 
    id: 2, 
    title: 'Web Design Project', 
    group: 'Team Beta', 
    progress: 45, 
    deadline: '2026-03-20', 
    status: 'in-progress',
    members: 5,
    tasksCompleted: 9,
    tasksTotal: 20
  },
  { 
    id: 3, 
    title: 'Data Analysis Report', 
    group: 'Team Alpha', 
    progress: 90, 
    deadline: '2026-02-28', 
    status: 'review',
    members: 4,
    tasksCompleted: 18,
    tasksTotal: 20
  },
];

const upcomingDeadlines = [
  { id: 1, title: 'Submit UI Mockups', project: 'Mobile App Development', date: '2026-02-26', priority: 'high' },
  { id: 2, title: 'Complete Data Collection', project: 'Data Analysis Report', date: '2026-02-27', priority: 'high' },
  { id: 3, title: 'Code Review Meeting', project: 'Mobile App Development', date: '2026-02-28', priority: 'medium' },
  { id: 4, title: 'Final Presentation Prep', project: 'Web Design Project', date: '2026-03-05', priority: 'low' },
];

const groupActivity = [
  { id: 1, user: 'Emma Wilson', action: 'completed task "Database Schema"', time: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { id: 2, user: 'James Chen', action: 'uploaded file "wireframes.pdf"', time: '4 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 3, user: 'Sofia Rodriguez', action: 'commented on "API Integration"', time: '5 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia' },
  { id: 4, user: 'Michael Brown', action: 'started task "Testing Module"', time: '1 day ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
];

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your projects</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                <p className="text-3xl">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tasks Pending</p>
                <p className="text-3xl">7</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl">39</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Team Members</p>
                <p className="text-3xl">13</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Projects - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Projects</CardTitle>
                  <CardDescription>Active group projects you're working on</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg">{project.title}</h3>
                              <Badge variant={project.status === 'review' ? 'default' : 'secondary'}>
                                {project.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {project.group}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Due {project.deadline}
                              </span>
                            </div>
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} />
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{project.tasksCompleted} of {project.tasksTotal} tasks completed</span>
                            <span>{project.members} members</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      deadline.priority === 'high' ? 'bg-red-500' :
                      deadline.priority === 'medium' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm mb-1">{deadline.title}</h4>
                      <p className="text-xs text-gray-600 mb-1">{deadline.project}</p>
                      <p className="text-xs text-gray-500">{deadline.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Group Activity Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Group Activity</CardTitle>
              <CardDescription>Recent updates from your team members</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Open Chat
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groupActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
