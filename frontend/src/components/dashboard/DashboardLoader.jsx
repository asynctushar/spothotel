import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardLoader = () => {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-5 w-64 sm:w-80" />
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="border-0 shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-20 sm:w-24" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 sm:h-9 w-12 sm:w-16 mb-2" />
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3 w-24 sm:w-32" />
                                <Skeleton className="h-3 w-10 sm:w-12" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                {/* Chart Loader */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <Skeleton className="h-5 sm:h-6 w-40 sm:w-48 mb-2" />
                        <Skeleton className="h-3 sm:h-4 w-48 sm:w-64" />
                    </CardHeader>
                    <CardContent className="pb-4">
                        <Skeleton className="h-62.5 sm:h-75 w-full" />
                    </CardContent>
                </Card>

                {/* Recent Activity Loader */}
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
            </div>
        </div>
    );
};

export default DashboardLoader;