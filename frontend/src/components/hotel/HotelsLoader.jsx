import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const HotelsLoader = () => {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-5 w-80" />
            </div>

            <Card className="shadow-lg border-0 overflow-hidden py-0">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed">
                            <colgroup>
                                <col className="w-[15%]" />
                                <col className="w-[20%]" />
                                <col className="w-[13%]" />
                                <col className="w-[13%]" />
                                <col className="w-[13%]" />
                                <col className="w-[13%]" />
                                <col className="w-[13%]" />
                            </colgroup>
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="text-left px-4 py-4">
                                        <Skeleton className="h-5 w-20" />
                                    </th>
                                    <th className="text-left px-4 py-4">
                                        <Skeleton className="h-5 w-16" />
                                    </th>
                                    <th className="text-center px-4 py-4">
                                        <Skeleton className="h-5 w-16 mx-auto" />
                                    </th>
                                    <th className="text-center px-4 py-4">
                                        <Skeleton className="h-5 w-16 mx-auto" />
                                    </th>
                                    <th className="text-center px-4 py-4">
                                        <Skeleton className="h-5 w-16 mx-auto" />
                                    </th>
                                    <th className="text-center px-4 py-4">
                                        <Skeleton className="h-5 w-16 mx-auto" />
                                    </th>
                                    <th className="text-center px-4 py-4">
                                        <Skeleton className="h-5 w-16 mx-auto" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="border-b h-18">
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-4 w-32" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-4 w-36" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-8 w-8 mx-auto rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-8 w-8 mx-auto rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-8 w-8 mx-auto rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-8 w-8 mx-auto rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-8 w-8 mx-auto rounded" />
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

export default HotelsLoader;