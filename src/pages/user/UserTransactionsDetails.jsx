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
      // const filteredPaymentData = profileData. paymentHistory[id];
      // const filteredLoanData = profileData.loanHistory[id];
      // const filteredRepayLoanData = profileData.loanRepayHistory[id];
      // return {filteredPaymentData, filteredLoanData, filteredRepayLoanData, profileData};
        const filteredPaymentData = profileData.paymentHistory.filter(payment => payment.ref === referenceId);
        const filteredLoanData = profileData.loanHistory.filter(loan => loan.ref === referenceId);
        const filteredRepayLoanData = profileData.loanRepayHistory.filter(repay => repay.ref === referenceId);
        return { filteredPaymentData, filteredLoanData, filteredRepayLoanData, profileData };
    }
  });

  console.log(data);
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
    <div className=''>
      <PrivateRoute />
      <Link to='/user-dashboard/user-transactions'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className='sm:mx-auto sm:w-full max-w-screen-sm p-8 text-sm bg-[#C8E6C9] dark:bg-[#37474F] text-[#333333] dark:text-[#cccccc]'>
        <h3 className='font-semibold py-2'>Transaction Details</h3>
        {isPayment && 
          data.filteredPaymentData.map((transaction, index) => (
            <div>
              <p>Millenco Coop</p>
              <p>No 13, Lagos Street,Ikeja, Lagos State</p>
              <p>Receipt Ref : {referenceId}</p>
              <p><strong>Payment Type:</strong> {transaction.paymentType}</p>
              <p><strong>User Name:</strong> {transaction.userName}</p>
              <p><strong>Email:</strong> {transaction.email}</p>
              <p><strong>Payment Date:</strong> {new Date(transaction.paymentDate).toLocaleDateString()} {new Date(transaction.paymentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
              <p><strong>Payment Amount:</strong> {transaction.paymentAmount}</p>
              <p><strong>New Account Balance:</strong> {transaction.newAccountBalance}</p>
            </div>
          ))
        }
        {isLoan && 
          data.filteredLoanData.map((transaction, index) => (
            <div>
              <p>Millenco Coop</p>
              <p>No 13, Lagos Street,Ikeja, Lagos State</p>
              <p>Receipt Ref : {referenceId}</p>
              <p><strong>Payment Type:</strong> {transaction.paymentType}</p>
              <p><strong>User Name:</strong> {transaction.userName}</p>
              <p><strong>Email:</strong> {transaction.email}</p>
              <p><strong>Loan Date:</strong> {new Date(transaction.paymentDate).toLocaleDateString()} [{new Date(transaction.paymentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}]</p>
              <p><strong>Loan Repay per Month:</strong> {transaction.loanRepayPerMonth}</p>
              <p><strong>Loan Request Granted:</strong> {transaction.loanValue}</p>
            </div>
          ))
        }

        {isLoanRepay && 
          data.filteredRepayLoanData.map((transaction, index) => (
            <div className='sm:mx-auto sm:w-full max-w-screen-sm p-8 text-sm  text-[#333333] dark:text-[#cccccc]'>
              <p>Millenco Coop</p>
              <p>No 13, Lagos Street,Ikeja, Lagos State</p>
              <p>Receipt Ref : {referenceId}</p>
              <p><strong>Payment Type:</strong> {transaction.paymentType}</p>
              <p><strong>User Name:</strong> {transaction.userName}</p>
              <p><strong>Email:</strong> {transaction.email}</p>
              <p><strong>Payment Date:</strong> {new Date(transaction.paymentDate).toLocaleDateString()} [{new Date(transaction.paymentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}]</p>
              <p><strong>Payment Amount:</strong> {transaction.loanRepayPerMonth}</p>
              <p><strong>New Loan Balance:</strong> {transaction.newLoanBalance}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
