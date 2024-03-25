import React from 'react'
import { Form } from 'react-router-dom'

export default function ContactForm() {
  return (
    <div>
      <form className='text-sm font-medium mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <fieldset className='space-y-6'>
          <div>
            <label htmlFor="name">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Name
            </span>
            </label>
            <input type="text" id='name' name="name" required />
          </div>
          
          <div>
            <label htmlFor="email">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Email
            </span>
            </label>
            <input type="email" name="email" id="email" required />
          </div>
          
          <div>
            <label htmlFor="message">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Message
            </span>
            </label>
            <textarea name="message" id="message" rows="8" required />
          </div>
          
          <div className='flex justify-center'>
          <button type='submit' className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36">
            Submit
          </button>
          </div>
        </fieldset>
    </form>
    </div>

  )
}
