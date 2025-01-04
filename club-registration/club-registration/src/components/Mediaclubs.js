import React from 'react';
import Gallery from './Gallery';

// Media Club component
const Mediaclubs = () => {
  // Sample data for members and club
  const clubDetails = {
    name: "Media Club",
    description: "A club for media enthusiasts to discuss and share ideas about media, communication, and entertainment.",
    founded: "2005",
  };

  const members = [
    { id: 1, name: "John Doe", role: "President", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", role: "Vice President", email: "jane.smith@example.com" },
    { id: 3, name: "Emily Johnson", role: "Secretary", email: "emily.johnson@example.com" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.clubHeader}>
        <h1 style={styles.clubTitle}>{clubDetails.name}</h1>
        <p style={styles.clubDescription}>{clubDetails.description}</p>
        <p style={styles.clubFounded}>Founded: {clubDetails.founded}</p>
      </div>

      <div style={styles.membersSection}>
        <h2 style={styles.membersTitle}>Club Members:</h2>
        <div style={styles.membersList}>
          {members.map((member) => (
            <div key={member.id} style={styles.member}>
              <h3 style={styles.memberName}>{member.name}</h3>
              <p style={styles.memberRole}>{member.role}</p>
              <p style={styles.memberEmail}>{member.email}</p>
            </div>
          ))}
        </div>
      </div>
      <Gallery/>
    </div>
  );
};

// Stylesheet for the page
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  clubHeader: {
    background: 'linear-gradient(45deg, rgba(139, 0, 0, 0.8), rgba(165, 42, 42, 0.8))', // Maroonish red gradient with opacity
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  clubTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
    marginBottom: '10px',
  },
  clubDescription: {
    fontSize: '18px',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '1.5',
    marginBottom: '15px',
    fontStyle: 'italic',
  },
  clubFounded: {
    fontSize: '16px',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  membersSection: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center content horizontally
  },
  membersTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  membersList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center each member card horizontally
    width: '100%',
    maxWidth: '600px', // Max width for the member cards section
  },
  member: {
    backgroundColor: '#fff',
    padding: '10px',  // Reduced padding
    marginBottom: '8px',  // Reduced margin
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxHeight: '120px',  // Limit the height of the member card
    overflow: 'hidden',  // Hide overflowed content
    width: '100%', // Ensure the card takes up full width in the container
    textAlign: 'center', // Center the text within each member card
  },
  memberName: {
    fontSize: '16px',  // Reduced font size
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',  // Reduced space between name and role
  },
  memberRole: {
    fontSize: '14px',  // Reduced font size
    color: '#555',
    marginBottom: '5px',  // Reduced space between role and email
  },
  memberEmail: {
    fontSize: '12px',  // Reduced font size
    color: '#007bff',
    textOverflow: 'ellipsis',  // Add ellipsis for overflowed text
    whiteSpace: 'nowrap',  // Prevent the email text from wrapping
    overflow: 'hidden',  // Hide overflowing email text
  },
};

export default Mediaclubs;
