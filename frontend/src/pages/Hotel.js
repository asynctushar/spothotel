import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHotelAction } from "../redux/actions/hotelAction";
import { Slide } from 'react-slideshow-image';
import picture from '../images/nopicture.jpg';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Loader from '../components/Loader';
import RoomCard from "../components/RoomCard";
import NotFound from './NotFound';
import Meta from "../utils/Meta";

const Hotel = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { hotel, isLoading } = useSelector((state) => state.hotelState);

    useEffect(() => {
        dispatch(getHotelAction(id));
    }, [id, dispatch]);

    return (
        <Fragment>
        <Meta title={hotel?.name} />
        <Fragment>
            {isLoading ? <Loader /> : (
                <Fragment>
                    {!hotel ? <NotFound /> : (
                        <div className="flex flex-col md:min-h-60 gap-8 bg-gray-200  pt-4 md:items-center">
                            <div className="h-60 md:w-7/12">
                                {hotel?.pictures.length < 1 ? (
                                    <div className="h-60 -mr-[21.33px]">
                                        <img src={picture} alt="Not available" className="w-full h-full object-fill" />
                                    </div>
                                ) : (
                                    <Slide duration={3000} transitionDuration={400} prevArrow={<ArrowBackIosNewIcon className="text-zinc-200" />} nextArrow={<ArrowForwardIosIcon className="text-zinc-200" />}>
                                        {hotel?.pictures.map((pic) => (
                                            <div className="h-60" key={pic.public_id}>
                                                <img src={pic.url} alt={pic.public_id} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </Slide>
                                )}
                            </div >
                            <div className="md:w-7/12 mx-4 md:my-6 mb-6">
                                <div className="flex justify-between">
                                    <h2 className="text-xl capitalize font-semibold">{hotel?.name}</h2>
                                    <a href="#rooms" className="bg-red-400 text-gray-50 p-3 rounded hover:bg-red-500">Reserve a room</a>
                                </div>
                                <h4 className="font-medium">{hotel?.location}</h4>
                                <p className="my-3">{hotel?.description}</p>
                                <span className="font-medium text-gray-700"><LocationOnIcon className="mb-1" /><span className=" font-normal">{hotel?.distance}m from zero point.</span></span>
                                <div className="flex gap-4 flex-wrap mt-6">
                                    {hotel?.specification?.map((spec) => (
                                        <div key={spec} className="py-2 px-3 bg-gray-100 rounded-lg">
                                            <AddIcon className="mr-2" />
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div id="rooms" className="mx-4 md:mx-0 -mt-4 mb-8 md:w-9/12">
                                <span className="text-2xl mx-auto w-52 pb-2 block font-medium text-center border-b-2 border-solid border-gray-400">Choose your room</span>
                                <div className="flex flex-wrap gap-4 justify-center mt-12">
                                    {hotel?.rooms.map((room) => (
                                        <RoomCard key={room._id} room={room} />
                                    ))}
                                </div>
                            </div>
                        </div >
                    )}
                </Fragment>
            )}
            </Fragment>
            </Fragment>
    )
}
export default Hotel;