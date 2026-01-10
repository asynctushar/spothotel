import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader";

const GuestRoute = () => {
    const { checkingAuth, isAuthenticated } = useSelector(
        (state) => state.authState
    );

    if (checkingAuth) return <Loader />;

    // If logged in, block access to login/register
    if (isAuthenticated) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default GuestRoute;
