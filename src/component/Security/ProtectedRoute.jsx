import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../AuthContext.jsx";

const ProtectedRoute = ({ children, redirectTo }) => {
    const { isAuthenticated } = useContext(AuthContext);
    console.log((localStorage.getItem('user')))
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;