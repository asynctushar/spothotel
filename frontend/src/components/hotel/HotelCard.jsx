import PlaceHolder from "../../assets/images/placeholder.jpg";
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { MapPin, Navigation, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HotelCard = ({ hotel }) => {
    return (
        <div className='rounded-lg border bg-card overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow'>
            <div className="relative h-48 overflow-hidden">
                <img
                    src={hotel.pictures[0]?.url ?? PlaceHolder}
                    loading="lazy"
                    alt={hotel.pictures[0]?.public_id ?? "placeholder"}
                    className='w-full h-full object-cover'
                />
                {hotel.featured && (
                    <Badge className='absolute top-2 left-2 bg-primary/90'>
                        <Star className='w-3 h-3 mr-1 fill-current' />
                        Featured
                    </Badge>
                )}
            </div>

            <div className='p-4 flex flex-col flex-1'>
                <h4 className='font-bold text-lg mb-2 line-clamp-1'>{hotel.name}</h4>

                <div className='flex items-center gap-1 text-sm text-muted-foreground mb-1'>
                    <MapPin className='w-4 h-4' />
                    <span className='line-clamp-1'>{hotel.location}</span>
                </div>

                <div className='flex items-center gap-1 text-sm text-muted-foreground mb-3'>
                    <Navigation className='w-4 h-4' />
                    <span>{hotel.distance}</span>
                </div>

                <p className='text-sm text-muted-foreground line-clamp-2 mb-3 min-h-10'>
                    {hotel.description}
                </p>

                <div className='flex flex-wrap gap-2 mb-4 min-h-8'>
                    {hotel.specification.map((item, index) => (
                        <Badge key={index} variant="secondary" className='text-xs'>
                            {item}
                        </Badge>
                    ))}
                </div>

                <div className='border-t pt-4 mt-auto'>
                    <div className='flex justify-between items-center'>
                        {hotel.startingFrom ? (
                            <div>
                                <span className='text-xs text-muted-foreground'>Starting from</span>
                                <h5 className='text-lg font-bold text-primary'>${hotel.startingFrom}</h5>
                            </div>
                        ) : (
                            <span className='text-sm text-muted-foreground'>No rooms available</span>
                        )}
                        <Button asChild size="sm">
                            <Link to={`/hotels/${hotel._id}`}>
                                View Details
                            </Link>
                        </Button>
                    </div>
                </div>
                <div />
            </div>
        </div>
    );
};

export default HotelCard;