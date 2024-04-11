import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getContactData } from '../services/firebase';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';



const socials = [
    {
        icon: faEnvelope,
        url: "mailto:Millenco@gmail.com", 
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

  const { contactId } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['contactData', contactId],
    queryFn: async () => {
      return await getContactData(contactId);
    }
  })

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full pt-28">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900  dark:border-gray-100"></div>
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  console.log(data);

  return (
    <motion.div
      className='max-w-screen-sm h-screen pt-28 pb-12 px-8 flex justify-center items-center flex-col mx-auto'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h3 className="text-2xl font-semibold mb-6">Thank you <span className='text-[#388E3C] dark:text-[#ff6f00]'>{data.userName}!</span> Contact us also on social media:</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {socials.map((social) => (
          <Link to={social.url} key={social.url} className="text-xl text-[#388E3C] dark:text-[#ff6f00] dark:hover:opacity-80 transition duration-300">
            <FontAwesomeIcon icon={social.icon} />
          </Link>
        ))}
      </div> 
        <Link to="/" className="text-xl mt-2">
          <button className="px-4 py-2 bg-[#388E3C] dark:bg-[#ff6f00] text-white rounded-md">
            Return to Home
          </button>
        </Link>

    </motion.div>
  )
}
