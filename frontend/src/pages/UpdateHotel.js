import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import SideBar from "../components/SideBar";
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, styled } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setIsHotelUPdated } from '../redux/slices/hotelSlice';
import { getHotelAction, updateHotel } from '../redux/actions/hotelAction';
import Loader from '../components/Loader';
import Meta from '../utils/Meta';

const availableSpecifications = [
    "Car Parking",
    "Restaurant",
    "Free Wi-fi"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const CustomSelect = styled(Select)(() => ({
    "&.MuiOutlinedInput-root": {
        "& fieldset": {
            border: "1px solid rgb(156 163 175)"
        },
        "&:hover fieldset": {
            border: "1px solid rgb(156 163 175)"
        },
        "&.Mui-focused fieldset": {
            border: "1px solid rgb(156 163 175)"
        }
    }
}));

const UpdateHotel = () => {
    const [specification, setSpecification] = useState([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setDescription] = useState('');
    const { isHotelUpdated, isLoading, hotel } = useSelector((state) => state.hotelState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getHotelAction(id))
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (hotel) {
            setName(hotel.name);
            setLocation(hotel.location);
            setDistance(hotel.distance);
            setDescription(hotel.description);
            setSpecification(hotel.specification);
        }
    }, [hotel])

    useEffect(() => {
        if (isHotelUpdated) {
            navigate('/admin/hotels');
            dispatch(setIsHotelUPdated(false));
        }
    }, [isHotelUpdated, dispatch, navigate]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        // On autofill we get a stringified value.
        setSpecification(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            name,
            location,
            distance: Number(distance),
            description,
            specification
        }

        dispatch(updateHotel(formData, id));
    }

    return (
        <Fragment>
            <Meta title="Update Hotel" />
            <div className="flex">
                <SideBar />
                {isLoading ? <Loader /> : (
                    <div className="px-4 md:px-10 lg:px-20 xl:px-48 mx-auto">
                        <h2 className="text-2xl font-medium text-center my-8">Update Hotel</h2>
                        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
                            <div className="border border-solid border-gray-400 py-3 px-5 rounded">
                                <FormatColorTextIcon className="text-gray-600" />
                                <input type="text" required={true} value={name} onChange={(e) => setName(e.target.value)} placeholder="Hotel Name" className="w-40 sm:w-60 md:w-80 ml-3 outline-none bg-transparent" />
                            </div>
                            <div className="border border-solid border-gray-400 py-3 px-5 rounded">
                                <LocationOnIcon className="text-gray-600" />
                                <input type="text" required={true} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-40 sm:w-60 md:w-80 ml-3 outline-none bg-transparent" />
                            </div>
                            <div className="border border-solid border-gray-400 py-3 px-5 rounded">
                                <AirlineStopsIcon className="text-gray-600" />
                                <input type="number" required={true} value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="Distance" className="w-40 sm:w-60 md:w-80 ml-3 outline-none bg-transparent" />
                            </div>
                            <FormControl className="md:w-[25rem] w-60 sm:w-80">
                                <InputLabel id="demo-multiple-checkbox-label" className="!text-gray-400">Specifications</InputLabel>
                                <CustomSelect
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={specification}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Specifications" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {availableSpecifications.map((spec) => (
                                        <MenuItem key={spec} value={spec}>
                                            <Checkbox checked={specification?.indexOf(spec) > -1} />
                                            <ListItemText primary={spec} />
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </FormControl>
                            <textarea required={true} placeholder="Hotel Description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="border border-solid border-gray-400 py-3 px-5 rounded resize-none focus:outline-none bg-transparent" />
                            <Button variant="contained" type="submit" className="!bg-red-400 !py-4">Update</Button>
                        </form>
                    </div >
                )}
            </div >
        </Fragment>
    )
}
export default UpdateHotel;