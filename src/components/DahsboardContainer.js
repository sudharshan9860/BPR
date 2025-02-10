import React from 'react';
import DashboardCard from './DashboardCard';
import PlantOperatorCard from './PlantOperatorCard';
import QADashboardCard from './QADashboardCard';
import './DashboardContainer.css';

const DashboardContainer = () => {
  return (
    <div className="main-container">
      <h1 className="main-title">Pharma Manufacturing Dashboard</h1>
      <div className="dashboard-cards-container">
        <DashboardCard />
        <PlantOperatorCard />
        <QADashboardCard />
      </div>
    </div>
  );
};

export default DashboardContainer;
