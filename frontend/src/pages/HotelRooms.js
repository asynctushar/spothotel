import SideBar from "../components/SideBar";
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteRoom, getHotelAction, uploadRoomPicture } from '../redux/actions/hotelAction';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import WeekendIcon from '@mui/icons-material/Weekend';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, Button, DialogContentText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { setError } from "../redux/slices/appSlice";
import NotFound from './NotFound';
import Meta from '../utils/Meta';

const HotelRooms = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading, hotel } = useSelector((state) => state.hotelState);
    const [open, setOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [roomRef, setRoomRef] = useState(undefined);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - hotel?.rooms.length);

    useEffect(() => {
        if (id) {
            dispatch(getHotelAction(id));
        }
    }, [dispatch, id]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const updloadImageHandler = () => {
        const formData = new FormData();

        images.forEach((image) => {
            formData.append('pictures', image);
        })

        dispatch(uploadRoomPicture(formData, roomRef._id))
        setOpen(!open);
        setImages([]);
    }


    const deleteHandler = () => {
        dispatch(deleteRoom(roomRef._id));
        setIsDeleteOpen(false);
        setRoomRef(undefined);
    }

    return (
        <Fragment>
            <Meta title={`${hotel?.name}'s Rooms`} />
            <div className="flex">
                <SideBar />
                <Fragment>
                    {isLoading ? <Loader /> : (
                        <Fragment>
                            {!hotel ? <NotFound /> : (
                                <div className="w-[80%] sm:w-[60%] md:w-[70%] mx-auto mt-3">
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-4 justify-between">
                                        <div className="flex gap-4">
                                            <Button onClick={() => navigate('/admin/hotels')} variant="contained" className="!text-gray-100 !bg-red-400"><ArrowBackIosNewIcon fontSize="small" className="mr-2" />Back</Button>
                                            <Button onClick={() => navigate(`/admin/hotel/${id}/room/new`)} variant="outlined" className="!border-red-400 !text-red-400"><WeekendIcon fontSize="small" className="mr-2" />Add Room</Button>
                                        </div>
                                        <div>
                                            <div className="flex gap-4">
                                                <h4 className="font-medium">Hotel Name:</h4><p className="font-normal text-blue-400"><Link to={`/hotel/${id}`} >{hotel?.name}</Link></p>
                                            </div>
                                            <div className="flex gap-4">
                                                <h4 className="font-medium">Id: </h4> <p className="break-words break-all">{id}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-medium text-center my-8">All Rooms</h2>
                                    <TableContainer component={Paper}>
                                        <Table className="min-w-[700px]">
                                            <TableHead >
                                                <TableRow className="bg-red-300">
                                                    <TableCell align="center">Id</TableCell>
                                                    <TableCell align="center">Name</TableCell>
                                                    <TableCell align="center">Room No</TableCell>
                                                    <TableCell align="center">Upload Images</TableCell>
                                                    <TableCell align="center">Update</TableCell>
                                                    <TableCell align="center">Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(rowsPerPage > 2 ? hotel?.rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : hotel.rooms)?.map((room) => (
                                                    <TableRow key={room._id} style={{ height: 72.8 }}>
                                                        <TableCell align="center">{room._id}</TableCell>
                                                        <TableCell align="center">{room.name}</TableCell>
                                                        <TableCell align="center">{room.number}</TableCell>
                                                        <TableCell align="center">
                                                            <IconButton onClick={() => {
                                                                setOpen(!open);
                                                                setRoomRef(room);
                                                            }}>
                                                                <AddPhotoAlternateIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Link to={`/admin/room/${room._id}/update`}>
                                                                <IconButton><EditIcon /></IconButton>
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton onClick={() => {
                                                                setIsDeleteOpen(!isDeleteOpen);
                                                                setRoomRef(room);
                                                            }}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 72.8 * emptyRows }}>
                                                        <TableCell colSpan={4} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TablePagination
                                                        page={page}
                                                        count={hotel.rooms.length}
                                                        rowsPerPageOptions={[]}
                                                        onPageChange={handleChangePage}
                                                        rowsPerPage={rowsPerPage} />
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </TableContainer>
                                    <Dialog open={open} scroll="body" className="!w-screen" fullWidth={true}>
                                        <div className="p-4" >
                                            <DialogTitle className="text-center">Upload Room Images</DialogTitle>
                                            <DialogContent className="m-4 flex justify-center items-center">
                                                {images.length < 1 && (
                                                    <Button component="label">
                                                        <FileUploadIcon color="action" fontSize="large" />
                                                        <input hidden accept="image/*" multiple type="file" onChange={(e) => {
                                                            if (e.target.files.length <= 5) {
                                                                setImages(Array.from(e.target.files));
                                                            } else {
                                                                dispatch(setError("Maximum 5 Images can be uploaded."))
                                                            }
                                                        }
                                                        } />
                                                    </Button>
                                                )}

                                                {images?.length > 0 && (
                                                    <div> {images?.map((image) => (
                                                        <input key={image.name} type="text" value={image.name} disabled={true} className="block w-36 sm:w-96  py-3 my-2 px-5 border border-solid border-slate-400 rounded bg-neutral-300" />
                                                    ))}
                                                    </div>
                                                )}

                                            </DialogContent>
                                            <DialogActions className="mt-4">
                                                <button onClick={() => {
                                                    setOpen(!open);
                                                    setImages([]);
                                                }
                                                } className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                                <button disabled={images.length < 1 ? true : false} onClick={updloadImageHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Upload</button>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                    <Dialog open={isDeleteOpen}>
                                        <div className="p-4" >
                                            <DialogTitle className="text-center">Delete Room?</DialogTitle>
                                            <DialogContent className="m-8">
                                                <DialogContentText className="text-gray-900">This will delete the room's booking details also.</DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="mt-12">
                                                <button onClick={() => {
                                                    setIsDeleteOpen(!isDeleteOpen);
                                                    setRoomRef(undefined);
                                                }
                                                } className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                                <button onClick={deleteHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Delete</button>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                </div>
                            )}
                        </Fragment>
                    )}
                </Fragment>
            </div >
        </Fragment>
    )
}
export default HotelRooms;