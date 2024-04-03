import React, { useEffect, useState } from 'react';
import landingPageEmpowerBig1 from '../img/landingpage-empower1.jpg'
import landingPageEmpowerAgric2 from '../img/landingpage-empower2.jpg'
import landingPageEmpowerOffice3 from '../img/landingpage-empower3.jpg'
import landingPageEmpowerAgric4 from '../img/landingpage-empower4.jpg'
import HeroImg from '../img/hero-img.png'
import {motion} from "framer-motion"
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';



export default function LandingPage() {
  const heading = "Empowerment".split(" ");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
          setIsAuthenticated(!!user); // Convert user to boolean
      });

      return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);

  const text = "Discover the power of financial collaboration. Contribute, borrow, and grow together in our supportive society cooperative.";

  return (
    <section className="min-h-screen flex items-center text-center md:text-left mt-7">
      <div className="md:max-w-screen-xl max-w-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-center md:justify-start gap-8 px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="md:w-3/6 w-full order-2 md:order-1"
        >
          <h1 className="text-3xl md:text-5xl mb-4 font-bold">Unlock Financial
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className='text-[#388E3C] dark:text-[#ff6f00] inline-block'
            >
              Empowerment
            </motion.span>
          </h1>
          <p className="text-base md:text-lg">{text}</p>
          <Link to={isAuthenticated ? '/user-dashboard' : `/sign-up`}>
            <button className="mt-6 border-double border-4 bg-transparent px-4 py-2 text-sm font-semibold rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300 w-36">{auth.currentUser ? 'Dashboard' : `Get Started`}</button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="md:w-3/6 w-3/5 mx-auto order-1 md:order-2"
        >
          <img src={HeroImg} alt="landing-image" className='mx-auto'/>
        </motion.div>
      </div>
    </section>
  );
}
