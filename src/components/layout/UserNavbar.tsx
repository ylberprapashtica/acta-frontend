import React, { useState } from 'react';
import { BaseNavbar } from './BaseNavbar';

interface NavigationItem {
  name: string;
  href: string;
}

export const UserNavbar: React.FC = () => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  const easyNavigation: NavigationItem[] = [
    { name: 'Companies', href: '/companies' },
    { name: 'Articles', href: '/articles' },
    { name: 'Invoices', href: '/invoices' },
  ];

  const hardNavigation: NavigationItem[] = [
    { name: 'Admin Panel', href: '/admin' },
    { name: 'Logout', href: '/logout' },
  ];

  const adminDropdown = (
    <div className="relative">
      <button
        onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
        className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center"
      >
      </button>
      {isAdminDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {hardNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsAdminDropdownOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <BaseNavbar
      title="ACTA"
      easyNavigation={easyNavigation}
      hardNavigation={hardNavigation}
      showBackButton={false}
    >
      {adminDropdown}
    </BaseNavbar>
  );
}; 