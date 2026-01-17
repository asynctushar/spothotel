import { User, Menu } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

const AdminNavbar = ({ onMenuClick }) => {
    return (
        <nav className="border-b bg-background sticky top-0 z-40 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="lg:hidden cursor-pointer"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-lg lg:text-xl font-semibold text-foreground">Admin Panel</h1>
                    </div>

                    {/* User Profile */}
                    <Link
                        to="/account"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                    >
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                            <User className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-medium hidden sm:inline capitalize">Account</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;