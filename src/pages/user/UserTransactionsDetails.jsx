import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { getProfileData } from '../../services/firebase';
import { useQuery } from '@tanstack/react-query';
import PrivateRoute from '../../components/PrivateRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function UserTransactionsDetails() {
  const { type, id } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData', id],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      const profileData = await getProfileData(userId);
      const filteredPaymentData = profileData. paymentHistory[id];
      const filteredLoanData = profileData.loanHistory[id];
      const filteredRepayLoanData = profileData.loanRepayHistory[id];
      return {filteredPaymentData, filteredLoanData, filteredRepayLoanData, profileData};
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
          <div>
            <p>Millenco Coop</p>
            <p>No 13, Lagos Street,Ikeja, Lagos State</p>
            <p>Receipt ID {parseInt(id) + 1}</p>
            <p><strong>Payment Type:</strong> {data.filteredPaymentData.paymentType}</p>
            <p><strong>User Name:</strong> {data.filteredPaymentData.userName}</p>
            <p><strong>Email:</strong> {data.filteredPaymentData.email}</p>
            <p><strong>Payment Date:</strong> {new Date(data.filteredPaymentData.paymentDate).toLocaleDateString()} {new Date(data.filteredPaymentData.paymentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
            <p><strong>Payment Amount:</strong> {data.filteredPaymentData.paymentAmount}</p>
            <p><strong>New Account Balance:</strong> {data.filteredPaymentData.newAccountBalance}</p>
          </div>
        }
        {isLoan && 
          <div>
            <p>Millenco Coop</p>
            <p>No 13, Lagos Street,Ikeja, Lagos State</p>
            <p>Receipt ID {parseInt(id) + 1}</p>
            <p><strong>Payment Type:</strong> {data.filteredLoanData.paymentType}</p>
            <p><strong>User Name:</strong> {data.filteredLoanData.userName}</p>
            <p><strong>Email:</strong> {data.filteredLoanData.email}</p>
            <p><strong>Loan Date:</strong> {new Date(data.filteredLoanData.paymentDate).toLocaleDateString()} [{new Date(data.filteredLoanData.paymentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}]</p>
            <p><strong>Loan Repay per Month:</strong> {data.filteredLoanData.loanRepayPerMonth}</p>
            <p><strong>Loan Request Granted:</strong> {data.filteredLoanData.loanValue}</p>
          </div>
        }

        {isLoanRepay && 
          <div className='sm:mx-auto sm:w-full max-w-screen-sm p-8 text-sm  text-[#333333] dark:text-[#cccccc]'>
            <p>Millenco Coop</p>
            <p>No 13, Lagos Street,Ikeja, Lagos State</p>
            <p>Receipt ID {parseInt(id) + 1}</p>
            <p><strong>Payment Type:</strong> {data.filteredRepayLoanData.paymentType}</p>
            <p><strong>User Name:</strong> {data.filteredRepayLoanData.userName}</p>
            <p><strong>Email:</strong> {data.filteredRepayLoanData.email}</p>
            <p><strong>Payment Date:</strong> {new Date(data.filteredRepayLoanData.paymentDate).toLocaleDateString()} [{new Date(data.filteredRepayLoanData.paymentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}]</p>
            <p><strong>Payment Amount:</strong> {data.filteredRepayLoanData.loanRepayPerMonth}</p>
            <p><strong>New Loan Balance:</strong> {data.filteredRepayLoanData.newLoanBalance}</p>
          </div>
        }
      </div>
    </div>
  );
}
