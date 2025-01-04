import React, { useState } from 'react';
import Navbar from './Navbar';

const ContactUs = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [members, setMembers] = useState([
    {
      name: 'Akshata',
      role: 'Club President',
      email: 'akshata.n@example.com',
      phone: '+1 (555) 111-2222',
    },
    {
      name: 'Saniya',
      role: 'Event Coordinator',
      email: 'saniyas@example.com',
      phone: '+1 (555) 333-4444',
    },
    {
      name: 'Vishwanath',
      role: 'Club Secretary',
      email: 'vishwa.nath@example.com',
      phone: '+1 (555) 555-6666',
    },
  ]);
  const [newMemberDetails, setNewMemberDetails] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
  });
  const [updateIndex, setUpdateIndex] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
  });

  const handlePasswordSubmit = () => {
    if (password === 'kle@admin') {
      setIsAdmin(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleAddMember = () => {
    setMembers([...members, newMemberDetails]);
    setNewMemberDetails({ name: '', role: '', email: '', phone: '' });
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = members.filter((_, idx) => idx !== index);
    setMembers(updatedMembers);
  };

  const handleUpdateMember = () => {
    const updatedMembers = members.map((member, index) =>
      index === updateIndex ? { ...member, ...updatedDetails } : member
    );
    setMembers(updatedMembers);
    setUpdateIndex(null);
    setUpdatedDetails({ name: '', role: '', email: '', phone: '' });
  };

  return (
    <div>
      <style>{`
        body {
          font-family: 'Helvetica Neue', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f4f8;
        }

        .navbar {
          background-color: #9b111e;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar .logo {
          display: flex;
          align-items: center;
        }

        .navbar .logo img {
          height: 50px;
          margin-right: 15px;
        }

        .navbar a {
          color: white;
          text-decoration: none;
          margin: 0 20px;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .navbar a:hover {
          color: #ffcccb;
        }

        .navbar .search {
          padding: 8px;
          border: none;
          border-radius: 5px;
          background-color: #ffffff;
          font-size: 14px;
          width: 250px;
        }

        .contact {
          max-width: 900px;
          margin: 50px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .contact h1 {
          text-align: center;
          color: #9b111e;
          font-size: 36px;
          margin-bottom: 20px;
        }

        .contact p {
          font-size: 18px;
          color: #333;
          line-height: 1.6;
          text-align: center;
          margin-bottom: 30px;
        }

        .contact form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .contact form label {
          font-size: 16px;
          font-weight: bold;
          color: #555;
        }

        .contact form input,
        .contact form textarea {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          width: 100%;
          box-sizing: border-box;
        }

        .contact form button {
          background-color: #9b111e;
          color: white;
          border: none;
          padding: 15px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .contact form button:hover {
          background-color: #ff3333;
        }

        .members-container {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 30px;
          margin-top: 40px;
        }

        .member {
          background-color: #ffffff;
          padding: 20px;
          width: 280px;
          border-radius: 10px;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s ease;
        }

        .member:hover {
          transform: translateY(-10px);
        }


        .member h3 {
          color: #9b111e;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .member p {
          color: #555;
          font-size: 14px;
        }

        footer {
          background-color: #9b111e;
          color: white;
          text-align: center;
          padding: 20px;
          position: relative;
        }

        footer p {
          font-size: 14px;
          margin: 0;
        }

        footer a {
          color: #ffffff;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        footer a:hover {
          color: #ffcccb;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            text-align: center;
          }

          .navbar .search {
            margin-top: 10px;
          }

          .members-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <Navbar />

      <div className="contact">
        <div className="members">
          <h1>Meet Our Team</h1>
          <div className="members-container">
            {members.map((member, index) => (
              <div className="member" key={index}>
               
                <h3>{member.name}</h3>
                <p>
                  {member.role}
                  <br />
                  Email: {member.email}
                  <br />
                  Phone: {member.phone}
                </p>
                {isAdmin && (
                  <div>
                    <button onClick={() => handleRemoveMember(index)}>Remove</button>
                    <button
                      onClick={() => {
                        setUpdateIndex(index);
                        setUpdatedDetails({ ...member });
                      }}
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {!isAdmin ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => setIsAdmin(true)}>Admin Access</button>
            {isAdmin && (
              <div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handlePasswordSubmit}>Submit</button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button onClick={() => setIsAdmin(false)}>Remove Admin Access</button>
            <div style={{ marginTop: '20px' }}>
              <h3>Add a New Member</h3>
              <input
                type="text"
                placeholder="Name"
                value={newMemberDetails.name}
                onChange={(e) => setNewMemberDetails({ ...newMemberDetails, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Role"
                value={newMemberDetails.role}
                onChange={(e) => setNewMemberDetails({ ...newMemberDetails, role: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newMemberDetails.email}
                onChange={(e) => setNewMemberDetails({ ...newMemberDetails, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                value={newMemberDetails.phone}
                onChange={(e) => setNewMemberDetails({ ...newMemberDetails, phone: e.target.value })}
              />              
              <button onClick={handleAddMember}>Add Member</button>
            </div>

            {updateIndex !== null && (
              <div style={{ marginTop: '20px' }}>
                <h3>Update Member Details</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={updatedDetails.name}
                  onChange={(e) => setUpdatedDetails({ ...updatedDetails, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={updatedDetails.role}
                  onChange={(e) => setUpdatedDetails({ ...updatedDetails, role: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={updatedDetails.email}
                  onChange={(e) => setUpdatedDetails({ ...updatedDetails, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={updatedDetails.phone}
                  onChange={(e) => setUpdatedDetails({ ...updatedDetails, phone: e.target.value })}
                />
                <button onClick={handleUpdateMember}>Update Member</button>
              </div>
            )}
          </div>
        )}
      </div>

      <footer>
        <p>© 2025 KLE Technological University | <a href="https://www.kletech.ac.in">www.kletech.ac.in</a></p>
      </footer>
    </div>
  );
};

export default ContactUs;
