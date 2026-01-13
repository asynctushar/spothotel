import { Fragment, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import * as bookingService from "../services/booking.service";
import { setError } from '../redux/slices/app.slice';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useCreateBookingMutation } from '../redux/api/booking.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Payment = () => {
    const payBtn = useRef();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
    const [createBooking, { isLoading, isSuccess }] = useCreateBookingMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/booking/success', { state: { success: true }, replace: true });
            sessionStorage.removeItem('bookingDetails');
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (bookingDetails === null) {
            navigate('/', { replace: true });
        }
    }, [bookingDetails, navigate]);

    const submitHandler = async () => {
        payBtn.current.disabled = true;

        try {
            const { data } = await bookingService.payment({ amount: bookingDetails.totalPrice });
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

                    createBooking({
                        data: {
                            paymentInfo,
                            dates: bookingDetails.dates,
                            totalPrice: bookingDetails.totalPrice,
                            phone: bookingDetails.phone
                        },
                        hotelId: bookingDetails.hotel,
                        roomId: bookingDetails.room
                    });
                } else {
                    dispatch(setError("There's some issue while processing payment"));
                }
            }
        } catch (err) {
            payBtn.current.disabled = false;
            dispatch(setError(err.response?.data?.message || "Payment failed"));
        }
    };

    const getComputedColor = (variable) => {
        if (typeof window === 'undefined') return '#000000';
        const root = document.documentElement;
        const value = getComputedStyle(root).getPropertyValue(variable).trim();
        return value ? `hsl(${value})` : '#000000';
    };

    // Then update cardElementOptions:
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: getComputedColor('--foreground'),
                fontFamily: 'system-ui, -apple-system, sans-serif',
                '::placeholder': {
                    color: getComputedColor('--muted-foreground'),
                },
            },
            invalid: {
                color: getComputedColor('--destructive'),
            },
        },
    };

    return (
        <Fragment>
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
                    <p className="text-muted-foreground">Enter your card details to confirm your booking</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Payment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Payment Summary */}
                        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Booking for:</span>
                                <span className="font-medium">{bookingDetails?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Number of days:</span>
                                <span className="font-medium">{bookingDetails?.dates?.length}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between">
                                <span className="font-semibold">Total Amount:</span>
                                <span className="text-xl font-bold text-primary">
                                    ${bookingDetails?.totalPrice?.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Card Details Form */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Card Number</label>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-background">
                                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                                    <div className="flex-1">
                                        <CardNumberElement options={cardElementOptions} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Expiry Date</label>
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-background">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <div className="flex-1">
                                            <CardExpiryElement options={cardElementOptions} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">CVC</label>
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-background">
                                        <Lock className="w-5 h-5 text-muted-foreground" />
                                        <div className="flex-1">
                                            <CardCvcElement options={cardElementOptions} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                            <Lock className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <p className="text-xs text-muted-foreground">
                                Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                            </p>
                        </div>

                        {/* Pay Button */}
                        <Button
                            onClick={submitHandler}
                            ref={payBtn}
                            disabled={isLoading || !stripe || !elements}
                            className="w-full"
                            size="lg"
                        >
                            {isLoading ? 'Processing...' : `Pay $${bookingDetails?.totalPrice?.toFixed(2)}`}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </Fragment>
    );
};

export default Payment;