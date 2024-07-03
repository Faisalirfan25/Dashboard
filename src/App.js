import React from 'react';
import GraphTotalRevenue from './components/GraphTotalRevenue';
import GraphElectricMeters from './components/GraphElectricMeters';
import GraphGasMeters from './components/GraphGasMeters';
import GraphWaterMeters from './components/GraphWaterMeters';
import GraphTotalMeters from './components/GraphTotalMeters';
import PieChartEarnings from './components/PieChartEarnings';
import BillingPage from './components/BillingPage';

const App = () => {
  return (
    <div>
      <h1>Meter Dashboard</h1>
      <GraphTotalRevenue />
      <GraphElectricMeters />
      <GraphGasMeters />
      <GraphWaterMeters />
      <GraphTotalMeters />
      <PieChartEarnings />
      <BillingPage />
    </div>
  );
};

export default App;
