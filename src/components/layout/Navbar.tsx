import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
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

            {/* Desktop Logout Button */}
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar with Hamburger Menu */}
      <div className="md:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo/Home Link */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <h1 className="text-lg font-bold text-gray-800">
                  ACTA
                </h1>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
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