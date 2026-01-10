import { Link } from "react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { isAuthenticated } = useSelector((s) => s.authState);

    return (
        <nav>
            <Link to="/">Logo</Link>

            <div>
                {!isAuthenticated ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <Link to="/account">
                        <img src="/profile.png" alt="profile" />
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
