import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/actions/userAction';
import { getAllBookings, getAllHotels } from '../redux/actions/hotelAction';
import { useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Link } from "react-router-dom";
import { Chart as ChartJS, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const Dashboard = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.userState.allUsers);
    const { allBookings, allHotels } = useSelector((state) => state.hotelState);
    const allDates = allBookings?.flatMap(booking => booking.dates);


    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllBookings());
        dispatch(getAllHotels());

    }, [dispatch]);

    const getMonthsDateCount = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthCount = allDates?.reduce((counts, date) => {
            let month = new Date(date).getMonth();
            counts[month] = (counts[month] || 0) + 1;
            return counts;
        }, {});

        function getMonthName(month) {
            return monthNames[month];
        }

        let monthNameCount = {};
        Object.keys(monthCount).forEach(function (key) {
            monthNameCount[getMonthName(key)] = monthCount[key];
        });

        return monthNameCount;
    }


    const lineState = {
        labels: Object.keys(getMonthsDateCount()),
        datasets: [
            {
                label: "Total Bookings",
                data: Object.values(getMonthsDateCount()),
                backgroundColor: "tomato",
                hoverBackgroundColor: "rgb(197, 72, 49)"
            }
        ]
    };

    const options = {
        maintainAspectRation: true
    }

    return (
        <div className="flex">
            <SideBar />
            <div className="mx-auto w-full lg:mt-16 sm:mt-8 mt-5 md:mt-12">
                <h2 className="text-center mb-12 font-medium text-2xl text-red-400">Admin DashBoard</h2>
                <div className=" px-4 lg:px-20 flex flex-col gap-5 sm:gap-8 md:gap-12 lg:gap-28 sm:flex-row sm:justify-center" >
                    <Card className="px-5 py-3 shadow-2xl sm:w-1/4 sm:px-2 sm:py-2">
                        <CardContent className="w-full flex justify-between items-center sm:aspect-square sm:flex-col-reverse sm:justify-center">
                            <div className="text-center">
                                <Link to="/admin/users" className="text-3xl font-medium text-red-500"> {allUsers.length}</Link>
                                <p className="text-gray-500 text-md">{allUsers.length > 1 ? "Users" : "User"}</p>
                            </div>
                            <PeopleAltIcon className="text-red-400 !text-4xl mb-4" />
                        </CardContent>
                    </Card>
                    <Card className="px-5 py-3 shadow-2xl sm:w-1/4 sm:px-2 sm:py-2">
                        <CardContent className="w-full flex justify-between items-center sm:aspect-square sm:flex-col-reverse sm:justify-center">
                            <div className="text-center">
                                <Link to="/admin/hotels" className="text-3xl font-medium text-red-500"> {allHotels.length}</Link>
                                <p className="text-gray-500 text-md">{allHotels.length > 1 ? "Hotels" : "Hotel"}</p>
                            </div>
                            <ApartmentIcon className="text-red-400 !text-4xl mb-4" />
                        </CardContent>
                    </Card>
                    <Card className="px-5 py-3 shadow-2xl sm:w-1/4 sm:px-2 sm:py-2">
                        <CardContent className="w-full flex justify-between items-center sm:aspect-square sm:flex-col-reverse sm:justify-center">
                            <div className="text-center">
                                <Link to="/admin/bookings" className="text-3xl font-medium text-red-500"> {allBookings.length}</Link>
                                <p className="text-gray-500 text-md">{allBookings.length > 1 ? "Bookings" : "Booking"}</p>
                            </div>
                            <BookmarkAddedIcon className="text-red-400 !text-4xl mb-4" />
                        </CardContent>
                    </Card>
                </div>
                <div className=" w-full sm:w-3/5 aspect-video my-20 mx-auto relative ">
                    <h2 className="text-center mb-8 font-medium text-xl text-red-400">Bookings</h2>
                    <Bar data={lineState} options={options} />
                </div>
            </div>
        </div>
    )
}
export default Dashboard;