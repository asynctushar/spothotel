import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/ui/Loader";


const ProtectedRoute = ({ role, children }) => {
    const { checkingAuth, isAuthenticated, user } = useSelector((state) => state.authState);

    return (
        <Fragment>
            {!checkingAuth && !isAuthenticated && <Navigate to="/login" />}
            {role !== 'admin' && !checkingAuth && isAuthenticated && children}
            {role === 'admin' && !checkingAuth && isAuthenticated && user.role === 'admin' && children}
            {role === 'admin' && !checkingAuth && isAuthenticated && user.role !== 'admin' && <Navigate to="/account" />}
            {checkingAuth && <Loader />}
        </Fragment>
    );
};
export default ProtectedRoute;