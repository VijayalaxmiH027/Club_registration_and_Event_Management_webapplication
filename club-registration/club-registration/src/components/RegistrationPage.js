import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistrationPage() {
  const location = useLocation();
  const event = location.state?.event;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    usn: '',
    email: '',
    year: '',
    branch: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      email: name === 'usn' ? `${value}@kletech.ac.in` : prevState.email,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim() || !/^[a-zA-Z\s]{3,}$/.test(formData.name))
      newErrors.name = 'Name must contain only alphabets, with at least 3 characters.';
    if (!formData.age || formData.age < 18 || formData.age > 30)
      newErrors.age = 'Age must be between 18 and 30.';
    if (!/^(\d{2}FE(21|22|23|24)(BCS|BEC|BEE|BRE|BME|CAI)\d{3})$/i.test(formData.usn))
      newErrors.usn = 'Wrong USN format.';
    if (!formData.email || formData.email !== `${formData.usn}@kletech.ac.in`)
      newErrors.email = 'Email must match the USN and end with @kletech.ac.in.';
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = 'Phone number must be a 10-digit number.';
    if (!formData.branch) newErrors.branch = 'Please select your branch.';
    if (!formData.year) newErrors.year = 'Please select your year.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
 
    setIsSubmitting(true);

    try {
      console.log('Submitting:', { event, formData });

      const response = await axios.post('http://localhost:3001/api/register', {
        event,
        formData,
      });

      console.log('Response:', response);

      if (response.status === 200) {
        navigate('/confirmation', {
          state: { formData, event },
        });
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: { maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#E3D9D9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' },
    heading: { textAlign: 'center', marginBottom: '20px' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px' },
    input: { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' },
    select: { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' },
    button: { width: '100%', padding: '10px', backgroundColor: '#9B111E', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' },
    errorText: { color: 'red', fontSize: '14px', marginTop: '5px' },
    
  };

  const branches = ['Computer Science and Engineering', 'Electrical Engineering', 'Electronics and Communication Engineering', 'Civil Engineering', 'Robotics Engineering', 'Mechanical Engineering', 'Computer Science and AI Engineering'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Registration Page</h2>
      {event && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h3>Registering for: {event.name}</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Name', type: 'text', name: 'name' },
          { label: 'Age', type: 'number', name: 'age' },
          { label: 'Phone', type: 'tel', name: 'phone' },
          { label: 'USN', type: 'text', name: 'usn' },
          { label: 'Email', type: 'email', name: 'email', disabled: true },
        ].map(({ label, type, name, disabled }) => (
          <div style={styles.formGroup} key={name}>
            <label style={styles.label}>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              style={styles.input}
              disabled={disabled}
              required
            />
            {errors[name] && <span style={styles.errorText}>{errors[name]}</span>}
          </div>
        ))}
        <div style={styles.formGroup}>
          <label style={styles.label}>Year</label>
          <select name="year" value={formData.year} onChange={handleChange} style={styles.select}>
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.year && <span style={styles.errorText}>{errors.year}</span>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Branch</label>
          <select name="branch" value={formData.branch} onChange={handleChange} style={styles.select}>
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          {errors.branch && <span style={styles.errorText}>{errors.branch}</span>}
        </div>
        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      
    </div>
  );
}

export default RegistrationPage;
