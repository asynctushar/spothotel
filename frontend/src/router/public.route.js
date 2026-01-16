import Home from "@/pages/Home";
import HotelDetails from "@/pages/HotelDetails";

export default [
    { index: true, Component: Home },
    { path: "hotels/:id", Component: HotelDetails },
];