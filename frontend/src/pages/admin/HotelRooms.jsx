import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';
import { Plus, Upload, Pencil, Trash2 } from 'lucide-react';
import { useHotelQuery } from "@/redux/api/hotel.api";
import { useDeleteRoomMutation, useUploadRoomImagesMutation } from "@/redux/api/room.api";
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
import HotelRoomsLoader from '@/components/hotel/HotelRoomsLoader';
import Meta from '@/components/shared/Meta';

const HotelRooms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, data, isFetching, error, isError } = useHotelQuery(id);
  const [uploadRoomImages, { isLoading: isUploadRoomImagesLoading, isError: isUploadRoomImagesError, error: uploadRoomImagesError, isSuccess: isUploadRoomImagesSuccess }] = useUploadRoomImagesMutation();
  const [deleteRoom, { isLoading: isDeleteRoomLoading, isError: isDeleteRoomError, error: deleteRoomError, isSuccess: isDeleteRoomSuccess }] = useDeleteRoomMutation();

  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [roomRef, setRoomRef] = useState(undefined);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const totalPages = Math.ceil((data?.hotel?.rooms?.length || 0) / rowsPerPage);
  const currentRooms = data?.hotel?.rooms?.slice(page * rowsPerPage, (page + 1) * rowsPerPage) || [];

  useEffect(() => {
    if (!isUploadRoomImagesLoading && isUploadRoomImagesSuccess && !isFetching) {
      setOpen(false);
      setImages([]);
      setRoomRef(undefined);
      dispatch(setSuccess('Room images uploaded successfully'));
    }
    if (isUploadRoomImagesError && uploadRoomImagesError) {
      dispatch(setError(uploadRoomImagesError.data.message));
    }
  }, [isUploadRoomImagesLoading, isUploadRoomImagesSuccess, isUploadRoomImagesError, uploadRoomImagesError, isFetching, dispatch]);

  useEffect(() => {
    if (!isDeleteRoomLoading && isDeleteRoomSuccess && !isFetching) {
      setIsDeleteOpen(false);
      setRoomRef(undefined);
      dispatch(setSuccess('Room deleted successfully'));
    }
    if (isDeleteRoomError && deleteRoomError) {
      dispatch(setError(deleteRoomError.data.message));
    }

    if (isError && error) {
      dispatch(setError(error.data.message));
    }
  }, [isDeleteRoomLoading, isDeleteRoomSuccess, isDeleteRoomError, deleteRoomError, isError, error, isFetching, dispatch]);

  const uploadImageHandler = () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('pictures', image);
    });
    uploadRoomImages({ formData, id: roomRef._id });
  };

  const deleteHandler = () => {
    deleteRoom(roomRef._id);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length <= 5) {
      setImages(Array.from(e.target.files));
    } else {
      dispatch(setError("Maximum 5 Images can be uploaded."));
    }
  };

  return (
    <Fragment>
      <Meta
        title={data?.hotel ? `${data?.hotel?.name} Rooms` : isLoading ? "Hotel Rooms" : "Hotel Not Found"}
        description="Manage rooms, pricing, and availability for a specific hotel on SpotHotel."
        keywords="hotel rooms, room management, SpotHotel admin"
      />
      {isLoading ? <HotelRoomsLoader /> : !data?.hotel ? (
        <div className="min-h-[calc(100vh-72px)] bg-background flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-bold mb-3">Hotel Not Found</h2>
            <p className="text-foreground/75 mb-6">
              The hotel's rooms you're looking for doesn't exist or may have been removed.
            </p>
            <Link to="/admin/hotels">
              <Button>View All Hotels</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-4 md:items-start justify-between mb-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">All Rooms</h1>
                <p className="text-foreground/75 mt-2">Manage rooms for {data.hotel.name}</p>
              </div>
              <div className="space-y-2">
                <div className="flex gap-3 items-center">
                  <span className="font-semibold text-foreground/75">Hotel Name:</span>
                  <Link to={`/hotels/${id}`} className="text-primary hover:underline font-medium">
                    {data.hotel.name}
                  </Link>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="font-semibold text-foreground/75">ID:</span>
                  <span className="font-mono text-sm">{id}</span>
                </div>
                <Button onClick={() => navigate(`/admin/hotels/${id}/rooms/create`)} variant="outline" className="cursor-pointer w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Room
                </Button>
              </div>
            </div>

            {!data.hotel.rooms || data.hotel.rooms.length === 0 ? (
              <Card className="shadow-lg border-0 min-h-125">
                <CardContent className="flex flex-col items-center justify-center py-16 min-h-125">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Rooms Yet</h3>
                  <p className="text-gray-600 mb-6">There are no rooms for this hotel</p>
                  <Button className="cursor-pointer" onClick={() => navigate(`/admin/hotels/${id}/rooms/create`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Room
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-0 overflow-hidden py-0">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <colgroup>
                        <col className="w-[20%]" />
                        <col className="w-[25%]" />
                        <col className="w-[15%]" />
                        <col className="w-[13%]" />
                        <col className="w-[13%]" />
                        <col className="w-[14%]" />
                      </colgroup>
                      <thead>
                        <tr className="bg-primary text-primary-foreground border-b">
                          <th className="text-left px-4 py-4 font-semibold">Room ID</th>
                          <th className="text-left px-4 py-4 font-semibold">Name</th>
                          <th className="text-left px-4 py-4 font-semibold">Room No</th>
                          <th className="text-center px-4 py-4 font-semibold">Images</th>
                          <th className="text-center px-4 py-4 font-semibold">Update</th>
                          <th className="text-center px-4 py-4 font-semibold">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRooms.map((room) => (
                          <tr key={room._id} className="border-b hover:bg-gray-50 transition-colors h-18">
                            <td className="px-4 py-4 font-mono text-sm truncate">
                              {room._id}
                            </td>
                            <td className="px-4 py-4 font-medium truncate">
                              {room.name}
                            </td>
                            <td className="px-4 py-4">
                              {room.number}
                            </td>
                            <td className="px-4 py-4 text-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 cursor-pointer"
                                onClick={() => {
                                  setOpen(true);
                                  setRoomRef(room);
                                }}
                              >
                                <Upload className="w-4 h-4" />
                              </Button>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" asChild>
                                <Link to={`/admin/rooms/${room._id}/update`}>
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
                                  setRoomRef(room);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {Array.from({ length: rowsPerPage - currentRooms.length }).map((_, i) => (
                          <tr key={`empty-${i}`} className='h-18'>
                            <td colSpan={6} className="px-4 py-4"></td>
                          </tr>
                        ))}
                      </tbody>
                      {totalPages > 1 && (
                        <tfoot>
                          <tr className="border-t bg-gray-50">
                            <td colSpan={6} className="px-4 py-4">
                              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-gray-600">
                                  Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, data.hotel.rooms.length)} of {data.hotel.rooms.length} rooms
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

          <Dialog open={open}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Room Images</DialogTitle>
                <DialogDescription>Select up to 5 images to upload for this room</DialogDescription>
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
                    setRoomRef(undefined);
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={uploadImageHandler}
                  disabled={images.length < 1 || isUploadRoomImagesLoading}
                  className="cursor-pointer"
                >
                  {isUploadRoomImagesLoading ? 'Uploading...' : 'Upload'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog open={isDeleteOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Room?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete the room's booking details. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setIsDeleteOpen(false);
                    setRoomRef(undefined);
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={deleteHandler}
                  disabled={isDeleteRoomLoading}
                  className="bg-destructive hover:bg-destructive/90 cursor-pointer"
                >
                  {isDeleteRoomLoading ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </Fragment>
  );
};

export default HotelRooms;