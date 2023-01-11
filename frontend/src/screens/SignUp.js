import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signupHandler = () => {
        console.log(password, email, name)
    }

    return (
        <div className="mx-auto px-4 md:px-10 lg:px-20 mt-4">
            <h2 className="text-center text-4xl font-semibold text-gray-800">Create New Account</h2>
            <div className="flex flex-col items-center mt-12">
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" required className=" bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 focus:outline-none rounded" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" required className=" bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 focus:outline-none rounded mt-6" />
                <div className="bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 rounded mt-6 flex justify-between">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={isPasswordHidden ? "password" : "text"} placeholder="Password" required className="focus:outline-none" />
                    <VisibilityIcon className={`cursor-pointer ${isPasswordHidden ? "text-red-400" : "text-red-800"}`} onClick={() => setIsPasswordHidden(!isPasswordHidden)} />
                </div>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" required className=" bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 focus:outline-none rounded mt-6" />

                <p className="mt-5 w-full sm:w-2/4 md:w-2/3 lg:w-1/3 text-justify">By signing in, I agree to the Hotels <button className="text-blue-500">Terms and Conditions </button> and <button className="text-blue-500">Privacy Statement</button>.</p>
                <button onClick={signupHandler} type="button" className=" mt-12 p-3 w-2/3 sm:w-2/4 md:w-1/3 lg:w-1/5 text-white rounded-3xl hover:bg-blue-900 bg-blue-700 disabled:bg-blue-500" disabled={email.length < 1 || password.length < 8 || password !== confirmPassword || name.length < 1 ? true : false}>Sign In</button>
                <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-700" >Create one</Link></p>
            </div>
        </div>
    )
}
export default SignUp;