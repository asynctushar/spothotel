import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const StatCardLoader = () => {
    return (
        <Card className="border-0 shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20 sm:w-24" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 sm:h-9 w-12 sm:w-16 mb-2" />
                <Skeleton className="h-3 w-24 sm:w-32" />
            </CardContent>
        </Card>
    );
};

export default StatCardLoader;