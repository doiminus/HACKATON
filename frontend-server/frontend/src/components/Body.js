import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshAuth } from '../redux/userSlice';

const BodyContainer = ({ children, customClass }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshAuth());
        const intervalId = setInterval(() => {
            dispatch(refreshAuth());
        }, 600000);
        return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <div className={`bg-gradient-to-tl from-zagreb-light-blue from-zagreb-light-blue/70 min-h-screen px-6 pt-4 pb-10 ${customClass}`}>
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    );
};

export default BodyContainer;
