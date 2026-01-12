import { Skeleton } from '@/components/ui/skeleton';

const HotelCardLoader = () => {
    return (
        <div className='rounded-lg border bg-card overflow-hidden flex flex-col h-full'>
            <Skeleton className="h-48 w-full rounded-none" />

            <div className='p-4 flex flex-col flex-1'>
                <Skeleton className="h-6 w-3/4 mb-2" />

                <Skeleton className="h-4 w-1/2 mb-1" />
                <Skeleton className="h-4 w-1/3 mb-3" />

                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-3" />

                <div className='flex gap-2 mb-4'>
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                </div>

                <div className='border-t pt-4 mt-auto'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <Skeleton className="h-3 w-20 mb-1" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                        <Skeleton className="h-9 w-28" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCardLoader;