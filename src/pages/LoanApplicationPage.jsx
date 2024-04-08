import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { addLoanToFirestore, auth, updateProfileData } from '../services/firebase'
import { getProfileData } from '../services/firebase'
import { useNavigate } from 'react-router-dom'



export default function LoanApplicationPage() {

  const navigate =  useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      const profileData = await getProfileData(userId);
      return profileData;
    }
  })

  const [isOldMemberLoading, setIsOldMemberLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loanApplicationError, setLoanApplicationError] = useState(null);
  const [loanValue, setLoanValue] = useState(0)
  const queryClient = useQueryClient()
  const makeUserOldMember = async (e) => {
    e.preventDefault();
    setIsOldMemberLoading(true);
    try {
      const currentTimestamp = Date.now();
      // Generate a random number of milliseconds between 6 months and 2 years ago
      const randomPastTimestamp = currentTimestamp - Math.floor(Math.random() * (365 * 24 * 60 * 60 * 1000 * 1.5)) - (180 * 24 * 60 * 60 * 1000);
      const randomPastDate = new Date(randomPastTimestamp);
  
      // Assuming 'auth.currentUser.uid' and 'data.dateRegistered' are defined elsewhere
      await updateProfileData(auth.currentUser.uid, { dateRegistered: randomPastDate });

      await queryClient.invalidateQueries({ queryKey: ['profileData'] })
  
    } catch (error) {
      console.error('Error updating user post 6 month membership', error);
    }
    finally {
      setIsOldMemberLoading(false);
    }
  }

  const currentDate = new Date();
  const currentTimeMs = currentDate.getTime();
  const registrationTimeMs = data.dateRegistered && new Date(data.dateRegistered.seconds * 1000)
  const timeDifferenceMs = currentTimeMs - registrationTimeMs;
  const monthsUsed = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24 * 30));
  console.log(monthsUsed);
  
  const loanDataObject = {
    userName: data.userName,
    email: data.email,
    accountBalance: data.accountBalance,
    maxLoanAmount: {
        basic: 2,
        business: 3,
        premium: 3,
    }[data.plan] * data.accountBalance,
    paymentType: "loan-application",
    plan: data.plan,
    ref: crypto.randomUUID(),
    paymentDate: new Date().toISOString(),
    loanValue: parseInt(loanValue),
    loanRepayPerMonth: (loanValue * 6 * 3) / 100
  };

  console.log(loanDataObject);

  

  const loanApplication = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setLoanApplicationError(null);
      if (loanDataObject.accountBalance === 0) {
        setLoanApplicationError("Deposit first to access loan");
        setIsLoading(false);
        return;
      }
      await updateProfileData(auth.currentUser.uid, {loanPayment: loanDataObject.loanRepayPerMonth * 6});
      await updateProfileData(auth.currentUser.uid, {loanRepayPerMonth: loanDataObject.loanRepayPerMonth});
      const { maxLoanAmount, accountBalance, ...loanApplicationData } = loanDataObject;
      await addLoanToFirestore(auth.currentUser.uid, loanApplicationData);
      navigate('/loan-success');
    } catch (error) {
      console.error('Error updating user payment', error);
      setLoanApplicationError(error.message); // Update the payment error state
    }
    finally{
      setIsLoading(false);
    }
  }

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
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0}}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex sm:mx-auto sm:w-full sm:max-w-sm flex-1 flex-col justify-center px-6 lg:px-8"
    >
      <div>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">Apply for Loan</h2>
          <p className='text-center italic'>NOTE: Loans are 2x for Basic, 3x for Business/Premium plans. Membership must be 6 months old. Repay within 6 months.</p>
      </div>
      {data.dateRegistered && monthsUsed < 6 ? (
        <div className='flex justify-center items-center flex-col gap-3 my-4'>
            <p className='font-bold'>You must be a member for at least 6 months to apply for a loan.</p>
            <button className='border-double border-4 bg-[#E8F5E9] dark:bg-[#1A1A1A] px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-40' onClick={makeUserOldMember}>{isOldMemberLoading ? 'Loading...' : 'Make Old Member'}</button>
        </div>
      ) : (
          data.loanPayment > 0 ? (
              <p className='text-[#388E3C] dark:text-[#ff6f00] font-bold'>Sorry, you already have an existing loan.</p>
          ) : (
              <div className="mt-5 text-sm font-medium">
                  <form className='space-y-6' onSubmit={loanApplication}>
                      <fieldset className='space-y-2'>
                          <legend>{loanApplicationError && <div className="text-red-500">{loanApplicationError}</div>}</legend>
                          <div className='flex flex-1 space-x-4 items-center'>
                              <p className="text-green-500">Your account: ₦{data.accountBalance.toLocaleString()}</p>
                              <p className="text-blue-500">Maximum Loan: ₦{loanDataObject.maxLoanAmount.toLocaleString()}</p>
                              <p className="text-red-500">Total Loan Requested: ₦{parseInt(loanValue).toLocaleString()}</p>
                              <p className="text-purple-500">Repay/Month: ₦{parseInt(loanDataObject.loanRepayPerMonth).toLocaleString()}</p>
                          </div>
                          <div>
                              <label htmlFor="loan-amount">
                                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                      Enter Amount [Deposit First!]
                                  </span>
                              </label>
                              <input type="number" name="loan-amount" id="loan-amount" min="0" max={loanDataObject.maxLoanAmount} onChange={(e) => setLoanValue(e.target.value)} required />
                              <input type="range" className='w-full' min="0" max={loanDataObject.maxLoanAmount} value={loanValue} readOnly />
                          </div>
                      </fieldset>

                      <div className='flex justify-center'>
                          <button type='submit' className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36">
                              {isLoading ? "Applying" : "Apply For Loan" }
                          </button>
                      </div>
                  </form>
              </div>
          )
      )
}

    </motion.div>
  )
}
