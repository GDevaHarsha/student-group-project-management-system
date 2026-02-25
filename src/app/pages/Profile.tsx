import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useUser } from '../context/UserContext';
import { User, Mail, Phone, MapPin, Bell, Shield, Palette, Calendar } from 'lucide-react';

export function Profile() {
  const { user, isTeacher } = useUser();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Profile & Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-3xl">{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl mb-1">{user?.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{user?.email}</p>
                <Badge className="capitalize">{user?.role}</Badge>
              </div>
              <Button variant="outline" className="w-full">Change Photo</Button>
            </div>

            <div className="mt-6 pt-6 border-t space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-medium">Feb 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Projects Completed</span>
                <span className="text-sm font-medium">{isTeacher ? '45' : '12'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Projects</span>
                <span className="text-sm font-medium">{isTeacher ? '8' : '3'}</span>
              </div>
              {!isTeacher && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Grade</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                          id="first-name" 
                          className="pl-10" 
                          defaultValue={user?.name.split(' ')[0]} 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                          id="last-name" 
                          className="pl-10" 
                          defaultValue={user?.name.split(' ').slice(1).join(' ')} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        className="pl-10" 
                        defaultValue={user?.email} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="phone" 
                        type="tel" 
                        className="pl-10" 
                        placeholder="+1 (555) 000-0000" 
                      />
                    </div>
                  </div>

                  {!isTeacher && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input 
                          id="student-id" 
                          defaultValue="STU-2026-001" 
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="major">Major</Label>
                        <Input 
                          id="major" 
                          defaultValue="Computer Science" 
                        />
                      </div>
                    </>
                  )}

                  {isTeacher && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department" 
                          defaultValue="Computer Science & Engineering" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="office">Office Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input 
                            id="office" 
                            className="pl-10" 
                            defaultValue="Building A, Room 305" 
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-3">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="current-password" 
                        type="password" 
                        className="pl-10" 
                        placeholder="••••••••" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="new-password" 
                        type="password" 
                        className="pl-10" 
                        placeholder="••••••••" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        className="pl-10" 
                        placeholder="••••••••" 
                      />
                    </div>
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="project-updates" className="text-base">Project Updates</Label>
                      <p className="text-sm text-gray-600">Notifications about project changes</p>
                    </div>
                    <Switch id="project-updates" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="task-reminders" className="text-base">Task Reminders</Label>
                      <p className="text-sm text-gray-600">Get reminded about upcoming deadlines</p>
                    </div>
                    <Switch id="task-reminders" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="team-messages" className="text-base">Team Messages</Label>
                      <p className="text-sm text-gray-600">Notifications for team chat messages</p>
                    </div>
                    <Switch id="team-messages" defaultChecked />
                  </div>

                  {isTeacher && (
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="submission-alerts" className="text-base">Submission Alerts</Label>
                        <p className="text-sm text-gray-600">Get notified of new submissions</p>
                      </div>
                      <Switch id="submission-alerts" defaultChecked />
                    </div>
                  )}

                  {!isTeacher && (
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="grade-updates" className="text-base">Grade Updates</Label>
                        <p className="text-sm text-gray-600">Notifications when grades are posted</p>
                      </div>
                      <Switch id="grade-updates" defaultChecked />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-summary" className="text-base">Weekly Summary</Label>
                      <p className="text-sm text-gray-600">Get a weekly summary of activities</p>
                    </div>
                    <Switch id="weekly-summary" />
                  </div>

                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                  <CardDescription>Customize your interface appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                      <p className="text-sm text-gray-600">Toggle dark/light theme</p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-view" className="text-base">Compact View</Label>
                      <p className="text-sm text-gray-600">Show more content with less spacing</p>
                    </div>
                    <Switch id="compact-view" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-avatars" className="text-base">Show Avatars</Label>
                      <p className="text-sm text-gray-600">Display profile pictures</p>
                    </div>
                    <Switch id="show-avatars" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input id="language" defaultValue="English (US)" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="(UTC-05:00) Eastern Time" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Input id="date-format" defaultValue="MM/DD/YYYY" />
                  </div>

                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
