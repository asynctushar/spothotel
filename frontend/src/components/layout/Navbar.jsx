import { Link } from "react-router";
import { useSelector } from "react-redux";
import { Hotel, User } from "lucide-react";

const Navbar = ({ layout = "NORMAL" }) => {
    const { isAuthenticated } = useSelector((state) => state.authState);

    return (
        <nav className="border-b bg-background sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors"
                    >
                        <Hotel className="w-7 h-7" />
                        <span>Spothotel</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="flex items-center gap-6">
                        {layout === "AUTH" ? null : (
                            <>
                                {!isAuthenticated ? (
                                    <Link
                                        to="/login"
                                        className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
                                    >
                                        Login
                                    </Link>
                                ) : (
                                    <Link
                                        to="/account"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                            <User className="w-5 h-5 text-primary-foreground" />
                                        </div>
                                        <span className="font-medium hidden lg:inline">Account</span>
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;