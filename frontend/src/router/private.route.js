import PaymentLayout from "@/components/layout/PaymentLayout";
import Account from "@/pages/Account";
import Booking from "@/pages/Booking";
import BookingDetails from "@/pages/BookingDetails";
import Bookings from "@/pages/Bookings";
import BookingSuccess from "@/pages/BookingSuccess";
import Payment from "@/pages/Payment";
import Settings from "@/pages/Settings";

export default [
    { path: "account", Component: Account },
    { path: "booking/rooms/:id", Component: Booking },
    { path: "booking/success", Component: BookingSuccess },
    {
        path: "booking",
        Component: PaymentLayout,
        children: [
            { path: "payment", Component: Payment },
        ],
    },
    { path: "account/settings", Component: Settings },
    { path: "account/bookings", Component: Bookings },
    { path: "account/bookings/:id", Component: BookingDetails },
];
