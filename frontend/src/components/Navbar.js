import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/actions/userAction';
import {setHasSearched} from '../redux/slices/hotelSlice'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.userState);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoClick = () => {
        navigate('/');
        dispatch(setHasSearched(false));
    }

    const loginHandler = () => {
        navigate('/login');
        setAnchorEl(null);
    }

    const signupHandler = () => {
        navigate('/signup');
        setAnchorEl(null);
    }

    const accountHandler = () => {
        setAnchorEl(null);
        navigate('/account');
    }

    const logoutHandler = () => {
        dispatch(logoutAction());
        setAnchorEl(null)
    }

    return (
        <header className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48 z-[1300]">
            <nav className=" h-24 flex items-center justify-between relative">
                <h3 onClick={handleLogoClick} className="text-red-400 text-3xl font-bold cursor-pointer">SpotHotel</h3>
                <div className="">
                    <div onClick={handleClick}>
                        <span className="md:hidden">
                            <AccountCircleIcon className="text-red-400 cursor-pointer" />
                        </span>
                        <span className="capitalize text-red-400 font-medium hidden md:block cursor-pointer">{isAuthenticated ? user.name : "Sign in"}</span>
                    </div>

                    <Popover
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}


                    >
                        <div className="bg-red-100 w-screen sm:w-96 py-12 flex justify-center items-center flex-col gap-6 transition ease-in duration-300">
                            {!isAuthenticated && (
                                <Fragment>
                                    <button onClick={loginHandler} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-48 text-center text-neutral-50 font-thin transition duration-200 ">Sign In</button>
                                    <button onClick={signupHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-48 text-center transition duration-200 box-border">Sign Up</button>
                                </Fragment>
                            )}
                            {isAuthenticated && (
                                <Fragment>
                                    <div className="text-center">
                                        <h2 className="capitalize text-xl font-semibold">Hi, {user.name}</h2>
                                        <span>Email: {user.email}</span>
                                    </div>
                                    <button onClick={accountHandler} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-48 text-center text-neutral-50  transition duration-200 font-semibold">Account</button>
                                    <button onClick={logoutHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-48 text-center transition duration-200 box-border">Log out</button>
                                </Fragment>
                            )}
                        </div>
                    </Popover>
                </div>
            </nav>
        </header >
    )
}
export default Navbar;