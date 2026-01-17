import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as bookingService from "../../services/booking.service";
import { setError } from "@/redux/slices/app.slice";
import PaymentLoader from "@/components/booking/PaymentLoader";

const PaymentLayout = () => {
    const dispatch = useDispatch();
    const [stripeApiKey, setStripeApiKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { data } = await bookingService.getStripePublicKey();
                setStripeApiKey(data.stripeApiKey);
            } catch (err) {
                dispatch(setError(err.response?.data?.message || "Failed to load payment"));
            } finally {
                setIsLoading(false);
            }
        })();
    }, [dispatch]);

    if (isLoading || !stripeApiKey) {
        return <PaymentLoader />;
    }

    return (
        <Elements stripe={loadStripe(stripeApiKey)}>
            <Outlet />
        </Elements>
    );
};

export default PaymentLayout;