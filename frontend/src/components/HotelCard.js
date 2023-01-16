import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import picture from '../images/nopicture.jpg';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from 'react-router-dom';

const HotelCard = ({ hotel }) => {
    return (
        <div className="flex flex-col md:flex-row md:min-h-60 gap-8 bg-gray-200 rounded-md my-4 md:items-center">
            <div className="md:w-2/6 h-full">
                {hotel.pictures.length < 1 ? (
                    <div className="h-60 md:-mr-[21.33px]">
                        <img src={picture} alt="Not available" className="w-full h-full object-fill" />
                    </div>
                ) : (
                    <Slide duration={3000} transitionDuration={400} prevArrow={<ArrowBackIosNewIcon className="text-zinc-200" />} nextArrow={<ArrowForwardIosIcon className="text-zinc-200" />}>
                        {hotel.pictures.map((pic) => (
                            <div className="h-60" key={pic.public_id}>
                                <img src={pic.url} alt={pic.public_id} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </Slide>
                )}
            </div >
            <div className="md:w-4/6 mx-4 md:my-6 mb-6">
                <Link to={`/hotel/${hotel._id}`} className="text-xl capitalize font-semibold">{hotel.name}</Link>
                <h4 className="font-medium">{hotel.location}</h4>
                <p className="my-3">{hotel.description}</p>
                <span className="font-medium text-gray-700"><LocationOnIcon className="mb-1" /><span className=" font-normal">{hotel.distance}m from zero point.</span></span>
                <div className="flex gap-4 flex-wrap mt-6">
                    {hotel.specification?.map((spec) => (
                        <div key={spec} className="py-2 px-3 bg-gray-100 rounded-lg">
                            <AddIcon className="mr-2" />
                            <span>{spec}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}
export default HotelCard;