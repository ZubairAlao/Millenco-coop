import { motion } from 'framer-motion'
import React from 'react'
import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { auth, updateProfileData } from '../services/firebase'
import { getProfileData } from '../services/firebase'
import { Link } from 'react-router-dom'



export default function DepositPage() {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      const profileData = await getProfileData(userId);
      return profileData
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

  const [tab, setTab] = useState('deposit');
  const depositDataObject = {
    userName: data.userName,
    email: data.email,
    initialAmount: data.accountBalance,
    depositAmount: {
      basic: 30000,
      business: 60000,
      premium: 100000,
    }[data.plan],
    paymentType: "deposit",
    plan: data.plan
  };

  const loanRepayDataObject = {
    userName: data.userName,
    email: data.email,
    initialLoanAmount: data.loanPayment,
    loanRepayPerMonth: data.loanRepayPerMonth,
    paymentType: "loan-repay",
    plan: data.plan
  };
  
  const [isOldMemberLoading, setIsOldMemberLoading] = useState(false);
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

  return (
    <motion.div className='flex flex-1 flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className='flex justify-center gap-2'>
        <button onClick={() => setTab('deposit')} className={`border-double border-4 px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-40 ${tab === "deposit" ? "bg-[#388E3C] dark:bg-[#ff6f00] text-[#E8F5E9]" : "bg-[#E8F5E9] dark:bg-[#1A1A1A]"}`}>Deposit</button>
        <button onClick={() => setTab('loan-repay')} className={`border-double border-4 px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-40 ${tab === "loan-repay" ? "bg-[#388E3C] dark:bg-[#ff6f00] text-[#E8F5E9]" : "bg-[#E8F5E9] dark:bg-[#1A1A1A]"}`}>Loan Repay</button>
      </div>
      {tab === 'deposit' ?
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0}}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-1 flex-col justify-center px-6 lg:px-8"
        >
          <div>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Deposit into Account</h2>
              <p className='text-center italic'>NOTE: Only fill the loan section if you have taken a loan.</p>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-sm font-medium">
          <form className='space-y-6'>
            <fieldset className=''>
              <legend className='hidden sr-only'>Deposit</legend>
              <div>
                <label htmlFor="deposit">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Select Amount to deposit
                  </span>
                </label>
                <select id='deposit' name="deposit" required autoComplete="deposit">
                  <option disabled value="">Based on Seleted Plan</option>
                  {data.plan === 'basic' && (
                    <option value={30000}>₦30, 000</option>
                  )}
                  {data.plan === 'business' && (
                    <option value={60000}>₦60, 000</option>
                  )}
                  {data.plan === 'premium' && (
                    <option value={100000}>₦100,000</option>
                  )}
                </select>
              </div>
            </fieldset>
    
            <div className='flex justify-center'>
              <Link to='/payment' state={depositDataObject}
              >
                <button type='submit' className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36">
                  Submit Deposit
                </button>
              </Link>
            </div>
          </form>

          </div>
        </motion.div>
        : null
      }

      {tab === 'loan-repay' ? 
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0}}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-1 flex-col justify-center px-6 lg:px-8"
        >
          <div>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Loan Repayment</h2>
              <p className='text-center italic'>NOTE: Only fill the loan section if you have taken a loan. You can only access loan after 6 months of memberships</p>
          </div>
          {data.dateRegistered && monthsUsed < 6  ?
            <button className=' mx-auto my-4 border-double border-4 bg-[#E8F5E9] dark:bg-[#1A1A1A] px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-40' onClick={makeUserOldMember}>{isOldMemberLoading ? 'Loading...' : 'Make Old Member'}</button> 
          : data.loanPayment === 0 ?
          <div className='m-auto'>
            <p>You currently have no loan to repay</p>
            <Link to="/user-dashboard/apply-loan" className='underline'>Go to Loan Application</Link>
          </div>
          :
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-sm font-medium">
            <p className='text-center italic'>Loan Repay Per Month ₦{data.loanRepayPerMonth}</p>
            <form className='space-y-6'>
              <fieldset className='space-y-6'>
                <legend>Loan Repayment</legend>
                <div>
                  <label htmlFor="loan-repayment">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Select Amount for loan repayment
                    </span>
                  </label>
                  <select id='loan-repayment' name="loan-repayment" required autoComplete="loan-repayment">
                    <option disabled value="">Based on Seleted Plan</option>
                    <option value={data.loanRepayPerMonth}>₦{data.loanRepayPerMonth}</option>
                  </select>
                </div>
              </fieldset>
      
              <div className='flex justify-center'>
              <Link to='/payment' state={loanRepayDataObject}
              >
                <button type='submit' className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36">
                  Pay Loan
                </button>
              </Link>
              </div>
            </form>
          </div>
           }
          
        </motion.div>
        : null
      }
      
    </motion.div>
  )
}
