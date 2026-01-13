import { Fragment, useState } from 'react';
import { Link } from 'react-router';
import { Calendar, ExternalLink, Clock, CheckCircle2, XCircle, AlertCircle, Eye } from 'lucide-react';
import { useOwnBookingsQuery } from '../redux/api/booking.api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BookingsLoader from '@/components/booking/BookingsLoader';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const Bookings = () => {
    const { isLoading, data } = useOwnBookingsQuery();
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    const totalPages = Math.ceil((data?.bookings?.length || 0) / rowsPerPage);
    const currentBookings = data?.bookings?.slice(page * rowsPerPage, (page + 1) * rowsPerPage) || [];

    const getStatusIcon = (status) => {
        const statusLower = status?.toLowerCase();
        if (statusLower === 'confirmed') return <CheckCircle2 className="w-4 h-4" />;
        if (statusLower === 'pending') return <Clock className="w-4 h-4" />;
        if (statusLower === 'cancelled') return <XCircle className="w-4 h-4" />;
        return <AlertCircle className="w-4 h-4" />;
    };

    const getStatusVariant = (status) => {
        const statusLower = status?.toLowerCase();
        if (statusLower === 'confirmed') return 'default';
        if (statusLower === 'pending') return 'secondary';
        if (statusLower === 'cancelled') return 'destructive';
        return 'outline';
    };

    if (isLoading) {
        return (
            <BookingsLoader />
        );
    }

    return (
        <div className="min-h-[calc(100vh-72px)] bg-linear-to-br from-slate-50 via-blue-50 to-slate-50 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Your Bookings</h1>
                    <p className="text-gray-600 mt-2">View and manage all your hotel reservations</p>
                </div>

                {!data?.bookings || data.bookings.length === 0 ? (
                    <Card className="shadow-lg border-0" style={{ minHeight: '500px' }}>
                        <CardContent className="flex flex-col items-center justify-center py-16" style={{ minHeight: '500px' }}>
                            <Calendar className="w-16 h-16 text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
                            <p className="text-gray-600 mb-6">You haven't made any reservations yet</p>
                            <Button className="cursor-pointer" asChild>
                                <Link to="/">
                                    Browse Hotels
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="shadow-lg border-0 overflow-hidden py-0">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-primary text-primary-foreground border-b">
                                            <th className="text-left px-6 py-4 font-semibold ">Booking ID</th>
                                            <th className="text-left px-6 py-4 font-semibold ">Status</th>
                                            <th className="text-left px-6 py-4 font-semibold ">Check-in Date</th>
                                            <th className="text-right px-6 py-4 font-semibold ">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentBookings.map((booking) => (
                                            <tr key={booking._id} className="border-b hover:bg-gray-50 transition-colors" style={{ height: '72px' }}>
                                                <td className="px-6 py-4 font-mono text-sm">
                                                    {booking._id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={getStatusVariant(booking.status)} className="flex items-center gap-1 w-fit">
                                                        {getStatusIcon(booking.status)}
                                                        <span className="capitalize">{booking.status}</span>
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-blue-600" />
                                                        <span>{formatDate(booking.dates[0])}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link to={`/account/bookings/${booking._id}`}>
                                                        <Button variant="outline" size="sm" className="cursor-pointer">
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            View
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        {Array.from({ length: rowsPerPage - currentBookings.length }).map((_, i) => (
                                            <tr key={`empty-${i}`} style={{ height: '72px' }}>
                                                <td colSpan={4} className="px-6 py-4"></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {totalPages > 1 && (
                                        <tfoot>
                                            <tr className="border-t bg-gray-50">
                                                <td colSpan={4} className="px-6 py-4">
                                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                                        <p className="text-sm text-gray-600">
                                                            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, data.bookings.length)} of {data.bookings.length} bookings
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                className="cursor-pointer"
                                                                size="sm"
                                                                onClick={() => setPage(page - 1)}
                                                                disabled={page === 0}
                                                            >
                                                                Previous
                                                            </Button>
                                                            <div className="flex items-center gap-1">
                                                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                                                    let pageNum;
                                                                    if (totalPages <= 5) {
                                                                        pageNum = i;
                                                                    } else if (page < 3) {
                                                                        pageNum = i;
                                                                    } else if (page > totalPages - 4) {
                                                                        pageNum = totalPages - 5 + i;
                                                                    } else {
                                                                        pageNum = page - 2 + i;
                                                                    }
                                                                    return (
                                                                        <Button
                                                                            key={i}
                                                                            variant={page === pageNum ? "default" : "outline"}
                                                                            size="sm"
                                                                            onClick={() => setPage(pageNum)}
                                                                            className="w-10 h-10 cursor-pointer"
                                                                        >
                                                                            {pageNum + 1}
                                                                        </Button>
                                                                    );
                                                                })}
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                className="cursor-pointer"
                                                                size="sm"
                                                                onClick={() => setPage(page + 1)}
                                                                disabled={page >= totalPages - 1}
                                                            >
                                                                Next
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    )}
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div >
    );
};

export default Bookings;