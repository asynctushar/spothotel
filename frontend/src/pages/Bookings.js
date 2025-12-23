import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersBookings } from '../redux/actions/hotelAction';
import Loader from '../components/Loader';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Meta from '../utils/Meta';

const Bookings = () => {
    const dispatch = useDispatch();
    const { isLoading, bookings } = useSelector((state) => state.hotelState);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - bookings?.length);

    useEffect(() => {
        dispatch(getUsersBookings());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Fragment>
            <Meta title="Your Bookings" />
            <Fragment>
                {isLoading ? <Loader /> : (
                    <div className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48 mt-4">
                        <h2 className="text-2xl font-medium text-center my-8">Your All Bookings</h2>
                        <TableContainer component={Paper} >
                            <Table className="min-w-[600px]">
                                <TableHead >
                                    <TableRow className="bg-red-300">
                                        <TableCell align="center" >Id</TableCell>
                                        <TableCell align="center" >Status</TableCell>
                                        <TableCell align="center" >Check In Date</TableCell>
                                        <TableCell align="center" >Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 2 ? bookings?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : bookings)?.map((booking) => (
                                        <TableRow key={booking._id} style={{height: 72.8}}>
                                            <TableCell align="center" >{booking._id}</TableCell>
                                            <TableCell align="center" >{booking.status}</TableCell>
                                            <TableCell align="center" >{format(new Date(booking.dates[0]), "yyyy-MM-dd")}</TableCell>
                                            <TableCell align="center" ><Link to={`/me/booking/${booking._id}`} ><LaunchIcon /></Link> </TableCell>
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
                                            count={bookings?.length}
                                            rowsPerPageOptions={[]}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage} />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </div>
                )}
            </Fragment>
        </Fragment>
    )
}
export default Bookings;