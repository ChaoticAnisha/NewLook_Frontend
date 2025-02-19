import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp, faMapMarkerAlt, faPhone, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          <ul className="space-y-4">
            <li>
              <p className="text-lg font-bold">Contact Us</p>
            </li>
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl" aria-hidden="true" />
              <address className="not-italic">
                10th Floor, City Center, Dilibazar, Kathmandu
              </address>
            </li>
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} className="text-xl" aria-hidden="true" />
              <a href="tel:+9779812345678" className="hover:underline">
                +977 9812345678
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faClock} className="text-xl" aria-hidden="true" />
              <span>Sun - Fri, 08 AM - 09 PM</span>
            </li>
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-xl" aria-hidden="true" />
              <a href="mailto:support@gmail.com" className="hover:underline">
                support@gmail.com
              </a>
            </li>
          </ul>
          <ul className="flex space-x-4">
            <li>
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-yellow-500 transition"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-yellow-500 transition"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-yellow-500 transition"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-yellow-500 transition"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <a 
        href="#top"
        className="fixed bottom-4 right-4 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition"
        aria-label="Back to Top"
      >
        <FontAwesomeIcon icon={faChevronUp} aria-hidden="true" />
      </a>
    </footer>
  );
};

export default Footer;