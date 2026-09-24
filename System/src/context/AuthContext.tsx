import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_USER_KEY = 'ipplay_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(ADMIN_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to parse saved user:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check credentials (supports env override or standard default)
    const validUser = (import.meta.env.VITE_ADMIN_USERNAME || 'admin').trim();
    const validPass = (import.meta.env.VITE_ADMIN_PASSWORD || 'ipplay@admin2024').trim();

    if (username.trim() === validUser && password === validPass) {
      const authUser: User = {
        id: 'admin-user',
        name: 'IPPlay Admin',
        email: 'admin@ipplay.com',
        role: 'admin',
      };
      setUser(authUser);
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(authUser));
      return { success: true };
    }

    return { success: false, error: 'Invalid admin credentials. Please check username and password.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(ADMIN_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
