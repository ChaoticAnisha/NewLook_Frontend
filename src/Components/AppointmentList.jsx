import React from 'react';
import { Edit2, Check, Trash2 } from 'lucide-react';

const AppointmentList = ({ appointments, onEditStatus, onAccept, onDelete }) => (
  <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(appointment.date).toLocaleDateString("en-GB")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : appointment.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                <button
                  onClick={() => onEditStatus(appointment)}
                  className="text-amber-500 hover:text-amber-600 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                
                {appointment.status === 'pending' && (
                  <>
                    <button
                      onClick={() => onAccept(appointment.id)}
                      className="text-green-500 hover:text-green-600 transition-colors"
                      title="Accept"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(appointment.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
              No appointments found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default AppointmentList;