import HotelCard from '@/components/hotel/HotelCard';
import { useHotelsQuery } from '@/redux/api/hotel.api';
import { setError } from '@/redux/slices/app.slice';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { format, addDays } from 'date-fns';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import HotelCardLoader from '@/components/hotel/HotelCardLoader';
import { useLocation } from 'react-router';

const Home = () => {
    const [isPersonOpen, setIsPersonOpen] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [travellers, setTravellers] = useState({ room: 1, person: 1 });
    const [dateRange, setDateRange] = useState({
        from: new Date(),
        to: addDays(new Date(), 1),
    });

    const [queryParams, setQueryParams] = useState({});
    const { data, isLoading, isError, error, isFetching } = useHotelsQuery(queryParams);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/' && location.search === '') {
            setQueryParams({});
        }
    }, [location]);

    useEffect(() => {
        if (isError && error) {
            dispatch(setError(error.data.message));
        }
    }, [isError, error, dispatch]);

    const searchHandler = () => {
        if (keyword.length < 1) return;

        setQueryParams({
            location: keyword,
            room: travellers.room,
            person: travellers.person,
            d1: format(dateRange.from, 'yyyy-MM-dd'),
            d2: format(dateRange.to, 'yyyy-MM-dd')
        });

        setIsDateOpen(false);
        setIsPersonOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchHandler();
        }
    };

    const incrementRoom = () => setTravellers({ ...travellers, room: travellers.room + 1 });
    const decrementRoom = () => setTravellers({ ...travellers, room: Math.max(1, travellers.room - 1) });
    const incrementPerson = () => setTravellers({ ...travellers, person: travellers.person + 1 });
    const decrementPerson = () => setTravellers({ ...travellers, person: Math.max(1, travellers.person - 1) });

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Search Section */}
            <div className="bg-primary p-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-primary-foreground">Find Your Perfect Stay</h1>
                    <p className="text-center text-primary-foreground/80 mb-6">Search hotels, compare prices, and book your next adventure</p>

                    <div className="bg-background rounded-lg shadow-lg p-3">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            {/* Location Input */}
                            <div className="md:col-span-1">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Where are you going?"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onKeyPress={handleKeyDown}
                                        className="pl-10 h-12"
                                    />
                                </div>
                            </div>

                            {/* Date Picker */}
                            <div className="md:col-span-1">
                                <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full h-12 justify-start text-left font-normal cursor-pointer">
                                            <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                                            <span className="truncate">
                                                {dateRange && dateRange.from && dateRange.to ? (
                                                    <>
                                                        {format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd')}
                                                    </>
                                                ) : (
                                                    'Select dates'
                                                )}
                                            </span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="range"
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={1}
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Travellers Picker */}
                            <div className="md:col-span-1">
                                <Popover open={isPersonOpen} onOpenChange={setIsPersonOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full h-12 justify-start text-left font-normal cursor-pointer">
                                            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                                            <span className="truncate">
                                                {travellers.room} Room{travellers.room > 1 ? 's' : ''}, {travellers.person} Guest{travellers.person > 1 ? 's' : ''}
                                            </span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80" align="start">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">Rooms</span>
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        className="cursor-pointer"
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={decrementRoom}
                                                        disabled={travellers.room <= 1}
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="w-8 text-center">{travellers.room}</span>
                                                    <Button
                                                        className="cursor-pointer"
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={incrementRoom}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">Guests</span>
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        className="cursor-pointer"
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={decrementPerson}
                                                        disabled={travellers.person <= 1}
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="w-8 text-center">{travellers.person}</span>
                                                    <Button
                                                        className="cursor-pointer"
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={incrementPerson}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Search Button */}
                            <div className="md:col-span-1">
                                <Button
                                    onClick={searchHandler}
                                    className="w-full h-12 cursor-pointer"
                                    disabled={keyword.length < 1}
                                >
                                    <Search className="mr-2 h-5 w-5" />
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hotels Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {isLoading || isFetching ? (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">Finding Hotels</h2>
                        <h5 className="text-muted-foreground mb-1">Please wait while we search for the best stays...</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <HotelCardLoader key={index} />
                            ))}
                        </div>
                    </>
                ) : data && data.hotels.length > 0 ? (
                    <>
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <h2 className="text-3xl font-bold mb-1">
                                    {Object.keys(queryParams).length > 0
                                        ? `Hotels in ${queryParams.location}`
                                        : 'Discover Your Perfect Stay'}
                                </h2>
                                <h5 className="text-muted-foreground">
                                    {Object.keys(queryParams).length > 0
                                        ? `${data.hotels.length} propert${data.hotels.length === 1 ? 'y' : 'ies'} found`
                                        : 'Handpicked exceptional stays for your next adventure'}
                                </h5>
                            </div>
                            {Object.keys(queryParams).length > 0 && (
                                <Button
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setQueryParams({});
                                        setKeyword('');
                                    }}
                                >
                                    Clear Search
                                </Button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.hotels.map((hotel) => (
                                <HotelCard hotel={hotel} key={hotel._id} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="max-w-md">
                            <h2 className="text-3xl font-bold mb-3">No Hotels Found</h2>
                            <p className="text-muted-foreground mb-6">
                                {Object.keys(queryParams).length > 0
                                    ? `We couldn't find any hotels matching your search in ${queryParams.location}. Try adjusting your dates or search criteria.`
                                    : 'No hotels available at the moment. Please check back later.'}
                            </p>
                            {Object.keys(queryParams).length > 0 && (
                                <Button
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setQueryParams({});
                                        setKeyword('');
                                    }}
                                >
                                    Browse All Hotels
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;