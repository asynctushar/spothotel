import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const loginHandler = () => {
        navigate('/login');
        setAnchorEl(null);
    }

    const signupHandler = () => {
        navigate('/signup');
        setAnchorEl(null);
    }

    return (
        <header className="mx-auto px-4 md:px-10 lg:px-20">
            <nav className=" h-24 flex items-center justify-between relative">
                <Link to="/" className="text-red-400 text-3xl font-bold">Spothotel</Link>
                <div className="">
                    <div onClick={handleClick}>
                        <span className="md:hidden">
                            <AccountCircleIcon className="text-red-400 cursor-pointer" />
                        </span>
                        <span className="text-red-400 font-medium hidden md:block cursor-pointer">Sign in</span>
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
                        <button onClick={loginHandler} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-48 text-center text-neutral-50 font-thin transition duration-200 ">Sign In</button>
                        <button onClick={signupHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-48 text-center transition duration-200 box-border">Sign Up</button>
                    </div>
                </Popover>
            </div>
        </nav>
        </header >
    )
}
export default Navbar;