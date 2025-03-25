import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

interface NavigationItem {
  name: string;
  href: string;
}

interface BaseNavbarProps {
  title: string;
  easyNavigation: NavigationItem[];
  hardNavigation: NavigationItem[];
  showBackButton?: boolean;
  children?: React.ReactNode;
}

export const BaseNavbar: React.FC<BaseNavbarProps> = ({
  title,
  easyNavigation,
  hardNavigation,
  showBackButton = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo/Home Link */}
              <div className="flex-shrink-0 flex items-center">
                {showBackButton ? (
                  <Link to="/" className="text-gray-500 hover:text-gray-700 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                ) : (
                  <Link to="/">
                    <h1 className="text-lg font-bold text-gray-800">{title}</h1>
                  </Link>
                )}
              </div>

              {/* Easy Navigation Links */}
              <div className="flex ml-5 sm:flex sm:ml-8 sm:space-x-10 items-center">
                {easyNavigation.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <span className={`text-sm font-medium py-1 px-1 border-b-2 text-center ${
                      isActive(item.href)
                        ? 'text-blue-600 border-blue-500'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side content */}
            <div className="flex items-center space-x-4">
            {hardNavigation.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <span className={`text-sm font-medium py-1 px-1 border-b-2 text-center ${
                      isActive(item.href)
                        ? 'text-blue-600 border-blue-500'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar with Hamburger Menu */}
      <div className="md:hidden bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo/Home Link */}
            <div className="flex-shrink-0 flex items-center">
              {showBackButton ? (
                <Link to="/" className="text-gray-500 hover:text-gray-700 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              ) : (
                <Link to="/">
                  <h1 className="text-lg font-bold text-gray-800">{title}</h1>
                </Link>
              )}
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
              {/* Hard Navigation Items */}
              {hardNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
          {easyNavigation.map((item) => (
            <Link key={item.name} to={item.href} className="flex flex-col items-center">
              <span className={`text-sm font-medium ${
                isActive(item.href)
                  ? 'text-blue-600'
                  : 'text-gray-500'
              }`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}; 