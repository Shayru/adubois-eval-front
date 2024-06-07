import {useNavigate} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "./AuthContext.jsx";

const Deconnexion = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    logout();
    navigate('/accueil');
};

export default Deconnexion;
