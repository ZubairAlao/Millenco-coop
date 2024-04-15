import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { getProfileData } from '../../services/firebase';
import { useQuery } from '@tanstack/react-query';
import PrivateRoute from '../../components/PrivateRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function UserTransactionsDetails() {
  const { type, referenceId } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData', referenceId],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      const profileData = await getProfileData(userId);
      return profileData;
    }
  });

  console.log("reference",referenceId);
  console.log("data",data);



  const isPayment = type === 'payment';
  const isLoan = type === 'loan';
  const isLoanRepay = type === 'loan-repay';

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
    <div className='px-8'>
      <PrivateRoute />
      <Link to='/user-dashboard/user-transactions' className="flex items-center text-[#388E3C] dark:text-[#ff6f00] hover:opacity-70 mb-2">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back
      </Link>
      <div className='sm:mx-auto sm:w-full max-w-screen-sm p-8 text-sm bg-[#C8E6C9] dark:bg-[#37474F] text-[#333333] dark:text-[#cccccc]'>
        {isPayment && 
          data && data.paymentHistory
            .filter(payment => payment.ref === referenceId)
            .map((transaction, index) => (
              <div key={index}>
                <h1 className="text-xl font-semibold text-center">Payment Transaction Details</h1>
                <p className='text-center'><strong></strong> Millenco Cooperative Society</p>
                <p className="text-sm mb-4 text-center">No 13, Lagos Street, Ikeja, Lagos State</p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Payment Type:</strong> {transaction.paymentType}</p>
                  <p className="text-sm"><strong>Transaction Ref:</strong> {transaction.ref}</p>
                  <p className="text-sm"><strong>User Name:</strong> {transaction.userName}</p>
                  <p className="text-sm"><strong>Email:</strong> {transaction.email}</p>
                  <p className="text-sm"><strong>Payment Date:</strong> {new Date(transaction.paymentDate).toLocaleString()}</p>
                  <p className="text-sm"><strong>Payment Amount:</strong> ₦{transaction.paymentAmount && transaction.paymentAmount.toLocaleString()}</p>
                  <p className="text-sm"><strong>New Account Balance:</strong> ₦{transaction.newAccountBalance && transaction.newAccountBalance.toLocaleString()}</p>
                </div>
              </div>
            ))
        }
        {isLoan && 
          data && data.loanHistory
          .filter(loan => loan.ref === referenceId)
          .map((transaction, index) => (
            <div key={index}>
              <h1 className="text-xl font-semibold text-center">Loan Request Details</h1>
              <p className='text-center'><strong></strong> Millenco Cooperative Society</p>
              <p className="text-sm mb-4 text-center">No 13, Lagos Street, Ikeja, Lagos State</p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Payment Type:</strong> {transaction.paymentType}</p>
                <p className="text-sm"><strong>Transaction Ref:</strong> {transaction.ref}</p>
                <p className="text-sm"><strong>User Name:</strong> {transaction.userName}</p>
                <p className="text-sm"><strong>Email:</strong> {transaction.email}</p>
                <p className="text-sm"><strong>Payment Date:</strong> {new Date(transaction.paymentDate).toLocaleString()}</p>
                <p className="text-sm"><strong>Loan Repay per Month:</strong> ₦{transaction.loanRepayPerMonth && transaction.loanRepayPerMonth.toLocaleString()}</p>
                <p className="text-sm"><strong>Loan Request Granted:</strong> ₦{transaction.loanValuePlusInterest && transaction.loanValuePlusInterest.toLocaleString()}</p>
              </div>
            </div>
          ))
        }

        {isLoanRepay && 
          data && data.loanRepayHistory
          .filter(loanRepay => loanRepay.ref === referenceId)
          .map((transaction, index) => (
            <div key={index}>
              <h1 className="text-xl font-semibold text-center">Loan Payment Details</h1>
              <p className='text-center'><strong></strong> Millenco Cooperative Society</p>
              <p className="text-sm mb-4 text-center">No 13, Lagos Street, Ikeja, Lagos State</p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Payment Type:</strong> {transaction.paymentType}</p>
                <p className="text-sm"><strong>Transaction Ref:</strong> {transaction.ref}</p>
                <p className="text-sm"><strong>User Name:</strong> {transaction.userName}</p>
                <p className="text-sm"><strong>Email:</strong> {transaction.email}</p>
                <p className="text-sm"><strong>Payment Date:</strong> {new Date(transaction.paymentDate).toLocaleString()}</p>
                <p className="text-sm"><strong>Payment Amount:</strong> ₦{transaction.loanRepayPerMonth && transaction.loanRepayPerMonth.toLocaleString()}</p>
                <p className="text-sm">
                  <strong>New Loan Balance:</strong> {transaction.newLoanBalance === 0 ? "Loan Cleared" : `₦${transaction.newLoanBalance && transaction.newLoanBalance.toLocaleString()}`}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
