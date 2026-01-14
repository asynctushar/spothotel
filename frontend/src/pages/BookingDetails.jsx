import { useParams, Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { User, Mail, Phone, Building2, DoorOpen, Hash, Bed, DollarSign, CalendarDays, CheckCircle2, XCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useOwnBookingQuery } from '../redux/api/booking.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import BookingDetailsLoader from '@/components/booking/BookingDetailsLoader';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const BookingDetails = () => {
    const id = useParams().id;
    const { isLoading, data } = useOwnBookingQuery(id);
    const [dates, setDates] = useState([]);
    const user = useSelector((state) => state.authState.user);
    const prices = data?.booking?.room.pricePerDay * dates?.length;
    const vat = data?.booking?.room.pricePerDay * dates?.length * (18 / 100);

    useEffect(() => {
        if (data && data?.booking) {
            const tempDates = data?.booking.dates.map((date) => formatDate(date));
            setDates(tempDates);
        }
    }, [data]);

    const getStatusIcon = (status) => {
        const statusLower = status?.toLowerCase();
        if (statusLower === 'confirmed') return <CheckCircle2 className="w-4 h-4" />;
        if (statusLower === 'pending') return <Clock className="w-4 h-4" />;
        if (statusLower === 'cancelled') return <XCircle className="w-4 h-4" />;
        return <AlertCircle className="w-4 h-4" />;
    };

    const getStatusVariant = (status) => {
        const statusLower = status?.toLowerCase();
        if (statusLower === 'confirmed') return 'default';
        if (statusLower === 'pending') return 'secondary';
        if (statusLower === 'cancelled') return 'destructive';
        return 'outline';
    };

    if (isLoading) return <BookingDetailsLoader />;

    if (!data?.booking) {
        return (
            <div className="min-h-[calc(100vh-72px)] bg-background flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h2 className="text-3xl font-bold mb-3">Booking Not Found</h2>
                    <p className="text-foreground/75 mb-6">
                        The booking you're looking for doesn't exist or may have been removed.
                    </p>
                    <Link to="/me/bookings">
                        <Button>View All Bookings</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-72px)] bg-background pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to="/account/bookings" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Bookings</span>
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Booking Details</h1>
                    <p className="text-foreground/75 mt-2">View your booking information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Your Details & Room Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Your Details */}
                        <Card className="shadow-md border-0">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Your Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium w-32">Name:</span>
                                    <span className="text-muted-foreground capitalize">{user?.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium w-32">Email:</span>
                                    <span className="text-muted-foreground">{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium w-32">Phone:</span>
                                    <span className="text-muted-foreground">{data.booking.phone}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Room Details */}
                        <Card className="shadow-md border-0">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DoorOpen className="w-5 h-5" />
                                    Room Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium w-32">Hotel:</span>
                                    <Link to={`/hotels/${data.booking.hotel._id}`} className="text-primary hover:underline">
                                        {data.booking.hotel.name}
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Bed className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium w-32">Room Name:</span>
                                    <span className="text-muted-foreground">{data.booking.room.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Hash className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium w-32">Room Number:</span>
                                    <span className="text-muted-foreground">{data.booking.room.number}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DoorOpen className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium w-32">Room Type:</span>
                                    <span className="text-muted-foreground">{data.booking.room.type}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium w-32">Price per Day:</span>
                                    <span className="text-primary font-semibold">{data.booking.room.pricePerDay} taka</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-1">
                        <Card className="shadow-md border-0">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarDays className="w-5 h-5" />
                                    Booking Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Hash className="w-4 h-4 text-muted-foreground mt-0.5" />
                                        <div className="flex-1">
                                            <span className="font-medium block mb-1">Booking ID:</span>
                                            <span className="text-sm text-muted-foreground font-mono break-all">{data.booking._id}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium">Status:</span>
                                        <Badge variant={getStatusVariant(data.booking.status)} className="flex items-center gap-1 ml-auto">
                                            {getStatusIcon(data.booking.status)}
                                            <span className="capitalize">{data.booking.status}</span>
                                        </Badge>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CalendarDays className="w-4 h-4 text-muted-foreground mt-0.5" />
                                        <div className="flex-1">
                                            <span className="font-medium block mb-2">Booked Dates:</span>
                                            <div className="bg-gray-50 rounded-lg p-3 space-y-1 max-h-48 overflow-y-auto">
                                                {dates.map((date, index) => (
                                                    <div key={index} className="text-sm text-muted-foreground">
                                                        {date}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Price ({dates.length} {dates.length === 1 ? 'day' : 'days'})</span>
                                        <span className="font-medium">${prices.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">VAT (18%)</span>
                                        <span className="font-medium">${vat.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total Paid</span>
                                    <span className="text-primary">${data.booking.totalPrice.toFixed(2)}</span>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium">Payment Status:</span>
                                    <Badge variant={data.booking.paymentInfo.status === 'paid' ? 'default' : 'secondary'} className="ml-auto">
                                        {data.booking.paymentInfo.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;