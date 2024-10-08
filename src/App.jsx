// rrd
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";
import ProtectedRoutes from "./layouts/ProtectedRoutes";

// pages
import { Home, Login, ErrorPage, Admins, Statistics } from "./pages";
import { useAppStore } from "./lib/zustand";

function App() {
  const admin = useAppStore((state) => state.admin);
  const flowers = useAppStore((state) => state.flowers);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes admin={admin}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/statistics",
          element: flowers ? <Statistics /> : <Navigate to="/" />,
        },
        {
          path: "/admins",
          element: admin ? <Admins /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/login",
      element: admin ? <Navigate to="/" /> : <Login />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
