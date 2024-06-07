import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('user')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleConfirmPayment = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}/pay`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to confirm payment');
            }

            navigate(`/home/`);
        } catch (error) {
            console.error('Error confirming payment:', error);
        }
    };

    const handleCancel = () => {
        // Redirect the user to the products route
        navigate('/products');
    };

    if (!order) {
        return <p>Loading order details...</p>;
    }

    return (
        <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
            <div className="mb-4">
                <p>Order ID: {orderId}</p>
                <p>Total Amount: ${order.total}</p>
            </div>
            <div className="flex justify-between">
                <div className="-ml-2">
                    <button onClick={handleCancel}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel
                    </button>
                </div>
                <button onClick={handleConfirmPayment}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Confirm
                    Payment
                </button>

            </div>
        </div>
    );
};

export default Payment;
