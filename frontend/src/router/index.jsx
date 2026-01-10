import { createBrowserRouter } from "react-router";
import App from "../App";

import PublicLayout from "../components/layout/PublicLayout";
import PrivateLayout from "../components/layout/PrivateLayout";
import AdminLayout from "../components/layout/AdminLayout";

import GuestRoute from "../components/guards/GuestRoute";
import PrivateRoute from "../components/guards/PrivateRoute";
import AdminRoute from "../components/guards/AdminRoute";

import publicRoutes from "./public.route";
import guestRoutes from "./guest.route";
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

            // 👤 Guest-only pages
            {
                element: <GuestRoute />,
                children: [
                    {
                        element: <PublicLayout />,
                        children: guestRoutes,
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
