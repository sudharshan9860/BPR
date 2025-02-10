import React, { useState } from 'react';
import './ProductUpdate.css';

const ProductUpdate = () => {
  const [activeProduct, setActiveProduct] = useState('');
  const [productStep, setProductStep] = useState('');

  const handleProductClick = (product) => {
    setActiveProduct(product);
    setProductStep(''); // Reset product step when switching products
  };

  const handleInputChange = (event) => {
    setProductStep(event.target.value);
  };

  const getProductTitle = (product) => {
    const titles = {
      product1: 'Product AFN-1 Manufacturing Process',
      product2: 'Product AFN-2 Quality Control',
      product3: 'Product AFN-3 Final Inspection'
    };
    return titles[product] || product;
  };

  const handleSubmit = async () => {
    if (!productStep.trim()) {
      alert('Please enter product information before submitting.');
      return;
    }
    
    try {
      const productData = {
        productId: activeProduct,
        processDetails: productStep,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/product-updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product update saved successfully!');
        setProductStep(''); // Clear the form after successful submission
      } else {
        throw new Error('Failed to save product update');
      }
    } catch (error) {
      console.error('Error saving product update:', error);
      alert('Failed to save product update. Please try again.');
    }
  };

  return (
    <div className="product-step-section">
      <h3>Update Product Step</h3>
      <div className="sub-tabs">
        <button
          className={`sub-tab-button ${activeProduct === 'product1' ? 'active' : ''}`}
          onClick={() => handleProductClick('product1')}
        >
          AFN-1
        </button>
        <button
          className={`sub-tab-button ${activeProduct === 'product2' ? 'active' : ''}`}
          onClick={() => handleProductClick('product2')}
        >
          AFN-2
        </button>
        <button
          className={`sub-tab-button ${activeProduct === 'product3' ? 'active' : ''}`}
          onClick={() => handleProductClick('product3')}
        >
          AFN-3
        </button>
      </div>

      {activeProduct && (
        <div className="animated-content">
          <h4>{getProductTitle(activeProduct)}</h4>
          <textarea
            value={productStep}
            onChange={handleInputChange}
            placeholder={`Enter detailed information for ${getProductTitle(activeProduct)}...`}
            className="animated-textarea"
          />
          <div className="buttons-container">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpdate;
