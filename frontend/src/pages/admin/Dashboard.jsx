import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { Users, Building2, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useHotelsQuery } from "@/redux/api/hotel.api";
import { useBookingsQuery } from "@/redux/api/booking.api";
import { useUsersQuery } from "@/redux/api/user.api";
import { setError } from "@/redux/slices/app.slice";
import StatCardLoader from "@/components/dashboard/StatCardLoader";
import ChartCardLoader from "@/components/dashboard/ChartCardLoader";
import RecentActivityLoader from "@/components/dashboard/RecentActivityLoader";
import Meta from "@/components/shared/Meta";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isLoading: userLoading, data: userData, isError: isUserError, error: userError } = useUsersQuery();
    const { isLoading: hotelLoading, data: hotelData, isError: isHotelError, error: hotelError } = useHotelsQuery();
    const { isLoading: bookingLoading, data: bookingData, isError: isBookingError, error: bookingError } = useBookingsQuery();

    useEffect(() => {
        if (isUserError && userError) {
            dispatch(setError(userError.data?.message));
        }
        if (isHotelError && hotelError) {
            dispatch(setError(hotelError.data?.message));
        }
        if (isBookingError && bookingError) {
            dispatch(setError(bookingError.data?.message));
        }
    }, [isUserError, userError, isHotelError, hotelError, isBookingError, bookingError, dispatch]);

    const generateMonthlyBookingCount = (dates) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Get current date and date 12 months ago
        const now = new Date();
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(now.getMonth() - 11);
        twelveMonthsAgo.setDate(1);
        twelveMonthsAgo.setHours(0, 0, 0, 0);

        // Initialize counts for last 12 months
        const monthCounts = {};
        for (let i = 0; i < 12; i++) {
            const date = new Date(twelveMonthsAgo);
            date.setMonth(twelveMonthsAgo.getMonth() + i);
            const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`;
            monthCounts[monthKey] = 0;
        }

        // Filter and count bookings from last 12 months
        dates?.forEach(date => {
            const bookingDate = new Date(date);
            if (bookingDate >= twelveMonthsAgo && bookingDate <= now) {
                const monthKey = `${monthNames[bookingDate.getMonth()]} ${bookingDate.getFullYear().toString().slice(-2)}`;
                if (monthCounts[monthKey] !== undefined) {
                    monthCounts[monthKey]++;
                }
            }
        });

        return Object.keys(monthCounts).map(month => ({
            month,
            bookings: monthCounts[month]
        }));
    };

    const chartData = bookingData?.bookings ? generateMonthlyBookingCount(bookingData.bookings.map(b => b.createdAt)) : [];

    const chartConfig = {
        bookings: {
            label: "Bookings",
            color: "hsl(var(--primary))",
        },
    };

    const stats = [
        {
            title: "Total Users",
            value: userData?.users?.length || 0,
            icon: Users,
            link: "/admin/users",
            description: `${userData?.users?.length || 0} ${userData?.users?.length === 1 ? 'User' : 'Users'} registered`,
            isLoading: userLoading,
        },
        {
            title: "Total Hotels",
            value: hotelData?.hotels?.length || 0,
            icon: Building2,
            link: "/admin/hotels",
            description: `${hotelData?.hotels?.length || 0} ${hotelData?.hotels?.length === 1 ? 'Hotel' : 'Hotels'} in system`,
            isLoading: hotelLoading,
        },
        {
            title: "Total Bookings",
            value: bookingData?.bookings?.length || 0,
            icon: Calendar,
            link: "/admin/bookings",
            description: `${bookingData?.bookings?.length || 0} ${bookingData?.bookings?.length === 1 ? 'Booking' : 'Bookings'} made`,
            isLoading: bookingLoading,
        },
    ];

    return (
        <Fragment>
            <Meta
                title="Admin Dashboard"
                description="Overview of platform activity including bookings, users, hotels, and system performance on SpotHotel."
                keywords="admin dashboard, hotel management, SpotHotel admin"
            />
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-foreground/75 mt-2">Welcome to your admin dashboard</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
                    {stats.map((stat, index) => (
                        stat.isLoading ? (
                            <StatCardLoader key={index} />
                        ) : (
                            <Link key={index} to={stat.link}>
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-foreground/75">
                                            {stat.title}
                                        </CardTitle>
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <stat.icon className="h-5 w-5 text-primary" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                        <p className="text-xs text-foreground/60">{stat.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                    {/* Monthly Bookings Chart */}
                    {bookingLoading ? (
                        <ChartCardLoader />
                    ) : (
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    Monthly Bookings
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm">Booking trends over the last 12 months</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <ChartContainer config={chartConfig} className="h-62.5 sm:h-75 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                axisLine={false}
                                                className="text-xs"
                                                tick={{ fontSize: 12 }}
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                className="text-xs"
                                                tick={{ fontSize: 12 }}
                                            />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar
                                                dataKey="bookings"
                                                fill="var(--color-bookings)"
                                                radius={[8, 8, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    )}

                    {/* Recent Activity */}
                    {bookingLoading ? (
                        <RecentActivityLoader />
                    ) : (
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
                                <CardDescription className="text-xs sm:text-sm">Latest updates and actions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {bookingData?.bookings?.length > 0 ? (
                                        bookingData.bookings
                                            .slice(-5)
                                            .reverse()
                                            .map((booking) => (
                                                <div
                                                    key={booking._id}
                                                    className="flex items-center gap-3 sm:gap-4 pb-4 border-b last:border-0"
                                                >
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-foreground truncate">
                                                            New Booking
                                                        </p>
                                                        <p className="text-xs text-foreground/60 truncate">
                                                            ID: {booking._id}
                                                        </p>
                                                    </div>
                                                    <div className="text-xs text-foreground/60 shrink-0">
                                                        {new Date(booking.createdAt).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <p className="text-sm text-foreground/60 text-center py-8">No recent activity</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;