// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import SettingsModal from './SettingsModal'; // Import the SettingsModal component

function Navbar({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
    // You might want to add additional logout logic here, such as clearing local storage or calling a logout API
  };

  const handleSettingsClick = () => {
    <SettingsModal /> 
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Simple Invoice in React</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={    <SettingsModal />                   } 
                >
                  Settings
                </a>
              </li>            </li>
          </ul>
        </div>
        <div id="user-container" className="dropdown">
          <button type="button" className="dropdown-toggle btn btn-sm btn-info text-light rounded-pill fw-bold fs-6 px-4" data-bs-toggle="dropdown" aria-expanded="false">
            {user} <i className="fas fa-angle-down"></i>
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item fw-bold" href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
