import { Link } from "react-router-dom";

const HeaderUser = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white w-full top-0 fixed">
            <div className="flex items-center">
                <h1 className="text-xl font-bold">Shop</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:text-red-600">Accueil</Link></li>
                    <li><Link to="/products" className="hover:text-pink-600">Products</Link></li>
                    <li><Link to="/orders" className="hover:text-pink-600">Orders</Link></li>
                    <li><Link to="/deconnexion" className="hover:text-blue-700">Deconnexion</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderUser;
