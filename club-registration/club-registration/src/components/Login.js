import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import backgroundImage from "../assets/kle_Img.jpg";


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usernameRegex =
        /^(01fe\d{2}[a-z]{3}\d{3}@kletech\.ac\.in|[a-zA-Z]+@kletech\.ac\.in)$/i;

      if (!username || !password || !usernameRegex.test(username)) {
        alert("Please enter a correct username or password.");
        return;
      }

      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      // Assuming the API returns a token and user details
      const { token, user } = response.data;

      // Save token and user details in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to home page
      navigate("/homepage");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password. Please try again.");
    }
  };

  const sendEmail = () => {
    const email = prompt("Enter your registered email ID:");
    if (email) {
      alert(`A reset link will be sent to ${email}`);
    } else {
      alert("Email ID is required to reset your credentials.");
    }
  };

  return (
    <div style={loginStyles.body}>
      <div style={loginStyles.container}>
        <p style={loginStyles.heading}>Please enter your details</p>
        <form style={loginStyles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={loginStyles.input}
            placeholder="username"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={loginStyles.input}
            placeholder="password"
          />
          <button type="submit" style={loginStyles.button}>
            Login
          </button>
        </form>
        <div style={loginStyles.linksContainer}>
          <a href="/" onClick={sendEmail} style={loginStyles.link}>
            Forget Username or Password?
          </a>
          <span style={loginStyles.separator}>|</span>
          <a href="/signup" style={loginStyles.signUpLink}>
            Don't have an account? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;

// Define styles as a JavaScript object
const loginStyles = {
  body: {
    backgroundImage: `url(${backgroundImage})`,
    fontFamily: "'Courier New', Courier, monospace",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    margin: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "auto",
    width: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid gray",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.3)",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    width: "100%",
    height: "30px",
    border: "1px solid black",
    borderRadius: "5px",
    marginBottom: "20px",
    padding: "5px",
    fontSize: "16px",
    background: "rgba(255, 255, 255, 0.5)",
  },
  button: {
    backgroundColor: "rgb(250, 71, 71)",
    height: "30px",
    width: "100px",
    borderRadius: "5px",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
    fontSize:"15px",
    alignSelf: "center",
  },
  heading: {
    fontSize: "24px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    color: "black",
    marginBottom: "20px",
  },
  linksContainer: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    fontSize: "16px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    color: "black", // Default link color
    textDecoration: "none",
    cursor: "pointer",
  },
  signUpLink: {
    fontSize: "16px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    color: "#8B0000", // Different color for Sign Up link
    textDecoration: "none",
    cursor: "pointer",
  },
  separator: {
    margin: "0 10px",
    fontSize: "16px",
    color: "black",
  },
};
