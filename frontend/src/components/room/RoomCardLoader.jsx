import { Skeleton } from '@/components/ui/skeleton';

const RoomCardLoader = () => {
    return (
        <div className='rounded-lg border bg-card overflow-hidden flex flex-col h-full'>
            <Skeleton className="h-48 w-full rounded-none" />

            <div className='p-4 flex flex-col flex-1'>
                <Skeleton className="h-6 w-3/4 mb-1" />
                <Skeleton className="h-5 w-1/2 mb-3" />

                <div className='flex gap-2 mb-4'>
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                </div>

                <div className='border-t pt-4 mt-auto space-y-3'>
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-full" />
                </div>
            </div>
        </div>
    );
};

export default RoomCardLoader;