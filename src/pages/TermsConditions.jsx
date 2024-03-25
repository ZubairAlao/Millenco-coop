import { motion } from 'framer-motion';
import React from 'react';

export default function TermsConditions() {
  const termsAndConditionsData = [
    {
      id: 1,
      title: "Acceptance of Terms",
      content: "By using our website, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our website or services."
    },
    {
      id: 2,
      title: "User Registration",
      content: "To make payment and request loans through our website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
    },
    {
      id: 3,
      title: "Deposit and Payments",
      content: "When making payment through our website, you agree to abide by the Millenium Cooperative Society terms and conditions, including payment terms."
    },
    {
      id: 4,
      title: "Privacy Policy",
      content: "Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our data practices."
    },
    {
      id: 5,
      title: "Disclaimer of Warranties",
      content: "Our website and services are provided 'as is' and without warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or availability of our website or services."
    },
    {
      id: 6,
      title: "Governing Law",
      content: "These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria."
    },
    {
      id: 7,
      title: "Contact Us",
      content: "If you have any questions about these Terms, please contact us at Millenium@support.ng."
    }
  ];

  return (
    <motion.section 
      className='min-h-screen flex justify-center items-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}

    >
      <div className='container mx-auto pt-28 pb-12 px-8'>
        <h1 className='text-3xl font-semibold text-center mb-4'>Terms and Conditions</h1>
        {termsAndConditionsData.map((item) => (
          <article key={item.id} className='text-justify mb-8'>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-base">{item.content}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
