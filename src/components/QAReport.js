import React, { useState, useEffect } from 'react';
import './QAReport.css';

const QAReport = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports] = useState([
    { id: 1, name: 'Report 1', timestamp: '2025-01-08T12:30:00', sample: 'AFN-2' },
    { id: 2, name: 'Report 2', timestamp: '2025-01-08T02:45:00', sample: 'AFN-3' },
    { id: 3, name: 'Report 3', timestamp: '2025-01-07T04:00:00', sample: 'AFN-1' },
  ]);

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

  // ReportDetails Sub-component
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

    const handleSave = async () => {
      try {
        const reportData = {
          reportId: report.id,
          sampleId: report.sample,
          reportDetails: reportText,
          timestamp: new Date().toISOString(),
          status: 'Pending Review'
        };

        const response = await fetch('/api/qa-reports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reportData),
        });

        if (response.ok) {
          alert('Report saved successfully!');
          onBack(); // Return to reports list after saving
        } else {
          throw new Error('Failed to save report');
        }
      } catch (error) {
        console.error('Error saving report:', error);
        alert('Failed to save report. Please try again.');
      }
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
    <div className="qa-report-container">
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
    </div>
  );
};

export default QAReport;
