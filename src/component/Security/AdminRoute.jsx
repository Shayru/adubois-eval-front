import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../AuthContext.jsx";

const AdminRoute = ({ children, redirectTo }) => {
    const { isAdmin } = useContext(AuthContext);
    return isAdmin ? children : <Navigate to={redirectTo} />;
};

export default AdminRoute;