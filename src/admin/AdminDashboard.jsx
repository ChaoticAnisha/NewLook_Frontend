
import { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import { Plus, Edit2, Trash2, Users, Calendar, Settings } from 'lucide-react';
import StatusDropdown from './components/StatusDropdown.jsx';



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
Sidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};


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
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Filter</label>
        <input
          type="text"
          value={formData.filter}
          onChange={(e) => setFormData({ ...formData, filter: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
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
ServiceForm.propTypes = {
  service: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    filter: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
const AdminDashboard = () => {
  const initialServices = [
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
    }
  ];

  const [services, setServices] = useState(initialServices);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

   
  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
     try{
       const appointmentsResponse = await fetch('http://localhost:5000/api/appointments', {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const appointmentsData = await appointmentsResponse.json();
        console.log("The appointment data is",appointmentsData)
        setAppointments(appointmentsData);
     }
    catch(err){
      setError(err.message);
      console.error('Error fetching dashboard data:', err.message);
    } finally {
      setIsLoading(false);
    }
  }
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
  //fetch user
        const usersResponse = await fetch('http://localhost:5000/api/users/admin/users', {
          method: "GET",
          headers: {
            'Content-Type' : 'application/json',
            'authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const usersData = await usersResponse.json();
        console.log("The user response is", usersData)
        setUsers(usersData);

      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard data:', err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
     fetchAppointments();
  }, []);

  const handleAddService = (serviceData) => {
    const newService = {
      ...serviceData,
      id: Date.now().toString() // generate unique IDs
    };
    setServices([...services, newService]);
    setIsAddingService(false);
  };

  const handleUpdateService = (updatedData) => {
    setServices(services.map(service => 
      service.id === editingService.id ? { ...updatedData, id: service.id } : service
    ));
    setEditingService(null);
  };

  const handleDeleteService = (serviceId) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Total Services</h3>
              <Settings className="text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-amber-500 mt-2">{services.length}</p>
            <p className="text-sm text-gray-500 mt-2">Active services</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Appointments</h3>
              <Calendar className="text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-amber-500 mt-2">
              {appointments.length > 0 ? appointments.filter(apt => apt.status === 'pending').length : 0}
            </p>
            <p className="text-sm text-gray-500 mt-2">Pending appointments</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Users</h3>
              <Users className="text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-amber-500 mt-2">{users.length}</p>
            <p className="text-sm text-gray-500 mt-2">Registered users</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Services</h2>
        <button
          onClick={() => setIsAddingService(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      {(isAddingService || editingService) && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h3>
          <ServiceForm
            service={editingService}
            onSubmit={editingService ? handleUpdateService : handleAddService}
            onCancel={() => {
              setIsAddingService(false);
              setEditingService(null);
            }}
          />
        </div>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
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
                  onClick={() => setEditingService(service)}
                  className="p-2 text-gray-600 hover:text-amber-500 transition-colors"
                  aria-label="Edit service"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  aria-label="Delete service"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
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
            
          <StatusDropdown 
                        appointmentId={appointment.id}
                        status={appointment.status}
                        
            />
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
      No appointments found.
    </td>
  </tr>
)}

          </tbody>
        </table>
      </div>
    </div>
  );
{/* <button
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            appointment.status === 'pending' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'
          }`}
        >
          {appointment.status}
        </button> */}
  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Users</h2>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="w-full md:w-64 md:min-h-screen bg-gray-800">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      <main className="flex-1 min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'services' && 'Service Management'}
              {activeTab === 'appointments' && 'Appointment Schedule'}
              {activeTab === 'users' && 'User Management'}
            </h1>
          </div>
        </header>

        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'services' && renderServices()}
            {activeTab === 'appointments' && renderAppointments()}
            {activeTab === 'users' && renderUsers()}
          </div>

          {error && (
            <div className="fixed bottom-4 right-4 max-w-sm bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading dashboard data...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
