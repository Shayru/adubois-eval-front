import React, {useEffect, useState} from 'react';
import CurrentOrder from "./CurrentOrder.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState({ products: [] });

    const productsPerPage = 12;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        fetchProducts();
        fetchOrder();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
            const defaultQuantities = {};
            data.forEach(product => {
                defaultQuantities[product.id] = 1;
            });
            setQuantities(defaultQuantities);
        } catch (error) {
            console.error('Error fetching products:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    const fetchOrder = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/orders/current', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch order');
            }
            const data = await response.json();
            setOrder(data);
        } catch (error) {
            console.error('Error fetching order:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    const addToCart = async (productId, quantity) => {
        try {
            const response = await fetch('http://localhost:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
                body: JSON.stringify({ product: productId, quantity })
            });
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            const updatedOrder = await response.json();
            setOrder(updatedOrder);
            // Optionally, you can handle success, e.g., show a success message
        } catch (error) {
            console.error('Error adding product to cart:', error);
            // Optionally, you can handle errors, e.g., show an error message to the user
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: quantity
        }));
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-3">
                <h1 className="text-3xl font-bold mb-4 text-center">Products</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden"
                             style={{borderColor: `${product.color}`, borderWidth: '2px', borderStyle: 'solid'}}>
                            <img className="w-full h-40 object-cover" src={product.image} alt={product.name}/>
                            <div className="p-4">
                                <h2 className="text-gray-900 font-semibold text-lg">{product.name}</h2>
                                <p className="text-gray-700 mt-1">Price: ${product.price}</p>
                                <div className="flex items-center mt-2">
                                    <label htmlFor={`quantity-${product.id}`} className="mr-2">Quantity:</label>
                                    <select
                                        id={`quantity-${product.id}`}
                                        className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
                                        value={quantities[product.id]}
                                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                    >
                                        {[...Array(10).keys()].map((quantity) => (
                                            <option key={quantity + 1} value={quantity + 1}>{quantity + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="p-4 flex justify-between">
                                <button onClick={() => addToCart(product.id, quantities[product.id])}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-center mb-8">
                    <ul className="flex">
                        {Array.from({length: Math.ceil(products.length / productsPerPage)}).map((_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={`bg-purple-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 ${currentPage === index + 1 ? 'bg-purple-900' : 'hover:bg-purple-900'}`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="md:col-span-1">
                <CurrentOrder order={order} setOrder={setOrder} />
            </div>
        </div>
    );
};

export default Products;