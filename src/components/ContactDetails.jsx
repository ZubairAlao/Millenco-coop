import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';

const socials = [
    {
        icon: faEnvelope,
        url: "mailto: Alaozubair@example.com", 
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
    <div>
      <h3>Follow us</h3>
      {socials.map((social) => (
        <Link to={social.url}>
          <FontAwesomeIcon icon={social.icon} />
        </Link>
      ))}
    </div>
  )
}

// Displays contact information such as email, phone, and address.