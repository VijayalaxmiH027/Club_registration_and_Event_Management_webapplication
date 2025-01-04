import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import d1 from "../assets/drama.jpeg";
import aero from "../assets/aerokle.jpeg";
import upsc from "../assets/upsc.jpeg";
import cc from "../assets/cc.jpeg";
import Navbar from './Navbar';

function Homepage() {
  const events = [
    { title: 'Annual Showcase' },
    { title: 'Code & Hackathon' },
    { title: 'Cultural Fest' },
    { title: 'Sports Meet' },
    { title: 'Drama meet' },
    { title: 'Dance Meet' },
    { title: 'Music Meet' },
    { title: 'KannadaClub Meet' },
  ];
  const [clubs, setClubs] = useState([
    { id: 1, name: 'Drama Club', description: 'Bringing Stories to Life: Acting, Expression, and Creativity', image: d1, link: '/drama' },
    { id: 2, name: 'UPSC Club', description: 'Empowering Aspirants, Shaping Future Leaders', image: upsc, link: '/upsc' },
    { id: 3, name: 'Aerokle Club', description: 'Explores aerospace and mechanical engineering concepts.', image: aero, link: '/aerokle' },
    { id: 4, name: 'Code Club', description: 'Turning Ideas into Applications: Learn, Build, Innovate', image: cc, link: '/code' },
  ]);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordPrompt, setPasswordPrompt] = useState(false);

  const handleAdminAccess = () => {
    setPasswordPrompt(true);
  };

  const verifyPassword = (password) => {
    if (password === 'kle@admin') {
      setIsAdmin(true);
    }
    setPasswordPrompt(false);
  };

  const addClub = () => {
    const name = prompt('Enter Club Name:');
    const description = prompt('Enter Club Description:');
    const image = prompt('Enter Club Image Path (relative to assets folder):');
    const link = prompt('Enter Club Link:');

    if (name && description && image && link) {
      setClubs([...clubs, { id: Date.now(), name, description, image: require(`../assets/${image}`), link }]);
    } else {
      alert('All fields are required to add a new club.');
    }
  };

  const updateClub = () => {
    const clubId = parseInt(prompt('Enter Club ID to update:'));
    const club = clubs.find((c) => c.id === clubId);
    if (club) {
      const name = prompt('Enter New Club Name:', club.name);
      const description = prompt('Enter New Club Description:', club.description);
      const image = prompt('Enter New Club Image Path (relative to assets folder):', club.image);
      const link = prompt('Enter New Club Link:', club.link);

      setClubs(clubs.map((c) => (c.id === clubId ? { ...c, name, description, image: require(`../assets/${image}`), link } : c)));
    } else {
      alert('Club not found.');
    }
  };

  const removeClub = () => {
    const clubId = parseInt(prompt('Enter Club ID to remove:'));
    if (clubs.find((c) => c.id === clubId)) {
      setClubs(clubs.filter((c) => c.id !== clubId));
    } else {
      alert('Club not found.');
    }
  };

  return (
    <div className="homepage" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', margin: 0, padding: 0 }}>
       {/* Navbar Section */}
       <Navbar />

      <div className="border-bar" style={{ width: '100%', height: '5px', backgroundColor: '#9b111e', margin: '10px 0' }}></div>

      {/* Clubs Section */}
      <section id="clubs" className="clubs-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <h2 style={{ fontSize: '24px', color: '#9b111e', margin: '20px 0', textAlign: 'center' }}>Clubs</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
          {clubs.map((club) => (
            <Link to={club.link} style={{ textDecoration: 'none' }} key={club.id}>
              <div style={{
                width: '250px',
                height: '350px',
                padding: '20px',
                backgroundColor: '#FAF0F1',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                cursor: 'pointer',
              }}>
                <img src={club.image} alt="Club" style={{
                  width: '220px',
                  height: '220px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '10px',
                }} />
                <h3 style={{ fontSize: '20px', color: '#9b111e', marginBottom: '10px' }}>{club.name}</h3>
                <p style={{ fontSize: '14px', color: '#6c757d' }}>{club.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <h2 style={{ fontSize: '24px', color: '#9b111e', margin: '20px 0', textAlign: 'center' }}>Upcoming Events</h2>
        <div className="horizontal-scroll" style={{ display: 'flex', overflowX: 'auto', gap: '20px', padding: '10px 0' }}>
          {events.map((event, index) => (
            <div className="event-card" key={index} style={{ flex: '0 0 auto', minWidth: '150px', padding: '15px', backgroundColor: '#faf0f1', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>
              <h3>{event.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Why This Page Section */}
      <section className="why-page" style={{ margin: '20px auto', padding: '20px', backgroundColor: '#faf0f1', borderRadius: '10px', color: '#9b111e', fontSize: '18px', textAlign: 'justify' }}>
        <h2 style={{ fontSize: '24px', color: '#9b111e', margin: '20px 0', textAlign: 'center' }}>Why This Page?</h2>
        <p>
          The Campus Club Registration and Events Management System is a platform that connects
          students with campus clubs and events. It allows students to explore clubs, register for
          events, and stay updated on campus activities. With features like QR codes for easy event
          entry and feedback options, the system simplifies student engagement and fosters a connected
          campus community. This tool helps students discover new interests, join communities, and
          make the most of their college experience.
        </p>
      </section>
        {/* Admin Section */}
      {isAdmin ? (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#faf0f1' }}>
          <h3 style={{ color: '#9b111e' }}>Admin Panel</h3>
          <button onClick={addClub} style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#9b111e', color: 'white' }}>Add Club</button>
          <button onClick={updateClub} style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#9b111e', color: 'white' }}>Update Club</button>
          <button onClick={removeClub} style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#9b111e', color: 'white' }}>Remove Club</button>
          <button onClick={() => setIsAdmin(false)} style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#6c757d', color: 'white' }}>Back</button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <button onClick={handleAdminAccess} style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#9b111e', color: 'white' }}>Admin Access</button>
        </div>
      )}

      {/* Password Prompt */}
      {passwordPrompt && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            onKeyDown={(e) => {
              if (e.key === 'Enter') verifyPassword(e.target.value);
            }}
            style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
      )}
       {/* Footer Section */}
      <footer style={{ padding: '20px', backgroundColor: '#9b111e', color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>
         <p style={{ fontSize: '14px', margin: 0 }}>© 2025 KLE Technological University | <a href="https://www.kletech.ac.in" style={{ color: '#ffffff', textDecoration: 'underline' }}>www.kletech.ac.in</a></p>
       </footer>
      
    </div>
  );
}

export default Homepage;
