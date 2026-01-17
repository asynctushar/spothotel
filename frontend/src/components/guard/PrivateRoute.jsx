import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader";

const PrivateRoute = () => {
    const { checkingAuth, isAuthenticated } = useSelector(
        (state) => state.authState
    );

    if (checkingAuth) return <Loader />;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default PrivateRoute;
