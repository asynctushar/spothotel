import { createBrowserRouter } from "react-router";
import App from "../App";

import PublicLayout from "../components/layout/PublicLayout";
import AuthLayout from "../components/layout/AuthLayout.jsx";
import PrivateLayout from "../components/layout/PrivateLayout";
import AdminLayout from "../components/layout/AdminLayout";

import AuthRoute from "../components/guard/AuthRoute";
import PrivateRoute from "../components/guard/PrivateRoute";
import AdminRoute from "../components/guard/AdminRoute";

import publicRoutes from "./public.route";
import authRoutes from "./auth.route";
import privateRoutes from "./private.route";
import adminRoutes from "./admin.route";

import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            // 🌍 Public pages (everyone)
            {
                element: <PublicLayout />,
                children: publicRoutes,
            },

            // 👤 auth pages (un-authenticated users only)
            {
                element: <AuthRoute />,
                children: [
                    {
                        element: <AuthLayout />,
                        children: authRoutes,
                    },
                ],
            },

            // 🔐 Authenticated users
            {
                element: <PrivateRoute />,
                children: [
                    {
                        element: <PrivateLayout />,
                        children: privateRoutes,
                    },
                ],
            },

            // 👑 Admin users
            {
                element: <AdminRoute />,
                children: [
                    {
                        element: <AdminLayout />,
                        children: adminRoutes,
                    },
                ],
            },

            { path: "*", Component: NotFound },
        ],
    },
]);

export default router;
