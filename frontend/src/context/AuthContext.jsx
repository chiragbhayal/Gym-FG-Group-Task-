import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('gym_user');
    const storedToken = localStorage.getItem('gym_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
    setToken(data.token);
    localStorage.setItem('gym_user', JSON.stringify({ _id: data._id, name: data.name, email: data.email, role: data.role }));
    localStorage.setItem('gym_token', data.token);
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
    setToken(data.token);
    localStorage.setItem('gym_user', JSON.stringify({ _id: data._id, name: data.name, email: data.email, role: data.role }));
    localStorage.setItem('gym_token', data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gym_user');
    localStorage.removeItem('gym_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
