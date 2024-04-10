import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { addUserToFirestore } from '../services/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../services/firebase'
import { updateProfile } from "firebase/auth";


export default function SignUpPage() {

    const [signInError, setSignInError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [registrationData, setRegistrationData] = useState({
        userName: '',
        email: '',
        phone: '',
        plan: '',
        password: '',
        confirmPassword: '',
        referralName: '',
        address: '',
        gender: '',
        dateRegistered: new Date(),
        accountBalance: 0,
        loanPayment: 0,
    });

    console.log(registrationData)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData({
            ...registrationData,
            [name]: value
        });
    };
    

    const signIn = async (e) => {
        e.preventDefault();
        setSignInError(null);
        setIsLoading(true);

        const { password, confirmPassword, ...userData } = registrationData;
        // to exclude password from entering firestore

        if (password !== confirmPassword) {
            setSignInError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, registrationData.email, registrationData.password)
            const userId = auth.currentUser.uid;
            console.log(userId)
            await addUserToFirestore(userId, userData)
            await updateProfile(auth.currentUser, {
                displayName: registrationData.userName
              })
            navigate('/');
        } catch (error) {
            const errorCode = error.code;
            let errorMessage = error.message;
            
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Email Already in Use';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid Email';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'The password is too weak.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network Error, check internet connection';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Access to this account has been temporarily disabled due to many failed Sign In attempts. Try again later';
                    break;
                default:
                    errorMessage = 'An error occurred. Please try again.';
            }
            setSignInError(errorMessage);
            
        } finally {
            setIsLoading(false);
        }
    }


  return (
    <motion.div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
    >
        <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Register Now</h2>
            <p className='text-center'>Create an Account</p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-sm font-medium">
            {signInError && <p className="text-red-500">{signInError}</p>}
            <form className='space-y-6' onSubmit={signIn}>
                <fieldset className='space-y-6'>
                    <div>
                        <label htmlFor="userName">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Name
                            </span>
                        </label>
                        <input type="text" id='userName' name="userName" required onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Email
                            </span>
                        </label>
                        <input type="email" id='email' name="email" required  autoComplete="email"  onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="gender">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Gender
                            </span>
                        </label>
                        <select id='gender' name="gender" required autoComplete="gender"  onChange={handleChange}>
                            <option disabled value="" selected>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="none">I prefer not to say</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="address">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Address
                            </span>
                        </label>
                        <input type="text" id='address' name="address" required  autoComplete="address" onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="phone">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Phone Number
                            </span>
                        </label>
                        <input type="text" id='phone' name="phone" required  autoComplete="phone" onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="plan">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                            Select Plan
                            </span>
                        </label>
                        <select id='plan' name="plan" required autoComplete="plan"  onChange={handleChange}>
                            <option disabled value="" selected>Select Plan</option>
                            <option value="basic">Basic - #30, 000/Month</option>
                            <option value="business">Business - #60, 000/Month</option>
                            <option value="premium">Premium - #100, 000/Month</option>
                        </select>
                    </div>


                    <div>
                        <label htmlFor="password">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Password
                            </span>
                        </label>
                        <input type="password" name="password" id="password" required autoComplete="password" onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Confirm Password
                            </span>
                        </label>
                        <input type="password" name="confirmPassword" id="confirmPassword" required autoComplete="confirmPassword" onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="referralName">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Referral Full Name
                            </span>
                        </label>
                        <input type="text" id='referralName' name="referralName" required  autoComplete="referralName" onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="agree" className='text-center'>
                            <input type="checkbox" id='agree' name="agree" required  autoComplete="agree"/>
                            <span>I agree to{" "}</span><Link to="/terms-conditions" className='underline'>terms and conditions</Link>
                        </label>
                    </div>

                    <div className='flex justify-center'>
                        <button type='submit' className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </fieldset>
            </form>

            <div className='mt-6 text-center'>
                {/* <button className='border-2 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white'><FontAwesomeIcon icon={faGoogle} className='mr-2'/>sign In with Google</button>
                <p className='my-6'>Google sign-in may be blocked by popup blockers. Please ensure they are disabled.</p> */}
                <p>
                    Already have an account? {""}
                    <Link style={{ textDecoration: 'underline' }} to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    </motion.div>
  )
}
