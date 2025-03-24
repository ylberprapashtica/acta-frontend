import React from 'react';
import { BaseNavbar } from './BaseNavbar';

interface NavigationItem {
  name: string;
  href: string;
}

export const AdminNavbar: React.FC = () => {
  const easyNavigation: NavigationItem[] = [
    { name: 'Tenants', href: '/admin/tenants' },
    { name: 'Users', href: '/admin/users' },
  ];

  const hardNavigation: NavigationItem[] = [
    { name: 'Logout', href: '/logout' },
  ];

  return (
    <BaseNavbar
      title="Admin Panel"
      easyNavigation={easyNavigation}
      hardNavigation={hardNavigation}
      showBackButton={true}
    />
  );
}; 