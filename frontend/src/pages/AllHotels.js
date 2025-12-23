import SideBar from "../components/SideBar";
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteHotel, getAllHotels, uploadHotelPicture } from '../redux/actions/hotelAction';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, Button, DialogContentText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { setError } from "../redux/slices/appSlice";
import Meta from "../utils/Meta";

const AllHotels = () => {
    const dispatch = useDispatch();
    const { isLoading, allHotels } = useSelector((state) => state.hotelState);
    const [open, setOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [hotelRef, setHotelRef] = useState(undefined);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - allHotels?.length);

    useEffect(() => {
        dispatch(getAllHotels());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const updloadImageHandler = () => {
        const formData = new FormData();

        images.forEach((image) => {
            formData.append('pictures', image);
        })

        dispatch(uploadHotelPicture(formData, hotelRef._id))
        setOpen(!open);
        setImages([]);
        setHotelRef(undefined);
    }

    const deleteHandler = () => {
        dispatch(deleteHotel(hotelRef._id));
        setIsDeleteOpen(false);
        setHotelRef(undefined);
    }


    return (
        <Fragment>
            <Meta title="All Hotels" />
            <div className="flex">
                <SideBar />
                <Fragment>
                    {isLoading ? <Loader /> : (
                        <div className="w-[80%] sm:w-[60%] md:w-[70%] mx-auto mt-3">
                            <h2 className="text-2xl font-medium text-center my-8">All Hotels</h2>
                            <TableContainer component={Paper}>
                                <Table className="min-w-[700px]">
                                    <TableHead >
                                        <TableRow className="bg-red-300">
                                            <TableCell align="center">Id</TableCell>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Upload Images</TableCell>
                                            <TableCell align="center">Update</TableCell>
                                            <TableCell align="center">Delete</TableCell>
                                            <TableCell align="center">Rooms</TableCell>
                                            <TableCell align="center">Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 2 ? allHotels?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : allHotels)?.map((hotel) => (
                                            <TableRow key={hotel._id} style={{ height: 72.8 }}>
                                                <TableCell align="center">{hotel._id}</TableCell>
                                                <TableCell align="center">{hotel.name}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => {
                                                        setOpen(!open);
                                                        setHotelRef(hotel);
                                                    }}>
                                                        <AddPhotoAlternateIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link to={`/admin/hotel/${hotel._id}/update`}>
                                                        <IconButton><EditIcon /></IconButton>
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton onClick={() => {
                                                        setIsDeleteOpen(!isDeleteOpen);
                                                        setHotelRef(hotel);
                                                    }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link to={`/admin/hotel/${hotel._id}/rooms`}>
                                                        <IconButton><HolidayVillageIcon /></IconButton>
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link to={`/hotel/${hotel._id}`}>
                                                        <IconButton><LaunchIcon /></IconButton>
                                                    </Link>
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
                                                count={allHotels?.length}
                                                rowsPerPageOptions={[]}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage} />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <Dialog open={open} scroll="body" className="!w-screen" fullWidth={true}>
                                <div className="p-4" >
                                    <DialogTitle className="text-center">Upload Hotel Images</DialogTitle>
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
                                            setHotelRef(undefined);
                                        }
                                        } className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                        <button disabled={images.length < 1 ? true : false} onClick={updloadImageHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Upload</button>
                                    </DialogActions>
                                </div>
                            </Dialog>
                            <Dialog open={isDeleteOpen}>
                                <DialogTitle className="text-center">Delete Hotel?</DialogTitle>
                                <DialogContent className="m-8">
                                    <DialogContentText className="text-gray-900">This will delete hotel's room and room's booking details also.</DialogContentText>
                                </DialogContent>
                                <DialogActions className="m-4">
                                    <button onClick={() => {
                                        setIsDeleteOpen(!isDeleteOpen);
                                        setHotelRef(undefined);
                                    }
                                    } className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                    <button onClick={deleteHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Delete</button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    )}
                </Fragment>
            </div>
        </Fragment>
    )
}
export default AllHotels;