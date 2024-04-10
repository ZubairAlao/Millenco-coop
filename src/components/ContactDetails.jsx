import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const socials = [
    {
        icon: faEnvelope,
        url: "mailto:Alaozubair@example.com", 
    },
    {
        icon: faGithub,
        url: "https://github.com", 
    },
    {
        icon: faLinkedin,
        url: "https://www.linkedin.com", 
    },
    {
        icon: faTwitter,
        url: "https://twitter.com", 
    },
    {
        icon: faWhatsapp,
        url: "https://wa.me/08130030894", 
    },
    {
        icon: faPhone,
        url: "tel:08130030894", 
    },
];

export default function ContactDetails() {
  return (
    <motion.div
      className='flex min-h-screen flex-1 flex-col items-center justify-center px-6 pb-12 pt-28 lg:px-8 text-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h3 className="text-2xl font-semibold mb-6">Message sent! Follow us on social media:</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {socials.map((social) => (
          <Link to={social.url} key={social.url} className="text-3xl text-blue-500 hover:text-blue-700 transition duration-300">
            <FontAwesomeIcon icon={social.icon} />
          </Link>
        ))}
      </div>
        <Link to="/" className="text-xl mt-2">
          <button className="px-4 py-2 bg-black text-white rounded-md">
            Return to Home
          </button>
        </Link>
    </motion.div>
  )
}
