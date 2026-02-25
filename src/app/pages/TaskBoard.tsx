import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar, Clock, Plus, GripVertical } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  avatar: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'todo' | 'in-progress' | 'done';
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Design login screen UI',
    description: 'Create wireframes and mockups for the login interface',
    assignee: 'James Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    priority: 'high',
    dueDate: '2026-02-26',
    status: 'todo'
  },
  {
    id: 2,
    title: 'Setup authentication API',
    description: 'Implement JWT-based authentication endpoints',
    assignee: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    priority: 'high',
    dueDate: '2026-02-27',
    status: 'todo'
  },
  {
    id: 3,
    title: 'Create database schema',
    description: 'Design and implement the database structure',
    assignee: 'Alex Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    priority: 'medium',
    dueDate: '2026-02-25',
    status: 'in-progress'
  },
  {
    id: 4,
    title: 'Implement task list component',
    description: 'Build reusable task list with filtering',
    assignee: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    priority: 'medium',
    dueDate: '2026-02-28',
    status: 'in-progress'
  },
  {
    id: 5,
    title: 'Write API documentation',
    description: 'Document all API endpoints with examples',
    assignee: 'Sofia Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    priority: 'low',
    dueDate: '2026-03-01',
    status: 'done'
  },
  {
    id: 6,
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    assignee: 'Alex Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    priority: 'high',
    dueDate: '2026-02-26',
    status: 'done'
  },
];

const ItemType = 'TASK';

interface DragItem {
  id: number;
  status: 'todo' | 'in-progress' | 'done';
}

function TaskCard({ task, moveTask }: { task: Task; moveTask: (id: number, newStatus: Task['status']) => void }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-orange-100 text-orange-800 border-orange-200',
    low: 'bg-green-100 text-green-800 border-green-200',
  };

  return (
    <div
      ref={drag}
      className={`bg-white border rounded-lg p-4 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-sm mb-2">{task.title}</h4>
          <p className="text-xs text-gray-600 mb-3">{task.description}</p>
        </div>
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className={`text-xs ${priorityColors[task.priority]}`}>
          {task.priority}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock className="w-3 h-3" />
          {task.dueDate}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={task.avatar} />
          <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-gray-600">{task.assignee}</span>
      </div>
    </div>
  );
}

function Column({ 
  status, 
  title, 
  tasks, 
  moveTask 
}: { 
  status: Task['status']; 
  title: string; 
  tasks: Task[]; 
  moveTask: (id: number, newStatus: Task['status']) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: DragItem) => {
      if (item.status !== status) {
        moveTask(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const statusColors = {
    'todo': 'bg-gray-100',
    'in-progress': 'bg-blue-50',
    'done': 'bg-green-50'
  };

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[300px] ${statusColors[status]} rounded-lg p-4 transition-colors ${
        isOver ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>
      <div className="space-y-3 min-h-[400px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} moveTask={moveTask} />
        ))}
      </div>
    </div>
  );
}

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const moveTask = (id: number, newStatus: Task['status']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Task Board</h1>
            <p className="text-gray-600">Organize and track your project tasks with drag-and-drop</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>Add a new task to your project board</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input id="task-title" placeholder="Enter task title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea id="task-description" placeholder="Describe the task" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-assignee">Assign To</Label>
                    <Select>
                      <SelectTrigger id="task-assignee">
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alex">Alex Martinez</SelectItem>
                        <SelectItem value="emma">Emma Wilson</SelectItem>
                        <SelectItem value="james">James Chen</SelectItem>
                        <SelectItem value="sofia">Sofia Rodriguez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-priority">Priority</Label>
                    <Select>
                      <SelectTrigger id="task-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-date">Due Date</Label>
                  <Input id="task-date" type="date" />
                </div>
                <Button className="w-full">Create Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">To Do</p>
                  <p className="text-2xl">{todoTasks.length}</p>
                </div>
                <div className="text-gray-400">📋</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Progress</p>
                  <p className="text-2xl">{inProgressTasks.length}</p>
                </div>
                <div className="text-blue-400">⚡</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl">{doneTasks.length}</p>
                </div>
                <div className="text-green-400">✓</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <Card>
          <CardHeader>
            <CardTitle>Project Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-4">
              <Column status="todo" title="To Do" tasks={todoTasks} moveTask={moveTask} />
              <Column status="in-progress" title="In Progress" tasks={inProgressTasks} moveTask={moveTask} />
              <Column status="done" title="Done" tasks={doneTasks} moveTask={moveTask} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DndProvider>
  );
}
