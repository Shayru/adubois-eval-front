import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/orders/user/current', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('user')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data.sort((a, b) => b.id - a.id)); // Sort by ID in descending order
            } catch (error) {
                console.error('Error fetching orders:', error);
                // Handle error, e.g., show an error message to the user
            }
        };

        fetchOrders();
    }, []);

    const incrementQuantity = async (orderId, productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
                body: JSON.stringify({ quantity: 1, increase: true })
            });
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
            const updatedOrder = await response.json();
            setOrders(orders.map(order => order.id === orderId ? updatedOrder : order));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const decrementQuantity = async (orderId, productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
                body: JSON.stringify({ quantity: 1, increase: false })
            });
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
            const updatedOrder = await response.json();
            setOrders(orders.map(order => order.id === orderId ? updatedOrder : order));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeFromCart = async (orderId, productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to remove product from cart');
            }
            const updatedOrder = await response.json();
            setOrders(orders.map(order => order.id === orderId ? updatedOrder : order));
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const handlePayment = (orderId) => {
        navigate(`/checkout/${orderId}`);
    };

    return (
        <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="mb-6">
                        <h3 className="text-xl font-bold mb-2">Order Date: {new Date(order.createdAt).toLocaleDateString()}</h3>
                        <p>Status: {order.status}</p>
                        <p>Shipping Address: {order.shippingAddress}</p>
                        <p>Total: ${order.total}</p>
                        <ul className="mb-4">
                            {order.products.map(product => (
                                <li key={product.id} className="mb-2 flex justify-between items-center">
                                    <div className="flex items-center">
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
                                        <div>
                                            <span className="text-gray-300">{product.product.title}</span>
                                            <div className="text-gray-400">Qty: {product.quantity}</div>
                                            <div className="text-gray-400">Price: ${(product.product.price * product.quantity).toFixed(2)}</div>
                                        </div>
                                    </div>
                                    {order.status === 'created' && (
                                        <div className="flex items-center">
                                            <button onClick={() => decrementQuantity(order.id, product.id)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">-
                                            </button>
                                            <span
                                                className="mx-2 bg-gray-200 text-gray-900 px-2 py-1 rounded">{product.quantity}</span>
                                            <button onClick={() => incrementQuantity(order.id, product.id)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">+
                                            </button>
                                            <button onClick={() => removeFromCart(order.id, product.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Remove
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {order.status === 'created' && (
                            <button
                                onClick={() => handlePayment(order.id)}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;