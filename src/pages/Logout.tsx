import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    navigate('/login');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Logging out...</h2>
        <p className="mt-2 text-gray-600">You will be redirected to the login page.</p>
      </div>
    </div>
  );
};

export default Logout; 