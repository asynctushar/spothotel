import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router';
import { addDays, format } from 'date-fns';
import { Calendar, User, Mail, Phone, Hotel as HotelIcon, DoorOpen, Hash, Bed, DollarSign, CalendarDays } from 'lucide-react';
import { setError } from '../redux/slices/app.slice';
import { useRoomQuery } from '../redux/api/room.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import BookingLoader from '@/components/booking/BookingLoader';

const Booking = () => {
    const { id } = useParams();
    const { isLoading, data, isError, error } = useRoomQuery(id);
    const user = useSelector((state) => state.authState.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dates, setDates] = useState([]);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [disableDates, setDisableDates] = useState([]);
    const [dateRange, setDateRange] = useState({
        from: new Date(),
        to: new Date(),
    });

    const prices = data?.room?.pricePerDay * dates?.length;
    const vat = data?.room?.pricePerDay * dates?.length * (18 / 100);
    const totalPrice = prices + vat;
    const willCheckOut = phone.length >= 10;

    const bookingDetails = {
        name,
        email,
        phone,
        totalPrice,
        dates,
        room: id,
        hotel: data?.room?.hotel._id
    };

    useEffect(() => {
        setName(user?.name || '');
        setEmail(user?.email || '');
    }, [user]);

    useEffect(() => {
        if (data?.room?.notAvailable?.length > 0) {
            const dates = data.room.notAvailable.map((date) => new Date(date));
            setDisableDates(dates);
        }
    }, [data]);

    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            let tempDates = [];
            let startDate = dateRange.from;
            // Include the end date in the loop
            while (startDate <= dateRange.to) {
                tempDates.push(format(new Date(startDate), 'yyyy-MM-dd'));
                startDate = addDays(new Date(startDate), 1);
            }
            setDates(tempDates);
        } else if (dateRange?.from && !dateRange?.to) {
            // Handle single date selection
            setDates([format(new Date(dateRange.from), 'yyyy-MM-dd')]);

        } else if (!dateRange?.from) {
            setDates([]);
        }
    }, [dateRange]);

    useEffect(() => {
        if (isError && error) {
            dispatch(setError(error.data.message));
        }
    }, [isError, error, dispatch]);

    const onCheckout = () => {
        if (!phone || phone.length < 10) {
            dispatch(setError("Please enter a valid phone number"));
            return;
        }

        if (dates.length === 0) {
            dispatch(setError("Please select booking dates"));
            return;
        }


        const notAvailable = data?.room.notAvailable.map((date) => Date.parse(date));
        const isValidDate = dates.every((date) => !notAvailable.includes(Date.parse(date)));

        if (!isValidDate) {
            dispatch(setError("Selected dates are not available"));
            return;
        }

        sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
        navigate('/booking/payment');
    };

    if (isLoading) return <BookingLoader />;

    if (!data?.room) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[53vh] px-4">
                <div className="text-center max-w-md">
                    <h2 className="text-3xl font-bold mb-3">Room Not Found</h2>
                    <p className="text-muted-foreground mb-6">
                        The room you're looking for doesn't exist or may have been removed.
                    </p>
                    <Button asChild>
                        <Link to="/">Browse Hotels</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl min-h-[calc(100vh-72px)] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Your Details & Room Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Your Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Your Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        value={name}
                                        disabled
                                        className="pl-10 bg-muted"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        disabled
                                        className="pl-10 bg-muted"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number *</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                {phone && phone.length < 10 && (
                                    <p className="text-sm text-destructive">Phone number must be at least 10 digits</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Room Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DoorOpen className="w-5 h-5" />
                                Room Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-3">
                                <HotelIcon className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium w-32">Hotel:</span>
                                <span className="text-muted-foreground">{data.room.hotel.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Bed className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium w-32">Room Name:</span>
                                <span className="text-muted-foreground">{data.room.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Hash className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium w-32">Room Number:</span>
                                <span className="text-muted-foreground">{data.room.number}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <DoorOpen className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium w-32">Room Type:</span>
                                <span className="text-muted-foreground">{data.room.type}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium w-32">Price per Day:</span>
                                <span className="text-primary font-semibold">${data.room.pricePerDay}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Booking Summary */}
                <div className="lg:col-span-1">
                    <Card className="top-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5" />
                                Booking Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Dates *</Label>
                                <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal cursor-pointer">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {dateRange?.from && dateRange?.to ? (
                                                <>
                                                    {format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd, yyyy')}
                                                </>
                                            ) : (
                                                'Select dates'
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="range"
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={1}
                                            disabled={(date) => {
                                                const today = new Date();
                                                today.setHours(0, 0, 0, 0);
                                                if (date < today) return true;
                                                return disableDates.some(disabledDate =>
                                                    date.toDateString() === disabledDate.toDateString()
                                                );
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {dates.length > 0 && (
                                <>
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
                                        <span>Total</span>
                                        <span className="text-primary">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </>
                            )}

                            <Button
                                onClick={onCheckout}
                                disabled={!willCheckOut || dates.length === 0}
                                className="w-full cursor-pointer"
                                size="lg"
                            >
                                Proceed to Checkout
                            </Button>

                            {(!willCheckOut || dates.length === 0) && (
                                <p className="text-xs text-center text-destructive">
                                    {!willCheckOut && "Please enter a valid phone number. "}
                                    {dates.length === 0 && "Please select booking dates."}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Booking;