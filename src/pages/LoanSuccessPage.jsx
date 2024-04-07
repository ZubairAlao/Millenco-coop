import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { getProfileData } from '../services/firebase';
import { useQuery } from '@tanstack/react-query'
import PrivateRoute from '../components/PrivateRoute';

export const LoanSuccessPage = () => {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      const profileData = await getProfileData(userId);
      return profileData.loanHistory[profileData.loanHistory.length - 1];
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
      <div className='bg-[#C8E6C9] dark:bg-[#37474F] p-8'>
        <div>
          <h1 className="text-xl leading-snug font-semibold mb-2">Loan Successful</h1>
        </div>
        <div className='sm:mx-auto sm:w-full max-w-screen-sm p-8 text-sm  text-[#333333] dark:text-[#cccccc]'>
          <p>Millenco Coop</p>
          <p>No 13, Lagos Street,Ikeja, Lagos State</p>
          <p><strong>Payment Type:</strong> {data.paymentType}</p>
          <p><strong>Transaction Ref:</strong> {data.ref}</p>
          <p><strong>User Name:</strong> {data.userName}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Loan Date:</strong> {new Date(data.paymentDate).toLocaleDateString()} [{paymentTime}]</p>
          <p><strong>Loan Repay per Month:</strong> {data.loanRepayPerMonth}</p>
          <p><strong>Loan Request Granted:</strong> {data.loanValue}</p>
      </div>

        <Link to="/user-dashboard">Go to DashBoard</Link>
      </div>
    </div>
  );
};


