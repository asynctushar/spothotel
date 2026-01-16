import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { Eye, Pencil } from 'lucide-react';
import { useBookingsQuery, useUpdateBookingStatusMutation } from "@/redux/api/booking.api";
import { setError, setSuccess } from '@/redux/slices/app.slice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AllBookingsLoader from '@/components/booking/AllBookingsLoader';
import Meta from '@/components/shared/Meta';

const Bookings = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isFetching, isError, error } = useBookingsQuery();
  const [updateBookingStatus, { isLoading: isUpdateBookingStatusLoading, isError: isUpdateBookingStatusError, error: updateBookingStatusError, isSuccess: isUpdateBookingStatusSuccess }] = useUpdateBookingStatusMutation();

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [bookingRef, setBookingRef] = useState(undefined);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const totalPages = Math.ceil((data?.bookings?.length || 0) / rowsPerPage);
  const currentBookings = data?.bookings?.slice(page * rowsPerPage, (page + 1) * rowsPerPage) || [];

  useEffect(() => {
    if (!isUpdateBookingStatusLoading && isUpdateBookingStatusSuccess && !isFetching) {
      setOpen(false);
      setBookingRef(undefined);
      dispatch(setSuccess('Booking status updated successfully'));
    }
    if (isUpdateBookingStatusError && updateBookingStatusError) {
      dispatch(setError(updateBookingStatusError.data.message));
    }

    if (isError) {
      dispatch(setError(error.data.message));
    }
  }, [isUpdateBookingStatusLoading, isUpdateBookingStatusSuccess, isUpdateBookingStatusError, updateBookingStatusError, isError, error, isFetching, dispatch]);

  const editHandler = () => {
    updateBookingStatus({ status, id: bookingRef._id });
  };

  const getPaymentStatusVariant = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'paid') return 'default';
    if (statusLower === 'pending') return 'secondary';
    if (statusLower === 'failed') return 'destructive';
    return 'outline';
  };

  const getBookingStatusVariant = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'complete') return 'default';
    if (statusLower === 'checked') return 'secondary';
    if (statusLower === 'processing') return 'outline';
    return 'outline';
  };


  return (
    <Fragment>
      <Meta
        title=""
        description=""
        keywords=""
      />
      {isLoading ? <AllBookingsLoader /> : (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">All Bookings</h1>
              <p className="text-foreground/75 mt-2">View and manage all hotel reservations</p>
            </div>

            {!data?.bookings || data.bookings.length === 0 ? (
              <Card className="shadow-lg border-0" style={{ minHeight: '500px' }}>
                <CardContent className="flex flex-col items-center justify-center py-16 min-h-125">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
                  <p className="text-gray-600 mb-6">There are no reservations in the system</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-0 overflow-hidden py-0">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <colgroup>
                        <col className="w-[30%]" />
                        <col className="w-[25%]" />
                        <col className="w-[25%]" />
                        <col className="w-[20%]" />
                      </colgroup>
                      <thead>
                        <tr className="bg-primary text-primary-foreground border-b">
                          <th className="text-left px-6 py-4 font-semibold">Booking ID</th>
                          <th className="text-left px-6 py-4 font-semibold">Payment Status</th>
                          <th className="text-left px-6 py-4 font-semibold">Booking Status</th>
                          <th className="text-right px-6 py-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentBookings.map((booking) => (
                          <tr key={booking._id} className="border-b hover:bg-gray-50 transition-colors h-18">
                            <td className="px-6 py-4 font-mono text-sm">
                              {booking._id}
                            </td>
                            <td className="px-6 py-4">
                              <Badge variant={getPaymentStatusVariant(booking.paymentInfo.status)} className="capitalize">
                                {booking.paymentInfo.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Badge variant={getBookingStatusVariant(booking.status)} className="capitalize">
                                  {booking.status}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 cursor-pointer"
                                  onClick={() => {
                                    setOpen(true);
                                    setBookingRef(booking);
                                    setStatus(booking.status);
                                  }}
                                  disabled={booking.status === "Complete"}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                                <Link to={`/admin/bookings/${booking._id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {Array.from({ length: rowsPerPage - currentBookings.length }).map((_, i) => (
                          <tr key={`empty-${i}`} className='h-18'>
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

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Booking Status</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Checked">Checked</SelectItem>
                    <SelectItem value="Complete">Complete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
                  Cancel
                </Button>
                <Button
                  onClick={editHandler}
                  disabled={status === bookingRef?.status || isUpdateBookingStatusLoading}
                  className="cursor-pointer"
                >
                  {isUpdateBookingStatusLoading ? 'Updating...' : 'Update'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Fragment >
  );
};

export default Bookings;