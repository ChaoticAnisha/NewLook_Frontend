import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import pricing1 from "/assets/images/pricing-1.jpg";
import pricing2 from "/assets/images/pricing-2.jpg";
import pricing3 from "/assets/images/pricing-3.jpg";
import pricing4 from "/assets/images/pricing-4.jpg";
import pricing5 from "/assets/images/pricing-5.jpg";
import pricing7 from "/assets/images/pricing-7.jpg";
import pricing8 from "/assets/images/pricing-8.jpg";
import priceBg from "/assets/images/price.jpg";

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const state = location.state;
    if (state && state.selectedCategory) {
      setSelectedFilter(state.selectedCategory);
    }
  }, [location]);

  const pricingData = [
    {
      filter: "hair-cutting",
      image: pricing1,
      alt: "Hair Cutting & Fitting",
      title: "Hair Cutting & Fitting",
      description: "Clean & simple 30-40 minutes",
      price: "NPR 800",
      color: "darkgoldenrod",
      category: "Hair Cutting"
    },
    {
      filter: "shaving-facial",
      image: pricing2,
      alt: "Shaving & Facial",
      title: "Shaving & Facial",
      description: "Clean & simple 30-40 minutes",
      price: "NPR 299",
      color: "darkgoldenrod",
      category: "Shaving & Facial"
    },
    {
      filter: "hair-coloring",
      image: pricing3,
      alt: "Hair Color & Wash",
      title: "Hair Colouring",
      description: "Clean & simple 30-40 minutes",
      price: "NPR 799",
      color: "darkgoldenrod",
      category: "Hair Color"
    },
    {
      filter: "body-massage",
      image: pricing4,
      alt: "Body Massage",
      title: "Body Massage",
      description: "Clean & simple 30-40 minutes",
      price: "NPR 4,999",
      color: "darkgoldenrod",
      category: "Body Massage"
    },
    {
      filter: "beauty-spa",
      image: pricing5,
      alt: "Beauty & Spa",
      title: "Beauty & Spa",
      description: "Clean & simple 30-40 minutes",
      price: "NPR 10,999",
      color: "darkgoldenrod",
      category: "Beauty & Spa"
    },
    {
      filter: "body-massage",
      image: pricing7,
      alt: "Backbone Massage",
      title: "Backbone Massage",
      description: "Clean & simple 30-40 minutes",
      price: "NPR 20,999",
      color: "darkgoldenrod",
      category: "Body Massage"
    },
    {
      filter: "meditation-massage",
      image: pricing8,
      alt: "Meditation & Massage",
      title: "Meditation & Massage",
      description: "Clean & simple 30-40 minutes",
      price: "NPR 25,999",
      color: "darkgoldenrod",
      category: "Meditation & Massage"
    },
  ];

  const filters = [
    { filter: "all", label: "All Pricing", icon: "flaticon-beauty-salon" },
    { filter: "hair-cutting", label: "Hair Cutting", icon: "flaticon-razor-blade" },
    { filter: "hair-coloring", label: "Hair Colouring", icon: "flaticon-spa" },
    { filter: "shaving-facial", label: "Shaving & Facial", icon: "flaticon-razor-blade" },
    { filter: "beauty-spa", label: "Beauty & Spa", icon: "flaticon-relax" },
    { filter: "body-massage", label: "Body Massage", icon: "flaticon-massage" },
    { filter: "meditation-massage", label: "Meditation & Massage", icon: "flaticon-yoga" },
  ];

  const handleAppointment = (category) => {
    navigate('/appointment', { state: { selectedCategory: category } });
  };

  const filteredPricingData = selectedFilter === "all" 
    ? pricingData 
    : pricingData.filter(item => item.filter === selectedFilter);

  return (
    <section
      className="py-16 bg-cover bg-center relative"
      id="pricing"
      style={{ backgroundImage: `url(${priceBg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto relative text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Awesome Pricing Plan</h2>
        <p className="mb-12">Pamper Yourself, Perfect Your Look</p>

        <div className="mb-8 flex justify-center space-x-4 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.filter}
              className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm ${
                selectedFilter === filter.filter ? 'bg-yellow-500' : 'bg-gray-800'
              } hover:bg-yellow-500 transition m-2`}
              onClick={() => setSelectedFilter(filter.filter)}
            >
              <i className={`${filter.icon} mr-2`} aria-hidden="true"></i>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPricingData.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
              data-filter={item.filter}
            >
              <figure className="relative">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-60 object-cover"
                />
              </figure>
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "darkgoldenrod" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <data value={item.price} className="text-lg font-semibold text-yellow-500">
                  {item.price}
                </data>
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleAppointment(item.category)}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors transform hover:scale-105"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;