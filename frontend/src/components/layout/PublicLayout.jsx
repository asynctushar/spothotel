import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "../ui/Loader";
import { useSelector } from "react-redux";

const PublicLayout = () => {
    const { checkingAuth } = useSelector(
        (state) => state.authState
    );

    if (checkingAuth) return <Loader />;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
