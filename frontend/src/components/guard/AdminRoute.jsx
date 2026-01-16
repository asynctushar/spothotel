import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader";
import NotFound from "@/pages/NotFound";

const AdminRoute = () => {
    const { checkingAuth, user } = useSelector(
        (state) => state.authState
    );

    if (checkingAuth) return <Loader />;

    if (!user || user.role !== "admin") {
        return <NotFound />;
    }

    return <Outlet />;
};

export default AdminRoute;
