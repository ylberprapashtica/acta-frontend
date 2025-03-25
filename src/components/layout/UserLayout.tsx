import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserNavbar } from './UserNavbar';

export function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      <main className="mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-6 pb-20 md:pb-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 