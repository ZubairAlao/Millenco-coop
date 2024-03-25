import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

export default function PrivateRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      const redirectPath = `/login?message=You must log in first.&redirectTo=${location.pathname}`;
      if (!user) {
        navigate(redirectPath);
      } 
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [location.pathname, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return null;
}
