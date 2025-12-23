import SideBar from "../components/SideBar";
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeBookingStatus, getAllBookings } from '../redux/actions/hotelAction';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, FormControl, InputLabel, Select, MenuItem, Tooltip, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Meta from '../utils/Meta';

const AllBookings = () => {
    const dispatch = useDispatch();
    const { isLoading, allBookings } = useSelector((state) => state.hotelState);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [bookingRef, setBookingRef] = useState(undefined);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - allBookings?.length);

    useEffect(() => {
        dispatch(getAllBookings());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const editHandler = () => {
        dispatch(changeBookingStatus(status, bookingRef._id));
        setOpen(false);
        setBookingRef(undefined);
    }

    return (
        <Fragment>
            <Meta title="All Bookings" />
            <div className="flex">
                <SideBar />
                <Fragment>
                    {isLoading ? <Loader /> : (
                        <div className="w-[80%] sm:w-[60%] md:w-[70%] mx-auto mt-3">
                            <h2 className="text-2xl font-medium text-center my-8">All Bookings</h2>
                            <TableContainer component={Paper}>
                                <Table className="min-w-[700px]">
                                    <TableHead >
                                        <TableRow className="bg-red-300">
                                            <TableCell align="center">Id</TableCell>
                                            <TableCell align="center">Payment Status</TableCell>
                                            <TableCell align="center">Booking Status</TableCell>
                                            <TableCell align="center">Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 2 ? allBookings?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : allBookings)?.map((booking) => (
                                            <TableRow key={booking._id} style={{ height: 72.8 }}>
                                                <TableCell align="center">{booking._id}</TableCell>
                                                <TableCell align="center" className="capitalize">{booking.paymentInfo.status}</TableCell>
                                                <TableCell align="center">
                                                    {booking.status}
                                                    <Tooltip title={booking.status === "Complete" ? "" : "Edit"} placement="right" className="!ml-2">
                                                        <IconButton onClick={() => {
                                                            setOpen(!open);
                                                            setBookingRef(booking);
                                                            setStatus(booking.status);
                                                        }}
                                                            disabled={booking.status === "Complete" ? true : false}
                                                            className="disabled:text-gray-600">
                                                            <EditIcon fontSize="medium"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Link to={`/admin/booking/${booking._id}`}>
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
                                                count={allBookings?.length}
                                                rowsPerPageOptions={[]}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage} />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <Dialog open={open}>
                                <div className="p-5">
                                    <DialogTitle className="text-center">Change Booking Status</DialogTitle>
                                    <DialogContent className="m-4 !overflow-visible">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={status}
                                                label="Status"
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <MenuItem value="Processing">Processing</MenuItem>
                                                <MenuItem value="Checked">Checked</MenuItem>
                                                <MenuItem value="Complete">Complete</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions className="mt-4">
                                        <button onClick={() => setOpen(!open)} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                        <button
                                            disabled={status === bookingRef?.status ? true : false}
                                            onClick={editHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Update</button>
                                    </DialogActions>
                                </div>
                            </Dialog>
                        </div>
                    )}
                </Fragment>
            </div>
        </Fragment>
    )
}
export default AllBookings;