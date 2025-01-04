import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

// Import images
import event1 from "../assets/images (1).jpg";
import event2 from "../assets/images (2).jpg";
import event3 from "../assets/images (3).jpg";
import event4 from "../assets/images (6).jpg";
import event5 from "../assets/images (5).jpg";
import event6 from "../assets/images (7).jpg";
import event7 from "../assets/images (8).jpg";
import event8 from "../assets/images (9).jpg";
import event9 from "../assets/images.jpeg";
import inclusivity from "../assets/images (10).jpg";
import collaboration from "../assets/download.jpg";
import innovation from "../assets/images (11).jpg";

const AboutUs = () => {
  const navigate = useNavigate();

  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: "#f9f9f9",
      overflowX: "hidden",
      paddingBottom: "60px",
    },
    footer: {
      backgroundColor: "#a00000",
      color: "white",
      textAlign: "center",
      padding: "10px",
      position: "fixed",
      bottom: 0,
      width: "100%",
      height: "50px",
      boxShadow: "0 -5px 10px rgba(0, 0, 0, 0.1)",
    },
    navbar: {
      backgroundColor: "#a00000",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    navbarLogo: {
      display: "flex",
      alignItems: "center",
    },
    navbarLogoImg: {
      height: "40px",
      marginRight: "10px",
    },
    navbarLinks: {
      display: "flex",
      marginLeft: "50px",
    },
    navbarLink: {
      color: "white",
      textDecoration: "none",
      margin: "0 15px",
      transition: "color 0.3s",
    },
    navbarLinkHover: {
      color: "#ffcccb",
    },
    /* Carousel */
    carousel: {
      width: "80%",
      margin:"30px auto",
      overflow: "hidden",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },

    carouselSlides: {
      display: "inline-flex",
      animation: "slide 5s infinite",
    },

    slide: {
      width: "100%",
      height: "auto",
    },
    about: {
      padding: "20px",
      textAlign: "center",
    },
    joinContainer: {
      textAlign: "center",
      marginTop: "20px",
      marginBottom: "20px",
    },
    joinButton: {
      display: "inline-block",
      padding: "12px 24px",
      backgroundColor: "#a00000",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      textDecoration: "none",
      borderRadius: "8px",
      transition: "background-color 0.3s, transform 0.3s",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    values: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "40px",
    },
    valueBox: {
      textAlign: "center",
      padding: "10px",
      maxWidth: "300px",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s",
    },
    valueBoxHover: {
      transform: "translateY(-10px)",
    },
    valueImage: {
      width: "100px",
      height: "auto",
      marginBottom: "10px",
    },
    valueTitle: {
      color: "#a00000",
      marginBottom: "10px",
    },
    valueDescription: {
      fontSize: "14px",
      color: "#555",
    },
  };

  return (
    <div style={styles.body}>
      <Navbar />

      {/* Carousel Section */}
      <div style={styles.carousel}>
        <div style={styles.carouselSlides}>
          <img src={event1} alt="Event 1" style={styles.slide} />
          <img src={event2} alt="Event 2" style={styles.slide} />
          <img src={event3} alt="Event 3" style={styles.slide} />
          <img src={event4} alt="Event 4" style={styles.slide} />
          <img src={event5} alt="Event 5" style={styles.slide} />
          <img src={event6} alt="Event 6" style={styles.slide} />
          <img src={event7} alt="Event 7" style={styles.slide} />
          <img src={event8} alt="Event 8" style={styles.slide} />
          <img src={event9} alt="Event 9" style={styles.slide} />
        </div>
      </div>

      {/* About Us Section */}
      <div style={styles.about}>
        <h1 style={{ color: "#a00000", marginBottom: "20px" }}>About Us</h1>
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            lineHeight: "1.5",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Welcome to our Club and Event Management platform! Our mission is to
          connect members, organize amazing events, and foster a strong sense of
          community.
        </p>

        {/* Values Section */}
        <div style={styles.values}>
          <div
            style={{ ...styles.valueBox, ...styles.valueBoxHover }}
          >
            <img src={inclusivity} alt="Inclusivity" style={styles.valueImage} />
            <h3 style={styles.valueTitle}>Inclusivity</h3>
            <p style={styles.valueDescription}>
              We welcome everyone with open arms, ensuring everyone feels
              valued and respected.
            </p>
          </div>
          <div
            style={{ ...styles.valueBox, ...styles.valueBoxHover }}
          >
            <img src={collaboration} alt="Collaboration" style={styles.valueImage} />
            <h3 style={styles.valueTitle}>Collaboration</h3>
            <p style={styles.valueDescription}>
              Working together as a team to achieve great things and build
              lasting connections.
            </p>
          </div>
          <div
            style={{ ...styles.valueBox, ...styles.valueBoxHover }}
          >
            <img src={innovation} alt="Innovation" style={styles.valueImage} />
            <h3 style={styles.valueTitle}>Innovation</h3>
            <p style={styles.valueDescription}>
              Constantly striving for improvement and fostering creativity in
              everything we do.
            </p>
          </div>
        </div>

        <div style={styles.joinContainer}>
          <button
            onClick={() => navigate("/Homepage")}
            style={styles.joinButton}
          >
            Join Us Today!
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={{ padding: '20px', backgroundColor: '#9b111e', color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2025 KLE Technological University | <a href="https://www.kletech.ac.in" style={{ color: '#ffffff', textDecoration: 'underline' }}>www.kletech.ac.in</a></p>
      </footer>
    </div>
  );
};

export default AboutUs;
