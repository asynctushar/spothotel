import Users from "@/pages/admin/Users";
import Dashboard from "../pages/admin/Dashboard";
import Bookings from "@/pages/admin/Bookings";
import Hotels from "@/pages/admin/Hotels";
import CreateHotel from "@/pages/admin/CreateHotel";
import Hotel from "@/pages/admin/Hotel";
import HotelRooms from "@/pages/admin/HotelRooms";
import CreateRoom from "@/pages/admin/CreateRoom";
import BookingDetails from "@/pages/admin/BookingDetails";

export default [
    { path: "admin/dashboard", Component: Dashboard },
    { path: "admin/users", Component: Users },
    { path: "admin/bookings", Component: Bookings },
    { path: "admin/bookings/:id", Component: BookingDetails },
    { path: "admin/hotels", Component: Hotels },
    { path: "admin/hotels/create", Component: CreateHotel },
    { path: "admin/hotels/:id", Component: Hotel },
    { path: "admin/hotels/:id/rooms", Component: HotelRooms },
    { path: "admin/hotels/:id/rooms/create", Component: CreateRoom },
];
