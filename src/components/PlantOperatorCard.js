import React from 'react';
import { Link } from 'react-router-dom';
import './PlantOperatorCard.css';

const PlantOperatorCard = () => {
  return (
    <div className="dashboard-card plant-operator">
      <div className="card-content">
        <div className="icon">
          <span role="img" aria-label="operator">👨‍🔧</span>
        </div>
        <h2 className="card-title">Plant Operator Dashboard</h2>
        <Link to="/plant-operator">
          <button className="view-dashboard-btn">View Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default PlantOperatorCard;
