import BookingDetails from "@/pages/admin/BookingDetails";
import Bookings from "@/pages/admin/Bookings";
import CreateHotel from "@/pages/admin/CreateHotel";
import CreateRoom from "@/pages/admin/CreateRoom";
import Dashboard from "@/pages/admin/Dashboard";
import HotelRooms from "@/pages/admin/HotelRooms";
import Hotels from "@/pages/admin/Hotels";
import UpdateHotel from "@/pages/admin/UpdateHotel";
import UpdateRoom from "@/pages/admin/UpdateRoom";
import Users from "@/pages/admin/Users";

export default [
    { path: "admin/dashboard", Component: Dashboard },
    { path: "admin/users", Component: Users },
    { path: "admin/bookings", Component: Bookings },
    { path: "admin/bookings/:id", Component: BookingDetails },
    { path: "admin/hotels", Component: Hotels },
    { path: "admin/hotels/create", Component: CreateHotel },
    { path: "admin/hotels/:id/update", Component: UpdateHotel },
    { path: "admin/hotels/:id/rooms", Component: HotelRooms },
    { path: "admin/hotels/:id/rooms/create", Component: CreateRoom },
    { path: "admin/rooms/:id/update", Component: UpdateRoom },
];
