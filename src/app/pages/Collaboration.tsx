import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useUser } from '../context/UserContext';
import { Send, Paperclip, Image as ImageIcon, FileText, Download, CheckCheck } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isCurrentUser?: boolean;
  type?: 'text' | 'file' | 'image';
  fileName?: string;
  fileUrl?: string;
  read?: boolean;
}

interface Discussion {
  id: number;
  title: string;
  milestone: string;
  messages: number;
  lastActivity: string;
  participants: number;
}

const chatMessages: Message[] = [
  {
    id: 1,
    sender: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    content: 'Hey team! I just finished the database schema. Ready for review.',
    timestamp: '10:30 AM',
    read: true
  },
  {
    id: 2,
    sender: 'Alex Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content: 'Great work Emma! I\'ll take a look at it right now.',
    timestamp: '10:32 AM',
    isCurrentUser: true,
    read: true
  },
  {
    id: 3,
    sender: 'James Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    content: 'I have the UI mockups ready. Let me share them with you all.',
    timestamp: '10:45 AM',
    read: true
  },
  {
    id: 4,
    sender: 'James Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    content: '',
    timestamp: '10:45 AM',
    type: 'file',
    fileName: 'ui-mockups-v2.pdf',
    fileUrl: '#',
    read: true
  },
  {
    id: 5,
    sender: 'Sofia Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    content: 'These mockups look amazing! The color scheme is perfect.',
    timestamp: '11:15 AM',
    read: true
  },
  {
    id: 6,
    sender: 'Alex Martinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content: 'Should we schedule a meeting to discuss the implementation timeline?',
    timestamp: '11:30 AM',
    isCurrentUser: true,
    read: false
  },
  {
    id: 7,
    sender: 'Emma Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    content: 'Sure! How about tomorrow at 2 PM?',
    timestamp: '11:35 AM',
    read: false
  },
];

const discussions: Discussion[] = [
  { id: 1, title: 'UI Design Review', milestone: 'Development Phase 1', messages: 23, lastActivity: '2 hours ago', participants: 4 },
  { id: 2, title: 'API Integration', milestone: 'Development Phase 1', messages: 15, lastActivity: '5 hours ago', participants: 3 },
  { id: 3, title: 'Database Schema', milestone: 'Development Phase 1', messages: 31, lastActivity: '1 day ago', participants: 4 },
  { id: 4, title: 'Testing Strategy', milestone: 'Testing & QA', messages: 8, lastActivity: '2 days ago', participants: 2 },
];

const files = [
  { id: 1, name: 'Project_Requirements.pdf', size: '2.4 MB', uploadedBy: 'Alex Martinez', date: '2026-02-20', type: 'pdf' },
  { id: 2, name: 'UI_Mockups_v2.pdf', size: '5.1 MB', uploadedBy: 'James Chen', date: '2026-02-24', type: 'pdf' },
  { id: 3, name: 'Database_Schema.sql', size: '156 KB', uploadedBy: 'Emma Wilson', date: '2026-02-24', type: 'code' },
  { id: 4, name: 'App_Icon.png', size: '384 KB', uploadedBy: 'James Chen', date: '2026-02-23', type: 'image' },
  { id: 5, name: 'Test_Plan.docx', size: '1.2 MB', uploadedBy: 'Sofia Rodriguez', date: '2026-02-22', type: 'doc' },
];

export function Collaboration() {
  const { user } = useUser();
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-blue-600" />;
      case 'pdf':
      case 'doc':
        return <FileText className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Collaboration</h1>
        <p className="text-gray-600">Chat with your team and share project files</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Area - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Team Chat</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-4">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <Avatar className="w-8 h-8 border-2 border-white">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" />
                        </Avatar>
                        <Avatar className="w-8 h-8 border-2 border-white">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=James" />
                        </Avatar>
                        <Avatar className="w-8 h-8 border-2 border-white">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia" />
                        </Avatar>
                      </div>
                      <div>
                        <CardTitle className="text-lg">Team Alpha</CardTitle>
                        <p className="text-sm text-gray-600">4 members</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Mobile App Development</Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[420px] p-4">
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}
                        >
                          {!message.isCurrentUser && (
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={message.avatar} />
                              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`flex-1 max-w-[70%] ${message.isCurrentUser ? 'flex flex-col items-end' : ''}`}>
                            {!message.isCurrentUser && (
                              <p className="text-sm font-medium mb-1">{message.sender}</p>
                            )}
                            {message.type === 'file' ? (
                              <div className={`p-3 rounded-lg border ${
                                message.isCurrentUser ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                              }`}>
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{message.fileName}</p>
                                    <p className="text-xs text-gray-600">PDF Document</p>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className={`p-3 rounded-lg ${
                                message.isCurrentUser 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-100 text-gray-900'
                              }`}>
                                <p className="text-sm">{message.content}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-2 mt-1 px-1">
                              <p className={`text-xs ${message.isCurrentUser ? 'text-gray-600' : 'text-gray-500'}`}>
                                {message.timestamp}
                              </p>
                              {message.isCurrentUser && (
                                <CheckCheck className={`w-3 h-3 ${message.read ? 'text-blue-600' : 'text-gray-400'}`} />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>

                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="w-5 h-5" />
                    </Button>
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="discussions" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Discussion Threads</CardTitle>
                    <Button size="sm">New Thread</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {discussions.map((discussion) => (
                      <div
                        key={discussion.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{discussion.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {discussion.messages} replies
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {discussion.milestone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Avatar className="w-4 h-4">
                              <AvatarFallback className="text-[8px]">
                                {discussion.participants}
                              </AvatarFallback>
                            </Avatar>
                            {discussion.participants} participants
                          </span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Shared Files */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Shared Files</CardTitle>
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[520px]">
                <div className="space-y-3">
                  {files.map((file) => (
                    <div key={file.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate mb-1">{file.name}</h4>
                          <p className="text-xs text-gray-600 mb-1">{file.size}</p>
                          <p className="text-xs text-gray-500">by {file.uploadedBy}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{file.date}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
