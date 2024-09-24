import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ reviewData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!reviewData || !reviewData.result || reviewData.result.length === 0) {
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
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [reviewData]);

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

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {reviewData.display?.title || 'Pie Chart'}
        </Typography>
        <Pie data={chartData} />
      </CardContent>
    </Card>
  );
};

export default PieChart;
