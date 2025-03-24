import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block bg-white shadow-sm border-b border-gray-200">
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
              <div className="flex ml-5 sm:flex sm:ml-8 sm:space-x-10 items-center">
                <Link to="/companies">
                  <span className={`text-sm font-medium py-1 px-1 border-b-2 text-center ${
                    isActive('/companies')
                      ? 'text-blue-600 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent'
                  }`}>
                    Companies
                  </span>
                </Link>
                <Link to="/articles">
                  <span className={`text-sm font-medium py-1 px-1 border-b-2 text-center ${
                    isActive('/articles')
                      ? 'text-blue-600 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent'
                  }`}>
                    Articles
                  </span>
                </Link>
                <Link to="/invoices">
                  <span className={`text-sm font-medium py-1 px-1 border-b-2 text-center ${
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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <Link to="/companies" className="flex flex-col items-center">
            <span className={`text-sm font-medium ${
              isActive('/companies')
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}>
              Companies
            </span>
          </Link>
          <Link to="/articles" className="flex flex-col items-center">
            <span className={`text-sm font-medium ${
              isActive('/articles')
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}>
              Articles
            </span>
          </Link>
          <Link to="/invoices" className="flex flex-col items-center">
            <span className={`text-sm font-medium ${
              isActive('/invoices')
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}>
              Invoices
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}; 