import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const HotelDetails = lazy(() => import("../pages/HotelDetails"));

export default [
    { index: true, Component: Home },
    { path: "hotels/:id", Component: HotelDetails },
];
