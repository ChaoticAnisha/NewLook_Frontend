const API_URL = "http://localhost:5000/api";

export const loginUser = async (credentials) => {
  console.log("The credentials are", credentials);
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const registerUser = async (userData) => {
  // Map the frontend keys to backend expected keys
  const mappedData = {
    fullname: userData.name,
    email: userData.email,
    phone_number: userData.phone,
    username: userData.username,
    password: userData.password,
  };

  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mappedData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const resetPassword = async (resetData) => {
  const response = await fetch(`${API_URL}/users/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: resetData.username,
      newPassword: resetData.newPassword,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("authToken");

  // Map frontend keys to backend expected keys
  const mappedData = {
    fullname: profileData.name,
    email: profileData.email,
    phone_number: profileData.phone,
    currentPassword: profileData.currentPassword,
    newPassword: profileData.newPassword,
  };

  const response = await fetch(`${API_URL}/users/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mappedData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};
