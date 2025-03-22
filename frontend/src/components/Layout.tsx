import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                ACTA
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link to="/companies" className="hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium">
                Companies
              </Link>
              <Link to="/articles" className="hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium">
                Articles
              </Link>
              <Link to="/invoices" className="hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium">
                Invoices
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-secondary">
            © {new Date().getFullYear()} ACTA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}; 