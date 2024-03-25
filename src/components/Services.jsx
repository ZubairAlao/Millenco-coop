import React from 'react'
import { motion } from 'framer-motion';
import collaborationPic from '../img/colaboration-tools.png';
import networkPic from '../img/network.png';
import financialSupportPic from '../img/financial-support.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faHandHoldingUsd, faAmbulance, faHandsHelping } from '@fortawesome/free-solid-svg-icons';

const services = [
  { heading: 'Monthly Contributions', text: 'Join us, contribute monthly for benefits.', icon: faMoneyBill },
  { heading: 'Business Loans', text: `Get tailored business loans. Start or expand.`, icon: faHandHoldingUsd },
  { heading: 'Emergency Loans', text: `Access short-term emergency loans. We're here.`, icon: faAmbulance },
  { heading: 'Financial Support', text: 'Receive support during emergencies.', icon: faHandsHelping },
];


const benefits = [
  { heading: 'Power of collective effort that fuels opportunities for everyone.', text: 'we believe in the power of collective effort to achieve financial goals. Our members pool their resources, contributing funds to create a pool of capital that fuels opportunities for everyone.', img: collaborationPic },
  { heading: `Become part of a network where members support each other's financial journeys`, text: `Through contributions and responsible lending practices, we empower individuals to take control of their finances while fostering a sense of community and trust.`, img: networkPic },
  { heading: 'Explore our platform to discover a range of financial services tailored to your needs', text: 'From savings and investment opportunities to accessible loans with favorable terms, we provide the tools and resources to help you thrive financially.', img: financialSupportPic},
];

export default function Services( {paddingTop} ) {
  return (
    <section 
      className='min-h-screen flex justify-center items-center'
    >
      <div className={`max-w-screen-xl mx-auto px-8 pt-${paddingTop} pb-12`}>

        <h2 className="text-3xl text-center font-semibold mb-6">Our Services</h2>

        <div className="flex flex-wrap gap-6 md:justify-start justify-center">
          {services.map((service) => (
            <div className="p-6 md:flex-1 md:h-44 w-[75%] bg-[#C8E6C9] dark:bg-[#37474F] rounded-lg shadow-lg hover:scale-105" key={service.heading}>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={service.icon} className="mr-2 text-[#2E7D32] dark:text-[#ff6f00]"/>
                <h3 className="text-lg font-semibold">{service.heading}</h3>
              </div>
              <p className='text-base'>{service.text}</p>
            </div>
          ))}
        </div>

        <div className='pt-20 space-y-32 lg:text-left text-center'>
          {benefits.map((benefit, index) => (
            <motion.div className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 md:items-center" key={benefit.heading}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.5 * index
                }
              }}
            >
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1 lg:mr-16'}`}>
                <h3 className="text-xl font-semibold mb-2">{benefit.heading}</h3>
                <p>{benefit.text}</p>
              </div>

              <div className={`w-full md:w-1/2 h-auto ${index % 2 === 1 ? 'lg:order-1 lg:mr-16' : 'lg:order-2'}`}>
                <img src={benefit.img} alt={benefit.heading} className='w-[full] mx-auto' />
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}

