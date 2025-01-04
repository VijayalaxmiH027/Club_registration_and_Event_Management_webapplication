import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function FeedbackForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [club, setClub] = useState('');
    const [comments, setComments] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const emailRegex = /^(01fe\d{2}[a-z]{3}\d{3}@kletech\.ac\.in|[a-zA-Z]+@kletech\.ac\.in)$/i;

    const validateForm = () => {
        if (!name.trim()) return "Name cannot be empty.";
        if (!emailRegex.test(email)) return "Invalid email format.";
        if (!club.trim()) return "Club cannot be empty.";
        if (!comments.trim()) return "Comments cannot be empty.";
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError('');
        axios.post('http://localhost:3001/feedback', { name, email, club, comments })
            .then((res) => {
                alert(res.data);
                setSubmitted(true);
            })
            .catch((err) => console.log(err));
    };

    const styles = {
        body: {
            fontFamily: "Arial, sans-serif",
            margin: 0,
            padding: 0,
            backgroundColor: "#f9f9f9",
            overflowX: "hidden",
            paddingBottom: "60px",
        },
        container: {
            width: '100%',
            maxWidth: '500px',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid rgb(188, 16, 16)',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        title: {
            color: 'rgb(188, 16, 16)',
            fontSize: '24px',
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        input: {
            width: '95%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
        },
        textarea: {
            width: '95%',
            height: '100px',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            resize: 'none',
        },
        button: {
            backgroundColor: 'rgb(188, 16, 16)',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            fontSize: '18px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        error: {
            color: 'red',
            fontSize: '14px',
            marginBottom: '15px',
        },
        successMessage: {
            color: 'green',
            fontSize: '20px',
            margin: '20px 0',
        },
        homeButton: {
            backgroundColor: 'rgb(188, 16, 16)',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            fontSize: '18px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.body}>
            <Navbar />
            <div style={styles.container}>
                {!submitted ? (
                    <>
                        <h2 style={styles.title}>Submit Feedback</h2>
                        {error && <p style={styles.error}>{error}</p>}
                        <form style={styles.form} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                style={styles.input}
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                style={styles.input}
                                placeholder="Club"
                                value={club}
                                onChange={(e) => setClub(e.target.value)}
                                required
                            />
                            <textarea
                                style={styles.textarea}
                                placeholder="Comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                required
                            ></textarea>
                            <button
                                type="submit"
                                style={styles.button}
                            >
                                Submit
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <p style={styles.successMessage}>Feedback submitted successfully!</p>
                        {/* <button
                            style={styles.homeButton}
                            onClick={() => window.location.href = '/homepage'}
                        >
                            Back
                        </button> */}
                    </>
                )}
            </div>
            <footer style={{ padding: '20px', backgroundColor: '#9b111e', color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>
                <p style={{ fontSize: '14px', margin: 0 }}>© 2025 KLE Technological University | <a href="https://www.kletech.ac.in" style={{ color: '#ffffff', textDecoration: 'underline' }}>www.kletech.ac.in</a></p>
            </footer>
        </div>
    );
}

export default FeedbackForm;
