import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./MainLayoute";
import { Informes } from "../pages/Informes";
import { Home } from "../pages/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/informes", element: <Informes /> },
      { path: "", element: <Home /> },
      // { path: "users", element: <UsersPage /> },
      // { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
