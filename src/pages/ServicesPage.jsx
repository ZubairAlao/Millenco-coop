import React from 'react'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import { motion } from 'framer-motion'

export default function ServicesPage() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
    >
      <Services paddingTop={28} />
      <Testimonials />
    </motion.div>
  )
}

// Utilizes the Header, Services, Testimonials, and Footer components.