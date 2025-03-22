import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo/Home Link */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <h1 className="text-lg font-bold text-gray-800">
                    ACTA
                  </h1>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden sm:flex sm:ml-6 sm:space-x-8">
                <Link to="/companies">
                  <span className={`text-sm font-medium py-1 px-1 border-b-2 ${
                    isActive('/companies')
                      ? 'text-blue-600 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent'
                  }`}>
                    Companies
                  </span>
                </Link>
                <Link to="/articles">
                  <span className={`text-sm font-medium py-1 px-1 border-b-2 ${
                    isActive('/articles')
                      ? 'text-blue-600 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent'
                  }`}>
                    Articles
                  </span>
                </Link>
                <Link to="/invoices">
                  <span className={`text-sm font-medium py-1 px-1 border-b-2 ${
                    isActive('/invoices')
                      ? 'text-blue-600 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent'
                  }`}>
                    Invoices
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
}; 