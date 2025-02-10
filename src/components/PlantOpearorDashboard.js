import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './PlantOperatorDashboard.css';

const PlantOperatorDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const fileInputRef = useRef(null);

  const products = [
    { id: 1, name: 'Product AFN-1' },
    { id: 2, name: 'Product AFN-2' },
    { id: 3, name: 'Product AFN-3' }
  ];

  const handleImageCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert('Please take a photo first');
      return;
    }

    try {
      // Create form data for image upload
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('productId', selectedProduct?.id || '');
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
        handleRetake(); // Reset the form
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  return (
    <div className="mobile-dashboard">
      <header className="mobile-header">
        <div className="header-content">
          <button 
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          <h1>Plant Operator</h1>
          <Link to="/" className="back-link">←</Link>
        </div>
      </header>

      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h3>Product List</h3>
          <button onClick={() => setIsMenuOpen(false)} className="close-menu">×</button>
        </div>
        <div className="product-list">
          {products.map(product => (
            <button
              key={product.id}
              className={`product-item ${selectedProduct?.id === product.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedProduct(product);
                setIsMenuOpen(false);
              }}
            >
              {product.name}
            </button>
          ))}
        </div>
      </div>

      <main className="main-content">
        <div className="product-selection">
          {selectedProduct ? (
            <h2>{selectedProduct.name}</h2>
          ) : (
            <p className="select-prompt">Please select a product from the menu</p>
          )}
        </div>

        <div className="image-preview-container">
          {selectedImage ? (
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="captured-image"
            />
          ) : (
            <div className="no-image">
              <p>No image captured</p>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageCapture}
            ref={fileInputRef}
            className="hidden-input"
            id="camera-input"
          />
          
          {!selectedImage ? (
            <label htmlFor="camera-input" className="camera-button">
              📸 Take Photo
            </label>
          ) : (
            <>
              <button 
                className="retake-button"
                onClick={handleRetake}
              >
                Retake
              </button>
              <button 
                className="submit-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </main>

      {isMenuOpen && (
        <div className="overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </div>
  );
};

export default PlantOperatorDashboard;
