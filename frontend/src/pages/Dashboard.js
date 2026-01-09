import SideBar from "../components/layout/SideBar";
import { Fragment } from "react";
import { Card, CardContent } from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Link } from "react-router-dom";
import { Chart as ChartJS, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import Meta from '../utils/Meta';
import { useHotelsQuery } from "../redux/api/hotel.api";
import { useBookingsQuery } from "../redux/api/booking.api";
import { useUsersQuery } from "../redux/api/user.api";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const Dashboard = () => {
    const { isLoading: userLoading, data: userData, isError: isUserError, error: userError } = useUsersQuery();
    const { isLoading: hotelLoading, data: hotelData, isError: isHotelError, error: hotelError } = useHotelsQuery();
    const { isLoading: bookingLoading, data: bookingData, isError: isBookingError, error: bookingError } = useBookingsQuery();

    const allDates = bookingData?.bookings?.map(booking => booking.createdAt);



    const generateMonthlyBookingCount = (dates) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthCounts = monthNames.reduce((counts, name) => {
            counts[name] = 0;
            return counts;
        }, {});

        dates.forEach(date => {
            const monthName = monthNames[new Date(date).getMonth()];
            monthCounts[monthName]++;
        });

        return monthCounts;
    };

    const lineState = allDates && {
        labels: Object.keys(generateMonthlyBookingCount(allDates)),
        datasets: [
            {
                label: "Bookings",
                data: Object.values(generateMonthlyBookingCount(allDates)),
                backgroundColor: "tomato",
                hoverBackgroundColor: "rgb(197, 72, 49)"
            }
        ]
    };

    const options = {
        maintainAspectRation: true
    };

    return (
        <Fragment>
            <Meta title="Admin Dashboard" />
            <div className="flex">
                <SideBar />
                <div className="mx-auto w-full lg:mt-16 sm:mt-8 mt-5 md:mt-12">
                    <h2 className="text-center mb-12 font-medium text-2xl text-red-400">Admin DashBoard</h2>
                    <div className=" px-4 lg:px-20 flex flex-col gap-5 sm:gap-8 md:gap-12 lg:gap-28 sm:flex-row sm:justify-center" >
                        <Card className="px-5 py-3 shadow-2xl sm:w-1/4 sm:px-2 sm:py-2 !bg-zinc-200">
                            <CardContent className="w-full flex justify-between items-center sm:aspect-square sm:flex-col-reverse sm:justify-center">
                                <div className="text-center">
                                    <Link to="/admin/users" className="text-3xl font-medium text-red-500"> {userData?.users?.length}</Link>
                                    <p className="text-gray-500 text-md">{userData?.users?.length > 1 ? "Users" : "User"}</p>
                                </div>
                                <PeopleAltIcon className="text-red-400 !text-4xl mb-4" />
                            </CardContent>
                        </Card>
                        <Card className="px-5 py-3 shadow-2xl sm:w-1/4 sm:px-2 sm:py-2 !bg-zinc-200">
                            <CardContent className="w-full flex justify-between items-center sm:aspect-square sm:flex-col-reverse sm:justify-center">
                                <div className="text-center">
                                    <Link to="/admin/hotels" className="text-3xl font-medium text-red-500"> {hotelData?.hotels?.length}</Link>
                                    <p className="text-gray-500 text-md">{hotelData?.hotels?.length > 1 ? "Hotels" : "Hotel"}</p>
                                </div>
                                <ApartmentIcon className="text-red-400 !text-4xl mb-4" />
                            </CardContent>
                        </Card>
                        <Card className="px-5 py-3 shadow-2xl sm:w-1/4 sm:px-2 sm:py-2 !bg-zinc-200">
                            <CardContent className="w-full flex justify-between items-center sm:aspect-square sm:flex-col-reverse sm:justify-center">
                                <div className="text-center">
                                    <Link to="/admin/bookings" className="text-3xl font-medium text-red-500"> {bookingData?.bookings?.length}</Link>
                                    <p className="text-gray-500 text-md">{bookingData?.bookings?.length > 1 ? "Bookings" : "Booking"}</p>
                                </div>
                                <BookmarkAddedIcon className="text-red-400 !text-4xl mb-4" />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-11/12 md:w-3/5 aspect-auto my-20 mx-auto">
                        <h2 className="text-center mb-8 font-medium text-xl text-red-400">Monthly Bookings</h2>
                        {allDates && <Bar data={lineState} options={options} className="w-full" />}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Dashboard;