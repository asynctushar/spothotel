import Booking from "@/pages/Booking";
import Account from "../pages/Account";
import Payment from "@/pages/Payment";
import PaymentLayout from "@/components/layout/PaymentLayout";
import BookingSuccess from "@/pages/BookingSuccess";

export default [
    { path: "account", Component: Account },
    { path: "booking/rooms/:id", Component: Booking },
    {
        path: "booking",
        Component: PaymentLayout,
        children: [
            { path: "payment", Component: Payment },
        ],
    },
    {
        path: "booking/success", Component: BookingSuccess
    },
];
