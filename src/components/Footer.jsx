import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const socialMedia = [
  { icon: faFacebook, link: '#' },
  { icon: faTwitter, link: '#' },
  { icon: faLinkedin, link: '#' },
];

const Footer = () => {

  return (
    <footer className="py-8 px-8 text-sm border-t">
      <div className="mx-auto px-4 text-center md:text-left space-y-6">
        <div className="gap-8 lg:gap-[11rem] flex flex-col md:flex-row items-center md:items-start justify-center">
          <div className="md:w-80">
            <div className="">
            {/* <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50  50" width="24px" height="24px" className="text-[#333333] dark:text-[#cccccc] mr-2" fill="currentColor">   
              <path d="M30,43h17l-4-4l-0.027-28.496l3.891-4.49H34.845l-9.24,22.73L15.497,6H3l4,5.091v24.195L1,43h14l-6-7.714V13.75L22,43 l-0.002,0.014L34,13.545V39L30,43z M10.911,41H5.089L8,37.258L10.911,41z M21.922,37.899L10.828,12.938L8.633,8h5.564l9.581,21.556 l0.805,1.81L21.922,37.899z M35.414,40.414L36,39.828V39V13.545v-5.06l0.191-0.47h6.293l-1.022,1.18l-0.489,0.565l0.001,0.747 L41,39.002l0.001,0.827l0.585,0.585L42.172,41h-7.343L35.414,40.414z"/>
             </svg> */}
             <h1 className="logo-text text-3xl font-bold text-[#333333] dark:text-[#cccccc]">Millen<span className='text-[#388E3C] dark:text-[#FF6F00]'>co</span>.</h1>
            </div>
            <p className="mt-2">Power of collective effort that fuels opportunities for everyone</p>
            <div className="flex gap-4 mt-4 justify-center">
              {socialMedia.map((social, index) => (
                <Link to={social.link} className="text-[#2E7D32] dark:text-[#ff6f00]" key={index}>
                  <FontAwesomeIcon icon={social.icon} size='lg' />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-lg text-[#2E7D32] dark:text-[#ff6f00] font-semibold">Get in Touch</h1>
            <address className="mt-2">
              <p>No 13, Lagos Street,</p>
              <p>Ikeja, Lagos State,</p>
              <p>Nigeria</p>
            </address>
            <p className="mt-2">Email: Millenium@support.ng</p>
            <p>Phone: +234 800 123 4567</p>
          </div>

          <div>
            <h1 className="text-lg text-[#2E7D32] dark:text-[#ff6f00] font-semibold">Site Links</h1>
            <ul className="mt-2">
              <li><Link to="/about">About Millennium</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/membership">Membership Requirements</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <p>&copy; Millennium Cooperative Society, 2024. All rights reserved.</p>
          <ul className="flex gap-4">
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
