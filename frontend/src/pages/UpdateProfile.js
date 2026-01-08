import AppleIcon from '../assets/images/icon-app-store.png';
import PlayStoreIcon from '../assets/images/icon-play-store.png';
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Meta from '../utils/Meta';
import { changePassword, deleteProfile, updateProfile } from '../redux/actions/auth.action';

const UpdateProfile = () => {
    const { user, loading } = useSelector((state) => state.authState);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNameOpen, setIsNameOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const changeNameHandler = async () => {
        if (name.length < 1) return;

        const res = await dispatch(updateProfile({ name }));
        if (res.type === "auth/updateProfile/fulfilled") {
            setIsNameOpen(!isNameOpen);
        }
    };

    const changeEmailHandler = async () => {
        if (email.length < 1) return;

        const res = await dispatch(updateProfile({ email }));
        if (res.type === "auth/updateProfile/fulfilled") {
            setIsEmailOpen(!isEmailOpen);
        }
    };

    const changePasswordHandler = async () => {
        if (confirmPassword !== newPassword || newPassword.length < 8) return;

        const res = await dispatch(changePassword({ oldPassword, newPassword }));
        if (res.type === "auth/changePassword/fulfilled") {
            setIsPasswordOpen(!isPasswordOpen);
            setNewPassword("");
            setOldPassword("");
            setConfirmPassword("");
        }
    };

    const deleteAccountHandler = async () => {
        const res = await dispatch(deleteProfile());
        if (res.type === "auth/deleteProfile/fulfilled") {
            setIsDeleteOpen(!isDeleteOpen);
        }
    };


    return (
        <Fragment>
            <Meta title="Account Setting" />
            <Fragment >
                <div className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48 mt-4 flex flex-col md:flex-row justify-between pb-6 h-[calc(100vh-115px)]">
                    <div className="w-full h-full mb-6 flex flex-col border-r border-solid border-gray-200">
                        <Link to="/account" className="text-blue-500 hover:text-blue-700">
                            <ArrowBackIosNewIcon fontSize="small" /> <span>Go Back</span>
                        </Link>
                        <h2 className="text-2xl font-semibold my-5 text-gray-800 ml-3">Update Your Account Settings</h2>
                        <p className=" font-semibold text-gray-700 mb-1 ml-5">Name: <span className="capitalize font-medium font-mono ml-2">{user?.name}</span><button onClick={() => setIsNameOpen(!isNameOpen)} className="font-medium text-sm ml-4 mb-1 text-blue-600 hover:text-blue-800">Edit</button> </p>
                        <Dialog open={isNameOpen}>
                            <DialogTitle className="text-center">Change your name</DialogTitle>
                            <DialogContent className="my-8 sm:mx-8">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-4 rounded" required />
                            </DialogContent>
                            <DialogActions>
                                <button disabled={loading} onClick={() => setIsNameOpen(!isNameOpen)} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                <button disabled={loading || name.length < 1} onClick={changeNameHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Update</button>
                            </DialogActions>
                        </Dialog>
                        <p className=" font-semibold text-gray-700 ml-5">Email: <span className=" font-medium font-mono ml-2">{user?.email}</span> <button onClick={() => setIsEmailOpen(!isEmailOpen)} className="font-medium text-sm ml-4 mb-1 text-blue-600 hover:text-blue-800">Edit</button> </p>
                        <Dialog open={isEmailOpen}>
                            <DialogTitle className="text-center">Change your Email</DialogTitle>
                            <DialogContent className="my-8 sm:mx-8">
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-4 rounded" required />
                            </DialogContent>
                            <DialogActions>
                                <button disabled={loading} onClick={() => setIsEmailOpen(!isEmailOpen)} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                <button disabled={loading || email.length < 1} onClick={changeEmailHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Update</button>
                            </DialogActions>
                        </Dialog>
                        <hr className="mt-6 border-t border-dashed border-gray-300" />
                        <div className="h-12 flex items-center justify-between px-6 border-b border-solid border-gray-400">
                            <button onClick={() => setIsPasswordOpen(!isPasswordOpen)} className=" text-blue-600" >Change Password</button>
                            <ArrowForwardIosIcon fontSize="small" className="text-blue-600" />
                            <Dialog open={isPasswordOpen}>
                                <DialogTitle className="text-center">Change your password</DialogTitle>
                                <DialogContent className="my-8 mx-4 sm:mx-12 md:mx-20 flex flex-col gap-4">
                                    <input type="password" value={oldPassword} placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-3 rounded" required />
                                    <input type="password" value={newPassword} placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-3 rounded" required />
                                    <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-3 rounded" required />
                                </DialogContent>
                                <DialogActions>
                                    <button disabled={loading} onClick={() => setIsPasswordOpen(!isPasswordOpen)} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                    <button disabled={loading || oldPassword.length < 8 || newPassword.length < 8 || newPassword !== confirmPassword} onClick={changePasswordHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Update</button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div className="h-12 flex items-center justify-between px-6 border-b border-solid border-gray-400">
                            <button onClick={() => setIsDeleteOpen(!isDeleteOpen)} className=" text-blue-600" >Delete Account</button>
                            <ArrowForwardIosIcon fontSize="small" className="text-blue-600" />
                            <Dialog open={isDeleteOpen}>
                                <DialogTitle className="text-center">Delete your Account?</DialogTitle>
                                <DialogContent className="m-8">
                                    <DialogContentText className="text-gray-900">This will delete your bookings deltails also.</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <button disabled={loading} onClick={() => setIsDeleteOpen(!isDeleteOpen)} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                    <button disabled={loading} onClick={deleteAccountHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Delete</button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    <div className="w-full md:w-4/5 md:mt-8">
                        <p className="text-center text-xl font-semibold mb-6">Download our app</p>
                        <div className="flex gap-4 justify-center mb-6 h-auto max-h-16">
                            <img src={AppleIcon} alt="apple-icon" className="w-5/12" />
                            <img src={PlayStoreIcon} alt="play-store-icon" className="w-5/12" />
                        </div>
                    </div>
                </div>
            </Fragment>
        </Fragment>
    );
};
export default UpdateProfile;