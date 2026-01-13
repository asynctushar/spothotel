import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const BookingDetailsLoader = () => {
    return (
        <div className="min-h-[calc(100vh-72px)] bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Skeleton className="h-5 w-32 mb-6" />

                <div className="mb-8">
                    <Skeleton className="h-9 w-64 mb-2" />
                    <Skeleton className="h-5 w-48" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="shadow-md border-0">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-5 h-5" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="w-4 h-4" />
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="shadow-md border-0">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-5 h-5" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton className="w-4 h-4" />
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="shadow-md border-0">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-5 h-5" />
                                    <Skeleton className="h-6 w-40" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Skeleton className="w-4 h-4 mt-0.5" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-3 w-full" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Skeleton className="w-4 h-4" />
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-6 w-20 ml-auto" />
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Skeleton className="w-4 h-4 mt-0.5" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-28" />
                                            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <Skeleton key={i} className="h-3 w-full" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-6 w-20" />
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Skeleton className="w-4 h-4" />
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-6 w-16 ml-auto" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsLoader;