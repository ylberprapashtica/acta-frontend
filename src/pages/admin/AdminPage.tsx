import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  link: string;
  status: 'active' | 'coming-soon';
}

export function AdminPage() {
  const features: FeatureCard[] = [
    {
      title: 'Tenant Management',
      description: 'Create, edit, and manage tenants. Control tenant access and settings.',
      icon: '🏢',
      link: '/admin/tenants',
      status: 'active',
    },
    {
      title: 'User Management',
      description: 'Manage users across all tenants. Assign roles and permissions.',
      icon: '👥',
      link: '/admin/users',
      status: 'active',
    },
    {
      title: 'System Settings',
      description: 'Configure global system settings and preferences.',
      icon: '⚙️',
      link: '/admin/settings',
      status: 'coming-soon',
    },
    {
      title: 'Audit Logs',
      description: 'View and analyze system activity and user actions.',
      icon: '📊',
      link: '/admin/audit-logs',
      status: 'coming-soon',
    },
    {
      title: 'API Management',
      description: 'Manage API keys, rate limits, and access policies.',
      icon: '🔑',
      link: '/admin/api',
      status: 'coming-soon',
    },
    {
      title: 'Backup & Restore',
      description: 'System backup and data restoration capabilities.',
      icon: '💾',
      link: '/admin/backup',
      status: 'coming-soon',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your system, users, and settings from one central location.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`bg-white rounded-lg shadow-md p-6 border ${
              feature.status === 'coming-soon'
                ? 'opacity-75 cursor-not-allowed'
                : 'hover:shadow-lg transition-shadow'
            }`}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{feature.icon}</span>
              <h2 className="text-xl font-semibold text-gray-900">{feature.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            {feature.status === 'active' ? (
              <Link
                to={feature.link}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Access
              </Link>
            ) : (
              <div className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50">
                Coming Soon
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Features</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <div>
                <h3 className="font-semibold">Tenant Management</h3>
                <p className="text-gray-600">
                  - Create and manage tenants
                  - Set tenant-specific settings
                  - Control tenant access and status
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <div>
                <h3 className="font-semibold">User Management</h3>
                <p className="text-gray-600">
                  - Create and manage users
                  - Assign roles (Admin, User)
                  - Control user access and permissions
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <div>
                <h3 className="font-semibold">Role-Based Access Control</h3>
                <p className="text-gray-600">
                  - Super Admin access to all features
                  - Admin access to tenant and user management
                  - User access to tenant-specific features
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Features</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              <div>
                <h3 className="font-semibold">System Settings</h3>
                <p className="text-gray-600">
                  - Global configuration options
                  - Email settings
                  - Security policies
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              <div>
                <h3 className="font-semibold">Audit Logs</h3>
                <p className="text-gray-600">
                  - Activity tracking
                  - User action history
                  - System events monitoring
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              <div>
                <h3 className="font-semibold">API Management</h3>
                <p className="text-gray-600">
                  - API key generation and management
                  - Rate limiting configuration
                  - Access control policies
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              <div>
                <h3 className="font-semibold">Backup & Restore</h3>
                <p className="text-gray-600">
                  - Automated system backups
                  - Data restoration capabilities
                  - Backup scheduling
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 