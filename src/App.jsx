import React from 'react';
import { Outlet, createBrowserRouter, RouterProvider, Navigate, useRouteError, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './navbar/navBar';
import Footer from './footer/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Hero from './herosection/Hero';
import Services from './services/Services';
import Appointment from './appointment/Appointment';
import Pricing from './pricing/Pricing';
import Login from './login/Login';
import Signup from './login/Signup';
import Forgot from './login/Forgot';
import About from './about/About';
import Profile from './navbar/Profile';
import AdminDashboard from './admin/AdminDashboard';

function ErrorBoundary() {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          {error.status === 404 
            ? "Sorry, the page you're looking for doesn't exist."
            : "An unexpected error occurred. Please try again later."}
        </p>
        <div className="flex justify-center">
          <a
            href="/"
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-amber-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold">NewLook Admin</h1>
              <div className="hidden md:flex space-x-4">
                <button onClick={() => navigate('/admin/dashboard')} 
                  className="hover:text-amber-200 transition-colors">
                  Dashboard
                </button>
                {/* Add more admin navigation items here */}
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-white text-amber-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

const AuthLayout = () => {
  return <Outlet />;
};

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'forgot',
        element: <Forgot />
      },
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />
      }
      // Add other admin routes here
    ]
  },
  {
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Hero />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/services',
        element: (
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        ),
      },
      {
        path: '/appointment',
        element: (
          <ProtectedRoute>
            <Appointment />
          </ProtectedRoute>
        ),
      },
      {
        path: '/pricing',
        element: (
          <ProtectedRoute>
            <Pricing />
          </ProtectedRoute>
        ),
      },
      {
        path: '/about',
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      }
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
}

export default App;