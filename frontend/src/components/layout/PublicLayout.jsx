import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = () => (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
);

export default PublicLayout;
