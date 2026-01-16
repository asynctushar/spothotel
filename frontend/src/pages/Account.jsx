import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { User, Settings, LayoutDashboard, Calendar, LogOut, ChevronRight, Mail, Shield } from 'lucide-react';
import { logout } from '../redux/actions/auth.action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { bookingApi, useOwnBookingsQuery } from '@/redux/api/booking.api';
import { setError } from '@/redux/slices/app.slice';
import { Skeleton } from '@/components/ui/skeleton';
import { Fragment, useEffect } from 'react';
import { baseApi } from '@/redux/api/baseApi';
import Meta from '@/components/shared/Meta';

const Account = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authState);
    const { data, isLoading, isError, error } = useOwnBookingsQuery();

    useEffect(() => {
        if (isError && error) {
            dispatch(setError(error.data.message));
        }
    }, [isError, error, dispatch]);

    const logoutHandler = async () => {
        const res = await dispatch(logout());

        if (res.type === "auth/logout/fulfilled") {
            dispatch(bookingApi.util.invalidateTags([{ type: "Booking", id: "SELF_LIST" }]));

        }
    };

    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'U';
    };

    const menuItems = [
        {
            icon: Settings,
            label: 'Account Settings',
            description: 'Manage your profile and preferences',
            path: '/account/settings',
            enabled: true
        },
        {
            icon: Calendar,
            label: 'Your Bookings',
            description: 'View and manage your reservations',
            path: '/account/bookings',
            enabled: true
        },
        {
            icon: LayoutDashboard,
            label: 'Admin Panel',
            description: 'Access administrative dashboard',
            path: '/admin/dashboard',
            enabled: user?.role === 'admin'
        }
    ];

    return (
        <Fragment>
            <Meta
                title="My Account"
                description="Manage your SpotHotel account, view personal information, and access your bookings all in one place."
                keywords="user account, profile, SpotHotel account"
            />
            <div className="container min-h-[calc(100vh-72px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="text-center space-y-4">
                            <div className="flex justify-center">
                                <Avatar className="w-24 h-24">
                                    <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                                        {getInitials(user?.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold capitalize">{user?.name}</h2>
                                <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    <p className="text-sm">{user?.email}</p>
                                </div>
                                {user?.role === 'admin' && (
                                    <div className="flex items-center justify-center gap-1 mt-3">
                                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                                            <Shield className="w-3 h-3" />
                                            <span>Administrator</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardHeader>

                        <Separator />

                        <CardContent className="p-0">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.enabled ? item.path : '#'}
                                    className={`flex items-center justify-between px-6 py-4 transition-colors border-b last:border-b-0 ${item.enabled
                                        ? 'hover:bg-accent cursor-pointer'
                                        : 'opacity-75 cursor-not-allowed pointer-events-none'
                                        }`}
                                    onClick={(e) => !item.enabled && e.preventDefault()}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${item.enabled ? 'bg-primary/10' : 'bg-muted'
                                            }`}>
                                            <item.icon className={`w-5 h-5 ${item.enabled ? 'text-primary' : 'text-muted-foreground'
                                                }`} />
                                        </div>
                                        <div>
                                            <p className={`font-medium ${item.enabled ? '' : 'text-muted-foreground'
                                                }`}>{item.label}</p>
                                            <p className="text-xs text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-5 h-5 ${item.enabled ? 'text-muted-foreground' : 'text-muted-foreground/50'
                                        }`} />
                                </Link>
                            ))}
                        </CardContent>

                        <Separator />

                        <CardContent className="pt-6">
                            <Button
                                onClick={logoutHandler}
                                variant="destructive"
                                className="w-full cursor-pointer"
                                size="lg"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Log Out
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Account Details Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-semibold">Account Details</h3>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Role</span>
                                        </div>
                                        <span className="text-sm font-semibold capitalize">{user?.role || 'User'}</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Bookings</span>
                                        </div>

                                        {isLoading ? (
                                            <Skeleton className="h-4 w-8 rounded-md" />
                                        ) : (
                                            <span className="text-sm font-semibold">
                                                {data?.bookings?.length ?? 0}
                                            </span>
                                        )}
                                    </div>

                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold">Need Help?</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Have questions or need assistance? Our support team is here to help.
                                    </p>
                                    <Button variant="outline" size="sm" className="w-full mt-2 cursor-pointer">
                                        Contact Support
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Account;;