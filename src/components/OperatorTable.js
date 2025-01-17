import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './OperatorTable.css';

// Memoized table row component for better performance
const TableRow = React.memo(({ operator, onImageUpload }) => {
  const fileInputRef = useRef();
  const measurementStyle = useMemo(() => ({
    '--measurement-width': `${parseFloat(operator.measurements)}%`
  }), [operator.measurements]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <tr style={measurementStyle}>
      <td className="operator-id">{operator.id}</td>
      <td className="operator-name">{operator.name}</td>
      <td className="operator-shift">{operator.shift}</td>
      <td className="operator-image-cell">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => onImageUpload(operator.id, e)}
          style={{ display: 'none' }}
        />
        {operator.image ? (
          <img
            src={operator.image}
            alt={`${operator.name}'s profile`}
            className="operator-image"
            onClick={handleImageClick}
            loading="lazy"
          />
        ) : (
          <button
            className="upload-image-btn"
            onClick={handleImageClick}
          >
            Upload Image
          </button>
        )}
      </td>
      <td className="operator-measurements">{operator.measurements}</td>
    </tr>
  );
});

TableRow.displayName = 'TableRow';

const OperatorTable = () => {
  const [operators, setOperators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingImage, setProcessingImage] = useState(false);

  // Simulate initial data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOperators([
        {
          id: "OP001",
          name: "John Smith",
          shift: "Morning",
          measurements: "98.5%",
          image: null
        },
        {
          id: "OP002",
          name: "Jane Doe",
          shift: "Evening",
          measurements: "97.2%",
          image: null
        },
        {
          id: "OP003",
          name: "Mike Johnson",
          shift: "Night",
          measurements: "96.8%",
          image: null
        }
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Handle image upload and OCR
  const handleImageUpload = async (operatorId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProcessingImage(true);

    try {
      // Create URL for image preview
      const imageUrl = URL.createObjectURL(file);

      // Perform OCR on the image
      const { data: { text } } = await Tesseract.recognize(
        file,
        'eng',
        { logger: m => console.log(m) }
      );

      // Extract measurement (assuming it's a percentage)
      const measurementMatch = text.match(/(\d+\.?\d*)%/);
      const measurement = measurementMatch ? measurementMatch[0] : "0%";

      // Update operator data
      setOperators(prev =>
        prev.map(op =>
          op.id === operatorId
            ? { ...op, image: imageUrl, measurements: measurement }
            : op
        )
      );
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setProcessingImage(false);
    }
  };

  // Memoized table header
  const TableHeader = useMemo(() => (
    <thead>
      <tr>
        <th>Operator ID</th>
        <th>Operator Name</th>
        <th>Shift</th>
        <th>Image</th>
        <th>Measurements</th>
      </tr>
    </thead>
  ), []);

  if (isLoading || processingImage) {
    return (
      <div className="operator-table-container">
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>{processingImage ? 'Processing Image...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="operator-table-container">
      <div className="operator-table-header">
        <h2>Operator Details</h2>
      </div>
      <div className="operator-table-content">
        <table className="operator-table">
          {TableHeader}
          <tbody>
            {operators.map(operator => (
              <TableRow 
                key={operator.id} 
                operator={operator} 
                onImageUpload={handleImageUpload}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(OperatorTable);