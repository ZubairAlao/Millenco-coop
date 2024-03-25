import { motion } from 'framer-motion';
import React from 'react';
import { useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();

  return (
    <motion.div className="flex items-center justify-center bg-black text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-md p-8 rounded-md bg-white text-black">
        <h1 className="text-3xl font-bold mb-4">Oops! An error occurred.</h1>
        <p className="text-lg mb-4">{error.message}</p>
        <p className="text-sm text-gray-500">
          {error.status} - {error.statusText}
        </p>
      </div>
    </motion.div>
  );
}

export default Error;
