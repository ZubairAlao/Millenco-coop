import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const PaymentSuccessPage = () => {
  return (
    <div className="max-w-screen-sm h-full mx-auto pt-28 pb-12 px-8 my-auto">
      <div className=' p-8'>
        <div>
          <h1 className="text-xl leading-snug font-semibold mb-2">Payment Successful</h1>
        </div>
        <p>Your payment was successfully processed.</p>
        <Link to="/user-dashboard">Go to DashBoard</Link>
      </div>
    </div>
  );
};


