import React from 'react';
import HowToParticipate from './HowToParticipate';
import PopularEvents from './PopularEvents';
import sportsImage from '../assets/sports.jpg';
import culturalImage from '../assets/cultural.jpg';
import academicImage from '../assets/academic.jpg';
import technicalImage from '../assets/technical.jpeg';
import { useState } from 'react'; // Added useState import
import Navbar from './Navbar';

function EventCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: 'Sports', description: 'Competitions, marathons, and more', image: sportsImage },
    { name: 'Cultural', description: 'Dance, drama, and music performances', image: culturalImage },
    { name: 'Academic', description: 'Workshops, guest lectures, and seminars', image: academicImage },
    { name: 'Technical', description: 'Hackathons, coding competitions, and tech labs', image: technicalImage },
  ];

  const detailsData = {
    Sports: [
      { event: 'Football Tournament', date: '10th Jan', location: 'M R Sakhare Ground' },
      { event: 'Basketball Competition', date: '15th Jan', location: 'Sports Arena' },
      { event: 'Badminton Championship', date: '20th Jan', location: 'Sports Arena' },
    ],
    Cultural: [
      { event: 'Dance Showcase', date: '12th Feb', location: 'Kle Tech Auditorium' },
      { event: 'Drama Night', date: '18th Feb', location: 'Kle Tech Auditorium' },
      { event: 'Music Concert', date: '25th Feb', location: 'M R Sakhare Ground' },
    ],
    Academic: [
      { event: 'Web Development Workshop', date: '5th March', location: 'Clite Lab 1' },
      { event: 'AI ML Workshop', date: '10th March', location: 'Clite Cair Lab' },
      { event: 'Research Paper Presentation', date: '15th March', location: 'Clite Cair Lab' },
    ],
    Technical: [
      { event: 'SIH Hackathon', date: '20th April', location: 'Clite Lab 1' },
      { event: 'Coding Competition', date: '25th April', location: 'Cair Lab' },
      { event: 'DevFest', date: '30th April', location: 'Cair Lab' },
    ],
  };

  return (
    <div className="app-container">
      <Navbar/>
      <h1>Explore Our Upcoming Events</h1>
      <p>
        Discover all the exciting opportunities coming up in these event categories. Whether you're 
        interested in competitions, workshops, or shows, we have something for everyone!
      </p>
      {/* Main Categories */}
      <div className="categories-container">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <img src={category.image} alt={category.name} className="category-image" />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button onClick={() => setSelectedCategory(category.name)}>View Details</button>
          </div>
        ))}
      </div>
      
      {/* Conditional Rendering for Details */}
      {selectedCategory && (
        <div className="details-section">
          <h2>{selectedCategory} Events</h2>
          <div className="details-grid">
            {detailsData[selectedCategory].map((detail, index) => (
              <div className="event-card" key={index}>
                <div className="event-icon"></div>
                <strong>{detail.event}</strong>
                <p>
                  📅 <strong>Date:</strong> {detail.date}
                </p>
                <p>
                  📍 <strong>Location:</strong> {detail.location}
                </p>
              </div>
            ))}
          </div>
          <button onClick={() => setSelectedCategory(null)}>Back</button>
        </div>
      )}
      <HowToParticipate/>
      <PopularEvents/>

      {/* Footer Section */}
      <footer style={{ padding: '20px', backgroundColor: '#9b111e', color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2025 KLE Technological University | <a href="https://www.kletech.ac.in" style={{ color: '#ffffff', textDecoration: 'underline' }}>www.kletech.ac.in</a></p>
      </footer>
    </div>
  );
}

export default EventCategories;

// Embedded CSS
const style = document.createElement('style');
style.innerHTML = `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  .app-container {
    padding: 20px;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .categories-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 20px 0;
  }

  .category-card {
    background: #E3D9D9;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    width: 20%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    margin: 10px;
  }

  .category-card:hover {
    transform: translateY(-5px);
  }

  .category-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  button {
    background: #9B111E;
    color: white;
    border: none;
    padding: 12px 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background: #c9302c;
  }

  .details-section {
    margin-top: 20px;
    padding: 30px;
    background-color: #E3D9D9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
    width: 100%;
  }

  .event-card {
    background: linear-gradient(135deg, #9B111E,rgb(55, 1, 6));
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
  }

  .event-card:hover {
    transform: translateY(-5px);
  }

  .event-icon {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  .details-section h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #333;
  }

  .details-section button {
    margin-top: 20px;
    background: #9B111E;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .details-section button:hover {
    background: #c9302c;
  }
`;
document.head.appendChild(style);
