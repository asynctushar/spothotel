import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();

    const loginHandler = () => {
        navigate('/login');
    }

    const signupHandler = () => {
        navigate('/signup');
    }

    return (
        <header className="mx-auto px-4 md:px-10 lg:px-20">
            <nav className=" h-24 flex items-center justify-between relative">
                <Link to="/" className="text-red-400 text-3xl font-bold">Spothotel</Link>
                <div className="dropdown"> 
                    <label className="rounded-full lg:rounded-none"
                        tabIndex={0}>
                        <CgProfile className="text-red-400 text-3xl md:hidden" />
                        <span className="text-red-400 font-medium hidden md:block">Sign in</span>
                    </label>
                        <div tabIndex={0} className=" dropdown-content bg-red-100 w-full sm:w-96 py-12 shadow-lg rounded-lg flex justify-center items-center flex-col gap-6 absolute right-0 mt-2 transition ease-in duration-300">
                            <button onClick={loginHandler} className="bg-red-400 hover:bg-red-500 py-2 rounded-lg w-48 text-center text-neutral-50 font-thin transition duration-200 text-zinc-100">Sign In</button>
                            <button onClick={signupHandler} className=" border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-48 text-center transition duration-200 box-border">Sign Up</button>
                        </div>
                    </div>
            </nav>
        </header>
    )
}
export default Navbar;