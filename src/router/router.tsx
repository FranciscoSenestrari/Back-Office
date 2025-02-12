import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./MainLayoute";
import { Informes } from "../pages/Informes";
import { Home } from "../pages/Home";
import { Pedidos } from "../pages/Pedidos";
import { CargaProductos } from "../pages/Productos/CargaProductos";
import { Productos } from "../pages/Productos/Productos";

import LoginPage from "../pages/Login";
import { ProtectedRoute } from "../context/AuthContex";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "informes", element: <Informes /> },
      { path: "pedidos", element: <Pedidos /> },
      { path: "productos", element: <Productos /> },
      { path: "productos/cargar", element: <CargaProductos /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);
