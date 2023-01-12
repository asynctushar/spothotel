import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";


const ProtectedRoute = ({ role = "user",children }) => {
    const { isLoading, isAuthenticated } = useSelector((state) => state.userState);
    return (
        <Fragment>
            {!isLoading && !isAuthenticated && <Navigate to="/login" />}
            {!isLoading && isAuthenticated && children}
            {isLoading && <Loader />}
        </Fragment>
    )
}
export default ProtectedRoute;