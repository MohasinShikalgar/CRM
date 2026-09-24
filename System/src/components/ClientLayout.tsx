import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';

export default function ClientLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <ParticleBackground />
      {!isAdmin && <Navbar />}
      <div className="relative z-10 min-h-screen">
        <Outlet />
      </div>
      {!isAdmin && <Footer />}
    </>
  );
}
