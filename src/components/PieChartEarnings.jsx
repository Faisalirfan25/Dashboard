// PieChartEarnings.js
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { processCSV } from '../utils/dataProcessor';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const PieChartEarnings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/meters.csv');
      const csvData = await response.text();
      const parsedData = await processCSV(csvData);
      setData([
        { name: 'Electric Meters', value: parsedData.reduce((acc, meter) => acc + meter.electric, 0) },
        { name: 'Gas Meters', value: parsedData.reduce((acc, meter) => acc + meter.gas, 0) },
        { name: 'Water Meters', value: parsedData.reduce((acc, meter) => acc + meter.water, 0) },
      ]);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds for real-time updates
    return () => clearInterval(interval);
  }, []);

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieChartEarnings;
