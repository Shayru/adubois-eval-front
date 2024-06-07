import fun from '../../assets/funnnnnny.png';
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white w-full top-0 fixed">
            <div className="flex items-center">
                {/*<img src={fun} alt="Logo" className="mr-4 w-14 h-14"/>  /!* Augmenter la taille du logo *!/*/}
                <h1 className="text-xl font-bold">Shop</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><Link to="/dashboard" className="hover:text-red-600">Accueil</Link></li>
                    <li><Link to="/dashboard/Products" className="hover:text-pink-600">Products</Link></li>
                    <li><Link to="/dashboard/Products/create" className="hover:text-pink-600">Create Product</Link></li>
                    <li><Link to="/deconnexion" className="hover:text-blue-700">Deconnexion</Link></li>
                </ ul>
            </nav>
        </header>
    );
};

export default HeaderAdmin;
