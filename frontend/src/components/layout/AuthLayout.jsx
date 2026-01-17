import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AuthLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar layout="AUTH" />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default AuthLayout;
