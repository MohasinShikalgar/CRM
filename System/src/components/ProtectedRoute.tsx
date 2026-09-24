import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-brand-muted font-bold tracking-widest uppercase">Verifying session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
