import React from 'react';
import FAQ from '../components/FAQ';
import { motion } from 'framer-motion';

export default function FAQsPage() {
  return (
    <motion.div className='pt-28'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <FAQ />
    </motion.div>
  );
}
