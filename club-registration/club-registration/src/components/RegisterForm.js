import React, { useState } from "react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        usn: "",
        semester: "",
        year: "",
        goals: "",
        reasons: "",
        contact: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^01fe\d{2}[a-z]{3}\d{3}@kletech\.ac\.in$/; // Email pattern
        const usnRegex = /^01FE\d{2}[A-Z]{3}\d{3}$/; // USN pattern
        const contactRegex = /^[6-9]\d{9}$/;

        // Validate email format
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email must follow the format: 01feyyxxx###@kletech.ac.in.";
        }

        // Validate USN format
        if (!usnRegex.test(formData.usn)) {
            newErrors.usn = "USN must follow the format: 01FEYYXXX### (uppercase only).";
        }

        // Check if email's USN part matches the entered USN (ignoring case)
        const emailUSNPart = formData.email.split("@")[0].toUpperCase(); // Extract USN part and convert to uppercase
        if (emailUSNPart !== formData.usn.toUpperCase()) {
            newErrors.email = "USN and Email must match (ignoring case).";
            newErrors.usn = "USN and Email must match (ignoring case).";
        }

        // Validate contact number
        if (!contactRegex.test(formData.contact)) {
            newErrors.contact = "Contact must be a valid 10-digit number.";
        }

        // Validate goals (minimum 50 words)
        if (formData.goals.trim().split(/\s+/).length < 50) {
            newErrors.goals = "Goals must contain at least 50 words.";
        }

        // Validate reasons (minimum 50 words)
        if (formData.reasons.trim().split(/\s+/).length < 50) {
            newErrors.reasons = "Reasons must contain at least 50 words.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSuccess(false);
        } else {
            setErrors({});
            try {
                const response = await fetch("http://localhost:3001/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setSuccess(true);
                    setFormData({
                        email: "",
                        usn: "",
                        semester: "",
                        year: "",
                        goals: "",
                        reasons: "",
                        contact: "",
                    });
                } else {
                    setSuccess(false);
                }
            } catch (error) {
                setSuccess(false);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            year:
                name === "semester"
                    ? value <= 2
                        ? "1"
                        : value <= 4
                        ? "2"
                        : value <= 6
                        ? "3"
                        : "4"
                    : prev.year,
        }));
    };

    const styles = {
        body: {
            fontFamily: "Arial, sans-serif",
            margin: 0,
            padding: 0,
            backgroundColor: "#f3f3f3",
        },
        container: {
            display: "flex",
            justifyContent: "center",
            padding: "50px",
        },
        formSection: {
            backgroundColor: "#a51c30",
            padding: "20px",
            borderRadius: "10px 0 0 10px",
            width: "30%",
        },
        formContainer: {
            backgroundColor: "#e9e9e9",
            padding: "20px",
            borderRadius: "0 10px 10px 0",
            width: "50%",
        },
        formGroup: {
            marginBottom: "15px",
        },
        label: {
            display: "block",
            marginBottom: "5px",
            color: "#333",
        },
        input: {
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px",
        },
        textarea: {
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px",
            resize: "none",
            height: "60px",
        },
        button: {
            backgroundColor: "#ae142b",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
            marginTop: "10px",
        },
        error: {
            color: "#e81c38",
            fontSize: "14px",
            marginTop: "5px",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formSection}></div>
            <div style={styles.formContainer}>
                <h2>Register</h2>
                {success && (
                    <div style={{ color: "green", marginBottom: "15px" }}>
                        <p>🎉 Form submitted successfully! 🎉</p>
                        <button
                            onClick={() => window.location.reload()}
                            style={styles.button}
                        >
                            Fill a New Form
                        </button>
                    </div>
                )}
                {!success && (
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="e.g., 01feyyxxx###@kletech.ac.in"
                                value={formData.email}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            {errors.email && <div style={styles.error}>{errors.email}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>USN</label>
                            <input
                                type="text"
                                name="usn"
                                placeholder="e.g., 01FEYYXXX###"
                                value={formData.usn}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            {errors.usn && <div style={styles.error}>{errors.usn}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Semester</label>
                            <input
                                type="number"
                                name="semester"
                                placeholder="e.g., 1, 2, 3..."
                                value={formData.semester}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Year</label>
                            <input
                                type="text"
                                name="year"
                                placeholder="Auto-calculated based on semester"
                                value={formData.year}
                                readOnly
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>What are your goals?</label>
                            <textarea
                                name="goals"
                                placeholder="Write at least 50 words about your goals..."
                                value={formData.goals}
                                onChange={handleChange}
                                style={styles.textarea}
                            ></textarea>
                            {errors.goals && <div style={styles.error}>{errors.goals}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Why do you want to join?</label>
                            <textarea
                                name="reasons"
                                placeholder="Write at least 50 words about why you want to join..."
                                value={formData.reasons}
                                onChange={handleChange}
                                style={styles.textarea}
                            ></textarea>
                            {errors.reasons && <div style={styles.error}>{errors.reasons}</div>}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Contact Number</label>
                            <input
                                type="text"
                                name="contact"
                                placeholder="e.g., 9876543210"
                                value={formData.contact}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            {errors.contact && <div style={styles.error}>{errors.contact}</div>}
                        </div>
                        <button style={styles.button} type="submit">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;