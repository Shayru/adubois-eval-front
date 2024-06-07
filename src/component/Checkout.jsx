import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { orderId } = useParams(); // Fetch orderId from URL params

    const [shippingAddress, setShippingAddress] = useState('');
    const [invoiceAddress, setInvoiceAddress] = useState('');

    const handleChangeShippingAddress = (e) => {
        setShippingAddress(e.target.value);
    };

    const handleChangeInvoiceAddress = (e) => {
        setInvoiceAddress(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call backend route to update shipping and invoice information
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}/shipping`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
                body: JSON.stringify({ shippingAddress, invoiceAddress})
            });

            if (!response.ok) {
                throw new Error('Failed to update shipping information');
            }

            // Redirect to payment page after successful submission
            navigate(`/payment/${orderId}`);
        } catch (error) {
            console.error('Error updating shipping information:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="shippingAddress" className="block mb-1">Shipping Address:</label>
                    <textarea id="shippingAddress" className="w-full p-2 rounded border" value={shippingAddress} onChange={handleChangeShippingAddress}></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="invoiceAddress" className="block mb-1">Invoice Address:</label>
                    <textarea id="invoiceAddress" className="w-full p-2 rounded border" value={invoiceAddress} onChange={handleChangeInvoiceAddress}></textarea>
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">Proceed to Payment</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
