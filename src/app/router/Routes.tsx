import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/Activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/Activities/form/ActivityForm";
import ActivityDetails from "../../features/Activities/details/ActivityDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
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
    ],
  },
];

export const router = createBrowserRouter(routes);
