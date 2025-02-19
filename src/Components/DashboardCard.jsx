// src/components/admin/dashboard/DashboardCard.jsx
import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, subtitle }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <Icon className="text-amber-500" />
    </div>
    <p className="text-3xl font-bold text-amber-500 mt-2">{value}</p>
    <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
  </div>
);

export default DashboardCard;