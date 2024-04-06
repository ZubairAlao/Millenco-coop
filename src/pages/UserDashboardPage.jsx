import React from 'react'
import { getProfileData } from "../services/firebase";
import { auth } from '../services/firebase';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

export default function UserDashboardPage() {

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
  console.log(data);

  const currentDate = new Date();
  const currentTimeMs = currentDate.getTime();
  const registrationTimeMs = data.dateRegistered && new Date(data.dateRegistered.seconds * 1000)

  // Calculate time difference in milliseconds
  const timeDifferenceMs = currentTimeMs - registrationTimeMs;
  // Convert to days (approximate)
  const daysUsed = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
  // Convert to months (approximate, assuming 30 days per month)
  const monthsUsed = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24 * 30));
  // Convert to years (approximate, doesn't consider leap years)
  const yearsUsed = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24 * 365));

  // const AllHistory = [...data.paymentHistory, ...data.loanHistory, ...data.loanRepayHistory];

  // AllHistory && AllHistory.sort((a, b) => a.time - b.time);

  // console.log('AllHistory', AllHistory);

  return (
    <div className="sm:mx-auto sm:w-full max-w-screen-xl grid gap-4 px-8 text-sm">
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grid-rows-[100px_100px]">
        <p className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 m-auto w-full min-h-full rounded-md'><span className="font-bold block">Name:</span> {data.userName}</p>
        <p className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 m-auto w-full min-h-full rounded-md'><span className="font-bold block">Email:</span> {data.email}</p>
        <p className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 m-auto w-full min-h-full rounded-md'><span className="font-bold block">Date Registered:</span>{data.dateRegistered ? (
          <>
            {new Date(data.dateRegistered.seconds * 1000).toLocaleDateString()}
            <span className='block'>{daysUsed} day, {monthsUsed} months, {yearsUsed} years</span>
          </>
        ) : (
          <span className='block'>Date Loading...</span>
        )}</p>
        <p className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 m-auto w-full min-h-full rounded-md'><span className="font-bold block">Phone:</span> {data.phone}</p>
        <p className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 m-auto w-full min-h-full rounded-md'><span className="font-bold block">Referral Name:</span> {data.referralName}</p>
        <p className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 m-auto w-full min-h-full rounded-md'><span className="font-bold block">Address:</span> {data.address}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className='grid grid-cols-1 gap-3'>
          <p className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 m-auto w-full rounded-md'><span className="font-bold">Plan:</span> {data.plan}</p>
          <p className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 m-auto w-full rounded-md'><span className="font-bold">Balance:</span>₦ {data.accountBalance}</p>
          <p className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 m-auto w-full rounded-md'><span className="font-bold">Loan Payment:</span>₦ {data.loanPayment} {data.loanRepayPerMonth > 0 ? <span className="font-bold block">Per Month ₦ {data.loanRepayPerMonth}</span> : null}</p>
        </div>
        <div className="grid bg-[#C8E6C9] dark:bg-[#37474F] p-8 mx-auto w-full rounded-md">
          <h3 className='font-semibold text-xl'>Transactions</h3>
          <div className='overflow-auto max-h-[250px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {data.paymentHistory ? (
              data.paymentHistory.length > 0 ? (
                data.paymentHistory.slice().reverse().map((transaction, index) => (
                    <Link to={`user-transactions/payment/${data.paymentHistory.length - index - 1}`} key={index} className='flex gap-3 py-4'>
                      <div>Date: {new Date(transaction.paymentDate).toLocaleDateString()} {new Date(transaction.paymentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
                      <div>Type: {transaction.paymentType}</div>
                      <div className='ml-auto'>Amount: {transaction.paymentAmount}</div>
                    </Link>
                ))
              ) : (
                <p>No records</p>
              )
            ) : (
              <p>No records</p>
            )}
          </div>
        </div>
      </div>
     
    </div>
  )
}
