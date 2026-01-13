import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const BookingsLoader = () => {
    return (
        <div className="min-h-[calc(100vh-72px)] bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 pb-16">
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
                                            <Skeleton className="h-5 w-24" />
                                        </th>
                                        <th className="text-left px-6 py-4">
                                            <Skeleton className="h-5 w-16" />
                                        </th>
                                        <th className="text-left px-6 py-4">
                                            <Skeleton className="h-5 w-32" />
                                        </th>
                                        <th className="text-right px-6 py-4">
                                            <Skeleton className="h-5 w-16 ml-auto" />
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
                                                <Skeleton className="h-6 w-24 rounded-full" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Skeleton className="h-4 w-40" />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Skeleton className="h-9 w-20 ml-auto" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BookingsLoader;