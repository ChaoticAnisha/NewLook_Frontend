import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const ServiceCard = ({ icon, title, description, filter }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="text-4xl text-yellow-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">
        <a href="#" className="hover:text-yellow-500">{title}</a>
      </h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href="#"
        className="text-yellow-500 hover:text-yellow-700"
        onClick={(e) => {
          e.preventDefault();
          navigate('/pricing', { state: { selectedCategory: filter } });
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
};
const Services = () => {
  const services = [
    {
      icon: "💇‍♂️",
      title: "Hair Cutting Style",
      description: "We have some of the most passionate hairdressing talents in Barrie and we are ready to help you find that new look.",
      filter: "hair-cutting"
    },
    {
      icon: "🎨",
      title: "Hair Coloring",
      description: "Achieve the perfect hair color to complement your unique style.",
      filter: "hair-coloring"
    },
    {
      icon: "💆‍♀️",
      title: "Beauty & Spa",
      description: "Restore your natural beauty with our holistic spa treatments.",
      filter: "beauty-spa"
    },
    {
      icon: "✂️",
      title: "Shaving & Facial",
      description: "Experience the ultimate grooming experience with our expert shaving services.",
      filter: "shaving-facial"
    },
    {
      icon: "💆",
      title: "Body Massage",
      description: "Relax and rejuvenate with our professional massage therapy services.",
      filter: "body-massage"
    },
    {
      icon: "🧘",
      title: "Meditation & Massage",
      description: "Find inner peace and physical relaxation with our meditation and massage services.",
      filter: "meditation-massage"
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            filter={service.filter}
          />
        ))}
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};
export default Services;