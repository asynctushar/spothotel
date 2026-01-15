import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const UpdateRoomLoader = () => {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <div className="flex flex-col md:flex-row gap-6 md:gap-4 md:items-start justify-between mb-6">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-5 w-64" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>

            <Card className="shadow-lg border-0">
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {/* Room Name */}
                        <div className="space-y-1.5">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-9 w-full" />
                        </div>

                        {/* Room Number & Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-9 w-full" />
                                <Skeleton className="h-3 w-40" />
                            </div>
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-9 w-full" />
                            </div>
                        </div>

                        {/* Room Type */}
                        <div className="space-y-1.5">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-9 w-full" />
                        </div>

                        {/* Specifications */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-5 w-36" />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Skeleton className="h-9 flex-1" />
                            <Skeleton className="h-9 flex-1" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateRoomLoader;