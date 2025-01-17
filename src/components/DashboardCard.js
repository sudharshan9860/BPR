import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardCard.css';

const DashboardCard = () => {
  return (
    <div className="dashboard-card">
      <div className="card-content">
        <div className="icon">
          <span role="img" aria-label="factory">🏭</span>
        </div>
        <h2 className="card-title">Production Manager Dashboard</h2>
        <Link to="/dashboard">
          <button className="view-dashboard-btn">View Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardCard;
