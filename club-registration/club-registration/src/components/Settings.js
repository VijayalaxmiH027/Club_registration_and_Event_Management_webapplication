import React, { useState } from 'react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Handle Dark Mode Toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
    } else {
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
    }
  };

  // Handle Report issue
  const handleReport = () => {
    alert('Report issue functionality to be added');
  };

  // Handle Contact Us
  const handleContactUs = () => {
    alert('Contact Us functionality to be added');
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h2>Settings</h2>

        <div className="setting-option">
          <label onClick={() => alert('Accessibility settings functionality to be added')}>
            <strong>Accessibility</strong>
          </label>
          <hr />
        </div>

        <div className="setting-option">
          <label onClick={toggleDarkMode}>
            <strong>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</strong>
          </label>
          <hr />
        </div>

        <div className="setting-option">
          <label onClick={handleReport}>
            <strong>Report an Issue</strong>
          </label>
          <hr />
        </div>

        <div className="setting-option">
          <label onClick={handleContactUs}>
            <strong>Contact Support</strong>
          </label>
          <hr />
        </div>
      </div>
      
      {/* Styles */}
      <style jsx>{`
        .settings-page {
          padding: 20px;
          min-height: 100vh;
          background-color: #f7f7f7;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .settings-container {
          width: 100%;
          max-width: 2000px;
          height: 90vh;
          background-color: white;
          padding: 20px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow-y: auto;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          text-align: center;
        }

        .setting-option {
          margin-bottom: 15px;
        }

        .setting-option label {
          font-size: 1.2rem;
          cursor: pointer;
          display: block;
        }

        hr {
          margin-top: 10px;
          border: 0;
          border-top: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

export default Settings;