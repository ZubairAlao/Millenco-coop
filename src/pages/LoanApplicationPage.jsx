import { motion } from 'framer-motion'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { auth } from '../services/firebase'
import { getProfileData } from '../services/firebase'


export default function LoanApplicationPage() {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      const profileData = await getProfileData(userId);
      return profileData;
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
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0}}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex sm:mx-auto sm:w-full sm:max-w-sm flex-1 flex-col justify-center px-6 lg:px-8"
    >
      <div>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">Apply for Loan</h2>
          <p className='text-center italic'>NOTE: Basic Plan loan is two times of total money in account. Business and Premium Plan is three times.</p>
      </div>
      <div className="mt-5 text-sm font-medium">
        <form className='space-y-6'>
          <fieldset className='space-y-2'>
            <legend>Loan application</legend>
            <div>
              <label htmlFor="loan-amount">
              <span className="after:content-['You are entitle to loan within 0 to ${profileData.loanAmount}'] after:ml-0.5 after:text-red-500">
                Enter Amount
              </span>
              </label>
              <input type="number" name="loan-amount" id="loan-amount" min='0'  required />
            </div>
          </fieldset>
  
          <div className='flex justify-center'>
            <button type='submit' className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36">
              Apply For Loan
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
