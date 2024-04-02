import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { getProfileData } from '../services/firebase';
import { useQuery } from '@tanstack/react-query'
import PrivateRoute from '../components/PrivateRoute';

export const PaymentSuccessPage = () => {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      return await getProfileData(userId);
    }
  })

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900  dark:border-gray-100"></div>
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="max-w-screen-sm h-full mx-auto pt-28 pb-12 px-8 my-auto">
      <PrivateRoute />
      <div className='bg-[#388E3C] dark:bg-[#ff6f00] p-8'>
        <div>
          <h1 className="text-xl leading-snug font-semibold mb-2">Payment Successful</h1>
        </div>
        {/* {data.paymentHistory.map((transaction, index) => (
            <div>
              <div>Date: {new Date(transaction.paymentDate).toLocaleDateString()}</div>
            <div className='ml-auto'>Amount: {transaction.paymentAmount}</div>
            </div>
        ))} */}
        <Link to="/user-dashboard">Go to DashBoard</Link>
      </div>
    </div>
  );
};


