import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Public Layout & Pages
import ClientLayout from './components/ClientLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Layout & Pages
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#12121A',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
            },
            success: {
              iconTheme: {
                primary: '#0066FF',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
        <Routes>
          {/* Public Routes with ClientLayout */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin Login (standalone) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected Routes with AdminLayout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
