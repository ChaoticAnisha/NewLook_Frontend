import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import priceBg from "/assets/images/price.jpg"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isAuthenticated = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top">
      <header className="relative">
        <div className="bg-gray-800 text-white">
          <div className="container mx-auto flex justify-center py-3">
            <ul className="flex items-center space-x-6">
              <li className="flex items-center">
                <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
              </li>
              <li className="flex items-center">
                <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
                <div className="ml-2">
                  <p className="text-sm">Opening Hour :</p>
                  <p className="text-sm">Sunday - Friday, 08 am - 09 pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="fixed top-0 left-0 w-full bg-black text-white py-3 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleProfileClick}
            >
              <FontAwesomeIcon 
                icon={faUser} 
                className={`text-2xl transition-colors duration-300 ${
                  isHovered ? 'text-yellow-500' : 'text-white'
                }`} 
              />
              <span className={`text-sm transition-colors duration-300 ${
                isHovered ? 'text-yellow-500' : 'text-white'
              }`}>
                Profile
              </span>
            </div>

            <Link to="/" className="text-yellow-500 text-2xl font-bold font-oswald">
              New Look <span className="text-white font-rubik text-sm">Salon & Spa</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "Pricing", path: "/pricing" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "#contact", onClick: scrollToContact },
              ].map((item) => (
                item.onClick ? (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="uppercase text-sm font-semibold hover:text-yellow-500"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="uppercase text-sm font-semibold hover:text-yellow-500"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            <button className="text-4xl md:hidden">
              <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
            </button>
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/appointment"
                  className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  <span className="mr-2">Appointment</span>
                  <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white px-4 py-2 rounded-lg hover:text-yellow-500"
                >
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center text-white px-4 py-2 rounded-lg hover:text-yellow-500"
                >
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  <span className="mr-2">Sign Up</span>
                  <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
                </Link>
              </div>
            )}
          </div>
        </div>

        {window.location.pathname === '/' && (
          <section className="bg-cover bg-left relative" style={{ backgroundImage: `url(${priceBg})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            <div className="container mx-auto py-24 relative z-10 text-center">
              <h1 className="text-white text-5xl font-bold font-oswald mb-6">
                Welcome to New Look Salon & Spa
              </h1>
              <p className="text-white text-lg font-rubik mb-12">
                Discover our premium services for your ultimate relaxation.
              </p>
            </div>
          </section>
        )}
      </header>
    </div>
  );
};

export default NavBar;