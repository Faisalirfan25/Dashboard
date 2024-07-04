import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { processCSV } from '../utils/dataProcessor';

const GraphTotalRevenue = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/meters.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvData = await response.text();
        console.log('Fetched CSV Data:', csvData); // Log fetched CSV data
        const parsedData = await processCSV(csvData);
        console.log('Parsed Data:', parsedData); // Log parsed data
        setData(parsedData);
      } catch (error) {
        console.error('Error fetching or processing CSV data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds for real-time updates
    return () => clearInterval(interval);
  }, []);

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
    </LineChart>
  );
};

export default GraphTotalRevenue;
