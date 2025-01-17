import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OperatorTable from './OperatorTable';
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('productStep');
  const [activeProduct, setActiveProduct] = useState('');
  const [productStep, setProductStep] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  // Move reports inside the component
  const [reports] = useState([
    { id: 1, name: 'Report 1', timestamp: '2025-01-08T12:30:00', sample: 'AFN-2' },
    { id: 2, name: 'Report 2', timestamp: '2025-01-08T02:45:00', sample: 'AFN-3' },
    { id: 3, name: 'Report 3', timestamp: '2025-01-07T04:00:00', sample: 'AFN-1' },
  ]);

  // Move formatTimestamp function inside component
  const formatTimestamp = (timestamp) => {
    const reportDate = new Date(timestamp);
    const currentDate = new Date();
    const timeDifference = currentDate - reportDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      return reportDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return reportDate.toLocaleString('default', { month: 'short', day: 'numeric' });
    }
  };

  const handleProductClick = (product) => {
    setActiveProduct(product);
    setProductStep(''); // Reset product step when switching products
  };

  const handleInputChange = (event) => {
    setProductStep(event.target.value);
  };

  const handleSubmit = () => {
    if (!productStep.trim()) {
      alert('Please enter product information before submitting.');
      return;
    }
    console.log('Updated Step for ' + activeProduct + ':', productStep);
  };

  const getProductTitle = (product) => {
    const titles = {
      product1: 'Product AFN-1 Manufacturing Process',
      product2: 'Product AFN-2 Quality Control',
      product3: 'Product AFN-3 Final Inspection'
    };
    return titles[product] || product;
  };

  // ReportDetails Component
  const ReportDetails = ({ report, onBack, timestamp }) => {
    const [reportText, setReportText] = useState('');

    const sampleReport = `Quality Assurance Report
Sample ID: ${report.sample}
Batch Number: BN2024-001
Test Parameters:
- Physical Appearance: Clear solution
- pH Level: 7.2
- Sterility: Passed
- Endotoxin Test: <0.25 EU/mL
- Particulate Matter: Within specifications

Additional Observations:
- Visual inspection completed
- All acceptance criteria met
- No deviations observed

Recommendations:
Batch meets all quality specifications and is recommended for release.`;

    useEffect(() => {
      setReportText(sampleReport);
    }, [report.sample, sampleReport]);

    const handleSave = () => {
      console.log('Saving report:', { ...report, details: reportText });
    };

    return (
      <div className="report-details-container">
        <div className="report-header">
          <h3>Report Details: {report.name}</h3>
        </div>

        <div className="report-meta">
          <div className="meta-item">
            <span className="meta-label">Sample ID</span>
            <span className="meta-value">{report.sample}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Date</span>
            <span className="meta-value">{timestamp}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Status</span>
            <span className="meta-value">Pending Review</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Department</span>
            <span className="meta-value">Quality Control</span>
          </div>
        </div>

        <div className="report-content">
          <div className="report-section">
            <h4 className="section-title">Quality Assurance Report</h4>
            <textarea
              className="qa-report-text"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Enter detailed QA report information..."
            />
          </div>
        </div>

        <div className="report-actions">
          <span className="status-badge">
            ⏳ Pending Review
          </span>
          <div className="action-buttons">
            <button 
              className="back-button"
              onClick={onBack}
            >
              ← Back to Reports
            </button>
            <button 
              className="save-button"
              onClick={handleSave}
            >
              Save Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Production Manager Dashboard</h1>
        <Link to="/" className="back-home-button">
          <span>←</span> Back to Home
        </Link>
      </header>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'productStep' ? 'active' : ''}`}
          onClick={() => setActiveTab('productStep')}
        >
          Update Product Step
        </button>
        <button
          className={`tab-button ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          Report from QA
        </button>
        <button
          className={`tab-button ${activeTab === 'operatorTable' ? 'active' : ''}`}
          onClick={() => setActiveTab('operatorTable')}
        >
          Operator Table
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'productStep' && (
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
        )}

        {activeTab === 'report' && (
          <>
            {!selectedReport ? (
              <div className="report-section">
                <h3>Quality Assurance Reports</h3>
                <div className="report-list">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="report-item"
                      onClick={() => setSelectedReport(report)}
                    >
                      <h4>{report.name}</h4>
                      <span>{formatTimestamp(report.timestamp)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ReportDetails
                report={selectedReport}
                timestamp={formatTimestamp(selectedReport.timestamp)}
                onBack={() => setSelectedReport(null)}
              />
            )}
          </>
        )}

        {activeTab === 'operatorTable' && <OperatorTable />}
      </div>
    </div>
  );
}

export default Dashboard;