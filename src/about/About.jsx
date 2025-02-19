import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About Page</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded with a passion for beauty and wellness, New Look Salon & Spa has been transforming lives 
              through exceptional services and personalized care since our establishment.
            </p>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Our Mission</h2>
            <p className="text-gray-700">
              We are dedicated to providing top-quality beauty and relaxation services that boost 
              our clients' confidence and well-being. Our team of skilled professionals is committed 
              to delivering personalized experiences that make you look and feel your best.
            </p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Why Choose Us</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <ion-icon name="checkmark-circle" className="text-yellow-500 mr-3 text-xl"></ion-icon>
                Experienced and Certified Professionals
              </li>
              <li className="flex items-center">
                <ion-icon name="checkmark-circle" className="text-yellow-500 mr-3 text-xl"></ion-icon>
                State-of-the-Art Facilities
              </li>
              <li className="flex items-center">
                <ion-icon name="checkmark-circle" className="text-yellow-500 mr-3 text-xl"></ion-icon>
                Personalized Service
              </li>
              <li className="flex items-center">
                <ion-icon name="checkmark-circle" className="text-yellow-500 mr-3 text-xl"></ion-icon>
                High-Quality Products
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;