import React from 'react'
import { auth } from '../../services/firebase';
import { getProfileData } from '../../services/firebase';
import { useQuery } from '@tanstack/react-query'

export default function UserTransactions() {

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
    <div className='overflow-auto sm:mx-auto sm:w-full max-w-screen-xl px-8 text-sm'>
      <h3 className='font-semibold py-2'>Open History</h3>
      <ul>
        {data.paymentHistory.slice().reverse().map((transaction, index) => (
          <li key={index} className='flex py-4'>
            <div>Date: Date: {new Date(transaction.paymentDate).toLocaleDateString()}</div>
            <div className='ml-auto'>Amount: {transaction.paymentAmount}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
