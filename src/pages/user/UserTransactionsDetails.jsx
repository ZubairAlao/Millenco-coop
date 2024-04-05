import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { getProfileData } from '../../services/firebase';
import { useQuery } from '@tanstack/react-query';
import PrivateRoute from '../../components/PrivateRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function UserTransactionsDetails() {
  let { index } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData', index],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      const profileData = await getProfileData(userId);
      const filteredData = profileData.paymentHistory[index];
      return {filteredData, profileData};
    }
  });

  console.log(data);
  console.log(index);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900  dark:border-gray-100"></div>
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className=''>
      <PrivateRoute />
      <Link to='/user-dashboard/user-transactions'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className='sm:mx-auto sm:w-full max-w-screen-sm p-8 text-sm bg-[#C8E6C9] dark:bg-[#37474F] text-[#333333] dark:text-[#cccccc]'>
        <h3 className='font-semibold py-2'>Transaction Details</h3>
        <p>Millenco Coop</p>
        <p>No 13, Lagos Street,Ikeja, Lagos State</p>
        <p>Receipt ID {parseInt(index) + 1}</p>
        <p><strong>Payment Type:</strong> {data.filteredData.paymentType}</p>
        <p><strong>User Name:</strong> {data.filteredData.userName}</p>
        <p><strong>Email:</strong> {data.filteredData.email}</p>
        <p><strong>Payment Date:</strong> {new Date(data.filteredData.paymentDate).toLocaleDateString()} {new Date(data.filteredData.paymentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
        <p><strong>Payment Amount:</strong> {data.filteredData.paymentAmount}</p>
        <p><strong>New Account Balance:</strong> {data.filteredData.newAccountBalance}</p>
      </div>
    </div>
  );
}
