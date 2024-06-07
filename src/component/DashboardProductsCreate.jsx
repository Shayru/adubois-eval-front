import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardProductsCreate = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '0.00',
        description: '',
        image: '',
        color: '#000000'
    });


    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.price = parseFloat(formData.price);

        try {
            const response = await fetch('http://localhost:8000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user')}`
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Produit créé !');
                setIsError(false);
            } else {
                setMessage(`Erreur : ${data.message}`);
                setIsError(true);
            }
        } catch (error) {
            setMessage(`Erreur de réseau : ${error.message}`);
            setIsError(true);
        }
    };


    useEffect(() => {
        // Bloque le scroll en ajoutant une classe au bod
        document.body.classList.add('overflow-hidden');

        // Enlève la classe au démontage du composant
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center mt-10">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4 text-center text-black">Création de produit</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="title">
                            Titre
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter the product title"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="price"
                            id="price"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter the product price"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="description">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter the product description"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="image">
                            Image
                        </label>
                        <input
                            type="text"
                            id="image"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter the product image url"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="color">
                            Color
                        </label>
                        <input
                            type="color"
                            id="color"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.color}
                            onChange={handleChange}
                            placeholder="Choose product color"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                        >
                            Créer Produit
                        </button>
                    </div>
                </form>
                {message &&
                    <div
                        className={`mt-4 p-4 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                }
            </div>
        </div>
    );
};

export default DashboardProductsCreate;
