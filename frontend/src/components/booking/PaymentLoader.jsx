import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PaymentLoader = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <Skeleton className="h-9 w-64 mx-auto mb-2" />
                <Skeleton className="h-5 w-96 mx-auto" />
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-px w-full my-2" />
                        <Skeleton className="h-6 w-full" />
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-12 w-full" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </div>
                    </div>

                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full" />
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentLoader;