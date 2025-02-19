// src/components/admin/Sidebar.jsx
import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
    <div className="space-y-4">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
          activeTab === 'dashboard' ? 'bg-amber-500' : 'hover:bg-gray-700'
        }`}
      >
        Dashboard
      </button>
      <button
        onClick={() => setActiveTab('services')}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
          activeTab === 'services' ? 'bg-amber-500' : 'hover:bg-gray-700'
        }`}
      >
        Services
      </button>
      <button
        onClick={() => setActiveTab('appointments')}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
          activeTab === 'appointments' ? 'bg-amber-500' : 'hover:bg-gray-700'
        }`}
      >
        Appointments
      </button>
      <button
        onClick={() => setActiveTab('users')}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
          activeTab === 'users' ? 'bg-amber-500' : 'hover:bg-gray-700'
        }`}
      >
        Users
      </button>
    </div>
  </div>
);

export default Sidebar;







