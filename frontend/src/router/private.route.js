import { lazy } from "react";

const Booking = lazy(() => import("@/pages/Booking"));
const Account = lazy(() => import("../pages/Account"));
const Payment = lazy(() => import("@/pages/Payment"));
const PaymentLayout = lazy(() => import("@/components/layout/PaymentLayout"));
const BookingSuccess = lazy(() => import("@/pages/BookingSuccess"));
const Settings = lazy(() => import("@/pages/Settings"));
const Bookings = lazy(() => import("@/pages/Bookings"));
const BookingDetails = lazy(() => import("@/pages/BookingDetails"));

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
