// import { lazy } from "react";

import Home from "@/pages/Home";
import HotelDetails from "@/pages/HotelDetails";

// const Home = lazy(() => import("@/pages/Home"));
// const HotelDetails = lazy(() => import("@/pages/HotelDetails"));


export default [
    { index: true, Component: Home },
    { path: "hotels/:id", Component: HotelDetails },
];