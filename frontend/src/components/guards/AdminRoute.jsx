import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader";

const AdminRoute = () => {
    const { checkingAuth, user } = useSelector(
        (state) => state.authState
    );

    if (checkingAuth) return <Loader />;

    if (!user || user.role !== "admin") {
        return <Navigate to="/not-found" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
