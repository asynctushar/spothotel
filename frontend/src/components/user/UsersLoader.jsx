import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const UsersLoader = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-5 w-80" />
            </div>

            <Card className="shadow-lg border-0 overflow-hidden py-0">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="text-left px-6 py-4">
                                        <Skeleton className="h-5 w-20" />
                                    </th>
                                    <th className="text-left px-6 py-4">
                                        <Skeleton className="h-5 w-16" />
                                    </th>
                                    <th className="text-left px-6 py-4">
                                        <Skeleton className="h-5 w-20" />
                                    </th>
                                    <th className="text-left px-6 py-4">
                                        <Skeleton className="h-5 w-16" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="border-b" style={{ height: '72px' }}>
                                        <td className="px-6 py-4">
                                            <Skeleton className="h-4 w-48" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Skeleton className="h-4 w-32" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Skeleton className="h-4 w-48" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Skeleton className="h-6 w-16 rounded-full" />
                                                <Skeleton className="h-8 w-8 rounded" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UsersLoader;