import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

import Home from './components/Home';
import Navbar from './components/Navbar';
import SettingsModal from './components/SettingsModal';

function App() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({});
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  return (
    <Router>
      {user && <Navbar onSettingsClick={toggleSettingsModal} />}
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Register to="/register" />} />

        <Route 
          path="/" 
          element={user ? <Home user={user} settings={settings} /> : <Navigate to="/login" />} 
        />
      </Routes>
      {user && (
        <SettingsModal 
          isOpen={isSettingsModalOpen} 
          onClose={toggleSettingsModal}
          settings={settings}
          onSave={(newSettings) => {
            setSettings(newSettings);
            toggleSettingsModal();
          }}
        />
      )}
    </Router>
  );
}

export default App;