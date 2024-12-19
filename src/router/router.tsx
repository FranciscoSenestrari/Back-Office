import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./MainLayoute";
import { Informes } from "../pages/Informes";
import { Home } from "../pages/Home";
import { Pedidos } from "../pages/Pedidos";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/informes", element: <Informes /> },
      { path: "/pedidos", element: <Pedidos /> },
      // { path: "users", element: <UsersPage /> },
      // { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
