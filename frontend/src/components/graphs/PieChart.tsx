import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Utility function to generate random colors
const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    colors.push(randomColor);
  }
  return colors;
};

const PieChart = ({ reviewData }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reviewData || !reviewData.result || reviewData.result.length === 0) {
      setLoading(false);
      return;
    }

    // Extract display settings
    const { display } = reviewData;
    const { title, x_axis, y_axis } = display;

    // Prepare the chart data based on x_axis and y_axis
    const labels = reviewData.result.map(item => item[x_axis]);
    const data = reviewData.result.map(item => item[y_axis]);

    // Set the chart data
    setChartData({
      labels: labels,
      datasets: [
        {
          label: y_axis,
          data: data,
          backgroundColor: generateColors(data.length),
          borderColor: generateColors(data.length).map(color => color.replace(/0\.6\)$/, '1)')), // Adjust border colors
          borderWidth: 2,
        },
      ],
    });

    setLoading(false); // Data loading completed
  }, [reviewData]);

  if (loading) {
    return (
      <Card sx={{ maxWidth: 600, margin: '20px auto', textAlign: 'center', padding: 3 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Loading chart data...
        </Typography>
      </Card>
    );
  }

  if (!chartData) {
    return (
      <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            No Data Available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const totalData = chartData.datasets[0].data.reduce((acc, val) => acc + val, 0); // Calculate total for percentages

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {reviewData.display?.title || 'Pie Chart'}
        </Typography>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw || 0;
                    const percentage = ((value / totalData) * 100).toFixed(2); // Calculate percentage
                    return `${label}: ${value} (${percentage}%)`; // Display label, value, and percentage
                  },
                },
              },
              legend: {
                position: 'top',
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PieChart;
