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
      const profileData = await getProfileData(userId);
      return profileData.paymentHistory[profileData.paymentHistory.length - 1];
    }
  })

  console.log(data);

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

  const paymentDateTime = new Date(data.paymentDate);
  const paymentDate = paymentDateTime.toLocaleDateString();
  const paymentTime = paymentDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="max-w-screen-sm h-full mx-auto pt-28 pb-12 px-8 my-auto">
      <PrivateRoute />
      <div className="bg-green-200 dark:bg-gray-800 p-8 rounded-md shadow-md">
        <h1 className="text-xl font-semibold text-center">Payment Transaction Successful</h1>
        <p className='text-center'><strong></strong> Millenco Cooperative Society</p>
        <p className="text-sm mb-4 text-center">No 13, Lagos Street, Ikeja, Lagos State</p>
        <div className="space-y-2">
          <p className="text-sm"><strong>Payment Type:</strong> {data.paymentType}</p>
          <p className="text-sm"><strong>Transaction Ref:</strong> {data.ref}</p>
          <p className="text-sm"><strong>User Name:</strong> {data.userName}</p>
          <p className="text-sm"><strong>Email:</strong> {data.email}</p>
          <p className="text-sm"><strong>Payment Date:</strong> {new Date(data.paymentDate).toLocaleString()}</p>
          <p className="text-sm"><strong>Payment Amount:</strong> ₦{data.paymentAmount && data.paymentAmount.toLocaleString()}</p>
          <p className="text-sm"><strong>New Account Balance:</strong> ₦{data.newAccountBalance && data.newAccountBalance.toLocaleString()}</p>
        </div>
        <Link to="/user-dashboard" className="block mt-6 text-sm text-blue-600 hover:underline">Go to Dashboard</Link>
      </div>
    </div>
  );
};


