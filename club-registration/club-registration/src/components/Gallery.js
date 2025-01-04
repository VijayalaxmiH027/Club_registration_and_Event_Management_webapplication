import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios.get('http://localhost:3001/images')
      .then((response) => setImages(response.data.images || []))
      .catch((error) => console.error("Error fetching images:", error));
  };

  const handleAdminClick = () => {
    const password = prompt("Enter Admin Password:");
    if (password === 'kle@admin') {
      setShowUploadSection(true);
      alert("Password verified! You can now upload images.");
    } else {
      alert("Incorrect password!");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:3001/upload-image-name', formData)
      .then(() => {
        alert("Image uploaded successfully!");
        setSelectedFile(null);
        setShowUploadSection(false);
        fetchImages();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("Image upload failed!");
      });
  };

  return (
    <div>
      <h2>Image Gallery</h2>

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
            accept="image/*" 
            onChange={handleFileChange} 
            style={{ marginRight: '10px' }}
          />
          <button
            onClick={handleUpload}
            style={styles.uploadButton}
          >
            Upload
          </button>
        </div>
      )}

      <div style={styles.galleryContainer}>
        {images.length > 0 ? (
          images.map((image) => (
            image && image.image_path ? (
              <div key={image.id} style={styles.imageCard}>
                <h3>{image.image_name}</h3>
                <img 
                  src={image.image_path} 
                  alt={image.image_name} 
                  style={styles.image} 
                />
              </div>
            ) : (
              <div key={image.id}>Invalid image data.</div>
            )
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
};
const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    background: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  buttonHover: {
    background: '#007bff',
  },
  uploadSection: {
    marginTop: '20px',
  },
  uploadButton: {
    padding: '10px 20px',
    fontSize: '16px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  galleryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  },
  imageCard: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  image: {
    width: '200px',
    height: 'auto',
    objectFit: 'cover',
  },
};
export default Gallery;
