// import { SiApostrophe } from "react-icons/si";

import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    console.log(user);

    const navItem = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-transparent">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <Link to="/" className="text-2xl font-extrabold">
                        Contest Hub
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal px-1">{navItem}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <img className="rounded-full w-11 border-2 border-[#33362F]" src={user?.photoURL} alt="Profile" />
                    ) : (
                        <Link
                            to="/login"
                            className="btn bg-[#33362F] text-white rounded-2xl hover:bg-black"
                        >
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;