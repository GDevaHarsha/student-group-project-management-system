import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useUser } from '../context/UserContext';
import { 
  Upload, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Star,
  Calendar
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

const studentSubmissions = [
  {
    id: 1,
    project: 'Mobile App Development',
    submittedDate: '2026-02-24',
    status: 'pending',
    files: [
      { name: 'source-code.zip', size: '12.5 MB' },
      { name: 'documentation.pdf', size: '3.2 MB' }
    ],
    feedback: null,
    grade: null
  },
  {
    id: 2,
    project: 'Data Analysis Report',
    submittedDate: '2026-02-22',
    status: 'reviewed',
    files: [
      { name: 'analysis-report.pdf', size: '5.8 MB' },
      { name: 'dataset.csv', size: '2.1 MB' }
    ],
    feedback: 'Excellent work! Your analysis is thorough and well-documented. The visualizations are clear and insightful.',
    grade: 95
  },
  {
    id: 3,
    project: 'Web Design Project',
    submittedDate: '2026-02-20',
    status: 'revision-requested',
    files: [
      { name: 'website-files.zip', size: '8.4 MB' }
    ],
    feedback: 'Good start, but please improve the mobile responsiveness and fix the navigation issues mentioned in the review.',
    grade: null
  }
];

const teacherSubmissions = [
  {
    id: 1,
    project: 'Mobile App Development',
    group: 'Team Alpha',
    students: [
      { name: 'Alex Martinez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
      { name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' }
    ],
    submittedDate: '2026-02-24',
    dueDate: '2026-03-15',
    status: 'pending',
    files: 2
  },
  {
    id: 2,
    project: 'Web Design Project',
    group: 'Team Beta',
    students: [
      { name: 'James Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
      { name: 'Sofia Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia' }
    ],
    submittedDate: '2026-02-23',
    dueDate: '2026-03-20',
    status: 'reviewed',
    grade: 88,
    files: 3
  },
  {
    id: 3,
    project: 'Data Analysis Report',
    group: 'Team Gamma',
    students: [
      { name: 'Michael Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' }
    ],
    submittedDate: '2026-02-22',
    dueDate: '2026-02-28',
    status: 'reviewed',
    grade: 95,
    files: 2
  },
  {
    id: 4,
    project: 'Machine Learning Model',
    group: 'Team Delta',
    students: [
      { name: 'Isabella Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella' }
    ],
    submittedDate: '2026-02-21',
    dueDate: '2026-03-10',
    status: 'revision-requested',
    files: 4
  }
];

export function Submissions() {
  const { isTeacher } = useUser();

  const getStatusBadge = (status: string) => {
    const variants = {
      'pending': { variant: 'secondary' as const, icon: Clock, text: 'Pending Review' },
      'reviewed': { variant: 'default' as const, icon: CheckCircle2, text: 'Reviewed' },
      'revision-requested': { variant: 'destructive' as const, icon: XCircle, text: 'Revision Requested' }
    };
    
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  if (isTeacher) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl mb-2">Submissions</h1>
          <p className="text-gray-600">Review and grade student project submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl">2</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Reviewed</p>
                  <p className="text-3xl">5</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Grade</p>
                  <p className="text-3xl">87%</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Week</p>
                  <p className="text-3xl">3</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle>All Submissions</CardTitle>
            <CardDescription>Click on a submission to review and provide feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherSubmissions.map((submission) => (
                <Dialog key={submission.id}>
                  <DialogTrigger asChild>
                    <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">{submission.project}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Submitted {submission.submittedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {submission.files} files
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{submission.group}:</span>
                            <div className="flex -space-x-2">
                              {submission.students.map((student, idx) => (
                                <Avatar key={idx} className="w-6 h-6 border-2 border-white">
                                  <AvatarImage src={student.avatar} />
                                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            {submission.students.map((s) => s.name).join(', ')}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(submission.status)}
                          {submission.grade && (
                            <div className="flex items-center gap-1 text-lg font-medium">
                              <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                              {submission.grade}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{submission.project} - Review</DialogTitle>
                      <DialogDescription>{submission.group}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Submitted Files</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-blue-600" />
                              <span className="text-sm">source-code.zip</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="review-grade">Grade (0-100)</Label>
                        <Input id="review-grade" type="number" placeholder="Enter grade" defaultValue={submission.grade || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="review-feedback">Feedback</Label>
                        <Textarea 
                          id="review-feedback" 
                          placeholder="Provide detailed feedback for the team..." 
                          rows={6}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Approve & Submit Grade
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <XCircle className="w-4 h-4 mr-2" />
                          Request Revision
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Student View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">My Submissions</h1>
        <p className="text-gray-600">Track your project submissions and view feedback</p>
      </div>

      {/* Submissions List */}
      <div className="space-y-6">
        {studentSubmissions.map((submission) => (
          <Card key={submission.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{submission.project}</CardTitle>
                  <CardDescription>Submitted on {submission.submittedDate}</CardDescription>
                </div>
                {getStatusBadge(submission.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Files */}
              <div>
                <h4 className="text-sm font-medium mb-3">Submitted Files</h4>
                <div className="space-y-2">
                  {submission.files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-600">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              {submission.feedback && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                      T
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1">Teacher Feedback</h4>
                      <p className="text-sm text-gray-700">{submission.feedback}</p>
                      {submission.grade && (
                        <div className="flex items-center gap-2 mt-3">
                          <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                          <span className="text-lg font-medium">Grade: {submission.grade}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              {submission.status === 'revision-requested' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Resubmit Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Resubmit Project</DialogTitle>
                      <DialogDescription>Upload your revised project files</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to browse or drag and drop files here</p>
                        <p className="text-xs text-gray-500 mt-2">ZIP, PDF, DOC - Max 50MB</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resubmit-notes">Notes (Optional)</Label>
                        <Textarea 
                          id="resubmit-notes" 
                          placeholder="Add notes about your changes..." 
                          rows={3}
                        />
                      </div>
                      <Button className="w-full">Submit Revision</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        ))}

        {/* New Submission */}
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full h-24">
                  <Upload className="w-6 h-6 mr-2" />
                  Submit New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit Project</DialogTitle>
                  <DialogDescription>Upload your completed project for review</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-select">Select Project</Label>
                    <Input id="project-select" placeholder="Mobile App Development" disabled />
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to browse or drag and drop files here</p>
                    <p className="text-xs text-gray-500 mt-2">ZIP, PDF, DOC - Max 50MB</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="submit-notes">Submission Notes</Label>
                    <Textarea 
                      id="submit-notes" 
                      placeholder="Add any notes about your submission..." 
                      rows={3}
                    />
                  </div>
                  <Button className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
