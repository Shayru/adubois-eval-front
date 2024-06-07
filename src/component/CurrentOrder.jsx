import React from 'react';
import {useNavigate} from "react-router-dom";

const CurrentOrder = ({ order, setOrder }) => {
    const navigate = useNavigate();

    const removeFromCart = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${order.id}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to remove product from cart');
            }
            // Update order state to reflect changes
            setOrder({
                ...order,
                products: order.products.filter(product => product.id !== productId)
            });
        } catch (error) {
            console.error('Error removing product from cart:', error);
            // Handle error, e.g., show an error message to the user
        }
        }

    const handleCheckout = () => {
        navigate(`/checkout/${order.id}`);

        // Redirect to checkout page or handle checkout logic
    };

    const incrementQuantity = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${order.id}/products/${productId}`, {
                method: 'PUT', // Use PATCH method to update the quantity
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
                body: JSON.stringify({ quantity: 1, increase: true }) // Increment quantity
            });
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
            const updatedOrder = await response.json();
            // Update the order state with the updated product
            // const updatedOrder = {
            //     ...order,
            //     products: order.products.map(product =>
            //         product.id === updatedProduct.id ? updatedProduct : product
            //     )
            // };
            setOrder(updatedOrder);
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    const decrementQuantity = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${order.id}/products/${productId}`, {
                method: 'PUT', // Use PATCH method to update the quantity
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
                body: JSON.stringify({ quantity: 1, increase: false }) // Decrement quantity
            });
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
            const updatedOrder = await response.json();
            setOrder(updatedOrder);
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    if (!order) {
        return <p>Loading order...</p>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Order</h2>
            {order.products.length === 0 ? (
                <p className="text-gray-700">No items in your cart.</p>
            ) : (
                <ul>
                    {order.products.map(product => (
                        <li key={product.id} className="mb-4">
                            <img
                                className="w-16 h-16 object-cover mr-4"
                                src={product.product.image}
                                alt={product.product.title}
                                style={{
                                    borderColor: `${product.product.color}`,
                                    borderWidth: '2px',
                                    borderStyle: 'solid'
                                }}
                            />
                            <div className="flex justify-between items-center w-full">
                                <div>
                                    <span className="text-gray-900">{product.product.title}</span>
                                    <div className="mr-4">
                                        <span className="text-gray-700">Qty:</span>
                                        <span className="ml-2 text-gray-900">{product.quantity}</span>
                                    </div>
                                    <div className="mr-4">
                                        <span className="text-gray-700">Price:</span>
                                        <span
                                            className="ml-2 text-gray-900">${(product.product.price * product.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={() => decrementQuantity(product.id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">-
                                    </button>
                                    <span
                                        className="mx-2 bg-gray-200 text-gray-900 px-2 py-1 rounded">{product.quantity}</span>
                                    <button onClick={() => incrementQuantity(product.id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">+
                                    </button>
                                </div>
                                <button onClick={() => removeFromCart(product.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex justify-between mt-4">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-gray-900">{order.total}</span>
            </div>
            <button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
                Checkout
            </button>
        </div>
    );
};

export default CurrentOrder;
