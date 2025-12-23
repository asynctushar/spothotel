import SideBar from "../components/SideBar";
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, updateUserRole } from '../redux/actions/userAction';
import Loader from '../components/Loader';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, IconButton, Tooltip, Dialog, DialogContent, DialogTitle, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Meta from '../utils/Meta';

const AllUsers = () => {
    const dispatch = useDispatch();
    const { isUsersLoading, allUsers, user } = useSelector((state) => state.userState);
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("");
    const [userRef, setUserRef] = useState(undefined);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - allUsers?.length);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const editHandler = () => {
        dispatch(updateUserRole(userRef._id, role));
        setOpen(!open);
    }

    return (
        <Fragment>
            <Meta title="All Users" />
            <div className="flex">
                <SideBar />
                <Fragment>
                    {isUsersLoading ? <Loader /> : (
                        <div className="w-[80%] sm:w-[60%] md:w-[70%] mx-auto mt-3">
                            <h2 className="text-2xl font-medium text-center my-8">All Users</h2>
                            <TableContainer component={Paper}>
                                <Table className="min-w-[700px]">
                                    <TableHead >
                                        <TableRow className="bg-red-300">
                                            <TableCell align="center" >Id</TableCell>
                                            <TableCell align="center" >Name</TableCell>
                                            <TableCell align="center" >Email</TableCell>
                                            <TableCell align="center" >Role</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 2 ? allUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : allUsers)?.map((singleUser) => (
                                            <TableRow key={singleUser._id} style={{ height: 72.8 }}>
                                                <TableCell align="center" >{singleUser._id}</TableCell>
                                                <TableCell align="center" >{singleUser.name}</TableCell>
                                                <TableCell align="center" >{singleUser.email}</TableCell>
                                                <TableCell align="center">
                                                    {singleUser.role}
                                                    <Tooltip title={singleUser._id === user._id ? "" : "Edit"} placement="top" className="!ml-2">
                                                        <IconButton onClick={() => {
                                                            setOpen(!open);
                                                            setUserRef(singleUser);
                                                            setRole(singleUser.role)
                                                        }}
                                                            disabled={singleUser._id === user._id} className="disabled:text-gray-600">
                                                            <EditIcon fontSize="medium" />
                                                        </IconButton>
                                                    </Tooltip>
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
                                                count={allUsers?.length}
                                                rowsPerPageOptions={[]}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage} />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <Dialog open={open}>
                                <div className="p-5">
                                    <DialogTitle className="text-center">Change User's Role</DialogTitle>
                                    <DialogContent className="m-4 !overflow-visible">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={role}
                                                label="Role"
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <MenuItem value="user">User</MenuItem>
                                                <MenuItem value="admin">Admin</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions className="mt-4">
                                        <button onClick={() => setOpen(!open)} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                        <button disabled={role === userRef?.role ? true : false} onClick={editHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Update</button>
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
export default AllUsers;