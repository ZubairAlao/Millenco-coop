import React, { useState } from 'react'
import { auth } from '../../services/firebase';
import { getProfileData } from '../../services/firebase';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

export default function UserTransactions() {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      return await getProfileData(userId);
    }
  })

  const [tab, setTab] = useState('payment');

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
      <h3 className='font-semibold py-2 text-center'>Transaction History</h3>
      <div className='flex justify-center gap-2'>
        <button onClick={() => setTab('payment')} className={`border-double border-4 px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-40 ${tab === "payment" ? "bg-[#388E3C] dark:bg-[#ff6f00] text-[#E8F5E9]" : "bg-[#E8F5E9] dark:bg-[#1A1A1A]"}`}>Payment History</button>
        <button onClick={() => setTab('loan')} className={`border-double border-4 px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-40 ${tab === "loan" ? "bg-[#388E3C] dark:bg-[#ff6f00] text-[#E8F5E9]" : "bg-[#E8F5E9] dark:bg-[#1A1A1A]"}`}>Loan History</button>
      </div>

      {tab === 'payment' ?
        <ul>
          {data.paymentHistory ? (
            data.paymentHistory.length > 0 ? (
              data.paymentHistory.slice().reverse().map((transaction, index) => (
                <Link to={`payment/${data.paymentHistory.length - index - 1}`} key={index} className='flex gap-3 py-4'>
                  <p>Transaction Successful</p>
                  <p>{transaction.paymentType}</p>
                  <div>Date: {new Date(transaction.paymentDate).toLocaleDateString()} {new Date(transaction.paymentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
                  <div className='ml-auto'>Amount: {transaction.paymentAmount}</div>
                </Link>
              ))
            ) : (
              <p>No records</p>
            )
          ) : (
            <p>No records</p>
          )}
        </ul>
      : null}

      {tab === 'loan' ?
        <ul>
          {data.loanHistory ? (
            data.loanHistory.length > 0 ? (
              data.loanHistory.slice().reverse().map((transaction, index) => (
                <Link to={`loan/${data.loanHistory.length - index - 1}`} key={index} className='flex gap-3 py-4'>
                  <p>Transaction Successful</p>
                  <p>{transaction.paymentType}</p>
                  <div>Date: {new Date(transaction.loanDate).toLocaleDateString()} {new Date(transaction.loanDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
                  <div className='ml-auto'>Loan Amount: {transaction.loanValue}</div>
                </Link>
              ))
            ) : (
              <p>No records</p>
            )
          ) : (
            <p>No records</p>
          )}
        </ul>
      : null}


    </div>
  )
}
