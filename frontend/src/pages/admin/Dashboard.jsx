import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { Users, Building2, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useHotelsQuery } from "@/redux/api/hotel.api";
import { useBookingsQuery } from "@/redux/api/booking.api";
import { useUsersQuery } from "@/redux/api/user.api";
import { setError } from "@/redux/slices/app.slice";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isLoading: userLoading, data: userData, isError: isUserError, error: userError } = useUsersQuery();
    const { isLoading: hotelLoading, data: hotelData, isError: isHotelError, error: hotelError } = useHotelsQuery();
    const { isLoading: bookingLoading, data: bookingData, isError: isBookingError, error: bookingError } = useBookingsQuery();

    const isLoading = userLoading || hotelLoading || bookingLoading;

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

        const monthCounts = monthNames.reduce((counts, name) => {
            counts[name] = 0;
            return counts;
        }, {});

        dates?.forEach(date => {
            const monthName = monthNames[new Date(date).getMonth()];
            monthCounts[monthName]++;
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
            description: `${userData?.users?.length > 1 ? 'Users' : 'User'} registered`,
            trend: "+12%",
            trendUp: true,
        },
        {
            title: "Total Hotels",
            value: hotelData?.hotels?.length || 0,
            icon: Building2,
            link: "/admin/hotels",
            description: `${hotelData?.hotels?.length > 1 ? 'Hotels' : 'Hotel'} in system`,
            trend: "+8%",
            trendUp: true,
        },
        {
            title: "Total Bookings",
            value: bookingData?.bookings?.length || 0,
            icon: Calendar,
            link: "/admin/bookings",
            description: `${bookingData?.bookings?.length > 1 ? 'Bookings' : 'Booking'} made`,
            trend: "+23%",
            trendUp: true,
        },
    ];

    if (isLoading) {
        return <DashboardLoader />;
    }

    return (
        <Fragment>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-foreground/75 mt-2">Welcome to your admin dashboard</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
                    {stats.map((stat, index) => (
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
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-foreground/60">{stat.description}</p>
                                        <div className={`flex items-center text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                                            {stat.trendUp ? (
                                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                            ) : (
                                                <ArrowDownRight className="h-3 w-3 mr-1" />
                                            )}
                                            {stat.trend}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                    {/* Monthly Bookings Chart */}
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
                                            fill="var(--color-primary)"
                                            radius={[8, 8, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
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
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;