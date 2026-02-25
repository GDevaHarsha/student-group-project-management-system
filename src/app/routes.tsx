import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Login } from "./pages/Login";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { StudentDashboard } from "./pages/StudentDashboard";
import { ProjectManagement } from "./pages/ProjectManagement";
import { TaskBoard } from "./pages/TaskBoard";
import { Collaboration } from "./pages/Collaboration";
import { Submissions } from "./pages/Submissions";
import { Profile } from "./pages/Profile";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "teacher-dashboard", Component: TeacherDashboard },
      { path: "student-dashboard", Component: StudentDashboard },
      { path: "projects", Component: ProjectManagement },
      { path: "projects/:projectId", Component: ProjectManagement },
      { path: "tasks", Component: TaskBoard },
      { path: "collaboration", Component: Collaboration },
      { path: "submissions", Component: Submissions },
      { path: "profile", Component: Profile },
      { path: "*", Component: NotFound },
    ],
  },
]);
