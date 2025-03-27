import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Tenant } from '../../types/admin';
import { getUsers, deleteUser, getTenants } from '../../services/AdminService';
import { DataList } from '../common/DataList';

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, tenantsData] = await Promise.all([
        getUsers(),
        getTenants(),
      ]);
      setUsers(usersData);
      setTenants(tenantsData);
      setError(null);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
      setUsers([]);
      setTenants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await deleteUser(id);
      await loadData();
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  const columns = [
    { header: 'Email', accessor: 'email' as keyof User },
    { header: 'First Name', accessor: 'firstName' as keyof User },
    { header: 'Last Name', accessor: 'lastName' as keyof User },
    {
      header: 'Tenant',
      accessor: (user: User) => tenants.find(t => t.id === user.tenantId)?.name || 'N/A',
    },
    {
      header: 'Role',
      accessor: (user: User) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          user.role === 'super_admin' ? 'bg-purple-100 text-purple-800' :
          user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {user.role.replace('_', ' ')}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (user: User) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (user: User) => {
        window.location.href = `/admin/users/${user.id}/edit`;
      },
      variant: 'primary' as const,
    },
    {
      label: 'Delete',
      onClick: (user: User) => handleDelete(user.id),
      variant: 'danger' as const,
    },
  ];

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <Link
          to="/admin/users/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New User
        </Link>
      </div>

      <div className="md:bg-white md:shadow rounded-lg">
        {users.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600">No users found. Create your first user to get started.</p>
          </div>
        ) : (
          <DataList
            data={users}
            columns={columns}
            actions={actions}
          />
        )}
      </div>
    </div>
  );
}; 