import { Link, useLocation } from 'react-router';
import { Hotel, LayoutDashboard, Calendar, Users, Building2, Bed, Plus, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Sidebar = ({ onLinkClick }) => {
    const location = useLocation();
    const [hotelsExpanded, setHotelsExpanded] = useState(true);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/bookings', icon: Calendar, label: 'All Bookings' },
        { path: '/admin/users', icon: Users, label: 'All Users' },
    ];

    const hotelItems = [
        { path: '/admin/hotels', icon: Building2, label: 'All Hotels' },
        { path: '/admin/hotels/create', icon: Plus, label: 'Create Hotel', isChild: true },
    ];

    return (
        <div className="h-full flex flex-col bg-card border-r">
            {/* Logo */}
            <div className="p-6 border-b">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
                    <Hotel className="w-7 h-7" />
                    <span>Spothotel</span>
                </Link>
                <p className="text-xs text-muted-foreground mt-1 ml-9">Admin Panel</p>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            variant={isActive(item.path) ? 'default' : 'ghost'}
                            className="w-full justify-start gap-3"
                            asChild
                        >
                            <Link to={item.path} onClick={onLinkClick}>
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        </Button>
                    ))}

                    <Separator className="my-3" />

                    {/* Hotels Section */}
                    <div>
                        <button
                            onClick={() => setHotelsExpanded(!hotelsExpanded)}
                            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <span>HOTELS</span>
                            <ChevronDown className={cn('w-4 h-4 transition-transform', hotelsExpanded && 'rotate-180')} />
                        </button>
                        {hotelsExpanded && (
                            <div className="space-y-1 mt-1">
                                {hotelItems.map((item) => (
                                    <Button
                                        key={item.path}
                                        variant={isActive(item.path) ? 'default' : 'ghost'}
                                        className={cn('w-full justify-start gap-3', item.isChild && 'pl-9')}
                                        asChild
                                    >
                                        <Link to={item.path} onClick={onLinkClick}>
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Switch to Client Mode CTA */}
            <div className="p-4 border-t">
                <Button variant="outline" className="w-full justify-start gap-2" asChild>
                    <Link to="/" onClick={onLinkClick}>
                        <ExternalLink className="w-4 h-4" />
                        <span>Switch to Client Mode</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;