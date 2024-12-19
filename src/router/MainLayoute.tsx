import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div
          className={`p-4 text-lg font-bold border-b border-gray-700 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          Dashboard
        </div>
        <nav
          className={`flex-1 p-4 space-y-2 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <ul>
            <li>
              <Link
                to="/"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/users"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/informes"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Informes
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className={`p-4 border-t border-gray-700 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <button className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>

        {/* Outlet for rendering pages */}
        <main className="flex-1 w-full overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
