import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { loadUser } from "./redux/actions/auth.action";
import ScrollToTop from "./components/layout/ScrollToTop";
import GlobalToast from "./components/layout/GlobalToast";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <>
            <ScrollToTop />
            <GlobalToast />
            <Toaster position="bottom-left" richColors />
            <Outlet />
        </>
    );
};

export default App;
