import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <motion.div className="flex items-center justify-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-md p-8 rounded-md text-center">
        <h1 className="text-4xl font-bold mb-4">
          Sorry, the page you were looking for is not found.
        </h1>
        <Link to="/" className="text-xl">
          <button className="px-4 py-2 bg-black text-white rounded-md">
            Return to Home
          </button>
        </Link>
      </div>
    </motion.div>
  )
}
