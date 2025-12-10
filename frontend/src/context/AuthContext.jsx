import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = AuthService.getToken();
        const storedUser = localStorage.getItem('user_data');

        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch (error) {
                AuthService.logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (loginDto) => {
        try {
            const response = await AuthService.login(loginDto);

            AuthService.setToken(response.token);
            localStorage.setItem('user_data', JSON.stringify(response.user));

            setToken(response.token);
            setUser(response.user);
            setIsAuthenticated(true);

            return response;
        } catch (error) {
            setIsAuthenticated(false);
            setToken(null);
            setUser(null);
            throw error;
        }
    };

    const logout = () => {
        AuthService.logout();
        localStorage.removeItem('user_data');
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
    };

    const value = {
        isAuthenticated,
        token,
        user,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
