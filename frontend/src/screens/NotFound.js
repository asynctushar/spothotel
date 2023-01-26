import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col justify-center w-full items-center h-[calc(100vh-97px)]">
            <h2 className="text-2xl -mt-48 mb-6 text-center">Page Not Found.</h2>
            <button className="bg-red-400 hover:bg-red-500 py-3 px-6 rounded text-green-50 transition duration-200" onClick={() => navigate('/')}>Return Home</button>
        </div>
    )
}
export default NotFound;