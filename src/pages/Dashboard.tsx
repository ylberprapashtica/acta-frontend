import React from 'react';
import { useTenant } from '../contexts/TenantContext';

export default function Dashboard() {
  const { tenant } = useTenant();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome to your Dashboard</h1>
            <p className="mt-2 text-gray-600">
              You are currently logged in as {tenant?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 