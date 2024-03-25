import React from 'react'
import LandingPage from '../components/LandingPage'
import Services from '../components/Services'
import FAQ from '../components/FAQ'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div>
      <LandingPage />
      <Services paddingTop={12} />
      <FAQ />
    </div>
  )
}
