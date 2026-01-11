import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AuthLayout = () => (
    <>
        <Navbar layout="AUTH" />
        <Outlet />
        <Footer />
    </>
);

export default AuthLayout;
