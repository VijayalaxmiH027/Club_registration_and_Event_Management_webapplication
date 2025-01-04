import React from 'react';
import Logo from "../assets/kle_Img.jpg";

const CodeClub = () => {
  const clubDetails = {
    name: "Code Club",
    description: "Fosters programming skills through coding challenges and hackathons.",
    founded: "2015",
    logo: Logo,
  };

  const members = [
    { id: 1, name: "Samir Khan", role: "President", email: "samir@example.com" },
    { id: 2, name: "Priya Mehta", role: "Vice President", email: "priya@example.com" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.clubHeader}>
        <div style={styles.logoContainer}>
          <img src={clubDetails.logo} alt="Club Logo" style={styles.clubLogo} />
        </div>
        <div style={styles.clubText}>
          <h1 style={styles.clubTitle}>{clubDetails.name}</h1>
          <p style={styles.clubDescription}>{clubDetails.description}</p>
          <p style={styles.clubFounded}>Founded: {clubDetails.founded}</p>
        </div>
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
    </div>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#f9f9f9', fontFamily: 'Arial, sans-serif' },
  clubHeader: {
    background: 'linear-gradient(45deg, rgba(0, 51, 102, 0.8), rgba(0, 0, 128, 0.8))',
    padding: '30px', borderRadius: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  logoContainer: { marginLeft: '120px',marginRight:'-220px' },  // Adjust margin for logo placement
  clubLogo: { width: '200px', height: '200px' ,borderRadius:"50%"},
  clubText: { textAlign: 'center', flex: 1, margin: 'auto' },
  clubTitle: { fontSize: '36px', fontWeight: 'bold', color: '#fff' },
  clubDescription: { fontSize: '18px', color: '#fff', fontStyle: 'italic', marginBottom: '15px' },
  clubFounded: { fontSize: '16px', color: '#fff', fontWeight: 'bold' },
  membersSection: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  membersTitle: { fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '15px' },
  membersList: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px' },
  member: { backgroundColor: '#fff', padding: '10px', marginBottom: '8px', borderRadius: '8px', width: '100%', textAlign: 'center' },
  memberName: { fontSize: '16px', fontWeight: 'bold', color: '#333' },
  memberRole: { fontSize: '14px', color: '#555' },
  memberEmail: { fontSize: '12px', color: '#007bff' },
};

export default CodeClub;
