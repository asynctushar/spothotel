import VisibilityIcon from '@mui/icons-material/Visibility';
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/ui/Loader';
import Meta from '../utils/Meta';
import { login } from '../redux/actions/auth.action';

const Login = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, isAuthenticated } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [navigate, isAuthenticated]);

    const signinHandler = async () => {
        const res = await dispatch(login({ email, password }));
        if (res.type === "auth/login/fulfilled") {
            setEmail("");
            setPassword("");
            navigate("/");
        }

    };


    return (
        <Fragment>
            <Meta title="Login" />
            <Fragment>
                <div className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48 mt-4">
                    <h2 className="text-center text-4xl font-semibold text-gray-800">Login</h2>
                    <div className="flex flex-col items-center mt-12">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" required className=" bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 focus:outline-none rounded" />
                        <div className="bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 rounded mt-6 flex justify-between">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type={isPasswordHidden ? "password" : "text"} placeholder="Password" required className="focus:outline-none w-3/4 bg-transparent" />
                            <VisibilityIcon className={`cursor-pointer ${isPasswordHidden ? "text-red-400" : "text-red-800"}`} onClick={() => setIsPasswordHidden(!isPasswordHidden)} />
                        </div>
                        <p className="mt-5 w-full sm:w-2/4 md:w-2/3 lg:w-1/3 text-center">By signing in, I agree to the Hotels <button className="text-blue-500">Terms and Conditions </button> and <button className="text-blue-500">Privacy Statement</button>.</p>
                        <button onClick={signinHandler} type="button" className=" mt-12 p-3 w-2/3 sm:w-2/4 md:w-1/3 lg:w-1/5 text-white rounded-3xl hover:bg-blue-900 bg-blue-700 disabled:bg-blue-500" disabled={email.length < 1 || password.length < 8 ? true : false || loading}>Login</button>
                        <p className="mt-4">Don't have an account? <Link to="/register" className="text-blue-700" >Register</Link></p>
                    </div>
                </div>
            </Fragment>
        </Fragment>
    );
};
export default Login;