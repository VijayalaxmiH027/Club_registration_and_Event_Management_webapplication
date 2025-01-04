import React, { useState, useEffect } from 'react';
import Logo from '../assets/kle_Img.jpg'; // Update with the actual logo path
import axios from 'axios';
import u1 from '../assets/u1.jpeg';
import u2 from '../assets/u2.jpeg';
import u3 from '../assets/u3.jpeg';
import u4 from '../assets/u4.jpeg';
import u5 from '../assets/u5.jpeg';
import u6 from '../assets/u6.jpeg';

//import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UpscClub = () => {
  const [files, setFiles] = useState([]);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(""); // New state for file name
  const [fileCaption, setFileCaption] = useState(""); // New state for file caption
  // Fetch the list of uploaded files when the component is mounted
  useEffect(() => {
    fetchFiles();
  }, []);

  // Function to fetch the list of files
  const fetchFiles = () => {
    axios.get('http://localhost:3001/files-upsc')
      .then((response) => setFiles(response.data.files || []))
      .catch((error) => console.error("Error fetching files:", error));
  };

  // Function to handle admin click and verify the password
  const handleAdminClick = () => {
    const password = prompt("Enter Admin Password:");
    if (password === 'kle@admin') {
      setShowUploadSection(true);
      alert("Password verified! You can now upload files.");
    } else {
      alert("Incorrect password!");
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(""); // Reset file name when a new file is selected
  };

  // Function to handle file name input
  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  // Function to upload the selected file
  const handleUpload = () => {
    if (!selectedFile || !fileName || !fileCaption) {
      alert("Please choose a file, enter a file name, and add a caption.");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('file_name', fileName);
    formData.append('file_caption', fileCaption); // Include caption
  
    axios.post('http://localhost:3001/upload-upsc', formData)
      .then(() => {
        alert("File uploaded successfully!");
        setSelectedFile(null);
        setFileName("");
        setFileCaption(""); // Reset caption field
        setShowUploadSection(false);
        fetchFiles(); // Refresh the file list
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("File upload failed!");
      });
  };
  

  // Function to delete a file
  const handleDelete = (fileId) => {
    axios.delete(`http://localhost:3001/delete-file-upsc/${fileId}`)
      .then(() => {
        alert("File deleted successfully!");
        fetchFiles(); // Refresh file list after deletion
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
        alert("File deletion failed!");
      });
  };

  // Sample club details and members
  const clubDetails = {
    name: "UPSC Club",
    description: "Explores aerospace and mechanical engineering concepts.",
    founded: "2015",
  };

  const members = [
    { id: 1, name: "Rohan Patel", role: "President", email: "rohan@example.com" },
    { id: 2, name: "Mira Sharma", role: "Vice President", email: "mira@example.com" },
    { id: 2, name: "Akash", role: "Media", email: "akash@example.com" },
    { id: 2, name: "Veer ", role: "Vice President", email: "veer@example.com" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.clubHeader}>
        <div style={styles.logoContainer}>
          <img src={Logo} alt="UPSC Club Logo" style={styles.clubLogo} />
        </div>
        <div style={styles.clubText}>
          <h1 style={styles.clubTitle}>{clubDetails.name}</h1>
          <p style={styles.clubDescription}>{clubDetails.description}</p>
          <p style={styles.clubFounded}>Founded: {clubDetails.founded}</p>
        </div>
      </div>

      <div style={styles.membersSection}>
        <h2 style={styles.membersTitle}>Club Members:</h2>
        <div style={styles.membersList}>
          {members.map((member) => (
            <div key={member.id} style={styles.member}>
              <h3 style={styles.memberName}>{member.name}</h3>
              <p style={styles.memberRole}>{member.role}</p>
              <p style={styles.memberEmail}>{member.email}</p>
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <h2 style={styles.updates}>Check the updates</h2>

      <button
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
        onMouseLeave={(e) => (e.target.style.background = styles.button.background)}
        onClick={handleAdminClick}
      >
        Admin
      </button>

      {showUploadSection && (
        <div style={styles.uploadSection}>
          <input
            type="file"
            accept="application/pdf"  // Only accept PDF files
            onChange={handleFileChange}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            placeholder="Enter file name"
            style={{ marginRight: '10px', padding: '5px', fontSize: '14px' }}
          />
          <input
            type="text"
            value={fileCaption}
            onChange={(e) => setFileCaption(e.target.value)}  // Update caption value
            placeholder="Enter file caption"
            style={{ marginRight: '10px', padding: '5px', fontSize: '14px' }}
          />
          <button
            onClick={handleUpload}
            style={styles.uploadButton}
          >
            Upload
          </button>
        </div>
      )}

<div style={styles.filesContainer}>
  {files.length > 0 ? (
    files.map((file) => (
      <div key={file.id} style={styles.fileRow}>
        {/* Display the caption */}
        <span style={styles.fileCaption}>{file.file_caption}</span>

        <a href={`http://localhost:3001/${file.file_path}`} target="_blank" rel="noopener noreferrer">
          <button style={styles.viewButton}>View</button>
        </a>

        <button
          style={styles.deleteButton}
          onClick={() => handleDelete(file.id)}
        >
          X
        </button>
      </div>
    ))
  ) : (
    <p>No files available.</p>
  )}
</div>

{/* // Add this in the JSX structure, right after the Members section: */}

<div style={styles.gallerySection}>
  <h2 style={styles.galleryTitle}>Image Gallery</h2>
  <div style={styles.galleryGrid}>
    <img src={u1} alt="Aero 1" style={styles.galleryImage} />
    <img src={u2} alt="Aero 2" style={styles.galleryImage} />
    <img src={u3} alt="Aero 3" style={styles.galleryImage} />
    <img src={u4} alt="Aero 4" style={styles.galleryImage} />
    <img src={u5} alt="Aero 5" style={styles.galleryImage} />
    <img src={u6} alt="Aero 6" style={styles.galleryImage} />
  </div>
</div>


    </div>
  );
};

// Styles for the AerokleClub component
const styles = {
  container: { padding: '20px', backgroundColor: '#f9f9f9', fontFamily: 'Arial, sans-serif' },
  clubHeader: {
    background: 'linear-gradient(45deg, rgba(204, 0, 0, 0.8), rgba(161, 5, 5, 0.8))',
    padding: '30px',
    borderRadius: '10px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Align items vertically
    textAlign: 'center', // Ensure text is centered
  },
  logoContainer: { marginLeft: '-300px', marginRight: '200px' },
  clubLogo: { width: '200px', height: '200px', borderRadius: "50%" }, // Adjust logo size as needed
  clubText: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  clubTitle: { fontSize: '36px', fontWeight: 'bold', color: '#fff', marginTop: '10px' }, // Added marginTop for space
  clubDescription: { fontSize: '18px', color: '#fff', fontStyle: 'italic', marginBottom: '15px' },
  clubFounded: { fontSize: '16px', color: '#fff', fontWeight: 'bold' },
  membersSection: { marginTop: '30px', textAlign: 'center' },
  membersTitle: { fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' },
  membersList: {
    display: 'grid',  // Use grid for a 2-column layout
    gridTemplateColumns: 'repeat(2, 1fr)',  // Creates two equal-width columns
    gap: '20px',  // Adds space between each member item
    justifyContent: 'center',  // Centers the grid items horizontally
    maxWidth: '800px',  // Optional: Sets a max width for the layout
    margin: '0 auto',  // Centers the grid container
  },
  member: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  memberName: { fontSize: '18px', fontWeight: 'bold' },
  memberRole: { fontSize: '14px', color: '#555' },
  memberEmail: { fontSize: '12px', color: '#007bff' },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    background: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginLeft:'120px',
  },
  updates:{
    textAlign:"center",
    },
  buttonHover: {
    background: '#007bff',
  },
  uploadSection: {
    marginTop: '20px',
  },
  uploadButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  filesContainer: {
    marginTop: '20px',
  },
  fileRow: {
    display: 'flex',
    alignItems: 'center', // Vertically align the items
    justifyContent: 'space-between', // Space the elements out across the row
    marginBottom: '10px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    marginLeft:'120px',
    marginRight:'120px',
  },
  fileCaption: {
    fontSize: '14px',
    fontWeight: 'bold',
    flex: 1, // Allow the caption to take the remaining space
  },
  viewButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px', // Add margin between the "View" and "Delete" buttons
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
 
  gallerySection: { marginTop: '40px',backgroundColor:'#ddd', borderRadius:'30px', padding:'25px' },
  galleryTitle: { fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '20px',textAlign:'center' },
  galleryGrid: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  galleryImage: { width: 'calc(33% - 10px)', height: '300px', objectFit: 'cover', borderRadius: '5px' },
};

export default UpscClub;
