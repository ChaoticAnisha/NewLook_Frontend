import { useState } from 'react';
import PropTypes from 'prop-types';

export default function StatusDropdown({ appointmentId, status: initialStatus }) {
  // Local state to manage the status
  console.log("The appointmentId is", appointmentId);
  const [status, setStatus] = useState(initialStatus);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirm":
        return "bg-green-100 text-green-800"
      case "cancel":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusUpdate = async (value) => {
    console.log("Executing handleStatusUpdate");
    console.log(`Calling the api http://localhost:5000/api/appointments/${appointmentId}`)
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ status: value })
      });

      const data = await response.json();
      console.log("the data is", data);
      if (!response.ok) {
        throw new Error(data.message);
      }

      // Update local state with the status from server
      setStatus(data.status);
      
    } catch (error) {
      console.log(error.message);
      // Revert to previous status on error
      setStatus(status);
    }
  }

  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <select
        value={status}
        onChange={(e) => handleStatusUpdate(e.target.value)}
        className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer border-none ${getStatusStyle(status)}`}
      >
        <option value="pending">pending</option>
        <option value="confirmed">confirm</option>
        <option value="cancelled">cancel</option>
      </select>
    </td>
  )
}

StatusDropdown.propTypes = {
  appointmentId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};