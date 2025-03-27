import React, { useState } from 'react';
import { BaseNavbar } from './BaseNavbar';
import { useTenant } from '../../contexts/TenantContext';
import { authService } from '../../services/auth.service';

interface NavigationItem {
  name: string;
  href: string;
}

export const UserNavbar: React.FC = () => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const { tenant } = useTenant();
  const currentUser = authService.getCurrentUser();

  console.log('UserNavbar - Current User:', currentUser);
  console.log('UserNavbar - Current Tenant:', tenant);

  const easyNavigation: NavigationItem[] = [
    { name: 'Companies', href: '/companies' },
    { name: 'Articles', href: '/articles' },
    { name: 'Invoices', href: '/invoices' },
  ];

  // Only show admin panel for admin and superadmin roles
  const hardNavigation: NavigationItem[] = currentUser?.user?.role === 'user' 
    ? [{ name: 'Logout', href: '/logout' }]
    : [
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

  // Show ACTA for superadmin, tenant name for others
  const title = currentUser?.user?.role === 'super_admin' ? 'ACTA' : tenant?.name || 'Loading...';
  console.log('UserNavbar - Title:', title);

  return (
    <BaseNavbar
      title={title}
      easyNavigation={easyNavigation}
      hardNavigation={hardNavigation}
      showBackButton={false}
    >
      {adminDropdown}
    </BaseNavbar>
  );
}; 