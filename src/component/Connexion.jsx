import React, {useContext, useState} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "./AuthContext.jsx";

const Connexion = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            });
            const data = await response.json();
            console.log(response);
            if (response.ok) {
                const { access_token, role } = data;
                login(data.user, data.role);
                localStorage.setItem('user', access_token);
                localStorage.setItem('role', role);
                navigate('/dashboard');
            } else {
                setMessage(`Erreur : ${data.message}`);
            }
        } catch (error) {
            console.log(error);
            setMessage(`Erreur de réseau : ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4 text-center text-black">Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">
                            Email
                        </label>
                        <input
                            type="email"
                            id="username"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline pr-8"
                            placeholder="Enter your password"
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-2 top-6 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash/> : <FaEye/>}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                        <Link
                            to="/inscription"
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                        >
                            S'inscrire
                        </Link>
                    </div>
                </form>
                {message &&
                    <div
                        className={`mt-4 p-4 rounded bg-red-100 text-red-700`}>
                        {message}
                    </div>
                }
            </div>
        </div>
    );
};

export default Connexion;
