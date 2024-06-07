import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Inscription = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {cd
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        confirm: ''
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

        const { username, firstname, lastname, password } = formData;

        if (formData.password !== formData.confirm) {
            setMessage('Vos mots de passe ne sont pas égaux.');
            setIsError(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, firstname, lastname, password })

            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Inscription réussie !');
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
                <h1 className="text-xl font-bold mb-4 text-center text-black">Inscription</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">
                            Email
                        </label>
                        <input
                            type="email"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="firstname">
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastname">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.lastname}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline pr-8"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-2 top-6 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash/> : <FaEye/>}
                        </div>
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="confirm">
                            Confirmer le Mot de passe
                        </label>
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            id="confirm"
                            value={formData.confirm}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline pr-8"
                            placeholder="Confirm your password"
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-2 top-6 flex items-center cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {confirmPasswordVisible ? <FaEyeSlash/> : <FaEye/>}
                        </div>
                    </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                            >
                                Créer mon compte
                            </button>
                            <Link
                                to="/connexion"
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                            >
                                Déjà un compte ?
                            </Link>
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

export default Inscription;
