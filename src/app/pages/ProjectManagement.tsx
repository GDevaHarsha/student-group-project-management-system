import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useUser } from '../context/UserContext';
import { 
  Calendar, 
  Users, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Circle, 
  PlayCircle,
  Edit,
  MessageSquare
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Slider } from '../components/ui/slider';

const projectData = {
  id: 1,
  title: 'Mobile App Development',
  description: 'Design and develop a cross-platform mobile application for student task management with React Native',
  deadline: '2026-03-15',
  startDate: '2026-02-01',
  group: 'Team Alpha',
  status: 'in-progress',
  progress: 75,
  members: [
    { id: 1, name: 'Alex Martinez', role: 'Team Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', email: 'alex.m@student.edu' },
    { id: 2, name: 'Emma Wilson', role: 'Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', email: 'emma.w@student.edu' },
    { id: 3, name: 'James Chen', role: 'Designer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', email: 'james.c@student.edu' },
    { id: 4, name: 'Sofia Rodriguez', role: 'Tester', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', email: 'sofia.r@student.edu' },
  ],
  milestones: [
    { id: 1, title: 'Project Kickoff & Planning', dueDate: '2026-02-05', status: 'completed', description: 'Initial meeting and requirement gathering' },
    { id: 2, title: 'UI/UX Design', dueDate: '2026-02-12', status: 'completed', description: 'Create wireframes and mockups' },
    { id: 3, title: 'Development Phase 1', dueDate: '2026-02-25', status: 'in-progress', description: 'Implement core features' },
    { id: 4, title: 'Testing & QA', dueDate: '2026-03-05', status: 'not-started', description: 'Comprehensive testing' },
    { id: 5, title: 'Final Submission', dueDate: '2026-03-15', status: 'not-started', description: 'Deploy and submit final project' },
  ],
  tasks: [
    { id: 1, title: 'Create login screen', assignee: 'Emma Wilson', status: 'completed' },
    { id: 2, title: 'Design app icon', assignee: 'James Chen', status: 'completed' },
    { id: 3, title: 'Implement task list', assignee: 'Alex Martinez', status: 'in-progress' },
    { id: 4, title: 'Setup database', assignee: 'Emma Wilson', status: 'in-progress' },
    { id: 5, title: 'Write unit tests', assignee: 'Sofia Rodriguez', status: 'not-started' },
  ]
};

export function ProjectManagement() {
  const { isTeacher } = useUser();
  const [currentProgress, setCurrentProgress] = useState([75]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl mb-2">{projectData.title}</h1>
          <p className="text-gray-600">{projectData.description}</p>
        </div>
        {isTeacher ? (
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Project
          </Button>
        ) : (
          <Button>
            <MessageSquare className="w-4 h-4 mr-2" />
            Group Chat
          </Button>
        )}
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Deadline</p>
                <p className="font-medium">{projectData.deadline}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Team</p>
                <p className="font-medium">{projectData.group}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <p className="font-medium">{projectData.progress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge>{projectData.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Milestones & Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="milestones" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="tasks">Task Checklist</TabsTrigger>
            </TabsList>

            <TabsContent value="milestones">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Project Milestones</CardTitle>
                      <CardDescription>Track major project phases and deliverables</CardDescription>
                    </div>
                    {isTeacher && (
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex gap-4">
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          {getStatusIcon(milestone.status)}
                          {index < projectData.milestones.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        
                        {/* Milestone Content */}
                        <div className={`flex-1 pb-6 border rounded-lg p-4 ${getStatusColor(milestone.status)}`}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{milestone.title}</h4>
                            <Badge variant="outline" className="ml-2">
                              {milestone.dueDate}
                            </Badge>
                          </div>
                          <p className="text-sm opacity-80">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Task Checklist</CardTitle>
                      <CardDescription>Individual tasks for the current milestone</CardDescription>
                    </div>
                    {!isTeacher && (
                      <Button variant="outline" size="sm">
                        Add Task
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">{task.title}</h4>
                          <p className="text-xs text-gray-600">Assigned to {task.assignee}</p>
                        </div>
                        <Badge variant="outline">{task.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Progress Update (Student View) */}
          {!isTeacher && (
            <Card>
              <CardHeader>
                <CardTitle>Update Progress</CardTitle>
                <CardDescription>Move the slider to update your project completion status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Current Progress</Label>
                    <span className="text-2xl font-medium">{currentProgress[0]}%</span>
                  </div>
                  <Slider
                    value={currentProgress}
                    onValueChange={setCurrentProgress}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Files
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Project Files</DialogTitle>
                        <DialogDescription>Upload documents, code, or other project materials</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer">
                          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-sm text-gray-600">Click to browse or drag and drop files here</p>
                          <p className="text-xs text-gray-500 mt-2">PDF, DOC, ZIP, up to 50MB</p>
                        </div>
                        <Button className="w-full">Upload Files</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="flex-1">Save Progress</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Team Members */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                {isTeacher && (
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <CardDescription>{projectData.members.length} members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Teacher Review Panel */}
          {isTeacher && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Grade</CardTitle>
                <CardDescription>Evaluate project submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input id="grade" type="number" placeholder="0-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea id="feedback" placeholder="Provide feedback to the team..." rows={4} />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">Approve</Button>
                  <Button variant="outline" className="flex-1">Request Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
