import React from 'react';
import { useParams } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { getProfileData } from '../../services/firebase';
import { useQuery } from '@tanstack/react-query';
import PrivateRoute from '../../components/PrivateRoute';

export default function UserTransactionsDetails() {
  let { paymentId } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData', paymentId],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      const profileData = await getProfileData(userId);
      const filteredData = profileData.paymentHistory.filter(profile => profile.paymentId === paymentId);
      return filteredData[0];
    }
  });

  console.log(data);
  console.log(paymentId);

  return (
    <div className='overflow-auto sm:mx-auto sm:w-full max-w-screen-xl px-8 text-sm'>
      <PrivateRoute />
      {data && data.length > 0 && (
        <div>
          {/* Render your transaction details here */}
          {data.map((transaction, index) => (
            <div key={index}>
          
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
