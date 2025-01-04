import React from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();
  const { formData, event } = location.state || {};

  if (!formData || !event) {
    return <p>Error: Missing registration data.</p>;
  }

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #E3D9D9, #FFF1F1)',
      textAlign: 'center',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#9B111E',
      textTransform: 'uppercase',
    },
    message: {
      fontSize: '18px',
      lineHeight: '1.8',
      color: '#333',
    },
    eventDetails: {
      marginTop: '20px',
      background: '#FFF',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'left',
      fontSize: '16px',
      color: '#555',
    },
    detailItem: {
      marginBottom: '10px',
    },
    highlight: {
      fontWeight: 'bold',
      color: '#9B111E',
    },
    footerMessage: {
      marginTop: '20px',
      fontSize: '16px',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Registration Successfull!</h2>
      <p style={styles.message}>
        Thank you, <span style={styles.highlight}>{formData.name}</span>, for registering for the event. Below are the details of your registration:
      </p>
      <div style={styles.eventDetails}>
        <p style={styles.detailItem}>
          <strong>Event Name:</strong> {event.name}
        </p>
        <p style={styles.detailItem}>
          <strong>Date:</strong> {event.date}
        </p>
        <p style={styles.detailItem}>
          <strong>Time:</strong> {event.time}
        </p>
        <p style={styles.detailItem}>
          <strong>Location:</strong> {event.location}
        </p>
      </div>
      <p style={styles.footerMessage}>
        We look forward to seeing you there! If you have any questions, please reach out to the event coordinator.
      </p>
    </div>
  );
}

export default ConfirmationPage;
