import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RoomCard = ({ room }) => {
    const { isAuthenticated } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

    const reserveHandler = () => {
        if (isAuthenticated) {
            navigate(`/booking/rooms/${room._id}`);
        } else {
            navigate("/login", { state: { redirect: `/booking/rooms/${room._id}` } });
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === room.pictures.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? room.pictures.length - 1 : prev - 1
        );
    };

    const disabledDates = room.notAvailable?.map(date => new Date(date)) || [];

    return (
        <div className='rounded-lg border bg-card overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow'>
            <div className='relative h-48 overflow-hidden bg-muted'>
                {room.pictures && room.pictures.length > 0 ? (
                    <>
                        <img
                            src={room.pictures[currentImageIndex]?.url}
                            alt={`${room.name} - Image ${currentImageIndex + 1}`}
                            className='w-full h-full object-cover'
                        />
                        {room.pictures.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className='absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1.5 shadow-md transition-colors'
                                >
                                    <ChevronLeft className='w-5 h-5' />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className='absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1.5 shadow-md transition-colors'
                                >
                                    <ChevronRight className='w-5 h-5' />
                                </button>
                                <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5'>
                                    {room.pictures.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex
                                                ? 'bg-primary'
                                                : 'bg-background/60'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
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