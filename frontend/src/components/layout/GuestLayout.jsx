import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const GuestLayout = () => (
    <>
        <Navbar layout="GUEST" />
        <Outlet />
        <Footer />
    </>
);

export default GuestLayout;
