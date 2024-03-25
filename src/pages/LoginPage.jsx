import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { auth } from "../services/firebase"
import {  signInWithEmailAndPassword   } from 'firebase/auth';

export default function LoginPage() {

    function getMessage() {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get("message");
    }

    const navigate = useNavigate();
    const message = getMessage()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();
        setLoginError(null);
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/user-dashboard")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage = error.message;

            switch (errorCode) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid Email';
                    break;
                case 'auth/missing-password':
                    errorMessage = "Missing Password";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Wrong Password";
                    break;
                case "auth/invalid-login-credentials": 
                    errorMessage = "Invalid Login credentials";
                    break;
                case "auth/too-many-requests":
                    errorMessage = "Access to this account has been temporarily disabled due to many failed login attempts. Try again later";
                    break;
                default:
                    errorMessage = "An error occurred. Please try again."
            }
            setLoginError(errorMessage)
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

  return (
    <motion.div 
        className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
    >
        <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Login</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-sm font-medium">
            {message && <p color="red">{message}</p>}
            {loginError && <p color="red">{loginError}</p>}
            <form className='' onSubmit={onLogin}>
                <fieldset className='space-y-6'>
                    <div>
                        <label htmlFor="email">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Email
                            </span>
                        </label>
                        <input type="email" id='email' name="email" required  autoComplete="email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    
                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="password">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                    Password
                                </span>
                            </label>
                            <Link to='#' className='text-red-500 hover:text-red-300'>Forgot Password?</Link>
                        </div>
                        <input type="password" name="password" id="password" required autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    
                    <div className='flex justify-center'>
                        <button type='submit' className="border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36 " disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </fieldset>
            </form>

            <p className='mt-6 text-center'>
                Not a member yet? {" "}
                <Link to="/sign-up" className='underline'>Register here.</Link>
            </p>
        </div>
    </motion.div>
  )
}
