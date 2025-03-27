import { Link } from 'react-router-dom';
import { TenantBanner } from '../components/TenantBanner';

export default function Home() {
  return (
    <div>
      <TenantBanner />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Acta - Invoice Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your invoice management process with our comprehensive solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Companies</h2>
            <p className="text-gray-600 mb-4">
              Manage your business partners and clients efficiently
            </p>
            <Link
              to="/companies"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Companies →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Articles</h2>
            <p className="text-gray-600 mb-4">
              Keep track of your products and services catalog
            </p>
            <Link
              to="/articles"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Articles →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Invoices</h2>
            <p className="text-gray-600 mb-4">
              Create and manage your invoices with ease
            </p>
            <Link
              to="/invoices"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Invoices →
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Choose Acta?
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Simple and intuitive interface for managing all your business documents
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Secure and reliable platform for your business data
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Comprehensive reporting and analytics
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Multi-tenant support for managing multiple businesses
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 