import React from 'react'

export default function DepositForm() {
  return (
    <div className="flex flex-1 flex-col justify-center px-6 lg:px-8">
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
                <option value="₦30,000">₦30,000</option>
                <option value="₦60,000">₦60,000</option>
                <option value="₦100,000">₦100,000</option>
              </select>
            </div>
          </fieldset>
  
          <div className='flex justify-center'>
            <button type='submit' className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36">
              Submit Deposit
            </button>
          </div>
        </form>

        </div>
    </div>
  )
}


// Provides a form for users to input money into their accounts.
// Validates and processes user deposits.