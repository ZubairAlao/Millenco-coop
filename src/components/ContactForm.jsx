import React, { useState } from 'react'
import { addContactUsToFirestore } from '../services/firebase';
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../services/firebase'

export default function ContactForm() {

  const [contactError, setContactError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [contactData, setContactData] = useState({
        userName: '',
        email: '',
        message: '',
        contactId: crypto.randomUUID(),
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setContactData({
          ...contactData,
          [name]: value
      });
    };

    const sendContactMessage = async (e) => {
      e.preventDefault();
      setContactError(null);
      setIsLoading(true);
    
      const { contactId, ...messageData } = contactData;
    
      try {
        await addContactUsToFirestore(contactId, contactData);
        navigate(`/contact/${contactId}`);
      } catch (error) {
        const errorCode = error.code;
        let errorMessage = error.message;
        
        switch (errorCode) {
          case 'auth/network-request-failed':
              errorMessage = 'You are not online';
              break;
          default:
              errorMessage = 'An error occurred. Please try again.';
      }
        setContactError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    console.log(contactData);
  return (
    <div>
      <form className='text-sm font-medium mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
      {contactError && <p className="text-red-500">{contactError}</p>}
        <fieldset className='space-y-6'>
          <div>
            <label htmlFor="name">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Name
            </span>
            </label>
            <input type="text" id='name' name="userName" onChange={handleChange} required />
          </div>
          
          <div>
            <label htmlFor="email">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Email
            </span>
            </label>
            <input type="email" name="email" id="email" onChange={handleChange} required />
          </div>
          
          <div>
            <label htmlFor="message">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Message
            </span>
            </label>
            <textarea name="message" id="message" rows="8" onChange={handleChange} required />
          </div>
          
          <div className='flex justify-center'>
          <button onClick={sendContactMessage} className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36">
            {isLoading ? "Sending Message" : "send Message"}
          </button>
          </div>
        </fieldset>
    </form>
    </div>

  )
}
