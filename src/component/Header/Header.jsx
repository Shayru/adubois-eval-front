import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white w-full top-0 fixed">
            <div className="flex items-center">
                <h1 className="text-xl font-bold">Shop</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><Link to="/home" className="hover:text-red-600">Accueil</Link></li>
                    <li><Link to="/connexion" className="hover:text-blue-700">Connexion</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
