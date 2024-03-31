import React from 'react'

export default function UserTransactions({historyData}) {
  return (
    <div className='overflow-auto max-h-[200px]'>
      <h3 className='font-semibold py-2'>Open History</h3>
      <ul>
        {historyData.slice().reverse().map((transaction, index) => (
          <li key={index} className='flex py-4'>
            <div>Date: Date: {new Date(transaction.paymentDate).toLocaleDateString()}</div>
            <div className='ml-auto'>Amount: {transaction.paymentAmount}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
