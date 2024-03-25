import React from 'react'
import ContactForm from '../components/ContactForm'
import { motion } from 'framer-motion'


export default function ContactPage() {
  return (
    <motion.section 
      className='flex min-h-screen flex-1 flex-col justify-center px-6 pb-12 pt-28 lg:px-8'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className='text-3xl font-bold mb-4 sm:mx-auto sm:w-full sm:max-w-sm text-center'>Contact Us</h1>
      <p className='text-sm font-medium sm:mx-auto sm:w-full sm:max-w-sm text-center'>Have any questions or suggestions? We would be happy to hear from you</p>
      <ContactForm />
    </motion.section>
  )
}

// Utilizes the Header, ContactForm, ContactDetails, and Footer components.