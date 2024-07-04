import Papa from 'papaparse';

export const processCSV = (csvFile) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log('Raw Parsed Results:', results); // Log raw parsed results
        const data = results.data.map(row => ({
          date: row.Serial_no, // Using Serial_no as a proxy for date
          totalRevenue: row.Current_month_reading * row.Unit_price,
          electric: row.Meter_type === 'Electric' ? row.Current_month_reading * row.Unit_price : 0,
          gas: row.Meter_type === 'Gas' ? row.Current_month_reading * row.Unit_price : 0,
          water: row.Meter_type === 'Water' ? row.Current_month_reading * row.Unit_price : 0,
        }));

        console.log('Processed Data:', data); // Log processed data

        // Aggregate data by date
        const aggregatedData = data.reduce((acc, row) => {
          if (!acc[row.date]) {
            acc[row.date] = { date: row.date, totalRevenue: 0, electric: 0, gas: 0, water: 0 };
          }
          acc[row.date].totalRevenue += row.totalRevenue;
          acc[row.date].electric += row.electric;
          acc[row.date].gas += row.gas;
          acc[row.date].water += row.water;
          return acc;
        }, {});

        resolve(Object.values(aggregatedData));
      },
      error: (error) => {
        console.error('Error parsing CSV data:', error);
        reject(error);
      },
    });
  });
};
