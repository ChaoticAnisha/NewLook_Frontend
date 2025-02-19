
// src/components/admin/services/ServiceCard.jsx
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const ServiceCard = ({ service, onEdit, onDelete }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{service.description}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
          {service.filter}
        </span>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(service)}
          className="p-2 text-gray-600 hover:text-amber-500 transition-colors"
          aria-label="Edit service"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(service.id)}
          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
          aria-label="Delete service"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default ServiceCard;