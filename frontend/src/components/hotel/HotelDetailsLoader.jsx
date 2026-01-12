import { Skeleton } from '@/components/ui/skeleton';
import RoomCardLoader from '../room/RoomCardLoader';

const HotelDetailsLoader = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
                <div className='space-y-4'>
                    <Skeleton className="aspect-video w-full rounded-lg" />
                    <div className='grid grid-cols-5 gap-3'>
                        <Skeleton className="aspect-video w-full rounded-lg" />
                        <Skeleton className="aspect-video w-full rounded-lg" />
                        <Skeleton className="aspect-video w-full rounded-lg" />
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <div className='flex gap-2'>
                        <Skeleton className="h-7 w-20" />
                        <Skeleton className="h-7 w-24" />
                        <Skeleton className="h-7 w-20" />
                    </div>
                </div>
            </div>

            <Skeleton className="h-px w-full my-8" />

            <div className='space-y-6'>
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-5 w-96" />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <RoomCardLoader />
                    <RoomCardLoader />
                    <RoomCardLoader />
                </div>
            </div>
        </div>
    );
};

export default HotelDetailsLoader;