import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivateLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default PrivateLayout;
