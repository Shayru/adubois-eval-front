
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    isAdmin: false,
    login: () => {},
    logout: () => {}
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        try {
            const user = localStorage.getItem('user');
            const role = localStorage.getItem('role');
            console.log('AuthProvider useEffect:', { user, role });
            if (user && role) {
                setIsAuthenticated(true);
                setIsAdmin(role === 'admin');
            }
        } catch (error) {
            console.error('Error reading local storage:', error);
        }
    }, []);

    const login = (user, role) => {
        console.log('Logging in:', { user, role });
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
    };

    const logout = () => {
        console.log('Logging out');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
