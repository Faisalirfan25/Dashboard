import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { processCSV } from '../utils/dataProcessor';

const GraphElectricMeters = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/meters.csv');
      const csvData = await response.text();
      const parsedData = await processCSV(csvData);
      setData(parsedData);
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
      <Line type="monotone" dataKey="electric" stroke="#82ca9d" />
    </LineChart>
  );
};

export default GraphElectricMeters;
