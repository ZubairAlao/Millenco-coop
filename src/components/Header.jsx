import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faUser, faMoneyBill, faHandHoldingUsd, faEdit, faSignOutAlt, faBell,faChartBar  } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes,  } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../services/firebase";
import {signOut} from 'firebase/auth'
import { getProfileData } from '../services/firebase';
import { useQuery } from '@tanstack/react-query'


export default function Header() {
  const navLinks = [
    { url: 'about', text: 'About' },
    { url: '/services', text: 'Services' },
    { url: '/membership', text: 'Membership' },
    { url: '/help', text: 'Help', children: [
        { url: '/faqs', text: 'FAQs' },
        { url: '/contact', text: 'Contact' }
      ]
    },
  ];

  const logout = async () => {
    try {
      await signOut(auth);
      toggleProfile()
      navigate('/');
    console.log(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // Convert user to boolean
        });

        return () => unsubscribe(); // Unsubscribe when component unmounts
    }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(undefined)
  const [isDropDown, setIsDropDown] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  const navbarButtonRef = useRef(null)
  const dropDownButtonRef = useRef(null)
  const profileButtonRef = useRef(null)
  
  const navbarWrapperRef = useRef(null)
  const dropDownWrapperRef = useRef(null)
  const profileWrapperRef = useRef(null)

  const handleOutsideClick = (event) => {
    if (
      navbarWrapperRef.current &&
      !navbarWrapperRef.current.contains(event.target) &&
      event.target !== navbarButtonRef.current
    ) {
      setIsMenuOpen(false);
    }if (
      dropDownWrapperRef.current &&
      !dropDownWrapperRef.current.contains(event.target) &&
      event.target !== dropDownButtonRef.current
    ) {
      setIsDropDown(false);
    }
    if (
      profileWrapperRef.current &&
      !profileWrapperRef.current.contains(event.target) &&
      event.target !== profileButtonRef.current
    ) {
      setIsProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     // Check if the click event did not originate inside the navbar
  //     if (navbarWrapperRef.current && !navbarWrapperRef.current.contains(event.target)) {
  //       // Close the navbar
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   // Add event listener to document
  //   document.addEventListener('click', handleOutsideClick);

  //   // Clean up the event listener when component unmounts
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick);
  //   };
  // }, []);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const switchMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropDown = () => {
    setIsDropDown(!isDropDown);
    setIsMenuOpen(false);
  };

  const toggleProfile = () => {
    setIsProfile(!isProfile);
    setIsMenuOpen(false);
  };


  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      window.document.documentElement.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      window.document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      return await getProfileData(userId);
    }
  })

  return (
    <header className='fixed top-0 left-0 right-0 text-[#333333] bg-[#E8F5E9] dark:text-[#cccccc] dark:bg-[#1A1A1A] z-50 shadow-md'>
      <div className='flex max-w-screen-xl mx-auto items-center justify-between relative py-4 px-8' ref={navbarWrapperRef}>
          <button
            className="text-black dark:text-white hover:opacity-80 md:hidden"
            onClick={toggleMenu}
            ref={navbarButtonRef}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="h-7 w-7" />
          </button>

          <Link to='/' className='flex items-center' onClick={() => {setIsMenuOpen(false);}}>
            <h1 className="logo-text text-3xl font-bold text-[#333333] dark:text-[#cccccc]">Millen<span className='text-[#388E3C] dark:text-[#FF6F00]'>co</span>.</h1>
          </Link>

          {/* desktop */}
          <nav className='hidden md:flex text-base'>
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.text}>
                  {link.children ? (
                    <div className="relative flex gap-1 items-center">
                      <div
                        className={"hover:text-[#388E3C] dark:hover:text-[#FF6F00] duration-300 ease-in-out cursor-pointer"}
                        to={link.url} onClick={toggleDropDown} ref={dropDownButtonRef}
                      >
                        {link.text}
                      </div>
                      <svg
                        className="text-[#388E3C] dark:text-[#FF6F00] cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="16"
                        height="16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <ul className={`absolute left-0 dark:bg-[#1A1A1A] bg-[#E8F5E9] shadow-md p-4 w-36 transition rounded-md flex flex-col ring-1 ring-black dark:ring-[#FF6F00] ring-opacity-5 dark:ring-opacity-25 focus:outline-none space-y-2 ${isDropDown ? 'opacity-100 visible top-7' : 'opacity-0 invisible'}`} ref={dropDownWrapperRef}>
                        {link.children.map(child => (
                          <li key={child.text}>
                            <NavLink
                              className={({isActive}) => isActive ? "active" : 'hover:text-[#388E3C] dark:hover:text-[#FF6F00]'}
                              to={child.url} onClick={toggleDropDown}
                            >
                              {child.text}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <NavLink
                      className={({isActive}) => isActive ? "active" : "hover:text-[#388E3C] dark:hover:text-[#FF6F00] duration-300 ease-in-out"}
                      to={link.url}
                    >
                      {link.text}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* mobile */}
          <nav
            className={`
              ${isMenuOpen ? 'md:hidden left-0 absolute w-[60%] h-full ease-in-out duration-500 top-[65px] z-50'
                : 'absolute ease-in-out duration-500 top-[65px] left-[-100%]'
              }
            `}
            >
            <ul className='bg-[#C8E6C9] dark:bg-[#37474F] p-4 text-base h-screen'>
              <li
                className="bg-[#C8E6C9] dark:bg-[#37474F] hover:opacity-80 w-full text-left flex items-center py-4 justify-between cursor-pointer" onClick={() => {switchMode(); toggleMenu()}}>
                <span className='font-semibold'>Dark Mode</span>
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="h-7 w-7 text-[#388E3C] dark:text-[#FF6F00]" />
              </li>
              {navLinks.map((link) => (
                <li key={link.text} className='mb-4 block'>
                  {link.children ? (
                    <div>
                      <div className='mb-2'>
                        {link.text}
                      </div>
                      <ul className='border-l flex flex-col gap-2'>
                        {link.children.map(child => (
                          <li className='' key={child.url}>
                            <NavLink to={child.url}  className={({isActive}) => isActive ? "text-[#388E3C] dark:text-[#FF6F00] transition duration-300 px-8 font-semibold" : 'px-8 hover:text-[#388E3C] dark:hover:text-[#FF6F00]'} onClick={toggleMenu}>{child.text}</NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <NavLink to={link.url}  className={({isActive}) => isActive ? "text-[#388E3C] dark:text-[#FF6F00] transition duration-300 font-semibold" : 'hover:text-[#388E3C] dark:hover:text-[#FF6F00]'} onClick={toggleMenu}>{link.text}</NavLink>
                  )}
                </li>
              ))}
              {isAuthenticated ? null :
                <ul className='flex items-center divide-x-2'>
                  <li className='pr-4' onClick={toggleMenu}><NavLink className={({isActive}) => isActive ? "text-[#388E3C] dark:text-[#ff6f00] transition duration-300 font-semibold" : 'hover:text-[#2E7D32] dark:hover:text-[#ff6f00] duration-300 ease-in-out'} to='/sign-up'>Sign Up</NavLink></li>
                  <li className='pl-4' onClick={toggleMenu}><NavLink className={({isActive}) => isActive ? "text-[#388E3C] dark:text-[#ff6f00] transition duration-300 font-semibold" : 'hover:text-[#2E7D32] dark:hover:text-[#ff6f00] duration-300 ease-in-out'} to='/login'>Login</NavLink></li>
                </ul>
              }
            </ul>
          </nav>



        <div className='flex items-center gap-4 text-base'>
          {isAuthenticated ?
            <div className='relative flex items-center gap-4'>
              <Link to='/user-dashboard/user-transactions'
                className="text-black dark:text-white hover:opacity-80 flex place-content-center" onClick={() => {setIsMenuOpen(false);}}
              >
                <FontAwesomeIcon icon={faBell} className="h-7 w-7" />
              </Link>
              <div ref={profileButtonRef} className='h-8 w-8 rounded-full bg-slate-300 cursor-pointer' style={{backgroundImage: `url(${auth.currentUser.photoURL})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} onClick={toggleProfile}></div>
              {isProfile && (
                <div className="absolute top-[55px] right-0 bg-white dark:bg-gray-800 w-44 shadow-lg rounded-md" ref={profileWrapperRef} >
                  
                  <div className="py-1">
                  <div
                      className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      {auth.currentUser.displayName}
                    </div>
                    <Link
                      to="/user-dashboard"
                      onClick={toggleProfile}
                      className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      to="/user-dashboard/deposit"
                      onClick={toggleProfile}
                      className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                      Deposit
                    </Link>
                    <Link
                      to="/user-dashboard/apply-loan"
                      onClick={toggleProfile}
                      className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-2" />
                      Apply for Loan
                    </Link>
                    <Link
                      to="/user-dashboard/user-profile"
                      onClick={toggleProfile}
                      className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Edit Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-600"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
            :
            <div className='md:flex  items-center gap-4 hidden'>
              <Link className='p-1 border-double border-4 bg-transparent rounded-full border-[#388E3C] hover:bg-[#388E3C] dark:border-[#ff6f00] dark:hover:bg-[#ff6f00] hover:text-white transition duration-300' to='/sign-up'>Sign Up</Link>
              <Link className='p-1 hover:text-[#2E7D32] dark:hover:text-[#ff6f00] duration-300 ease-in-out' to='/login'>Login</Link>
            </div> 
          }
          <button
            className="hidden md:inline text-black dark:text-[#ff6f00] hover:opacity-80" onClick={switchMode} >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="h-7 w-7" />
          </button>
        </div>
      </div>
    </header>
  );
}
