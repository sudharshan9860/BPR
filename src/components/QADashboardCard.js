import React from 'react';
import { Link } from 'react-router-dom';
import './QADashboardCard.css';

const QADashboardCard = () => {
  return (
    <div className="dashboard-card qa-dashboard">
      <div className="card-content">
        <div className="icon">
          <span role="img" aria-label="qa">🔍</span>
        </div>
        <h2 className="card-title">QA Dashboard</h2>
        <Link to="/qa-dashboard">
          <button className="view-dashboard-btn">View Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default QADashboardCard;
