import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // Import Routes and Route
import DashboardCard from './components/DashboardCard';
import Dashboard from './components/Dashboard'; // New dashboard component import
import './App.css'; // Link to your styles

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home View */}
          <Route path="/" element={<Home />} />
          
          {/* Dashboard View */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

// Home Component (Initial Landing Page)
function Home() {
  return (
    <div>
      <header className="page-header">
        <h1>Pharma Manufacturing Dashboard</h1>
      </header>
      <DashboardCard /> {/* Displaying the card to navigate to dashboard */}
    </div>
  );
}

export default App;
