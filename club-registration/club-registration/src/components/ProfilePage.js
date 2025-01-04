import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } 
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.body}>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <h2>Profile Page</h2>
          </div>
          <div className="profile-image">
            <img
              src={require('../assets/profileLogo.jpg')}  // Use the correct path for the image
              alt="User Avatar"
            />
          </div>
          <div className="user-name">
            <h3>
              {user.first_name} {user.last_name}
            </h3>
          </div>
          <div className="profile-content">
            <div className="user-details-box">
              <div className="user-info">
                <div className="info-item">
                  <label>Email: <span>{user.email}</span></label>
                  
                </div>
                <div className="info-item">
                  <label>Phone Number: <span>{user.phone_number}</span></label>
                  
                </div>
                <div className="info-item">
                  <label>Semester: <span>{user.semester}</span></label>
                 
                </div>
                <div className="info-item">
                  <label>USN:  <span>{user.usn}</span></label>
                
                </div>
              </div>
            </div>
          </div>
          <div className="profile-options">
            <button className="option-box" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer style={{ padding: '20px', backgroundColor: '#9b111e', color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2025 KLE Technological University | <a href="https://www.kletech.ac.in" style={{ color: '#ffffff', textDecoration: 'underline' }}>www.kletech.ac.in</a></p>
      </footer>
    </div>
  );
};

// Styles for the Profile Page
const styles = `
  .profile-page {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .profile-container {
    width: 60%;
    max-width: 900px;
    height: auto;
    border-radius: 10px;
    padding: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .profile-header h2 {
    font-size: 2em;
    color: #333;
  }

  .profile-image {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .profile-image img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-name {
    text-align: center;
    margin-bottom: 30px;
  }

  .user-name h3 {
    font-size: 1.5em;
    color: #333;
  }

  .profile-content {
    display: flex;
    justify-content: center;
  }

  .user-details-box {
    width: 60%;
    padding: 20px;
    background-color: #faf0f1;
    border-radius: 8px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .info-item {
    margin-bottom: 15px;
  }

  .info-item label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  .info-item span {
    font-size: 1.1em;
    padding: 8px;
    border-radius: 4px;
  }

  .profile-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    align-items: center;
  }

  .option-box {
    width: 80%;
    padding: 15px;
    font-size: 1.2em;
    background-color: rgb(223, 113, 97);
    color: black;
    border: 2px solid #ccc;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .option-box:hover {
    background-color: rgb(82, 225, 144);
    color: white;
  }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ProfilePage;
