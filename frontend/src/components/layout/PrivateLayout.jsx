import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivateLayout = () => (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
);

export default PrivateLayout;
