import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserNavbar } from './UserNavbar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-6 pb-20 md:pb-6">
        <Outlet />
      </div>
    </div>
  );
}; 