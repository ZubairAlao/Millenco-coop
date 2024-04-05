import React, { useEffect, useState } from 'react';
import PrivateRoute from '../components/PrivateRoute';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { addPaymentToFirestore, updateProfileData } from '../services/firebase';
import { auth } from '../services/firebase';


export default function PaymentGateWay() {

  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("uselocation", state);

  const [tab, setTab] = useState('card');
  const [paymentError, setPaymentError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    userName: state.userName,
    email: state.email,
    plan: state.plan,
    paymentType: state.paymentType,
    paymentDate: new Date().toISOString(),
    newAccountBalance: state.initialAmount + state.depositAmount,
    paymentAmount: state.depositAmount,
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

const handleChange = (e) => {
  const { name, value } = e.target;
  setPaymentData({
    ...paymentData,
    [name]: value
  });
};

  console.log(paymentData);
  const cardPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setPaymentError(null);
      if (paymentData.cardCvc !== '123' || paymentData.cardNumber !== '1234123412341234' || paymentData.cardExpiry !== '12/23') {
        throw new Error('Invalid card details');
      }
      await updateProfileData(auth.currentUser.uid, {accountBalance: paymentData.newAccountBalance });
      // Exclude cvc, cardNumber, and cardExpiry from paymentData when submitting to Firestore
      const { cardCvc, cardNumber, cardExpiry, ...paymentWithoutSensitiveData } = paymentData;
      await addPaymentToFirestore(auth.currentUser.uid, paymentWithoutSensitiveData);
      navigate('/payment-success');
    } catch (error) {
      console.error('Error updating user payment', error);
      setPaymentError(error.message); // Update the payment error state
    }
    finally{
      setIsLoading(false);
    }
  }

  const stripePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setPaymentError(null);
      await updateProfileData(auth.currentUser.uid, {accountBalance: paymentData.newAccountBalance });
      // Exclude cvc, cardNumber, and cardExpiry from paymentData when submitting to Firestore
      const { cardCvc, cardNumber, cardExpiry, ...paymentWithoutSensitiveData } = paymentData;
      await addPaymentToFirestore(auth.currentUser.uid, paymentWithoutSensitiveData);
      navigate('/payment-success');
    } catch (error) {
      console.error('Error updating user payment', error);
      setPaymentError(error.message);
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <section className="max-w-screen-sm h-full mx-auto pt-28 pb-12 px-8 my-auto">
      <PrivateRoute />
      <Link to='/user-dashboard/deposit'>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </Link>
      <div className='bg-white p-8'>

        <div>
          <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">Make Payment</h1>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <div className="relative flex w-full p-1 bg-gray-50 rounded">
          <button className={`relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 ${tab === "card" ? "border text-white bg-slate-950" : ""}`} onClick={() => { setTab("card") }}>Pay With Card</button>
            <button className={`relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 ${tab === "stripe" ? "border text-white bg-slate-950" : ""}`} onClick={() => { setTab("stripe") }}>Pay With Stripe</button>
          </div>
        </div>

        {/* Card form */}
        {tab === "card" && 
          <form onSubmit={cardPayment}>
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="card-nr">Card Number <span className="text-red-500">*</span></label>
                <input id="card-nr" name='cardNumber' className="payment text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="use - 1234123412341234" onChange={handleChange} />
              </div>
              {/* Expiry and CVC */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="card-expiry">Expiry Date <span className="text-red-500">*</span></label>
                  <input id="card-expiry" name='cardExpiry' className="payment text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="MM/YY - use 12/23" onChange={handleChange} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="card-cvc">CVC <span className="text-red-500">*</span></label>
                  <input name='cardCvc' id="card-cvc" className="payment text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="number" placeholder="123" onChange={handleChange} />
                </div>
              </div>
              {/* Name on Card */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="card-name">Name on Card <span className="text-red-500">*</span></label>
                <input id="card-name" name='userName' className="payment text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" value={state.userName} disabled onChange={handleChange} />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="card-email">Email <span className="text-red-500">*</span></label>
                <input id="card-email" name="email" className="payment text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="email" value={state.email} disabled onChange={handleChange}/>
              </div>
            </div>
            {/* Form footer */}
            <div className="mt-6">
              <div className="mb-4">
                <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2" name='paymentAmount' type='submit'>{isLoading ? 'Paying...' : `Pay ₦${state.depositAmount}`}</button>
              </div>
            </div>
          </form>
        }

        {tab === "stripe" &&
          <form onSubmit={stripePayment}>
              <div className="mb-4">
                  <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2" type='submit'>
                    {isLoading ? 'Paying...' : `Pay ₦${state.depositAmount}`}</button>
              </div>
          </form>
        }
        {paymentError && <div className="text-red-500">{paymentError}</div>}
      </div>
    </section>
  );
}
