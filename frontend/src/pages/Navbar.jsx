import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="mx-auto max-w-7xl flex justify-between items-center">
                <div className="text-white text-lg font-semibold">
                    Paper Trading App
                </div>
                <div>
                    {
                        token ? (
                            <div className="flex items-center">
                                <h3 className="text-white mr-4">Hello, {localStorage.getItem('username')}</h3>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 mr-2"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
