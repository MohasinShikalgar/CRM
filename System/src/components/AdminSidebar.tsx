import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, Mail, Image, LogOut, ArrowLeft } from 'lucide-react';

const adminLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Products CRUD', path: '/admin/products', icon: ShoppingBag },
  { name: 'Enquiries Info', path: '/admin/enquiries', icon: Mail },
  { name: 'Gallery CRUD', path: '/admin/gallery', icon: Image },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const pathname = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-brand-darkGray/60 backdrop-blur-md border-r border-brand-light/10 flex flex-col justify-between h-screen sticky top-0 py-6 px-4 shrink-0 relative z-30">
      <div className="space-y-8">
        {/* Header Branding */}
        <div className="px-3">
          <Link to="/" className="inline-flex items-center space-x-1 hover:opacity-85 transition-opacity">
            <span className="text-xl font-heading font-black tracking-wider text-brand-light">
              IP<span className="text-brand-cyan">PLAY</span>
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-brand-muted bg-brand-light/5 border border-brand-light/10 px-1.5 py-0.5 rounded ml-1">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-blue text-white border-l-2 border-brand-cyan shadow-neon'
                    : 'text-brand-muted hover:text-brand-light hover:bg-brand-light/5'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="space-y-2 border-t border-brand-light/10 pt-4">
        {/* Back to public site */}
        <Link
          to="/"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-brand-muted hover:text-brand-light transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>Public Website</span>
        </Link>

        {/* Logout Trigger */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 border border-transparent hover:border-red-500/20 cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </aside>
  );
}
