import { useState, useEffect } from 'react';
import { Eye, EyeOff, Camera, Calendar } from 'lucide-react';
import mainBg from '/assets/images/main.jpg';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAppointments, setIsLoadingAppointments] = useState(false)
      const [appointmentsError, setAppointmentsError] = useState("")
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    profileImage: null
  });
  console.log("The form data before fetch is", formData);
  const [appointments, setAppoinements] = useState([]);
useEffect(() => {
  console.log("The use effect is called");
  const fetchUser = async () => {
    console.log("The fetchUser function is called");
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log("The user response is is", response);
       if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      const { id ,fullname, email, phone_number, username } = data;
      setFormData({name: fullname, email, phone: phone_number, username })
      localStorage.setItem("userId", id);
      console.log(fullname, email, phone_number, username); 
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchUserAppoinements = async () => {
    setIsLoadingAppointments(true)
    setAppointmentsError("")
    try{
      const id = localStorage.getItem("userId");
      console.log("The user id in fetch appointments is", id);
      console.log("The appointmen url is", `http://localhost:5000/api/users/appointments/${id}`);
      const response = await fetch(`http://localhost:5000/api/users/appointments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      setAppoinements(data);
      console.log(data);
    }catch(error){
      console.log(error.message);
    }finally{
      setIsLoadingAppointments(false)
    }
  }
  const fetchData = async () => {
    await fetchUser();
    console.log("The form data after fetch is", formData);
    await fetchUserAppoinements();
  };
  fetchData();
}, []); // Dependency array to run once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

   const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "text-amber-600 bg-amber-50 border-amber-200"
      case "completed":
        return "text-green-600 bg-green-50 border-green-200"
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const deleteAppointment = async (appointmentId) => {
    try {
      console.log(`Attempting to delete appointment with id: ${appointmentId}`);
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
  
      console.log(`Appointment with id: ${appointmentId} deleted successfully`);
  
      // Remove the deleted appointment from the local state
      setAppoinements((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.log(`Error deleting appointment: ${error.message}`);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-16"
      style={{ 
        backgroundImage: `url(${mainBg})`,
      }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative w-full max-w-2xl mx-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-6 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Your Profile</h2>
            <p className="text-sm opacity-90">Manage your account information</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-500">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-4xl text-gray-400">
                        {formData.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-amber-500 rounded-full p-2 cursor-pointer hover:bg-amber-600 transition-colors">
                    <Camera size={20} className="text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <span className="inline-block animate-pulse">Saving...</span>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
            
           
            {/* Appointments Section */}
            <div className="mt-12 border-t pt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  My Appointments
                </h3>
              </div>

              {isLoadingAppointments ? (
                <div className="text-center py-8">
                  <div className="animate-pulse text-gray-500">Loading appointments...</div>
                </div>
              ) : appointmentsError ? (
                <div className="text-center py-8">
                  <div className="text-red-500">{appointmentsError}</div>
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No appointments found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-shadow gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Calendar className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{appointment.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{formatDate(appointment.date)}</p>
                          <p className="text-sm text-gray-500">Category: {appointment.category}</p>
                          <p className="text-sm text-gray-500">Phone: {appointment.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Created: {new Date(appointment.createdAt).toLocaleDateString()}
                        </span>
                        {appointment.status.toLowerCase() === "cancelled" && (
                          <button
                            onClick={() => deleteAppointment(appointment.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;