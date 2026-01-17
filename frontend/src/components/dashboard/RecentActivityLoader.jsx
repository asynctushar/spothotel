import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const RecentActivityLoader = () => {
    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <Skeleton className="h-5 sm:h-6 w-32 sm:w-40 mb-2" />
                <Skeleton className="h-3 sm:h-4 w-40 sm:w-48" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 sm:gap-4 pb-4 border-b last:border-0">
                            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                            <div className="flex-1 min-w-0">
                                <Skeleton className="h-4 w-24 sm:w-32 mb-2" />
                                <Skeleton className="h-3 w-32 sm:w-48" />
                            </div>
                            <Skeleton className="h-3 w-12 sm:w-16 shrink-0" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentActivityLoader;