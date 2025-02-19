
// src/components/admin/services/ServiceForm.jsx
import React, { useState } from 'react';

const ServiceForm = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    icon: service?.icon || '',
    title: service?.title || '',
    description: service?.description || '',
    filter: service?.filter || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Icon</label>
        <input
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
      {/* ... rest of the form fields ... */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-amber-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-amber-600"
        >
          {service ? 'Update' : 'Add'} Service
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;