import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('crm_token');
        const storedUser = localStorage.getItem('crm_user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const res = await authService.login(credentials);
        const { token: jwt, ...userData } = res.data;
        localStorage.setItem('crm_token', jwt);
        localStorage.setItem('crm_user', JSON.stringify(userData));
        setToken(jwt);
        setUser(userData);
        return userData;
    };

    const register = async (data) => {
        const res = await authService.register(data);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('crm_token');
        localStorage.removeItem('crm_user');
        setToken(null);
        setUser(null);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, loading, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
