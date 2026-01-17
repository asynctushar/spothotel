import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ChartCardLoader = () => {
    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <Skeleton className="h-5 sm:h-6 w-40 sm:w-48 mb-2" />
                <Skeleton className="h-3 sm:h-4 w-48 sm:w-64" />
            </CardHeader>
            <CardContent className="pb-4">
                <Skeleton className="h-62.5 sm:h-75 w-full" />
            </CardContent>
        </Card>
    );
};

export default ChartCardLoader;