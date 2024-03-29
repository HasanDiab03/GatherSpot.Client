import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/Activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/Activities/form/ActivityForm";
import ActivityDetails from "../../features/Activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import RegisterSuccess from "../../features/users/RegisterSuccess";
import ConfirmEmail from "../../features/users/ConfirmEmail";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "activities",
            element: <ActivityDashboard />,
          },
          {
            path: "createActivity",
            element: <ActivityForm key="create" />, // the key is used here, to tell react to not preserve state, since by default, when navigating from a component to itself, even on different paths, react preservs state, which is not the wanted behaviour here. the key prop tells react that these components are not the same (even tho they are), and they are unique. so it will reset the state
          },
          {
            path: "manage/:id",
            element: <ActivityForm key="manage" />,
          },
          {
            path: "activities/:id",
            element: <ActivityDetails />,
          },
          {
            path: "errors",
            element: <TestErrors />,
          },
          {
            path: "profile/:username",
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "account/registerSuccess",
        element: <RegisterSuccess />,
      },
      {
        path: "account/verifyEmail",
        element: <ConfirmEmail />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
