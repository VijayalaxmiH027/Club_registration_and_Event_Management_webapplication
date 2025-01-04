import React from 'react';

function HowToParticipate() {
  const steps = [
    {
      number: 1,
      title: 'Choose an Event',
      description: 'Select the event you\'d like to attend or participate in from the available options.',
    },
    {
      number: 2,
      title: 'Click "Register Now"',
      description: 'Click the "Register Now" button on the event page to start your registration process.',
    },
    {
      number: 3,
      title: 'Fill the Details',
      description: 'Enter all Details correctly ',
    },
    {
      number: 4,
      title: 'Get Confirmation',
      description: 'Once registered, you\'ll receive a confirmation message and all the details you need for the event.',
    },
  ];

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
    },
    stepsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
    step: {
      display: 'flex',
      alignItems: 'flex-start',
      backgroundColor: '#E3D9D9',
      padding: '20px',
      borderRadius: '8px',
      width: '80%',
      maxWidth: '500px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    stepNumber: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#9B111E',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '15px',
    },
    stepContent: {
      textAlign: 'left',
    },
    stepTitle: {
      margin: '0',
      fontSize: '18px',
    },
    stepDescription: {
      margin: '5px 0 0',
      fontSize: '14px',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <h2>How to Participate?</h2>
      <p>Participating in events is easy! Follow these steps:</p>
      <div style={styles.stepsContainer}>
        {steps.map((step) => (
          <div key={step.number} style={styles.step}>
            <div style={styles.stepNumber}>{step.number}</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDescription}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowToParticipate;
