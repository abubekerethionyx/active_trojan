import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ReviewChart = ({ reviewData }) => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({});

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
          label: y_axis || 'Y-Axis',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });

    // Set the chart options with dynamic title and axis labels
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: title,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: x_axis || 'X-Axis',
          },
        },
        y: {
          title: {
            display: true,
            text: y_axis || 'Y-Axis',
          },
        },
      },
    });
  }, [reviewData]);

  if (!chartData) {
    return <Typography>Loading Chart...</Typography>;
  }

  return (
    <Card sx={{ margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {reviewData.display?.title || 'Chart'}
        </Typography>
        <Bar data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};
