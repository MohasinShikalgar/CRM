import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) return <Loader />;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (allowedRoles && user && user.role) {
        if (!allowedRoles.includes(user.role)) {
            toast.error("Access Denied: You don't have permission to view this page.");
            // Determine fallback based on role
            if (user.role === 'SALES') return <Navigate to="/sales" replace />;
            if (user.role === 'SUPPORT') return <Navigate to="/support" replace />;
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
}
