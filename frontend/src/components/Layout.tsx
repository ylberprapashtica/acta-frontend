import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
            
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6 stroke-current`}
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
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6 stroke-current`}
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

            {/* Desktop navigation */}
            <nav className="hidden sm:flex space-x-4">
              <Link 
                to="/companies" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive('/companies') ? 'bg-primary-dark text-white' : 'hover:text-primary-light'
                }`}
              >
                Companies
              </Link>
              <Link 
                to="/articles" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive('/articles') ? 'bg-primary-dark text-white' : 'hover:text-primary-light'
                }`}
              >
                Articles
              </Link>
              <Link 
                to="/invoices" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive('/invoices') ? 'bg-primary-dark text-white' : 'hover:text-primary-light'
                }`}
              >
                Invoices
              </Link>
            </nav>
          </div>

          {/* Mobile menu */}
          <div
            className={`${
              isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            } sm:hidden absolute top-16 left-0 right-0 bg-primary shadow-lg transform transition-all duration-300 ease-in-out z-50`}
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/companies"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                  isActive('/companies')
                    ? 'bg-primary-dark text-white'
                    : 'text-white hover:bg-primary-dark hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>
              <Link
                to="/articles"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                  isActive('/articles')
                    ? 'bg-primary-dark text-white'
                    : 'text-white hover:bg-primary-dark hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                to="/invoices"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                  isActive('/invoices')
                    ? 'bg-primary-dark text-white'
                    : 'text-white hover:bg-primary-dark hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Invoices
              </Link>
            </div>
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