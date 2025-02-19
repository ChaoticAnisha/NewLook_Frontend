import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import appoinBanner1 from '/assets/images/appoin-banner-1.jpg';
import appoinBanner2 from '/assets/images/appoin-banner-2.jpg';
import axios from 'axios';

const Appointment = () => {
  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    date: '',
    category: selectedCategory || '',
  });
  // const [formData, setFormData] = useState({
  //   serviceId

  // })
  useEffect(() => {
    if (selectedCategory) {
      setFormData((prevData) => ({ ...prevData, category: selectedCategory }));
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:5000/api/appointments',
      formData, // send formData directly as Axios automatically serializes it to JSON
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    console.log('Appointment created:', response.data);

    // Optionally, reset form fields after successful submission
    alert('Appointment booked successfully!');
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      date: '',
      category: selectedCategory || '',
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    alert('Failed to book appointment.');
  }
};



  return (
    <section className="section appoin" id="appointment" aria-label="appointment">
      <div className="container mx-auto px-4">
        <div className="appoin-card flex flex-col md:flex-row justify-between items-center">
          <figure className="card-banner img-holder" style={{ '--width': 250, '--height': 774 }}>
            <img
              src={appoinBanner1}
              width="250"
              height="774"
              loading="lazy"
              alt=""
              className="img-cover"
            />
          </figure>

          <div className="card-content p-8">
            <h2 className="text-3xl font-bold mb-4">Make Appointment</h2>
            <p className="text-gray-600 mb-8">
              Book your appointment today and get a chance to win a free service.
            </p>

            <form onSubmit={handleSubmit} className="appoin-form">
              <div className="input-wrapper mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  required
                  className="input-field w-full p-2 mb-4 border border-gray-300 rounded"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="input-field w-full p-2 mb-4 border border-gray-300 rounded"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-wrapper mb-4">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  required
                  className="input-field w-full p-2 mb-4 border border-gray-300 rounded"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <select
                  name="category"
                  className="input-field w-full p-2 mb-4 border border-gray-300 rounded"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Select category">Select category</option>
                  <option value="Beauty & Spa">Beauty & Spa</option>
                  <option value="Body Massage">Body Massage</option>
                  <option value="Shaving & Facial">Shaving & Facial</option>
                  <option value="Hair Color">Hair Color</option>
                  <option value="Hair Cutting">Hair Cutting</option>
                  <option value="Backbone Massage">Backbone Massage</option>
                  <option value="Meditation & Massage">Meditation & Massage</option>
                </select>
              </div>

              <input
                type="date"
                name="date"
                required
                className="input-field w-full p-2 mb-4 border border-gray-300 rounded"
                value={formData.date}
                onChange={handleChange}
              />

              

              <button type="submit" className="form-btn bg-amber-500 text-white px-6 py-2 rounded hover:bg-black transition-colors flex items-center gap-2">
                <span>Appointment Now</span>
                <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
              </button>
            </form>
          </div>

          <figure className="card-banner img-holder" style={{ '--width': 250, '--height': 774 }}>
            <img
              src={appoinBanner2}
              width="250"
              height="774"
              loading="lazy"
              alt=""
              className="img-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Appointment;