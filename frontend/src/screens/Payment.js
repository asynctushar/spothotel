import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';
import { setError } from '../redux/slices/appSlice';
import { newBookingAction } from '../redux/actions/hotelAction';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { setHasBooked } from '../redux/slices/hotelSlice';
import Meta from '../utils/Meta';

const Payment = () => {
    const payBtn = useRef();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
    const hasBooked = useSelector((state) => state.hotelState.hasBooked);

    useEffect(() => {
        if (hasBooked) {
            navigate('/booking/success');
            dispatch(setHasBooked(false));
        }
    }, [hasBooked, dispatch, navigate])

    useEffect(() => {
        if (bookingDetails === null) {
            navigate('/ewe');
        }
    }, [bookingDetails, navigate]);


    const submitHandler = async () => {
        payBtn.current.disabled = true;

        try {
            const { data } = await axios.post('/api/v1/stripeclientkey', { amount: bookingDetails.totalPrice }, { headers: { "Content-Type": "application/json" } })
            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: bookingDetails.name,
                        email: bookingDetails.email
                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false;
                dispatch(setError(result.error.message));

            } else {
                if (result.paymentIntent.status === "succeeded") {
                    const paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(newBookingAction({
                        paymentInfo,
                        dates: bookingDetails.dates,
                        totalPrice: bookingDetails.totalPrice,
                        phone: bookingDetails.phone
                    }, bookingDetails.hotel, bookingDetails.room));

                } else {
                    dispatch(setError("There's some issue while processing payment "));
                }
            }

        } catch (err) {
            payBtn.current.disabled = false;
            dispatch(setError(err.response.data.message));
        }

    }

    return (
        <Fragment>
            <Meta title="Payment" />
            <div className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48 mt-4">
                <h2 className="text-2xl text-center font-medium mb-5 mt-40">Payment</h2>
                <div className="px-1 sm:px-3 flex justify-center">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center py-3 px-4 w-56 rounded border border-solid border-gray-500 " >
                            <CreditCardIcon />
                            <CardNumberElement className="w-full ml-2" />
                        </div>
                        <div className="flex items-center py-3 px-4 w-56 rounded border border-solid border-gray-500 " >
                            <EventIcon />
                            <CardExpiryElement className="w-full ml-2" />
                        </div>
                        <div className="flex items-center py-3 px-4 w-56 rounded border border-solid border-gray-500 " >
                            <VpnKeyIcon />
                            <CardCvcElement className="w-full ml-2" />
                        </div>
                        <button onClick={() => submitHandler()} type="submit" ref={payBtn} className="py-4 w-56 block text-center rounded bg-red-400 hover:bg-red-500 transition duration-200 text-zinc-50 disabled:cursor-not-allowed">{`Pay - ${bookingDetails?.totalPrice}`}</button>
                    </div>
                </div>
            </div >
        </Fragment>
    )
}
export default Payment;