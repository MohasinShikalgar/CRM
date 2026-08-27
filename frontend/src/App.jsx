import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Module pages
import Dashboard from './pages/Dashboard';
import SalesDashboard from './pages/SalesDashboard';
import SupportDashboard from './pages/SupportDashboard';
import Leads from './pages/leads/Leads';
import Customers from './pages/customers/Customers';
import Deals from './pages/deals/Deals';
import Tasks from './pages/tasks/Tasks';
import Interactions from './pages/interactions/Interactions';
import Reports from './pages/reports/Reports';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              
              {/* Common Fallback */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              
              {/* Admin Routes */}
              <Route path="dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><Dashboard /></ProtectedRoute>} />
              <Route path="tasks" element={<ProtectedRoute allowedRoles={['ADMIN']}><Tasks /></ProtectedRoute>} />
              <Route path="reports" element={<ProtectedRoute allowedRoles={['ADMIN', 'SALES', 'SUPPORT']}><Reports /></ProtectedRoute>} />

              {/* Sales + Admin Routes */}
              <Route path="sales" element={<ProtectedRoute allowedRoles={['ADMIN', 'SALES']}><SalesDashboard /></ProtectedRoute>} />
              <Route path="leads" element={<ProtectedRoute allowedRoles={['ADMIN', 'SALES']}><Leads /></ProtectedRoute>} />
              <Route path="customers" element={<ProtectedRoute allowedRoles={['ADMIN', 'SALES']}><Customers /></ProtectedRoute>} />
              <Route path="deals" element={<ProtectedRoute allowedRoles={['ADMIN', 'SALES']}><Deals /></ProtectedRoute>} />

              {/* Support + Admin Routes */}
              <Route path="support" element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPPORT']}><SupportDashboard /></ProtectedRoute>} />
              <Route path="interactions" element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPPORT']}><Interactions /></ProtectedRoute>} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
