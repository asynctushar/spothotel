import HotelDetailsLoader from '@/components/hotel/HotelDetailsLoader';
import RoomCard from '@/components/room/RoomCard';
import Meta from '@/components/shared/Meta';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useHotelQuery } from '@/redux/api/hotel.api';
import { setError } from '@/redux/slices/app.slice';
import { MapPin, Navigation } from 'lucide-react';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router';

const HotelDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, data, isError, error } = useHotelQuery(id);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (isError && error) {
            dispatch(setError(error.data.message));
        }
    }, [isError, error, dispatch]);

    return (
        <Fragment>
            <Meta
                title={data?.hotel
                    ? data?.hotel.name
                    : isLoading
                        ? "Hotel Details"
                        : "Hotel Not Found"}
                description={
                    data?.hotel
                        ? `Book ${data?.hotel?.name} in ${data?.hotel?.location}. View rooms, amenities, pricing, and availability on SpotHotel.`
                        : isLoading
                            ? "View hotel details, rooms, pricing, and availability on SpotHotel."
                            : "The hotel you are looking for could not be found on SpotHotel."
                }
                keywords="hotel details, book hotel, hotel rooms, SpotHotel"
            />
            {isLoading ? (
                <HotelDetailsLoader />
            ) : data?.hotel ? (
                <div className="max-w-7xl min-h-[calc(100vh-64px)] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4'>
                        <div className='space-y-4'>
                            <div className='aspect-video rounded-lg overflow-hidden border shadow-md'>
                                <img
                                    src={data.hotel.pictures[selectedImage]?.url}
                                    alt={`${data.hotel.name} - Image ${selectedImage + 1}`}
                                    className='w-full h-full object-cover'
                                    loading='lazy'
                                />
                            </div>
                            <div className='grid grid-cols-5 gap-3'>
                                {data.hotel.pictures.map((picture, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === index
                                            ? 'border-primary shadow-md'
                                            : 'border-transparent hover:border-primary/50'
                                            }`}
                                    >
                                        <img
                                            src={picture.url}
                                            alt={`${data.hotel.name} thumbnail ${index + 1}`}
                                            className='w-full h-full object-cover'
                                            loading='lazy'
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h1 className='text-4xl font-bold'>{data.hotel.name}</h1>

                            <div className='flex items-center gap-2 text-muted-foreground'>
                                <MapPin className='w-5 h-5 text-primary' />
                                <span className='text-lg'>{data.hotel.location}</span>
                            </div>

                            <div className='flex items-center gap-2 text-muted-foreground'>
                                <Navigation className='w-5 h-5 text-primary' />
                                <span className='text-lg'>{data.hotel.distance}</span>
                            </div>

                            <div className='bg-muted/30 rounded-lg p-4 border'>
                                <p className='text-foreground leading-relaxed'>
                                    {data.hotel.description}
                                </p>
                            </div>

                            <div>
                                <h3 className='text-sm font-semibold text-muted-foreground mb-3'>AMENITIES & FEATURES</h3>
                                <div className='flex flex-wrap gap-2'>
                                    {data.hotel.specification.map((item, index) => (
                                        <Badge key={index} variant="secondary" className='text-sm py-1.5 px-4 bg-primary/10 text-primary hover:bg-primary/20'>
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className='my-4' />

                    <div className='space-y-6'>
                        {data.hotel.rooms && data.hotel.rooms.length > 0 ? (
                            <>
                                <div>
                                    <h2 className='text-3xl font-bold mb-2'>Available Rooms</h2>
                                    <h5 className='text-muted-foreground text-lg'>
                                        Choose from our selection of comfortable and luxurious rooms
                                    </h5>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                    {data.hotel.rooms.map((room) => (
                                        <RoomCard room={room} key={room._id} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 bg-muted/30 rounded-lg border">
                                <h3 className="text-2xl font-semibold mb-2">No Rooms Available</h3>
                                <p className="text-muted-foreground">
                                    This hotel currently has no rooms available. Please check back later or explore other hotels.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[53vh] px-4">
                    <div className="text-center max-w-md">
                        <h2 className="text-3xl font-bold mb-3">Hotel Not Found</h2>
                        <p className="text-muted-foreground mb-6">
                            The hotel you're looking for doesn't exist or may have been removed.
                        </p>
                        <Button asChild >
                            <Link to="/">Browse All Hotels</Link>
                        </Button>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default HotelDetails;;