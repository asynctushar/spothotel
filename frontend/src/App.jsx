import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { loadUser } from "./redux/actions/auth.action";
import ScrollToTop from "./components/layout/ScrollToTop";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
};

export default App;
