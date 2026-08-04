import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Blogs from './pages/Blogs';
import Shop from './pages/Shop';
import Inquiry from './pages/Inquiry';
import Dashboard from './pages/Dashboard';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen bg-[#070b12] text-gray-500 text-center py-24">Loading application...</div>;
  return user && user.role === 'admin' ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/inquiry" element={<Inquiry />} />
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
