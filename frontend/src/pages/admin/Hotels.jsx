import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { Eye, Pencil, Trash2, Upload, Building2 } from 'lucide-react';
import { useDeleteHotelMutation, useHotelsQuery, useUploadHotelImagesMutation } from "@/redux/api/hotel.api";
import { setError, setSuccess } from "@/redux/slices/app.slice";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import HotelsLoader from '@/components/hotel/HotelsLoader';

const Hotels = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError, error, isFetching } = useHotelsQuery();
  const [uploadHotelImages, { isLoading: isUploadHotelImagesLoading, isError: isUploadHotelImagesError, error: uploadHotelImagesError, isSuccess: isUploadHotelImagesSuccess }] = useUploadHotelImagesMutation();
  const [deleteHotel, { isLoading: isDeleteHotelLoading, isError: isDeleteHotelError, error: deleteHotelError, isSuccess: isDeleteHotelSuccess }] = useDeleteHotelMutation();

  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [hotelRef, setHotelRef] = useState(undefined);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const totalPages = Math.ceil((data?.hotels?.length || 0) / rowsPerPage);
  const currentHotels = data?.hotels?.slice(page * rowsPerPage, (page + 1) * rowsPerPage) || [];

  useEffect(() => {
    if (!isUploadHotelImagesLoading && isUploadHotelImagesSuccess && !isFetching) {
      setOpen(false);
      setImages([]);
      setHotelRef(undefined);
      dispatch(setSuccess('Hotel images uploaded successfully'));
    }
    if (isUploadHotelImagesError && uploadHotelImagesError) {
      dispatch(setError(uploadHotelImagesError.data.message));
    }
  }, [isUploadHotelImagesLoading, isUploadHotelImagesSuccess, isUploadHotelImagesError, uploadHotelImagesError, isFetching, dispatch]);

  useEffect(() => {
    if (!isDeleteHotelLoading && isDeleteHotelSuccess && !isFetching) {
      setIsDeleteOpen(false);
      setHotelRef(undefined);
      dispatch(setSuccess('Hotel deleted successfully'));
    }
    if (isDeleteHotelError && deleteHotelError) {
      dispatch(setError(deleteHotelError.data.message));
    }

    if (isError && error) {
      dispatch(setError(error.data.message));
    }
  }, [isDeleteHotelLoading, isDeleteHotelSuccess, isDeleteHotelError, deleteHotelError, isError, isFetching, error, dispatch]);

  const uploadImageHandler = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('pictures', image);
    });
    uploadHotelImages({ id: hotelRef._id, formData });
  };

  const deleteHandler = () => {
    deleteHotel(hotelRef._id);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length <= 5) {
      setImages(Array.from(e.target.files));
    } else {
      dispatch(setError("Maximum 5 Images can be uploaded."));
    }
  };

  if (isLoading) {
    return <HotelsLoader />;
  }

  return (
    <Fragment>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Hotels</h1>
          <p className="text-foreground/75 mt-2">View and manage all hotels in the system</p>
        </div>

        {!data?.hotels || data.hotels.length === 0 ? (
          <Card className="shadow-lg border-0 min-h-125">
            <CardContent className="flex flex-col items-center justify-center py-16 min-h-125">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Hotels Yet</h3>
              <p className="text-gray-600 mb-6">There are no hotels in the system</p>
              <Button className="cursor-pointer" asChild>
                <Link to="/admin/hotels/create">
                  Create Hotel
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-0 overflow-hidden py-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
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
                    <tr className="bg-primary text-primary-foreground border-b">
                      <th className="text-left px-4 py-4 font-semibold">Hotel ID</th>
                      <th className="text-left px-4 py-4 font-semibold">Name</th>
                      <th className="text-center px-4 py-4 font-semibold">Images</th>
                      <th className="text-center px-4 py-4 font-semibold">Update</th>
                      <th className="text-center px-4 py-4 font-semibold">Delete</th>
                      <th className="text-center px-4 py-4 font-semibold">Rooms</th>
                      <th className="text-center px-4 py-4 font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentHotels.map((hotel) => (
                      <tr key={hotel._id} className="border-b hover:bg-gray-50 transition-colors h-18">
                        <td className="px-4 py-4 font-mono text-sm truncate">
                          {hotel._id}
                        </td>
                        <td className="px-4 py-4 font-medium truncate">
                          {hotel.name}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() => {
                              setOpen(true);
                              setHotelRef(hotel);
                            }}
                          >
                            <Upload className="w-4 h-4" />
                          </Button>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" asChild>
                            <Link to={`/admin/hotels/${hotel._id}/update`}>
                              <Pencil className="w-4 h-4" />
                            </Link>
                          </Button>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer text-destructive hover:text-destructive"
                            onClick={() => {
                              setIsDeleteOpen(true);
                              setHotelRef(hotel);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" asChild>
                            <Link to={`/admin/hotels/${hotel._id}/rooms`}>
                              <Building2 className="w-4 h-4" />
                            </Link>
                          </Button>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" asChild>
                            <Link to={`/hotels/${hotel._id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {Array.from({ length: rowsPerPage - currentHotels.length }).map((_, i) => (
                      <tr key={`empty-${i}`} style={{ height: '72px' }}>
                        <td colSpan={7} className="px-4 py-4"></td>
                      </tr>
                    ))}
                  </tbody>
                  {totalPages > 1 && (
                    <tfoot>
                      <tr className="border-t bg-gray-50">
                        <td colSpan={7} className="px-4 py-4">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-600">
                              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, data.hotels.length)} of {data.hotels.length} hotels
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

      <Dialog open={open} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Hotel Images</DialogTitle>
            <DialogDescription>Select up to 5 images to upload for this hotel</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {images.length < 1 ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload images</span>
                <span className="text-xs text-gray-400 mt-1">Maximum 5 images</span>
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="space-y-2">
                {images.map((image) => (
                  <div key={image.name} className="p-3 bg-gray-100 rounded-lg text-sm truncate">
                    {image.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setImages([]);
                setHotelRef(undefined);
              }}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={uploadImageHandler}
              disabled={images.length < 1 || isUploadHotelImagesLoading}
              className="cursor-pointer"
            >
              {isUploadHotelImagesLoading ? 'Uploading...' : 'Upload'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Hotel?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the hotel's rooms and all room booking details. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer"
              onClick={() => {
                setIsDeleteOpen(false);
                setHotelRef(undefined);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteHandler}
              disabled={isDeleteHotelLoading}
              className="bg-destructive hover:bg-destructive/90 cursor-pointer"
            >
              {isDeleteHotelLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};

export default Hotels;