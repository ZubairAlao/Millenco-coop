import React from 'react'
import Membership from '../components/Membership'
import MembershipPlan from '../components/MembershipPlan'
import { motion } from 'framer-motion'


export default function MembershipPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Membership />
      <MembershipPlan />
    </motion.div>
  )
}
// Utilizes the Header, Membership, membership plan, and Footer components.