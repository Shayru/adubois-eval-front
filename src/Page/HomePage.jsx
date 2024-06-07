import Header from "../component/Header/Header.jsx";
import Accueil from "../component/Dashboard/Accueil.jsx";
import Home from "../component/Dashboard/Home.jsx";
import HeaderUser from "../component/Header/HeaderUser.jsx";

const HomePage = () => {
    return (
        <>
            <HeaderUser/>
            <br/>
            <br/>
            <Home/>
        </>
    );
};

export default HomePage;