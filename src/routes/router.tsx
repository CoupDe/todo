import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/Home/HomePage";
import LoginPage from "../components/login/LoginPage";
import NewTask from "../components/Workspace/NewTask";
import TaskModal from "../components/Workspace/TaskModal";
import LoginLayout from "../Layout/LoginLayout";
import ToDoLayout from "../Layout/WorkSpaceLayout";
import ProtectedRout from "./ProtectedRout";

export const router = createBrowserRouter([
  {
    element: <LoginLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "login/", element: <LoginPage /> },
    ],
  },
  {
    path: "todo/",
    element: (
      <ProtectedRout>
        <ToDoLayout />
      </ProtectedRout>
    ),
    children: [
      {
        path: ":taskId",
        element: <TaskModal />,
      },
      {
        path: "create/",

        element: <NewTask />,
      },
    ],
  },
]);
