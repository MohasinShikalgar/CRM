import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-brand-dark">
      {/* Navigation sidebar */}
      <AdminSidebar />

      {/* Main scrolling dashboard panel */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto max-h-screen bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,102,255,0.04)_0%,rgba(10,10,15,0)_100%)]">
        <div className="max-w-6xl mx-auto space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
