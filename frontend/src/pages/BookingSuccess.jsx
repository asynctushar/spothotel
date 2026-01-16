import { Navigate, useLocation, useNavigate } from 'react-router';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Fragment, useEffect } from 'react';
import Meta from '@/components/shared/Meta';

const BookingSuccess = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (state?.success) {
            sessionStorage.removeItem('bookingDetails');
            // Clear the state by replacing the current history entry
            window.history.replaceState({}, document.title);
        }
    }, [state]);

    if (!state?.success) {
        return <Navigate to="/account/bookings" replace />;
    }

    return (
        <Fragment>
            <Meta
                title="Booking Confirmed"
                description="Your hotel booking has been successfully confirmed. View your booking details and get ready for a comfortable stay with SpotHotel."
                keywords="booking success, reservation confirmed, SpotHotel"
            />
            <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-12">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-green-100 p-3">
                                <CheckCircle2 className="w-16 h-16 text-green-600" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
                            <p className="text-muted-foreground text-lg">
                                Your reservation has been successfully completed.
                            </p>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            You can view your booking details from your bookings page.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                onClick={() => navigate('/account/bookings', { replace: true })}
                                className="flex-1 cursor-pointer"
                            >
                                View My Bookings
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/', { replace: true })}
                                className="flex-1 cursor-pointer"
                            >
                                Back to Home
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Fragment>
    );
};

export default BookingSuccess;;