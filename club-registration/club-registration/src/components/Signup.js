import React, { useState } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    birth_date: "",
    phone_number: "",
    semester: "",
    usn: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [isHovered, setIsHovered] = useState(false); // Define the hover state

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field !== "semester" && !formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          birth_date: "",
          phone_number: "",
          semester: "",
          usn: "",
          password: "",
          confirm_password: "",
        });
        setErrors({});
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Error submitting form");
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.formContainer,
          ...(isHovered ? styles.formContainerHover : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            { label: "First Name", name: "first_name" },
            { label: "Last Name", name: "last_name" },
            { label: "Username", name: "username", type: "email" },
            { label: "Birth Date", name: "birth_date", type: "date" },
            { label: "Phone Number", name: "phone_number" },
            { label: "Semester", name: "semester" },
            { label: "USN", name: "usn" },
            { label: "Password", name: "password", type: "password" },
            {
              label: "Confirm Password",
              name: "confirm_password",
              type: "password",
            },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} style={styles.inputGroup}>
              <label style={styles.label}>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors[name] ? styles.errorInput : {}),
                }}
              />
              {errors[name] && <p style={styles.errorText}>{errors[name]}</p>}
            </div>
          ))}
          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  formContainer: {
    width: "500px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
  },
  formContainerHover: {
    transform: "scale(1.02)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    color: "#333333",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    color: "#555555",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #dddddd",
    borderRadius: "5px",
    outline: "none",
    transition: "border 0.3s",
  },
  errorInput: {
    border: "1px solid #ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: "12px",
    marginTop: "5px",
  },
  submitButton: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#9b111e",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default SignUpForm;
