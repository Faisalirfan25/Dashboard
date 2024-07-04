import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { processCSV } from '../utils/dataProcessor';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const PieChartMeters = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/meters.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvData = await response.text();
        const parsedData = await processCSV(csvData);

        // Calculate totals for pie chart
        const totals = parsedData.reduce((acc, row) => {
          acc.electric += row.electric;
          acc.gas += row.gas;
          acc.water += row.water;
          return acc;
        }, { electric: 0, gas: 0, water: 0 });

        const pieData = [
          { name: 'Electric', value: totals.electric },
          { name: 'Gas', value: totals.gas },
          { name: 'Water', value: totals.water }
        ];

        console.log('Pie Chart Data:', pieData); // Log pie chart data

        setData(pieData);
      } catch (error) {
        console.error('Error fetching or processing CSV data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds for real-time updates
    return () => clearInterval(interval);
  }, []);

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartMeters;
