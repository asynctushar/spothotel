import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const RoomCard = ({ room }) => {
    const { isAuthenticated } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

    const reserveHandler = () => {
        if (isAuthenticated) {
            navigate(`/booking/rooms/${room._id}`);
        } else {
            navigate("/login", { state: { redirect: `/booking/rooms/${room._id}` } });
        }
    };

    const disabledDates = room.notAvailable?.map(date => new Date(date)) || [];

    return (
        <div className='rounded-lg border bg-card overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow'>
            <div className='relative h-48 overflow-hidden bg-muted'>
                {room.pictures && room.pictures.length > 0 ? (
                    <Carousel className="w-full h-full">
                        <CarouselContent>
                            {room.pictures.map((picture, index) => (
                                <CarouselItem key={index}>
                                    <img
                                        src={picture.url}
                                        alt={`${room.name} - Image ${index + 1}`}
                                        className='w-full h-48 object-cover'
                                        loading='lazy'
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {room.pictures.length > 1 && (
                            <>
                                <CarouselPrevious className="left-2 cursor-pointer" />
                                <CarouselNext className="right-2 cursor-pointer" />
                            </>
                        )}
                    </Carousel>
                ) : (
                    <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
                        No image available
                    </div>
                )}
            </div>

            <div className='p-4 flex flex-col flex-1'>
                <h3 className='text-xl font-bold mb-1 line-clamp-1'>{room.name}</h3>
                <h5 className='text-muted-foreground mb-3 line-clamp-1'>{room.type}</h5>

                <div className='flex flex-wrap gap-2 mb-4 min-h-8'>
                    {room.specification.slice(0, 3).map((item, index) => (
                        <Badge key={index} variant="secondary" className='text-xs'>
                            {item}
                        </Badge>
                    ))}
                </div>

                <div className='border-t pt-4 mt-auto space-y-3'>
                    <h4 className='text-2xl font-bold text-primary'>
                        ${room.pricePerDay}
                        <span className='text-sm font-normal text-muted-foreground'>/day</span>
                    </h4>

                    <div className='flex flex-col gap-2'>
                        <Popover open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full cursor-pointer" size="sm">
                                    Check Availability
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <CalendarComponent
                                    mode="single"
                                    disabled={(date) => {
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        if (date < today) return true;
                                        return disabledDates.some(disabledDate =>
                                            date.toDateString() === disabledDate.toDateString()
                                        );
                                    }}
                                    modifiers={{
                                        booked: disabledDates
                                    }}
                                    modifiersClassNames={{
                                        booked: 'line-through opacity-50'
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <Button onClick={reserveHandler} className="w-full cursor-pointer" size="sm">
                            Reserve Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;