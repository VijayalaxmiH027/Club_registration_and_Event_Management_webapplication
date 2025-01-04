import React from 'react';
import danceImage from '../assets/dance.jpg';
import hackathonImage from '../assets/hackathon.jpg';
import musicImage from '../assets/music.jpeg';
import academicImage from '../assets/academic.jpg';
import militaryImage from '../assets/military.png';
import photographyImage from '../assets/photography.jpg';
import literaryImage from '../assets/literary.jpeg';
import { useNavigate } from 'react-router-dom';


function PopularEvents() {
  const navigate = useNavigate();

  const events = [
    { name: 'Annual Dance Showcase', date: '15 Dec', time: '6 PM', location: 'Auditorium', image: danceImage },
    { name: 'Code & Hackathon', date: '16 Dec', time: '10 AM', location: 'Tech Lab', image: hackathonImage },
    { name: 'Music Night', date: '17 Dec', time: '8 PM', location: 'Main Stage', image: musicImage },
    { name: 'UPSC Seminar', date: '18 Dec', time: '4 PM', location: 'Lecture Hall', image: academicImage },
    { name: 'Military Career Guidance', date: '19 Dec', time: '2 PM', location: 'Conference Room', image: militaryImage },
    { name: 'Photography Workshop', date: '20 Dec', time: '3 PM', location: 'Art Center', image: photographyImage },
    { name: 'Literary Fest', date: '21 Dec', time: '10 AM', location: 'Library', image: literaryImage },
  ];

  const styles = {
    container: { margin: '20px 0', fontFamily: 'Arial, sans-serif' },
    heading: { textAlign: 'center', marginBottom: '20px' },
    scrollContainer: { display: 'flex', overflowX: 'auto', gap: '15px', padding: '10px', scrollBehavior: 'smooth' },
    card: {
      flex: '0 0 250px',
      backgroundColor: '#E3D9D9',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #ddd',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    image: { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' },
    button: {
      backgroundColor: '#9B111E',
      color: 'white',
      border: 'none',
      padding: '12px 15px',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    buttonHover: { backgroundColor: '#c9302c' },
  };

  const handleRegister = (event) => {
    navigate('/event-register', { state: { event } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Popular Events</h2>
      <div style={styles.scrollContainer}>
        {events.map((event, index) => (
          <div style={styles.card} key={index}>
            <img src={event.image} alt={event.name} style={styles.image} />
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <button
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
              onClick={() => handleRegister(event)}
            >
              Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularEvents;