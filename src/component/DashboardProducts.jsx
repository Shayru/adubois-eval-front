import React, {useEffect, useState} from 'react';

const DashboardProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        fetchProducts();
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
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            // Remove the deleted product from the products state
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Products</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {currentProducts.map((product) => (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-solid border-black"
                         style={{borderColor: `#${product.color}`}}>
                        <img className="w-full h-40 object-cover" src={product.image} alt={product.name}/>
                        <div className="p-4">
                            <h2 className="text-gray-900 font-semibold text-lg">{product.name}</h2>
                            <p className="text-gray-700 mt-1">Price: ${product.price}</p>
                            <button onClick={() => deleteProduct(product.id)}
                                    className="mt-2 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-red-900">Delete
                                Product
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center mb-8">
            <ul className="flex">
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
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
    );
};

export default DashboardProducts;