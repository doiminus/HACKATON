import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 py-4 px-6 flex justify-between items-center bg-gradient-to-br from-zagreb-blue to-zagreb-light-blue shadow-md">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                    <i className="bi bi-trophy-fill text-zagreb-yellow"></i>
                    Sporterica
                </Link>
                <Link
                    to="/calendar"
                    className="text-base font-medium text-white hover:text-zagreb-yellow flex items-center gap-2"
                >
                    <i className="bi bi-calendar3"></i> Kalendar
                </Link>
            </div>

            <div className="flex space-x-6 items-center pr-6">
                {user ? (
                    <>
                        <span className="text-white text-sm">
                            <strong>{user.username}</strong>
                        </span>
                        <Link
                            to="/dashboard"
                            className="text-base font-medium text-white hover:text-zagreb-yellow flex items-center gap-2"
                        >
                            <i className="bi bi-house-door"></i> Pregled
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-base font-medium text-white hover:text-zagreb-yellow flex items-center gap-2"
                        >
                            <i className="bi bi-box-arrow-right"></i> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-base font-medium text-white hover:text-zagreb-yellow flex items-center gap-2">
                            <i className="bi bi-box-arrow-in-right"></i> Login
                        </Link>
                        <Link to="/register" className="text-base font-medium text-white hover:text-zagreb-yellow flex items-center gap-2">
                            <i className="bi bi-person-plus"></i> Registracija
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
